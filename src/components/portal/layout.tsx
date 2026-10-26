'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Compass,
  LayoutDashboard,
  Calendar,
  Bell,
  CreditCard,
  User,
  Settings,
  Shield,
  Menu,
  X,
  LogOut,
  FolderOpen,
  CheckCircle,
} from 'lucide-react';

type LayoutProps = { user?: { full_name?: string | null; email?: string | null; role?: string | null } | null; children?: React.ReactNode };

export function Sidebar({ user, onClose }: { user?: { full_name?: string | null; email?: string | null; role?: string | null } | null; onClose?: () => void }) {
  const pathname = usePathname();
  const navItems = [
    { href: '/portal', label: 'Student Dashboard', icon: LayoutDashboard },
    { href: '/portal/programmes', label: 'My Expeditions', icon: Compass },
    { href: '/portal/itinerary', label: 'Field Itinerary', icon: Calendar },
    { href: '/portal/announcements', label: 'Announcements & Briefs', icon: Bell },
    { href: '/portal/registrations', label: 'Enrollment Records', icon: FolderOpen },
    { href: '/portal/payments', label: 'Payment Receipts', icon: CreditCard },
    ...(user?.role === 'admin'
      ? [{ href: '/admin', label: 'Admin Console', icon: Shield }]
      : []),
    { href: '/portal/settings', label: 'Guardian & Student Settings', icon: Settings },
  ];

  return (
    <aside className="flex flex-col w-64 border-r border-stone-200 bg-white min-h-screen">
      <div className="p-5 border-b border-stone-200 flex items-center justify-between">
        <Link href="/portal" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif font-bold text-stone-900 text-base leading-tight">
              Journey<span className="text-amber-600 font-sans font-light">OS</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
              Family & Scholar Portal
            </div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-stone-400 hover:text-stone-900 p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-5 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/portal' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-100/70 text-amber-900 border border-amber-300 font-bold shadow-xs'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-stone-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-200 space-y-2">
        <Link
          href="/programmes"
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <span>Browse Catalogue</span>
          <Compass className="w-3.5 h-3.5 text-stone-400" />
        </Link>
      </div>
    </aside>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white py-4 px-6 text-center text-xs text-stone-500">
      &copy; {new Date().getFullYear()} JourneyOS. All rights reserved. Portfolio demonstration.
    </footer>
  );
}

export function Layout({ user, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50/60 flex flex-col">
      {/* Top bar */}
      <header className="border-b border-stone-200 bg-white sticky top-0 z-30">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-stone-500">
              Scholar & Guardian Hub
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold font-serif border border-amber-200">
                {user?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-stone-900 leading-tight">
                  {user?.full_name ?? 'User'}
                </div>
                <div className="text-[10px] text-stone-500 font-mono capitalize">
                  {user?.role ?? 'Participant'}
                </div>
              </div>
            </div>

            <Link
              href="/sign-out"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-red-700 hover:bg-red-50 border border-stone-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block shrink-0">
          <Sidebar user={user} />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-stone-950/50" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10 w-64 h-full">
              <Sidebar user={user} onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
