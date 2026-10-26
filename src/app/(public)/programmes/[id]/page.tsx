import { getProgrammeById, getItineraryItems } from '@/lib/actions/queries';
import { programmeGetSchema } from '@/validations/schemas';
import { Badge } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import type { Programme, ItineraryItem } from '@/db/types';
import { formatDateShort, formatCurrency } from '@/lib/utils/format';
import { SEED_PROGRAMMES, SEED_ITINERARIES } from '@/lib/data/seed-data';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  MapPin,
  ArrowLeft,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'Expedition Curriculum & Details | JourneyOS',
  description: 'Learn about this educational travel programme — duration, age range, dates, and learning outcomes.',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProgrammeDetailPage({ params }: PageProps) {
  const { id } = await params;

  let programme: any = null;
  let itinerary: ItineraryItem[] = [];

  try {
    const parsedId = programmeGetSchema.parse({ id });
    const [prog, itin] = await Promise.all([
      getProgrammeById(parsedId.id),
      getItineraryItems(parsedId.id),
    ]);
    programme = prog;
    itinerary = itin ?? [];
  } catch (err) {
    // Expected when running with mock or non-UUID seed IDs
  }

  // Fallback to rich seed data
  if (!programme) {
    programme = SEED_PROGRAMMES.find((p) => p.id === id) || SEED_PROGRAMMES[0];
    itinerary = SEED_ITINERARIES[programme.id] || SEED_ITINERARIES['p1'] || [];
  }

  const effectiveImage =
    programme.image_url ||
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/programmes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all expeditions
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white min-h-[420px] flex items-end">
        <Image
          src={effectiveImage}
          alt={programme.title}
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 p-8 sm:p-12 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider">
              {programme.duration_weeks} Weeks Fieldwork
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
              Ages {programme.age_min}–{programme.age_max}
            </span>
            {programme.destination_name && (
              <span className="inline-flex items-center gap-1 text-xs text-stone-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {programme.destination_name}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            {programme.title}
          </h1>

          {programme.description && (
            <p className="text-stone-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              {programme.description}
            </p>
          )}
        </div>
      </div>

      {/* Key Facts Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div>
          <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">Duration</span>
          <span className="text-lg font-bold font-serif text-stone-900">{programme.duration_weeks} Weeks</span>
          <span className="text-xs text-stone-500 block">Full residential</span>
        </div>

        <div>
          <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">Age Range</span>
          <span className="text-lg font-bold font-serif text-stone-900">{programme.age_min} – {programme.age_max} Years</span>
          <span className="text-xs text-stone-500 block">Peer cohort grouped</span>
        </div>

        <div>
          <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">Dates</span>
          <span className="text-base font-bold font-serif text-stone-900">{formatDateShort(programme.start_date)}</span>
          <span className="text-xs text-stone-500 block">to {formatDateShort(programme.end_date)}</span>
        </div>

        <div>
          <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">Tuition</span>
          <span className="text-xl font-bold font-serif text-stone-900">
            {formatCurrency(programme.price_cents, programme.currency)}
          </span>
          <span className="text-xs text-emerald-700 font-medium block">{programme.availability} Spots Open</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-10">
          {/* Learning Outcomes */}
          <section className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-serif font-bold text-stone-900">Academic & Field Learning Outcomes</h2>
            </div>
            <p className="text-xs text-stone-500">
              Graduates of this expedition earn accredited credit recommendations and build concrete portfolio pieces.
            </p>

            <div className="space-y-3 pt-2">
              {programme.learning_outcomes?.map((outcome: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-800 leading-relaxed font-medium">{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Daily Itinerary */}
          <section className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Course of Study
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900 mt-1">
                Expedition Itinerary & Modules
              </h2>
            </div>

            <div className="space-y-4">
              {itinerary.map((item: any) => (
                <div key={item.id} className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-stone-900 text-amber-300">
                      Day {item.day_number}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">Field Module</span>
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>

                  {Array.isArray(item.activities) && item.activities.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {item.activities.map((act: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 text-[11px] rounded bg-white border border-stone-200 text-stone-600">
                          {act}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Inclusions */}
          <section className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-stone-900">What&apos;s Included in Tuition</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {programme.what_included?.map((inc: string, i: number) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-stone-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Sidebar Action */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 p-8 rounded-2xl bg-white border border-stone-200 shadow-lg space-y-6">
            <div>
              <span className="text-xs text-stone-400 uppercase font-semibold tracking-wider">Tuition Fee</span>
              <div className="text-3xl font-serif font-bold text-stone-900 mt-0.5">
                {formatCurrency(programme.price_cents, programme.currency)}
              </div>
              <p className="text-xs text-stone-500 mt-1">Includes academic instruction, lodging, meals & gear.</p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/register"
                className="w-full py-3.5 px-4 rounded-xl bg-stone-900 text-white text-center font-medium text-sm hover:bg-stone-800 transition-colors shadow flex items-center justify-center gap-2"
              >
                Enroll Your Student
              </Link>
              <Link
                href="/contact"
                className="w-full py-3 px-4 rounded-xl border border-stone-300 text-stone-800 text-center font-medium text-sm hover:bg-stone-50 transition-colors block"
              >
                Request Syllabus & Guidebook
              </Link>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-3 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Safeguarded Student Travel Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Strict 1:6 faculty-to-student pastoral ratio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
