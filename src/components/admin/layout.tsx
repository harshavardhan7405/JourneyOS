'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Compass,
  MapPin,
  ClipboardList,
  Users,
  Calendar,
  Bell,
  CreditCard,
  Menu,
  X,
  ExternalLink,
  LogOut,
  Shield,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/programmes', label: 'Programmes', icon: Compass },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { href: '/admin/registrations', label: 'Registrations', icon: ClipboardList },
  { href: '/admin/students', label: 'Student Cohorts', icon: Users },
  { href: '/admin/itinerary', label: 'Field Itineraries', icon: Calendar },
  { href: '/admin/announcements', label: 'Dispatches & Alerts', icon: Bell },
  { href: '/admin/payments', label: 'Financial Audits', icon: CreditCard },
];

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 border-r border-stone-200 bg-stone-900 text-stone-300 min-h-screen">
      <div className="p-5 border-b border-stone-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif font-bold text-white text-base leading-tight">
              Journey<span className="text-amber-400 font-sans font-light">OS</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
              Admin Suite
            </div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-stone-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-5 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/portal"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <span>Switch to Portal</span>
          <span className="text-[10px] bg-stone-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">demo</span>
        </Link>
      </div>
    </aside>
  );
}

export function Layout({ children, user }: { children: React.ReactNode; user?: { full_name?: string | null; email?: string | null; role?: string | null } | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-stone-200">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block text-xs text-stone-500 font-medium">
              Expedition Operations Management Console
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center text-xs font-bold font-serif">
                {user?.full_name?.charAt(0) || 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-stone-900 leading-tight">
                  {user?.full_name || 'Admin Officer'}
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  {user?.email || 'admin@journeyos.dev'}
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
        <div className="hidden lg:block shrink-0">
          <AdminSidebar />
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-stone-950/60" onClick={() => setMobileOpen(false)} />
            <div className="relative z-10 w-64 h-full">
              <AdminSidebar onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
