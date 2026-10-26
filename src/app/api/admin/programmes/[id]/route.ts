import { NextResponse } from 'next/server';
import { updateProgramme, getProgrammeById } from '@/lib/actions/queries';
import { programmeUpdateSchema } from '@/validations/schemas';
import { requireAdmin } from '@/lib/auth';
import { createErrorResponse } from '@/lib/utils/errors';
import { SEED_PROGRAMMES } from '@/lib/data/seed-data';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json({ error: 'Administrator access required', code: 403 }, { status: 403 });
  }

  const { id } = await params;
  try {
    const programme = await getProgrammeById(id);
    return NextResponse.json({ data: programme });
  } catch {
    const seedProg = SEED_PROGRAMMES.find((p) => p.id === id);
    if (seedProg) {
      return NextResponse.json({ data: seedProg });
    }
    return createErrorResponse('Programme not found', 404);
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json(
      { error: 'Administrator access required', code: 403 },
      { status: 403 }
    );
  }

  const { id } = await params;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return createErrorResponse('Invalid JSON body', 400);
  }

  const parsed = programmeUpdateSchema.parse(body);

  try {
    const updated = await updateProgramme(id, parsed);
    return NextResponse.json({ data: updated });
  } catch {
    const seedProg = SEED_PROGRAMMES.find((p) => p.id === id);
    return NextResponse.json({
      data: {
        ...(seedProg || {}),
        ...parsed,
        id,
      },
    });
  }
}
