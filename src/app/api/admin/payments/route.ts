import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SEED_PAYMENTS } from '@/lib/data/seed-data';

export async function GET(req: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json({ error: 'Administrator access required', code: 403 }, { status: 403 });
  }

  const searchParams = new URL(req.url).searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 50);

  const paginated = SEED_PAYMENTS.slice((page - 1) * limit, page * limit);
  return NextResponse.json({
    data: paginated,
    pagination: {
      total: SEED_PAYMENTS.length,
      page,
      limit,
    },
  });
}
