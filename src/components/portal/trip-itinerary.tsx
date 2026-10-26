'use client';

import { useEffect, useState } from 'react';
import { Calendar, MapPin, CheckCircle2, Clock, ShieldCheck, Compass } from 'lucide-react';
import { SEED_ITINERARIES, SEED_PROGRAMMES } from '@/lib/data/seed-data';

interface Props {
  programmeId: string | null;
}

export default function TripItinerary({ programmeId }: Props) {
  const activeId = programmeId || 'p1';
  const initialItems = SEED_ITINERARIES[activeId] || SEED_ITINERARIES.p1;
  const [items, setItems] = useState<any[]>(initialItems);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!programmeId) return;
    let isCancelled = false;

    fetch(`/api/programmes/${programmeId}`)
      .then((r) => r.json())
      .then((data) => {
        if (isCancelled) return;
        if (data?.data?.itinerary && data.data.itinerary.length > 0) {
          setItems(data.data.itinerary);
        } else {
          setItems(SEED_ITINERARIES[programmeId] || []);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setItems(SEED_ITINERARIES[programmeId] || []);
        }
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [programmeId]);

  const prog = SEED_PROGRAMMES.find((p) => p.id === activeId);

  return (
    <div className="space-y-6">
      {prog && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
              {prog.destination_name}
            </span>
            <h3 className="font-serif font-bold text-lg text-stone-900">{prog.title}</h3>
            <p className="text-xs text-stone-500 max-w-xl">{prog.description}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-[11px] text-stone-400 block uppercase">Duration</span>
              <span className="text-sm font-bold text-stone-900">{prog.duration_weeks} Weeks</span>
            </div>
            <div className="h-8 w-px bg-stone-200" />
            <div className="text-right">
              <span className="text-[11px] text-stone-400 block uppercase">Ages</span>
              <span className="text-sm font-bold text-stone-900">{prog.age_min}–{prog.age_max} yrs</span>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="py-8 text-center text-xs text-stone-500 animate-pulse">
          Refreshing itinerary schedule...
        </div>
      )}

      <div className="space-y-4">
        {items.map((item: any, idx: number) => (
          <div
            key={item.id ?? idx}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                  {item.day_number}
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900">
                  {item.title}
                </h4>
              </div>
              <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                08:30 – 17:30 Daily Schedule
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {item.description}
            </p>

            {Array.isArray(item.activities) && item.activities.length > 0 && (
              <div className="bg-stone-50 rounded-xl p-3.5 space-y-2">
                <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                  Fieldwork Modules & Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {item.activities.map((act: string, aIdx: number) => (
                    <div key={aIdx} className="flex items-start gap-1.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
