import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SEED_PROGRAMMES, SEED_REGISTRATIONS, SEED_PAYMENTS, SEED_DESTINATIONS } from '@/lib/data/seed-data';

export async function GET() {
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json({ error: 'Administrator access required', code: 403 }, { status: 403 });
  }

  return NextResponse.json({
    programmes: SEED_PROGRAMMES.length,
    registrations: SEED_REGISTRATIONS.length,
    payments: SEED_PAYMENTS.length,
    destinations: SEED_DESTINATIONS.length,
  });
}
