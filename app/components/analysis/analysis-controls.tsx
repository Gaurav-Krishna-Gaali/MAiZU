"use client"

import { Loader2, Play } from "lucide-react"
import { cn } from "@/lib/utils"

type PulseType = "wiry" | "slippery" | "thready" | "rapid" | "normal"

const pulseTypes: { value: PulseType; label: string; tcmName: string }[] = [
  { value: "wiry", label: "Wiry", tcmName: "Xian" },
  { value: "slippery", label: "Slippery", tcmName: "Hua" },
  { value: "thready", label: "Thready", tcmName: "Xi" },
  { value: "rapid", label: "Rapid", tcmName: "Shuo" },
  { value: "normal", label: "Normal", tcmName: "Ping" },
]

interface AnalysisControlsProps {
  selectedType: PulseType
  onAnalyze: (type: PulseType) => void
  isAnalyzing: boolean
}

export function AnalysisControls({ selectedType, onAnalyze, isAnalyzing }: AnalysisControlsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-card-foreground">
            Synthetic Waveform Selector
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Choose a pulse type to generate synthetic waveform data for analysis
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {pulseTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onAnalyze(type.value)}
              disabled={isAnalyzing}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all",
                selectedType === type.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                isAnalyzing && "cursor-not-allowed opacity-50"
              )}
            >
              {isAnalyzing && selectedType === type.value ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Play className="h-3 w-3" />
              )}
              {type.label}
              <span className="text-[10px] opacity-60">({type.tcmName})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
