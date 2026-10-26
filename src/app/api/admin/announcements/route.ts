import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SEED_ANNOUNCEMENTS } from '@/lib/data/seed-data';

export async function GET() {
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json({ error: 'Administrator access required', code: 403 }, { status: 403 });
  }

  return NextResponse.json({
    data: SEED_ANNOUNCEMENTS,
    pagination: {
      total: SEED_ANNOUNCEMENTS.length,
    },
  });
}

export async function POST(req: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json({ error: 'Administrator access required', code: 403 }, { status: 403 });
  }

  const body = await req.json();
  const created = {
    id: 'ann-' + Date.now(),
    title: body.title,
    content: body.content,
    category: body.category || 'General',
    priority: body.priority || 'normal',
    created_at: new Date().toISOString(),
  };

  return NextResponse.json({ data: created }, { status: 201 });
}
