'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  Calendar,
  CreditCard,
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  MapPin,
  FileText,
  ShieldCheck,
  AlertCircle,
  Download,
} from 'lucide-react';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';

interface EnrolledProgramme {
  id: string;
  title: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'pending' | 'action_required';
  paymentStatus: 'paid' | 'partial' | 'pending';
  priceCents: number;
  paidCents: number;
  imageUrl: string;
  leadFaculty: string;
  studentName: string;
}

const mockEnrolled: EnrolledProgramme[] = [
  {
    id: 'p1',
    title: 'STEAM Explorers: Aegean Volcanology & Marine Biosphere',
    destination: 'Santorini Caldera',
    country: 'Greece',
    startDate: '2025-06-01',
    endDate: '2025-07-15',
    status: 'confirmed',
    paymentStatus: 'paid',
    priceCents: 480000,
    paidCents: 480000,
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    leadFaculty: 'Dr. Marcus Sterling',
    studentName: 'Leo Vance (Grade 9)',
  },
  {
    id: 'p3',
    title: 'Innovation Lab: AI, Robotics & Urban Systems',
    destination: 'Tokyo & Tsukuba',
    country: 'Japan',
    startDate: '2025-07-01',
    endDate: '2025-08-25',
    status: 'action_required',
    paymentStatus: 'partial',
    priceCents: 720000,
    paidCents: 360000,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    leadFaculty: 'Dr. Kenji Sato',
    studentName: 'Leo Vance (Grade 9)',
  },
];

const mockAnnouncements = [
  {
    id: 'a1',
    title: 'Mandatory Pre-Departure Orientation Webinar',
    date: 'May 10, 2025',
    category: 'Logistics',
    snippet: 'All enrolled families must attend the live field-safety briefing with Dr. Sterling on Saturday at 14:00 UTC.',
    urgent: true,
  },
  {
    id: 'a2',
    title: 'Santorini Caldera Packing & Field Kit Guide Published',
    date: 'April 28, 2025',
    category: 'Preparation',
    snippet: 'Required footwear specifications, marine journal templates, and solar lab gear checklist are now ready for download.',
    urgent: false,
  },
];

export default function PortalDashboardPage() {
  const [selectedStudent, setSelectedStudent] = useState('Leo Vance (Grade 9)');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Active Summer Expedition Term
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Expedition Portal Dashboard
            </h1>
            <p className="text-stone-300 text-sm max-w-xl">
              Track upcoming academic expeditions, manage student documentation, and view daily field schedules.
            </p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              LV
            </div>
            <div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Viewing Scholar</div>
              <div className="text-xs font-bold text-white">{selectedStudent}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Action Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-stone-900">
              Medical & Dietary Clearance Pending for Tokyo Innovation Lab
            </div>
            <div className="text-xs text-stone-600 mt-0.5">
              Please submit student immunization records and dietary preferences before May 15.
            </div>
          </div>
          <Link
            href="/portal/settings"
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-950 underline shrink-0"
          >
            Submit Documents
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Enrolled Expeditions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">
              Enrolled Field Expeditions
            </h2>
            <p className="text-xs text-stone-500">
              Active programme registrations and travel readiness
            </p>
          </div>
          <Link
            href="/portal/programmes"
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1"
          >
            All Registrations
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockEnrolled.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-stone-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-900/80 text-white backdrop-blur-sm">
                      {item.destination}
                    </span>
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg backdrop-blur-sm ${
                        item.status === 'confirmed'
                          ? 'bg-emerald-600/90 text-white'
                          : 'bg-amber-600/90 text-white'
                      }`}
                    >
                      {item.status === 'confirmed' ? 'Enrolled & Confirmed' : 'Action Required'}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                    {item.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{formatDateShort(item.startDate)} – {formatDateShort(item.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                      <span>Faculty: {item.leadFaculty}</span>
                    </div>
                  </div>

                  {/* Financial Status Summary */}
                  <div className="rounded-xl bg-stone-50 p-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-500">Tuition Paid:</span>{' '}
                      <span className="font-semibold text-stone-900">
                        {formatCurrency(item.paidCents, 'USD')} / {formatCurrency(item.priceCents, 'USD')}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        item.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.paymentStatus === 'paid' ? 'Paid in Full' : '50% Balance Remaining'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-3">
                <Link
                  href="/portal/itinerary"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 hover:text-stone-950"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  View Daily Field Itinerary
                </Link>
                <Link
                  href="/portal/payments"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800"
                >
                  Manage Payment
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispatches & Announcements Feed */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-700" />
            <h2 className="text-base font-serif font-bold text-stone-900">
              Expedition Dispatches & Notices
            </h2>
          </div>
          <Link
            href="/portal/announcements"
            className="text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            View All Dispatches →
          </Link>
        </div>

        <div className="space-y-3">
          {mockAnnouncements.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-stone-100 bg-stone-50 hover:bg-stone-100/60 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.urgent && (
                    <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold uppercase">
                      Urgent
                    </span>
                  )}
                  <span className="text-xs font-bold text-stone-900">{item.title}</span>
                </div>
                <span className="text-[11px] text-stone-500">{item.date}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{item.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
