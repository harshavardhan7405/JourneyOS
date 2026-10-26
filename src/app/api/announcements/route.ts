import { NextResponse } from 'next/server';
import { queryAnnouncements, queryUserAnnouncements } from '@/lib/actions/queries';
import { SEED_ANNOUNCEMENTS } from '@/lib/data/seed-data';

export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;
  const userId = searchParams.get('user');

  try {
    if (userId && userId !== 'me') {
      const announcements = await queryUserAnnouncements(userId);
      if (announcements && announcements.length > 0) {
        return NextResponse.json({ data: announcements });
      }
    }

    const page = Number(searchParams.get('page') ?? 1);
    const limit = Number(searchParams.get('limit') ?? 20);
    const result = await queryAnnouncements({ page, limit });
    if (result && result.items && result.items.length > 0) {
      return NextResponse.json({ data: result.items, pagination: { total: result.count } });
    }
    return NextResponse.json({ data: SEED_ANNOUNCEMENTS, pagination: { total: SEED_ANNOUNCEMENTS.length } });
  } catch {
    return NextResponse.json({ data: SEED_ANNOUNCEMENTS, pagination: { total: SEED_ANNOUNCEMENTS.length } });
  }
};
