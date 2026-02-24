"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { AppHeader } from "@/components/mai/app-header"
import { WelcomeCard } from "@/components/mai/welcome-card"
import { PulseInterpretation } from "@/components/mai/pulse-interpretation"
import { DailyDao } from "@/components/mai/daily-dao"
import { HealthTrendSnippet } from "@/components/mai/health-trend-snippet"
import { DailyBalanceOverview } from "@/components/mai/daily-balance-overview"
import { VitalPatterns } from "@/components/mai/vital-patterns"
import { MenstruationCalendar } from "@/components/mai/menstruation-calendar"
import { BottomNav } from "@/components/mai/bottom-nav"
import { UploadZone } from "@/components/upload/upload-zone"
import { AnalysisSummary } from "@/components/upload/analysis-summary"

export default function MaiSyncApp() {
  const [analysisData, setAnalysisData] = useState<any>(null)

  // derive a pseudo‑user object from analysisData when available
  const user = { name: "", advice: "", score: 0 } as {
    name: string
    advice: string
    score: number
  }
  if (analysisData) {
    const pattern = analysisData.diagnosis?.primary?.pattern
    if (pattern) {
      user.advice = `Primary: ${pattern}`
    }
    if (analysisData.organ_scores) {
      const vals = Object.values(analysisData.organ_scores) as number[]
      if (vals.length) {
        user.score = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
      }
    }
  }

  const hasAnalysis = !!analysisData

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
        {/* Upload area */}
        <div className="mb-8">
          <UploadZone onResult={setAnalysisData} showRaw={false} />
          {analysisData && <AnalysisSummary data={analysisData} />}
        </div>

        <div
          className={cn(
            "space-y-8 transition-all duration-500",
            !hasAnalysis && "opacity-60 grayscale"
          )}
        >
          {/* Top row: Welcome + Pulse side by side on desktop */}
          <div className="grid gap-6 lg:grid-cols-2">
            <WelcomeCard
              username={user.name}
              advice={user.advice}
              score={user.score}
            />
            <PulseInterpretation analysisData={analysisData} />
          </div>

          {/* Daily Dao */}
          <div className="mt-0">
            <DailyDao analysisData={analysisData} />
          </div>

          {/* Health Trend + Balance side by side on desktop */}
          <div className="grid gap-8 lg:grid-cols-2">
            <HealthTrendSnippet analysisData={analysisData} />
            <DailyBalanceOverview />
          </div>

          {/* Vital Patterns + Calendar side by side on desktop */}
          <div className="grid gap-8 lg:grid-cols-2">
            <VitalPatterns analysisData={analysisData} />
            <MenstruationCalendar />
          </div>
        </div>
      </main>

      {/* Bottom nav: mobile only */}
      <BottomNav />
    </div>
  )
}
