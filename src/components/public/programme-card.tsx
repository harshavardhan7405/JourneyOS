import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { formatDateShort, formatCurrency } from '@/lib/utils/format';
import type { Programme } from '@/db/types';
import { Calendar, Users, Clock, ArrowUpRight } from 'lucide-react';

type ProgrammeCardProps = {
  programme: Programme;
  imageUrl?: string | null;
};

export const ProgrammeCard = ({ programme, imageUrl }: ProgrammeCardProps) => {
  const destName = programme.destination_name ?? 'International Field Site';
  const effectiveImage = imageUrl || programme.image_url || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80';

  return (
    <Link href={`/programmes/${programme.id}`} className="group block h-full">
      <div className="flex flex-col h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Card Imagery */}
        <div className="relative h-52 w-full overflow-hidden bg-stone-100">
          <Image
            src={effectiveImage}
            alt={programme.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Badges on image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/95 text-stone-900 shadow-sm backdrop-blur-sm">
              {programme.duration_weeks} Weeks
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-stone-900/80 text-amber-300 shadow-sm backdrop-blur-sm">
              Ages {programme.age_min}–{programme.age_max}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-xs font-medium text-amber-300 uppercase tracking-wider block">
              {destName}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
              {programme.title}
            </h3>

            {programme.description && (
              <p className="mt-2 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                {programme.description}
              </p>
            )}

            {/* Quick Metadata */}
            <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{formatDateShort(programme.start_date)}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-emerald-700 font-medium">{programme.availability} Seats Left</span>
              </div>
            </div>
          </div>

          {/* Tuition & Link */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-stone-400 block uppercase tracking-wider font-semibold">Tuition</span>
              <span className="text-lg font-bold font-serif text-stone-900">
                {formatCurrency(programme.price_cents, programme.currency)}
              </span>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
              Details
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProgrammeListSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 animate-pulse space-y-4">
        <div className="h-48 w-full bg-stone-100 rounded-xl" />
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-stone-200 rounded" />
          <div className="h-3 w-full bg-stone-100 rounded" />
        </div>
      </div>
    ))}
  </div>
);
