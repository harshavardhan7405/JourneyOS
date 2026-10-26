import { queryDestinations } from '@/lib/actions/queries';
import { SEED_DESTINATIONS, SEED_PROGRAMMES } from '@/lib/data/seed-data';
import { ProgrammeCard } from '@/components/public/programme-card';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowLeft, Calendar, Compass, Shield } from 'lucide-react';

export const metadata = {
  title: 'Destination Details | JourneyOS',
  description: 'Detailed overview of field research laboratories, accommodations, and academic itineraries.',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { id } = await params;

  let dest: any = null;
  try {
    const destinations = await queryDestinations();
    dest = destinations.items.find((d: any) => d.id === id);
  } catch (err) {
    console.error('Error fetching destination:', err);
  }

  // Fallback to seed destinations
  if (!dest) {
    dest = SEED_DESTINATIONS.find((d) => d.id === id) || SEED_DESTINATIONS[0];
  }

  // Find programmes matching this destination
  const programmes = SEED_PROGRAMMES.filter((p) => p.destination_id === dest.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          href="/destinations"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all destinations
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white min-h-[400px] flex items-end">
        <Image
          src={dest.image_url!}
          alt={dest.name}
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 p-8 sm:p-12 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            {dest.country}
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            {dest.name}
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {dest.description}
          </p>
        </div>
      </div>

      {/* Fast Facts Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">Best Season</span>
            <span className="text-sm font-bold text-stone-900">May through October</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">Field Specialty</span>
            <span className="text-sm font-bold text-stone-900">STEAM & Environmental Science</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">Safety Rating</span>
            <span className="text-sm font-bold text-stone-900">International Gold Standard</span>
          </div>
        </div>
      </div>

      {/* Available Programmes at this destination */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Field Expeditions
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Programmes Hosted at {dest.name}
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Choose an expedition to view learning outcomes, detailed day-by-day itineraries, and enrollment requirements.
          </p>
        </div>

        {programmes.length === 0 ? (
          <div className="p-8 rounded-xl bg-white border border-stone-200 text-center text-sm text-stone-500">
            No active term programmes are currently open for this destination. Check back soon for the next academic cycle.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programmes.map((p) => (
              <ProgrammeCard key={p.id} programme={p} imageUrl={p.image_url} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
