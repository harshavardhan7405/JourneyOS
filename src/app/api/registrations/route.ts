import { NextResponse } from 'next/server';
import { getCurrentUserFromServer } from '@/lib/auth';
import { createErrorResponse } from '@/lib/utils/errors';
import { SEED_REGISTRATIONS } from '@/lib/data/seed-data';
import { z } from 'zod';

const bodySchema = z.object({
  programmeId: z.string().min(1),
  studentId: z.string().min(1),
});

export const GET = async (req: Request) => {
  const user = await getCurrentUserFromServer();
  const searchParams = new URL(req.url).searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 20);

  // If user is a student, filter to student's registrations
  let list = SEED_REGISTRATIONS;
  if (user?.role === 'student') {
    list = SEED_REGISTRATIONS.filter((r) => r.student_id === 'student-01');
  }

  const paginated = list.slice((page - 1) * limit, page * limit);
  return NextResponse.json({
    data: paginated,
    pagination: {
      total: list.length,
      page,
      limit,
    },
  });
};

export const POST = async (req: Request) => {
  const user = await getCurrentUserFromServer();
  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required', code: 401 },
      { status: 401 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return createErrorResponse('Invalid JSON body', 400);
  }

  const parsed = bodySchema.parse(body);

  const created = {
    id: 'reg-' + Date.now(),
    programme_id: parsed.programmeId,
    student_id: parsed.studentId,
    status: 'pending',
    payment_status: 'pending',
    created_at: new Date().toISOString(),
  };

  return NextResponse.json({ data: created }, { status: 201 });
};
