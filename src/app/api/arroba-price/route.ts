import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // BCB SGS series 22 = Boi gordo - preço médio arroba (ESALQ/BM&FBovespa)
    // Fetch last 10 records and pick the most recent one from the last 2 years
    const res = await fetch(
      'https://api.bcb.gov.br/dados/serie/bcdata.sgs.22/dados/ultimos/10?formato=json',
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

        // Find the most recent entry with a recent date
        for (const entry of [...data].reverse()) {
          const raw = entry?.valor;
          if (!raw) continue;
          const price = parseFloat(String(raw).replace(',', '.'));
          if (isNaN(price) || price <= 0) continue;

          // Parse date in Brazilian format dd/mm/yyyy
          const parts = String(entry.data ?? '').split('/');
          const entryDate = parts.length === 3
            ? new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
            : null;

          if (entryDate && entryDate >= twoYearsAgo) {
            return NextResponse.json({ price, date: entry.data, source: 'BCB/ESALQ' });
          }
        }

        // No recent data found — return the most recent entry anyway with a warning
        const latest = data[data.length - 1];
        const raw = latest?.valor;
        if (raw) {
          const price = parseFloat(String(raw).replace(',', '.'));
          if (!isNaN(price) && price > 0) {
            return NextResponse.json({
              price,
              date: latest.data,
              source: 'BCB/ESALQ',
              warning: 'Dado mais recente disponível — pode estar desatualizado.',
            });
          }
        }
      }
    }
  } catch {
    // fallthrough
  }
  return NextResponse.json({
    price: null,
    message: 'Cotação automática indisponível. Informe o preço manualmente.',
  });
}
