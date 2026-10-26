import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui';
import type { Programme, Destination } from '@/db/types';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';
import { Compass, BookOpen, Shield, Users, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'JourneyOS — Curated Educational Travel Experiences',
  description: 'Explore accredited international educational expeditions. Blending hands-on STEAM research, cultural immersion, and student leadership worldwide.',
};

const destinations: (Destination & { highlights: string })[] = [
  {
    id: 'd1',
    name: 'Santorini Caldera',
    country: 'Greece',
    description: 'Volcanology, marine biology, and renewable energy research along the Aegean coastline.',
    image_url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    highlights: 'Volcanology & Marine Fieldwork',
  },
  {
    id: 'd2',
    name: 'Tokyo & Tsukuba',
    country: 'Japan',
    description: 'Robotics labs, bullet-train civil engineering, and sustainable megacity urban planning.',
    image_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    highlights: 'Robotics & Future Tech',
  },
  {
    id: 'd3',
    name: 'Reykjavik Geopark',
    country: 'Iceland',
    description: 'Glacial geology, geothermal power grids, and climate crisis mitigation studies.',
    image_url: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
    highlights: 'Geothermal Energy & Climate Science',
  },
  {
    id: 'd4',
    name: 'Bali Marine Reserve',
    country: 'Indonesia',
    description: 'Coral reef restoration, agro-forestry, and indigenous sustainability practices.',
    image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    highlights: 'Reef Ecology & Permaculture',
  },
  {
    id: 'd5',
    name: 'Marrakech & Atlas',
    country: 'Morocco',
    description: 'Historic architecture, ancient trade economies, and desert ecological adaptations.',
    image_url: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=800&q=80',
    highlights: 'Cultural Heritage & Berber Astronomy',
  },
];

const featuredProgrammes: Programme[] = [
  {
    id: 'p1',
    title: 'STEAM Explorers: Aegean Volcanology & Marine Biosphere',
    destination_id: 'd1',
    destination_name: 'Santorini, Greece',
    duration_weeks: 6,
    age_min: 10,
    age_max: 14,
    price_cents: 480000,
    currency: 'USD',
    availability: 12,
    start_date: '2025-06-01',
    end_date: '2025-07-15',
    image_url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    learning_outcomes: ['Volcanic soil chemistry', 'Mediterranean reef mapping', 'Documentary storytelling'],
  },
  {
    id: 'p2',
    title: 'Earth & Ice: Glaciology & Clean Tech Expedition',
    destination_id: 'd3',
    destination_name: 'Reykjavik, Iceland',
    duration_weeks: 4,
    age_min: 12,
    age_max: 16,
    price_cents: 360000,
    currency: 'EUR',
    availability: 18,
    start_date: '2025-06-15',
    end_date: '2025-07-15',
    image_url: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
    learning_outcomes: ['Geothermal thermodynamics', 'Carbon sequestration sampling', 'Glacial core analysis'],
  },
  {
    id: 'p3',
    title: 'Innovation Lab: AI, Robotics & Urban Systems',
    destination_id: 'd2',
    destination_name: 'Tokyo, Japan',
    duration_weeks: 8,
    age_min: 14,
    age_max: 18,
    price_cents: 720000,
    currency: 'USD',
    availability: 8,
    start_date: '2025-07-01',
    end_date: '2025-08-25',
    image_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    learning_outcomes: ['Autonomous robotics prototyping', 'Transit systems engineering', 'Ethical AI design'],
  },
];

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Editorial Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden border-b border-stone-200 bg-stone-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Summer & Fall 2025 Admissions Open
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15]">
                Where the World Becomes the <span className="italic text-amber-700">Classroom</span>.
              </h1>

              <p className="text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed">
                JourneyOS brings together parents, students, and academic leaders for accredited, field-based educational travel programmes designed to ignite curiosity and foster lifelong resilience.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/programmes"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 text-white font-medium text-base hover:bg-stone-800 transition-all shadow-md hover:shadow-lg"
                >
                  Explore Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-800 font-medium text-base hover:bg-stone-50 transition-colors shadow-sm"
                >
                  Parent Portal Demo
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold font-serif text-stone-900">100%</div>
                  <div className="text-xs text-stone-500 font-medium">Vetted Faculty & Guides</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-stone-900">1 : 6</div>
                  <div className="text-xs text-stone-500 font-medium">Leader-to-Student Ratio</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-stone-900">35+</div>
                  <div className="text-xs text-stone-500 font-medium">Experiential Field Modules</div>
                </div>
              </div>
            </div>

            {/* Hero Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85"
                  alt="Students exploring Tokyo urban science"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Featured Laboratory
                  </span>
                  <h3 className="font-serif text-xl font-bold">Innovation Lab • Tokyo & Tsukuba</h3>
                  <p className="text-xs text-stone-300">Robotics, transit systems, and artificial intelligence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
              Field Sites
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
              Curated World Destinations
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Hand-selected environments offering unmatched hands-on research and cultural depth.
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1 text-sm font-semibold text-stone-900 hover:text-amber-700 transition-colors"
          >
            View all 5 locations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.id}`}
              className="group flex flex-col rounded-xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                <Image
                  src={dest.image_url!}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-stone-900/80 text-white rounded backdrop-blur-sm">
                    {dest.country}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-medium text-amber-800">
                  {dest.highlights}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Programmes Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
              Curriculum
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
              Featured Flagship Expeditions
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Rigorous academic learning outcomes, structured safety protocols, and lifelong peers.
            </p>
          </div>
          <Link
            href="/programmes"
            className="inline-flex items-center gap-1 text-sm font-semibold text-stone-900 hover:text-amber-700 transition-colors"
          >
            Browse all programmes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProgrammes.map((prog) => (
            <div
              key={prog.id}
              className="flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <Image
                  src={prog.image_url!}
                  alt={prog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/95 text-stone-900 shadow">
                    {prog.duration_weeks} Weeks
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-stone-900/90 text-amber-300 shadow">
                    Ages {prog.age_min}–{prog.age_max}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                    {prog.destination_name}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mt-1 line-clamp-2">
                    {prog.title}
                  </h3>

                  <div className="mt-4 space-y-1.5">
                    <p className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Core Outcomes:</p>
                    {prog.learning_outcomes?.map((outcome, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block">Tuition</span>
                    <span className="text-xl font-bold font-serif text-stone-900">
                      {formatCurrency(prog.price_cents, prog.currency)}
                    </span>
                  </div>

                  <Link
                    href={`/programmes/${prog.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Accreditation Pillar */}
      <section className="bg-stone-900 text-white py-20 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Our Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              Uncompromising Safety, Proven Academic Rigour
            </h2>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Every JourneyOS expedition adheres to strict international safeguarding, risk management, and verified student-to-leader ratios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-stone-800/80 border border-stone-700 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">24/7 Monitored Support</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Dedicated incident command teams, satellite communication in remote terrains, and verified local medical partnerships.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-stone-800/80 border border-stone-700 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Accredited Field Curriculum</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Curriculums mapped to international educational benchmarks, ensuring meaningful academic progression and portfolio work.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-stone-800/80 border border-stone-700 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Real-Time Parent Portal</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Parents track flight itineraries, daily activity logs, faculty announcements, and secure payments in one unified dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-amber-600/10 border border-amber-300 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Ready to Begin the Journey?
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover upcoming term programmes, compare destinations, or enroll your student today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3.5 rounded-xl bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-colors shadow-md"
            >
              Create Parent Account
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-800 font-medium text-sm hover:bg-stone-50 transition-colors"
            >
              Speak to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
