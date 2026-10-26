'use client';

import { useEffect, useState } from 'react';
import { Calendar, Compass, Clock, CheckCircle2 } from 'lucide-react';
import { SEED_ITINERARIES, SEED_PROGRAMMES } from '@/lib/data/seed-data';

export default function AdminItineraryPage() {
  const [selectedProg, setSelectedProg] = useState('p1');

  const items = SEED_ITINERARIES[selectedProg] || [];
  const prog = SEED_PROGRAMMES.find((p) => p.id === selectedProg);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Fieldwork Itineraries
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Itinerary Schedule Administration
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Manage daily schedule chronologies, research field modules, and student risk assessments.
          </p>
        </div>

        <div className="w-full sm:w-80">
          <select
            value={selectedProg}
            onChange={(e) => setSelectedProg(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-medium text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 shadow-xs"
          >
            {SEED_PROGRAMMES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-5 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
              {prog?.destination_name}
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">{prog?.title}</h3>
          </div>
          <span className="text-xs font-medium text-stone-500">
            {items.length} Fieldwork Days Configured
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {items.map((item) => (
            <div key={item.id} className="p-6 space-y-3 hover:bg-stone-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                    {item.day_number}
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                    Day {item.day_number}: {item.title}
                  </h4>
                </div>
                <span className="text-xs text-stone-400">08:30 – 17:30</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed pl-11">
                {item.description}
              </p>

              {item.activities && item.activities.length > 0 && (
                <div className="pl-11 flex flex-wrap gap-2 pt-1">
                  {item.activities.map((act: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium"
                    >
                      • {act}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
