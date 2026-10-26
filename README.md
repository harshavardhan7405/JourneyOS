# JourneyOS — Educational Travel & Fieldwork Management Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Vitest-65%2F65%20Passed-success.svg)](https://vitest.dev/)
[![Status](https://img.shields.io/badge/Deployment-Ready-brightgreen.svg)]()

> **Notice**: JourneyOS is an independent portfolio demonstration project engineered to showcase modern full-stack web and application architecture (Next.js 16 App Router, TypeScript strict mode, Supabase SSR, PostgreSQL schema design, resilient API handlers, and Razorpay test-mode payment workflows).

---

## 🌟 Executive Summary & Surfaces

JourneyOS provides an end-to-end expedition and curriculum management platform across three dedicated user surfaces:

### 1. 🌍 Public Programme Discovery & Booking (`/`)
- **Editorial Experience**: High-impact luxury design with interactive expedition showcases, learning outcomes, and expedition gear guides.
- **Dynamic Search & Multi-Param Filtering**: Real-time filtering by age, duration, academic discipline, and destination with URL state sync.
- **Detailed Expedition Curricula (`/programmes/[id]`)**: Day-by-day fieldwork breakdowns, faculty profiles, learning outcomes, safety protocols, and direct checkout CTA.

### 2. 🎒 Scholar & Family Portal (`/portal`)
- **Executive Command Dashboard**: Active expedition readiness indicators, briefing notes, and urgent dispatch alerts.
- **Live Fieldwork Itinerary (`/portal/itinerary`)**: Interactive day-by-day expedition timeline with location coordinates, learning objectives, and logistics.
- **Registration Records & Payment Receipts (`/portal/registrations`, `/portal/payments`)**: Downloadable receipt generator, transaction IDs, payment status badges, and balance breakdown.
- **Official Dispatches (`/portal/announcements`)**: Filter dispatches by urgency (`critical`, `update`, `info`) with acknowledged status tracking.
- **Scholar & Emergency Settings (`/portal/settings`)**: Guardian profiles, dietary restrictions, emergency contact details, and medical clearances.

### 3. 🛡️ Operations & Executive Admin Suite (`/admin`)
- **Operational KPIs (`/admin`)**: Real-time metrics including total revenue, confirmed expeditions, pending reviews, active scholars, and cohort capacity utilization.
- **Expedition & Destination Management (`/admin/programmes`, `/admin/destinations`)**: Programme editor, capacity controls, destination manager, and expedition creation flow.
- **Scholar Cohort Roster (`/admin/students`)**: Searchable student directory with guardian emergency numbers and medical notes.
- **Dispatch Center (`/admin/announcements`)**: Real-time dispatch composer to broadcast urgent fieldwork announcements to parents and scholars.
- **Audit Ledger & Reconciliation (`/admin/payments`)**: Searchable payment log with transaction IDs, amounts, timestamps, and settlement status.

---

## 🔑 Demo Access Credentials (for Interviews)

JourneyOS includes instantaneous role-switching and pre-configured demo personas:

| Role | Demo Email | Access Permissions |
| :--- | :--- | :--- |
| **Scholar / Parent** | `parent@journeyos.internal` | Scholar Portal (`/portal`), Itinerary, Payment Receipts, Profile Settings |
| **Operations Admin** | `admin@journeyos.internal` | Full Admin Operations Suite (`/admin`), Programme & Student Management, Financial Ledger |

*Tip: You can use the quick switch buttons on the `/auth/signin` page to toggle personas instantly during live demonstrations.*

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [Next.js 16.4.3](https://nextjs.org/) (App Router, React 19 Server Components, Streaming SSR)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) configured in strict mode
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with editorial luxury typography and responsive mobile layouts
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL schema, Row Level Security policies, `@supabase/ssr` server cookie client)
- **Offline / Degraded-Mode Fallback**: Comprehensive in-memory seed architecture ensures the application remains **100% interactive and functional** even without active cloud credentials
- **Validation**: [Zod](https://zod.dev/) runtime schema validation for query params, registrations, and payment requests
- **Automated Testing**: [Vitest](https://vitest.dev/) suite with 65 unit and integration tests

---

## 🧪 Automated Test Suite

JourneyOS features an automated test suite verifying formatting, runtime schemas, API contracts, error boundaries, and payment reconciliation:

```bash
npm run test
# or
npx vitest run
```

```text
 ✓ src/tests/unit/format.test.ts (14 tests)
 ✓ src/tests/integration/api-responses.test.ts (6 tests)
 ✓ src/tests/unit/validations.test.ts (24 tests)
 ✓ src/tests/unit/errors.test.ts (7 tests)
 ✓ src/tests/unit/payments.test.ts (14 tests)

 Test Files  5 passed (5)
      Tests  65 passed (65)
```

---

## 🚀 One-Click Deployment Guide

### Option 1: Deploy to Vercel via GitHub (Recommended)

1. **Initialize & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete JourneyOS platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/journeyos.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Visit [vercel.com/new](https://vercel.com/new).
   - Select your `journeyos` repository.
   - Leave default build settings (`Framework Preset: Next.js`).
   - Click **Deploy**.

3. **Production URL Ready**:
   - Vercel automatically compiles the production build and provides your live URL (`https://journeyos-xxx.vercel.app`).
   - The platform will immediately run in zero-config demo mode with all 26 routes, filters, search, portal, and admin suites active!

---

## 📦 Local Development

1. Clone or navigate to the repository:
   ```bash
   cd journeyos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
MIT License. Created for technical demonstration and portfolio evaluation.
