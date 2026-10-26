import { NextResponse } from 'next/server';
import { getCurrentUserFromServer } from '@/lib/auth';

export async function PATCH(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    success: true,
    user: {
      full_name: body.full_name,
    },
  });
}
