import { NextResponse } from 'next/server';
import { getProgrammeById, getItineraryItems } from '@/lib/actions/queries';
import { programmeGetSchema } from '@/validations/schemas';
import { createErrorResponse } from '@/lib/utils/errors';

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Validate ID format
  const parsedId = programmeGetSchema.parse({ id });

  try {
    const [programme, itinerary] = await Promise.all([
      getProgrammeById(parsedId.id),
      getItineraryItems(parsedId.id),
    ]);

    return NextResponse.json({
      data: {
        ...programme,
        itinerary: itinerary.sort((a: any, b: any) => a.day_number - b.day_number),
      },
    });
  } catch (err) {
    console.error('GET /api/programmes/[id] error:', err);
    if (err instanceof Error && err.name === 'AppError') {
      const e = err as any;
      return createErrorResponse(e.message, e.statusCode ?? 500, e.details);
    }
    return createErrorResponse('Failed to fetch programme', 500);
  }
};
