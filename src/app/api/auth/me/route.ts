import { NextResponse } from 'next/server';
import { getCurrentUserFromServer } from '@/lib/auth';
import { DEMO_USERS } from '@/lib/auth/constants';

export async function GET() {
  const user = await getCurrentUserFromServer();
  if (user) {
    return NextResponse.json({ user });
  }
  // If no user is logged in, return the default parent profile for seamless demo preview
  return NextResponse.json({ user: DEMO_USERS.parent });
}
