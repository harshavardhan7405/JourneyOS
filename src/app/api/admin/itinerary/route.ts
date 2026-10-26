import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SEED_ITINERARIES, SEED_PROGRAMMES } from '@/lib/data/seed-data';

export async function GET(req: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json({ error: 'Administrator access required', code: 403 }, { status: 403 });
  }

  const allItems: any[] = [];
  for (const [progId, items] of Object.entries(SEED_ITINERARIES)) {
    const prog = SEED_PROGRAMMES.find((p) => p.id === progId);
    for (const item of items) {
      allItems.push({
        ...item,
        programme: {
          id: progId,
          title: prog?.title ?? progId,
        },
      });
    }
  }

  return NextResponse.json({
    data: allItems,
    pagination: {
      total: allItems.length,
    },
  });
}
