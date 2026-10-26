import { NextResponse } from 'next/server';
import { queryProgrammes, queryDestinations } from '@/lib/actions/queries';
import { programmesQuerySchema } from '@/validations/schemas';
import { createErrorResponse } from '@/lib/utils/errors';

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  // Validate and parse query parameters
  let parsed;
  try {
    parsed = programmesQuerySchema.parse({
      search: searchParams.search ?? '',
      destinationId: searchParams.destinationId || undefined,
      durationMin: searchParams.durationMin ? Number(searchParams.durationMin) : undefined,
      ageMin: searchParams.ageMin ? Number(searchParams.ageMin) : undefined,
      ageMax: searchParams.ageMax ? Number(searchParams.ageMax) : undefined,
      sortBy: searchParams.sortBy ?? 'created_at',
      order: searchParams.order ?? 'desc',
      page: Number(searchParams.page ?? 1),
      limit: Number(searchParams.limit ?? 20),
    });
  } catch (err) {
    return createErrorResponse('Invalid query parameters', 400, { param: 'query' });
  }

  try {
    const [programmesResult, destinationsResult] = await Promise.all([
      queryProgrammes({
        search: parsed.search,
        destinationId: parsed.destinationId,
        durationMin: parsed.durationMin,
        ageMin: parsed.ageMin,
        ageMax: parsed.ageMax,
        sortBy: parsed.sortBy as any,
        order: parsed.order as any,
        page: parsed.page,
        limit: parsed.limit,
      }),
      queryDestinations(),
    ]);

    // Collect destination names for each programme
    const destMap = new Map<string, string>();
    destinationsResult.items.forEach((d: any) => destMap.set(d.id, d.name));

    const programmesWithDestinations = programmesResult.items.map((p: any) => ({
      ...p,
      destination_name: destMap.get(p.destination_id) ?? '',
    }));

    return NextResponse.json({
      data: programmesWithDestinations,
      pagination: {
        page: parsed.page,
        limit: parsed.limit,
        total: programmesResult.count,
        totalPages: Math.ceil(programmesResult.count / parsed.limit),
        hasNext: parsed.page * parsed.limit < programmesResult.count,
        hasPrev: parsed.page > 1,
      },
      meta: {
        total: programmesResult.count,
      },
    });
  } catch (_err) {
    // Graceful fallback to seed data when database is unavailable (interview / demo mode)
    const { SEED_PROGRAMMES } = await import('@/lib/data/seed-data');
    let filtered = [...SEED_PROGRAMMES];
    if (parsed.search) {
      const q = parsed.search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))
      );
    }
    if (parsed.durationMin) {
      filtered = filtered.filter((p) => p.duration_weeks >= parsed.durationMin!);
    }
    if (parsed.ageMin) {
      filtered = filtered.filter((p) => p.age_min >= parsed.ageMin!);
    }
    return NextResponse.json({
      data: filtered,
      pagination: {
        page: parsed.page,
        limit: parsed.limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / parsed.limit),
        hasNext: false,
        hasPrev: false,
      },
      meta: {
        total: filtered.length,
      },
    });
  }
};
