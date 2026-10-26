'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Globe, Compass, ArrowRight } from 'lucide-react';
import { SEED_DESTINATIONS } from '@/lib/data/seed-data';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>(SEED_DESTINATIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/destinations?page=1&limit=100')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setDestinations(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Global Fieldwork Sites
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Destination Management
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Geographic field stations, international partner accommodations, and permit approvals.
          </p>
        </div>

        <Link
          href="/destinations"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors shadow-xs"
        >
          View Public Directory
          <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-stone-100">
                <Image
                  src={d.image_url}
                  alt={d.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-900/80 text-white backdrop-blur-sm">
                    {d.country}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  {d.region ?? 'Field Station'}
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {d.name}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {d.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Best Season: {d.best_season ?? 'Summer'}</span>
              <Link
                href={`/destinations/${d.id}`}
                target="_blank"
                className="font-semibold text-stone-900 hover:text-amber-700"
              >
                Inspect Station →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
