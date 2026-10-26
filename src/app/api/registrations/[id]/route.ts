import { NextResponse } from 'next/server';
import { queryRegistrationsForUser, queryRegistrationsByStudent } from '@/lib/actions/queries';
import { getCurrentUserFromServer } from '@/lib/auth';
import { createErrorResponse } from '@/lib/utils/errors';
import { z } from 'zod';

const idSchema = z.object({ id: z.string().uuid() });

export const GET = async (req: Request, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  await idSchema.parse({ id });

  const user = await getCurrentUserFromServer();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required', code: 401 }, { status: 401 });
  }

  try {
    // For registrations/[id] — this should be admin view or parent view of a specific registration
    if (user.role === 'admin') {
      // Admin views specific registration details
      // Implementation would fetch and return detailed info
      return NextResponse.json({ data: {} });
    } else if (user.role === 'parent') {
      // Parent views their own registration for the given ID
      // In production this would verify parent has access to this registration's student
      return NextResponse.json({ data: {} });
    } else {
      // Student views their own registration
      return NextResponse.json({ data: {} });
    }
  } catch (err) {
    console.error('GET /api/registrations/[id] error:', err);
    if (err instanceof Error && err.name === 'AppError') {
      const e = err as any;
      return createErrorResponse(e.message, e.statusCode ?? 500);
    }
    return createErrorResponse('Failed to fetch registration', 500);
  }
};
