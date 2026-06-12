import { NextResponse } from 'next/server';

// Boi gordo price must be between R$ 50 and R$ 2.000 per arroba
const MIN_PRICE = 50;
const MAX_PRICE = 2000;

function isValidPrice(price: number) {
  return !isNaN(price) && price >= MIN_PRICE && price <= MAX_PRICE;
}

/** Attempt to parse the latest price from the CEPEA boi gordo indicator page */
async function fetchCEPEA(): Promise<{ price: number; date: string } | null> {
  try {
    const res = await fetch(
      'https://www.cepea.esalq.usp.br/br/indicador/boi-gordo.aspx',
      {
        next: { revalidate: 3600 },
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AgroFinance/1.0)',
          Accept: 'text/html',
        },
      }
    );
    if (!res.ok) return null;
    const html = await res.text();

    // CEPEA page contains a table row like:  dd/mm/aaaa | R$ 320,45 | ...
    // Match a Brazilian-formatted decimal number in the plausible price range
    const rows = html.match(/<td[^>]*>\s*([\d]+[.,][\d]+)\s*<\/td>/g) ?? [];
    for (const row of rows) {
      const m = row.match(/([\d]+[.,][\d]+)/);
      if (!m) continue;
      const price = parseFloat(m[1].replace('.', '').replace(',', '.'));
      if (isValidPrice(price)) {
        // Try to extract a nearby date (dd/mm/yyyy)
        const dateMatch = html.match(/(\d{2}\/\d{2}\/\d{4})/);
        return { price, date: dateMatch?.[1] ?? '' };
      }
    }
    return null;
  } catch {
    return null;
  }
}

/** Attempt a BCB SGS series — only returns if value is in a plausible R$/@ range */
async function fetchBCBSeries(
  series: number
): Promise<{ price: number; date: string } | null> {
  try {
    const res = await fetch(
      `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${series}/dados/ultimos/10?formato=json`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data: { data: string; valor: string }[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    for (const entry of [...data].reverse()) {
      const price = parseFloat(String(entry?.valor ?? '').replace(',', '.'));
      if (isValidPrice(price)) {
        return { price, date: entry.data };
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET() {
  // 1. Try CEPEA — official reference for boi gordo in Brazil
  const cepea = await fetchCEPEA();
  if (cepea) {
    return NextResponse.json({
      price: cepea.price,
      date: cepea.date,
      source: 'CEPEA/ESALQ',
    });
  }

  // 2. Try BCB series that might have post-Real data
  for (const series of [3430, 7394, 3948]) {
    const bcb = await fetchBCBSeries(series);
    if (bcb) {
      return NextResponse.json({
        price: bcb.price,
        date: bcb.date,
        source: 'BCB/ESALQ',
      });
    }
  }

  return NextResponse.json({
    price: null,
    message:
      'Cotação automática indisponível. Informe o preço da arroba manualmente.',
  });
}
