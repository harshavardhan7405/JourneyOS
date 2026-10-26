import Link from 'next/link';
import { Compass, Mail, Phone, MapPin, Shield, Award, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Journey<span className="text-amber-400 font-sans font-light">OS</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Curating immersive, world-class experiential travel programmes for students and parents worldwide. Combining hands-on field research, cultural exchange, and lifelong memories.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                Vetted Leaders
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Accredited Curriculum
              </span>
            </div>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">
              Programmes
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/programmes" className="hover:text-white transition-colors">
                  All Programmes
                </Link>
              </li>
              <li>
                <Link href="/programmes?durationMin=4" className="hover:text-white transition-colors">
                  Summer Expeditions
                </Link>
              </li>
              <li>
                <Link href="/programmes?ageMin=14" className="hover:text-white transition-colors">
                  High School STEAM
                </Link>
              </li>
              <li>
                <Link href="/programmes?ageMax=12" className="hover:text-white transition-colors">
                  Junior Explorers
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Santorini, Greece
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Tokyo, Japan
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Reykjavik, Iceland
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Bali, Indonesia
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Marrakech, Morocco
                </Link>
              </li>
            </ul>
          </div>

          {/* Portal & Support */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">
              Portals & Help
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/portal" className="hover:text-white transition-colors">
                  Parent / Student Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Staff Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About JourneyOS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-800 text-xs text-stone-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} JourneyOS Platform. Independent portfolio engineering demonstration.
          </p>
          <p className="text-center md:text-right text-[11px] text-stone-500">
            Crafted with Next.js App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL, and Razorpay test abstraction.
          </p>
        </div>
      </div>
    </footer>
  );
}
