import Link from 'next/link';
import { Compass, ArrowRight, BookOpen, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found — JourneyOS',
  description: 'The requested expedition or platform page could not be located.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-xl w-full text-center space-y-8 bg-white p-10 sm:p-12 rounded-3xl border border-stone-200 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Navigation Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Uncharted Territory
          </h1>
          <p className="text-stone-600 text-sm leading-relaxed max-w-md mx-auto">
            The coordinate or programme page you are searching for does not exist or has been relocated to another field station.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors shadow-md"
          >
            Return to Homepage
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/programmes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm font-semibold hover:bg-stone-50 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-stone-500" />
            Explore Programmes
          </Link>
        </div>
      </div>
    </div>
  );
}
