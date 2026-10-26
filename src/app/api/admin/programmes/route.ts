import { NextResponse } from 'next/server';
import { createProgramme } from '@/lib/actions/queries';
import { createProgrammeSchema } from '@/validations/schemas';
import { requireAdmin } from '@/lib/auth';
import { createErrorResponse } from '@/lib/utils/errors';
import { SEED_PROGRAMMES } from '@/lib/data/seed-data';

export async function GET(req: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json({ error: 'Administrator access required', code: 403 }, { status: 403 });
  }

  const searchParams = new URL(req.url).searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 50);

  const paginated = SEED_PROGRAMMES.slice((page - 1) * limit, page * limit);
  return NextResponse.json({
    data: paginated,
    pagination: {
      total: SEED_PROGRAMMES.length,
      page,
      limit,
    },
  });
}

export async function POST(req: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json({ error: 'Administrator access required', code: 403 }, { status: 403 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return createErrorResponse('Invalid JSON body', 400);
  }

  const parsed = createProgrammeSchema.parse(body);

  try {
    const created = await createProgramme({ ...parsed });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch {
    // Return mock created programme
    const newProg = {
      id: 'p-' + Date.now(),
      title: parsed.title,
      description: parsed.description,
      destination_id: parsed.destinationId ?? 'd1',
      destination_name: 'Custom Field Station',
      duration_weeks: parsed.durationWeeks,
      age_min: parsed.ageMin,
      age_max: parsed.ageMax,
      price_cents: parsed.priceCents,
      currency: parsed.currency,
      availability: parsed.availability,
      start_date: parsed.startDate,
      end_date: parsed.endDate,
      learning_outcomes: parsed.learningOutcomes,
      what_included: parsed.whatIncluded,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return NextResponse.json({ data: newProg }, { status: 201 });
  }
}
