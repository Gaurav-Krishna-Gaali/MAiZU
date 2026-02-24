"use client"

import type { PulseQuality } from "@/lib/pulse-data"
import { Loader2 } from "lucide-react"

interface PulseQualityPanelProps {
  qualities: PulseQuality[]
  isAnalyzing: boolean
  analysisComplete: boolean
}

export function PulseQualityPanel({ qualities, isAnalyzing, analysisComplete }: PulseQualityPanelProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">
        Detected Pulse Qualities
      </h3>

      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-3 text-sm text-muted-foreground">Extracting features...</p>
          <p className="mt-1 text-xs text-muted-foreground">Using Claude 3.5 Sonnet</p>
        </div>
      ) : analysisComplete ? (
        <div className="flex flex-col gap-4">
          {qualities.map((quality) => (
            <div key={quality.name} className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-card-foreground">{quality.name}</p>
                <span className="text-xs font-semibold text-primary">
                  {Math.round(quality.confidence * 100)}%
                </span>
              </div>

              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {quality.description}
              </p>

              {/* Confidence bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${quality.confidence * 100}%` }}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {quality.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Select a pulse type and run analysis
          </p>
        </div>
      )}
    </div>
  )
}
