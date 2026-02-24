"use client"

import { mockDiagnostics } from "@/lib/pulse-data"
import Link from "next/link"

export function RecentDiagnostics() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-card-foreground">
          Recent Diagnostics
        </h3>
        <Link
          href="/diagnostics"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {mockDiagnostics.map((dx) => (
          <div
            key={dx.id}
            className="flex items-center gap-4 rounded-lg bg-secondary/50 p-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-xs font-bold text-primary">
                {Math.round(dx.overallConfidence * 100)}%
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {dx.patterns[0].name}
                </p>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                  {dx.patterns[0].category}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {dx.id} | {dx.pulseQualities.map((q) => q.name).join(", ")}
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-xs text-muted-foreground">
                {new Date(dx.timestamp).toISOString().slice(11, 16)}
              </p>
              <p className="text-[10px] text-muted-foreground">{dx.metadata.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
