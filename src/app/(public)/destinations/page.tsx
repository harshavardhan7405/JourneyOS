import { queryDestinations } from '@/lib/actions/queries';
import { DestinationCard } from '@/components/public/destination-card';
import { SEED_DESTINATIONS } from '@/lib/data/seed-data';
import { Globe, MapPin, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Destinations — International Fieldwork Sites | JourneyOS',
  description: 'Explore our vetted research and learning hubs across the Mediterranean, Scandinavia, East Asia, and North Africa.',
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;
  const searchQuery = params.search as string | undefined;

  let destinations: any[] = [];
  let isDemoSeed = false;

  try {
    const res = await queryDestinations({ search: searchQuery });
    destinations = res.items;
  } catch (err) {
    console.error('DB query error for destinations:', err);
  }

  if (destinations.length === 0) {
    isDemoSeed = true;
    destinations = [...SEED_DESTINATIONS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      destinations = destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.description?.toLowerCase().includes(q)
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700">
          <Globe className="w-4 h-4" />
          Fieldwork Sites
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
          Global Destinations
        </h1>
        <p className="mt-2 text-stone-600 max-w-2xl text-sm sm:text-base leading-relaxed">
          From the volcanic calderas of Greece to robotics incubators in Tokyo, each destination serves as a living laboratory for deep experiential inquiry.
        </p>

        {isDemoSeed && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            Displaying curated demo field sites.
          </div>
        )}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest: any) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </div>
  );
}
