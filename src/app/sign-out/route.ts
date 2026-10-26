import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('journeyos_demo_user');
  
  const url = new URL('/sign-in', request.url);
  return NextResponse.redirect(url);
}

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('journeyos_demo_user');
  return NextResponse.json({ success: true });
}
