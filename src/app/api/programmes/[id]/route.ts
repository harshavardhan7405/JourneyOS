import { NextResponse } from 'next/server';
import { getProgrammeById, getItineraryItems } from '@/lib/actions/queries';
import { programmeGetSchema } from '@/validations/schemas';
import { SEED_PROGRAMMES, SEED_ITINERARIES } from '@/lib/data/seed-data';

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const parsedId = programmeGetSchema.parse({ id });
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
  } catch (_err) {
    // Fallback to rich seed data for offline / demo mode
    const programme = SEED_PROGRAMMES.find((p) => p.id === id) || SEED_PROGRAMMES[0];
    const itinerary = (SEED_ITINERARIES as Record<string, any[]>)[id] || (SEED_ITINERARIES as Record<string, any[]>)['p1'] || [];

    return NextResponse.json({
      data: {
        ...programme,
        itinerary,
      },
    });
  }
};
