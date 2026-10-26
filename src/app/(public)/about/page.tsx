import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Users, Compass, Globe2, Sparkles, ArrowRight, Award } from 'lucide-react';

export const metadata = {
  title: 'About JourneyOS — Pedagogy, Safety & Global Fieldwork',
  description: 'Discover how JourneyOS connects students, parents, and educators with accredited, field-based educational travel programmes worldwide.',
};

export default function AboutPage() {
  const pillars = [
    {
      icon: BookOpen,
      title: 'Accredited Experiential Curricula',
      description: 'Every programme is co-designed with university researchers and certified educators to deliver measurable academic learning outcomes aligned with international baccalaureate and AP standards.',
    },
    {
      icon: ShieldCheck,
      title: 'Uncompromising Field Safety',
      description: 'We maintain a 1:6 faculty-to-student ratio, 24/7 medical telemetry coordination, comprehensive evacuation coverage, and rigorous local vetting protocols across every expedition.',
    },
    {
      icon: Globe2,
      title: 'Global Cultural Reciprocity',
      description: 'We practice regenerative travel: students participate directly in marine conservation, clean energy audits, and local heritage preservation initiatives alongside resident communities.',
    },
    {
      icon: Award,
      title: 'Portfolio & Capstone Defense',
      description: 'Students finish each expedition having published real scientific field logs, digital portfolios, or technological prototypes that strengthen university admissions and lifelong leadership.',
    },
  ];

  const faculty = [
    {
      name: 'Dr. Marcus Sterling',
      role: 'Director of Field Academics & Geology',
      bio: 'Former Cambridge volcanic research fellow with 14 years leading youth field research in the Mediterranean and Iceland.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Elena Rostova, M.Ed.',
      role: 'Dean of Student Welfare & Logistics',
      bio: 'Specialist in adolescent pastoral care and experiential outdoor leadership with accreditation from Wilderness Medical Institute.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Kenji Sato, Ph.D.',
      role: 'Lead Mentor — AI & Urban Infrastructure',
      bio: 'Robotics engineer and visiting lecturer in Tsukuba Science City specializing in autonomous systems and sustainable transit design.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Editorial Hero */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Our Educational Mission
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.15]">
              Transforming the World’s Greatest Environments into <span className="italic text-amber-400">Living Classrooms</span>.
            </h1>
            <p className="text-lg sm:text-xl text-stone-300 leading-relaxed">
              JourneyOS is an independent educational travel management platform built to bridge the gap between classroom theory and real-world planetary challenges. We empower young scholars through supervised scientific, technological, and cultural expeditions.
            </p>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1000&q=80"
            alt="Field research landscape"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Core Pedagogical Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Guiding Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Education Built on Rigor, Safety, and Purpose
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            Every expedition is crafted to ensure students return with sharpened analytical minds, emotional self-reliance, and an expanded worldview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {pillar.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Faculty & Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
              Field Mentorship
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
              Led by Renowned Educators & Scientists
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Experienced researchers who prioritize mentorship, rigorous inquiry, and student welfare.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faculty.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {member.name}
                </h3>
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
                  {member.role}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Protocol Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-stone-100 border border-stone-200 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">
                Risk Management Protocol
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Safety Is the Foundation of Great Exploration
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Parents entrust us with what matters most. That is why JourneyOS equips each expedition team with redundant satellite communications, certified wilderness first responders, vetted local transport partners, and comprehensive real-time check-in updates for families back home.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors shadow-md text-sm text-center"
              >
                Schedule an Advisory Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programmes"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-800 font-medium hover:bg-stone-50 transition-colors text-sm text-center"
              >
                Browse Current Expeditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
