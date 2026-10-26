'use client';

import { useState } from 'react';
import TripItinerary from '@/components/portal/trip-itinerary';
import { Compass, Calendar } from 'lucide-react';

const programmeOptions = [
  { id: 'p1', title: 'STEAM Explorers: Santorini Caldera (Greece)' },
  { id: 'p2', title: 'Earth & Ice: Reykjavik Glaciology (Iceland)' },
  { id: 'p3', title: 'Innovation Lab: Humanoid Robotics (Tokyo, Japan)' },
  { id: 'p4', title: 'Reef Rangers: Coral Restoration (Bali, Indonesia)' },
  { id: 'p5', title: 'Silk & Spice: Desert Astronomy (Marrakech, Morocco)' },
];

export default function ItineraryPage() {
  const [programmeId, setProgrammeId] = useState('p1');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Field Schedules & Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Expedition Day-by-Day Itinerary
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Review detailed daily field protocols, transit coordinates, and academic objectives.
          </p>
        </div>

        <div className="w-full sm:w-80">
          <label htmlFor="programme" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Select Expedition Cohort
          </label>
          <select
            id="programme"
            value={programmeId}
            onChange={(e) => setProgrammeId(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-medium text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 shadow-xs"
          >
            {programmeOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TripItinerary programmeId={programmeId} />
    </div>
  );
}
