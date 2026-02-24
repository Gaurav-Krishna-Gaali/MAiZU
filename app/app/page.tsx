"use client"

import { AppHeader } from "@/components/mai/app-header"
import { WelcomeCard } from "@/components/mai/welcome-card"
import { PulseInterpretation } from "@/components/mai/pulse-interpretation"
import { DailyDao } from "@/components/mai/daily-dao"
import { HealthTrendSnippet } from "@/components/mai/health-trend-snippet"
import { DailyBalanceOverview } from "@/components/mai/daily-balance-overview"
import { VitalPatterns } from "@/components/mai/vital-patterns"
import { MenstruationCalendar } from "@/components/mai/menstruation-calendar"
import { BottomNav } from "@/components/mai/bottom-nav"

export default function MaiSyncApp() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Desktop sidebar-style top nav */}
      <header className="sticky top-0 z-40 border-b border-[#e1e3e8] bg-[#ffffff]/90 backdrop-blur-md lg:static">
        <div className="mx-auto max-w-6xl px-4 py-3 lg:px-8">
          <AppHeader />
        </div>
      </header>

      {/* Main scrollable content */}
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 lg:px-8 lg:pb-12">
        {/* Top row: Welcome + Pulse side by side on desktop */}
        <div className="grid gap-6 lg:grid-cols-2">
          <WelcomeCard />
          <PulseInterpretation />
        </div>

        {/* Daily Dao */}
        <div className="mt-8">
          <DailyDao />
        </div>

        {/* Health Trend + Balance side by side on desktop */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <HealthTrendSnippet />
          <DailyBalanceOverview />
        </div>

        {/* Vital Patterns + Calendar side by side on desktop */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <VitalPatterns />
          <MenstruationCalendar />
        </div>
      </main>

      {/* Bottom nav: mobile only */}
      <BottomNav />
    </div>
  )
}
