"use client"

import { Loader2 } from "lucide-react"

const featureData: Record<
  string,
  { frequency: string; rhythm: string; amplitude: string; tension: string; width: string; depth: string }
> = {
  wiry: {
    frequency: "78 bpm",
    rhythm: "Regular",
    amplitude: "High",
    tension: "Very High",
    width: "Narrow",
    depth: "Middle-Deep",
  },
  slippery: {
    frequency: "72 bpm",
    rhythm: "Regular, flowing",
    amplitude: "Medium-High",
    tension: "Low",
    width: "Wide",
    depth: "Superficial-Middle",
  },
  thready: {
    frequency: "66 bpm",
    rhythm: "Regular, weak",
    amplitude: "Low",
    tension: "Low",
    width: "Very Narrow",
    depth: "Deep",
  },
  rapid: {
    frequency: "96 bpm",
    rhythm: "Regular, fast",
    amplitude: "Medium",
    tension: "Medium",
    width: "Normal",
    depth: "All levels",
  },
  normal: {
    frequency: "72 bpm",
    rhythm: "Regular",
    amplitude: "Medium",
    tension: "Moderate",
    width: "Normal",
    depth: "Middle",
  },
}

interface FeatureExtractionProps {
  isAnalyzing: boolean
  analysisComplete: boolean
  pulseType: string
}

export function FeatureExtraction({ isAnalyzing, analysisComplete, pulseType }: FeatureExtractionProps) {
  const features = featureData[pulseType] || featureData.normal

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-card-foreground">
            Extracted Features
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Features extracted by Amazon Bedrock from waveform summary
          </p>
        </div>
        {isAnalyzing && (
          <span className="flex items-center gap-1.5 text-xs text-primary">
            <Loader2 className="h-3 w-3 animate-spin" />
            Processing...
          </span>
        )}
      </div>

      {analysisComplete ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Object.entries(features).map(([key, value]) => (
            <div key={key} className="rounded-lg bg-secondary/50 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {key}
              </p>
              <p className="mt-1 text-sm font-semibold text-card-foreground">{value}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  )
}
