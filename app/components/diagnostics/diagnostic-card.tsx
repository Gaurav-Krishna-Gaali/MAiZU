"use client"

import type { DiagnosticSnapshot } from "@/lib/pulse-data"
import { cn } from "@/lib/utils"

interface DiagnosticCardProps {
  diagnostic: DiagnosticSnapshot
  isSelected: boolean
  onClick: () => void
}

export function DiagnosticCard({ diagnostic, isSelected, onClick }: DiagnosticCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition-all",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-primary/30"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">{diagnostic.id}</span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
            diagnostic.overallConfidence >= 0.8
              ? "bg-success/10 text-success"
              : diagnostic.overallConfidence >= 0.7
              ? "bg-warning/10 text-warning"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {Math.round(diagnostic.overallConfidence * 100)}%
        </span>
      </div>

      <p className="mt-2 text-sm font-medium text-card-foreground">
        {diagnostic.patterns[0].name}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {diagnostic.pulseQualities.map((q) => q.name).join(" + ")}
      </p>

      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{diagnostic.metadata.position}</span>
        <span>
          {new Date(diagnostic.timestamp).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </button>
  )
}
