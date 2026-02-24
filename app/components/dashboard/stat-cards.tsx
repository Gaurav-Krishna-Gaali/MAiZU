"use client"

import { Activity, Brain, FileCheck, Waves } from "lucide-react"

const stats = [
  {
    label: "Waveforms Processed",
    value: "1,247",
    change: "+12.3%",
    icon: Waves,
    trend: "up" as const,
  },
  {
    label: "Patterns Identified",
    value: "892",
    change: "+8.7%",
    icon: Brain,
    trend: "up" as const,
  },
  {
    label: "Avg Confidence",
    value: "82.4%",
    change: "+2.1%",
    icon: Activity,
    trend: "up" as const,
  },
  {
    label: "Diagnostics Completed",
    value: "634",
    change: "+15.6%",
    icon: FileCheck,
    trend: "up" as const,
  },
]

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <p className="text-2xl font-semibold text-card-foreground">{stat.value}</p>
            <span className="mb-0.5 text-xs font-medium text-success">
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
