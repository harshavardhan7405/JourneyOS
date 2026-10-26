import { queryProgrammes } from '@/lib/actions/queries';
import { programmesQuerySchema } from '@/validations/schemas';
import { ProgrammeCard } from '@/components/public/programme-card';
import { SEED_PROGRAMMES } from '@/lib/data/seed-data';
import Link from 'next/link';
import { Search, SlidersHorizontal, Compass, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'All Programmes — Educational Expeditions | JourneyOS',
  description: 'Browse curated international educational travel programmes by age group, duration, and subject matter.',
};

export default async function ProgrammeListPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;
  const parsed = programmesQuerySchema.parse(params);

  let programmes: any[] = [];
  let isDemoSeed = false;

  try {
    const result = await queryProgrammes({
      search: parsed.search,
      destinationId: parsed.destinationId,
      durationMin: parsed.durationMin,
      ageMin: parsed.ageMin,
      ageMax: parsed.ageMax,
      sortBy: parsed.sortBy,
      order: parsed.order,
      page: parsed.page,
      limit: parsed.limit,
    });
    programmes = result.items;
  } catch (err) {
    console.error('DB query error, serving seed catalog:', err);
  }

  // Fallback to verified seed catalog if database has not yet been populated
  if (programmes.length === 0) {
    isDemoSeed = true;
    let filtered = [...SEED_PROGRAMMES];
    if (parsed.search) {
      const q = parsed.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destination_name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    if (parsed.durationMin) {
      filtered = filtered.filter((p) => p.duration_weeks >= parsed.durationMin!);
    }
    if (parsed.ageMin) {
      filtered = filtered.filter((p) => p.age_min >= parsed.ageMin!);
    }
    if (parsed.ageMax) {
      filtered = filtered.filter((p) => p.age_max <= parsed.ageMax!);
    }
    if (parsed.sortBy === 'price') {
      filtered.sort((a, b) =>
        parsed.order === 'desc' ? b.price_cents - a.price_cents : a.price_cents - b.price_cents
      );
    } else if (parsed.sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    programmes = filtered;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700">
          <Compass className="w-4 h-4" />
          Expeditions Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
          Global Learning Programmes
        </h1>
        <p className="mt-2 text-stone-600 max-w-2xl text-sm sm:text-base leading-relaxed">
          Curated field residencies blending STEM inquiry, ecological restoration, and cultural exchange for elementary, middle, and high school learners.
        </p>

        {isDemoSeed && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            Displaying verified demo seed catalog. Connect Supabase PostgreSQL to view live customized records.
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <form method="GET" action="/programmes" className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Keyword Search */}
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Search by Keyword
            </label>
            <div className="relative">
              <input
                type="search"
                name="search"
                defaultValue={parsed.search ?? ''}
                placeholder="e.g. robotics, volcanology, marine..."
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Duration Filter */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Minimum Duration
            </label>
            <select
              name="durationMin"
              defaultValue={parsed.durationMin ? String(parsed.durationMin) : ''}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            >
              <option value="">Any duration</option>
              <option value="4">4+ weeks</option>
              <option value="6">6+ weeks</option>
              <option value="8">8+ weeks</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Sort By
            </label>
            <select
              name="sortBy"
              defaultValue={parsed.sortBy}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            >
              <option value="created_at">Latest Additions</option>
              <option value="price">Tuition: Low to High</option>
              <option value="title">Alphabetical (A–Z)</option>
            </select>
          </div>

          {/* Submit Action */}
          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      {/* Programme Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-stone-600">
            Showing <strong className="text-stone-900">{programmes.length}</strong> available expedition{programmes.length === 1 ? '' : 's'}
          </span>
          <div className="text-xs text-stone-400">
            Admissions for 2025 cohort
          </div>
        </div>

        {programmes.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900">No Programmes Match Your Search</h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto">
              Try broadening your keyword or clearing duration filters to view all available expeditions.
            </p>
            <Link
              href="/programmes"
              className="inline-block mt-2 px-4 py-2 rounded-lg bg-stone-100 text-stone-800 text-xs font-medium hover:bg-stone-200 transition-colors"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programmes.map((prog: any) => (
              <ProgrammeCard
                key={prog.id}
                programme={prog}
                imageUrl={prog.image_url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
