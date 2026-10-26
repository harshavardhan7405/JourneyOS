'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, Globe, User, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/programmes', label: 'Programmes' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold shadow-md transition-transform group-hover:scale-105">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                Journey<span className="text-amber-600 font-sans font-light">OS</span>
              </span>
              <span className="block text-[10px] tracking-widest uppercase font-semibold text-stone-500">
                Educational Travel
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-amber-700 relative py-1 ${
                    isActive ? 'text-stone-950 font-semibold' : 'text-stone-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-stone-500" />
              Parent & Student Portal
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
              Admin
            </Link>

            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 shadow-sm transition-all hover:shadow"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-950"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium text-stone-800 hover:bg-stone-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-stone-800 bg-stone-100 rounded-lg"
            >
              <User className="w-4 h-4 text-stone-500" />
              Parent & Student Portal
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 text-sm text-stone-600 rounded-lg"
            >
              <ShieldCheck className="w-4 h-4 text-stone-400" />
              Admin Dashboard
            </Link>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-center text-sm font-medium border border-stone-300 rounded-lg text-stone-800"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-center text-sm font-medium bg-stone-900 text-white rounded-lg shadow-sm"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
