import Image from 'next/image';
import Link from 'next/link';
import type { Destination } from '@/db/types';
import { MapPin, ArrowRight } from 'lucide-react';

type DestinationCardProps = {
  destination: Destination;
};

export const DestinationCard = ({ destination }: DestinationCardProps) => {
  const imageUrl =
    destination.image_url ||
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80';

  return (
    <Link href={`/destinations/${destination.id}`} className="group block h-full">
      <div className="flex flex-col h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-56 w-full overflow-hidden bg-stone-100">
          <Image
            src={imageUrl}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent opacity-90" />

          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-stone-900/80 text-white backdrop-blur-sm">
              <MapPin className="w-3 h-3 text-amber-400" />
              {destination.country}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-amber-300 transition-colors">
              {destination.name}
            </h3>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed">
            {destination.description || 'Explore rich experiential learning opportunities in this historic location.'}
          </p>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
            <span>Explore Expeditions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};
