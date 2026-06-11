import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // BCB SGS series 22 = Boi gordo - preço médio arroba (ESALQ/BM&FBovespa)
    const res = await fetch(
      'https://api.bcb.gov.br/dados/serie/bcdata.sgs.22/dados/ultimos/1?formato=json',
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data = await res.json();
      const raw = data?.[0]?.valor;
      if (raw) {
        const price = parseFloat(String(raw).replace(',', '.'));
        if (!isNaN(price) && price > 0) {
          return NextResponse.json({ price, date: data[0].data, source: 'BCB/ESALQ' });
        }
      }
    }
  } catch {
    // fallthrough
  }
  return NextResponse.json({ price: null, message: 'Cotação automática indisponível. Informe o preço manualmente.' });
}
