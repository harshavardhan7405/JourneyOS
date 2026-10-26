import { NextResponse } from 'next/server';
import { SEED_DESTINATIONS } from '@/lib/data/seed-data';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const search = searchParams.get('search')?.toLowerCase() ?? '';

  let list = SEED_DESTINATIONS;
  if (search) {
    list = list.filter(
      (d) => d.name.toLowerCase().includes(search) || d.country.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    data: list,
    pagination: {
      total: list.length,
    },
  });
}
