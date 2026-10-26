import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { DEMO_USERS } from '@/lib/auth/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const role = (body.role as 'admin' | 'parent' | 'student') || 'parent';
    const user = DEMO_USERS[role] || DEMO_USERS.parent;

    const cookieStore = await cookies();
    cookieStore.set('journeyos_demo_user', JSON.stringify(user), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      httpOnly: false, // Accessible in browser for client components
    });

    return NextResponse.json({ success: true, user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Demo sign-in failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
