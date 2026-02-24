"use client"

import { mockPipelineStages } from "@/lib/pulse-data"
import { CheckCircle2, Circle, Loader2, XCircle } from "lucide-react"

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-success" />
    case "processing":
      return <Loader2 className="h-5 w-5 animate-spin text-primary" />
    case "error":
      return <XCircle className="h-5 w-5 text-destructive" />
    default:
      return <Circle className="h-5 w-5 text-muted-foreground" />
  }
}

export function PipelineTimeline() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-5 text-sm font-semibold text-card-foreground">
        Processing Pipeline
      </h3>

      <div className="flex flex-col gap-0">
        {mockPipelineStages.map((stage, i) => (
          <div key={i} className="flex gap-4">
            {/* Vertical line and icon */}
            <div className="flex flex-col items-center">
              <StatusIcon status={stage.status} />
              {i < mockPipelineStages.length - 1 && (
                <div className="my-1 h-full w-px bg-border" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-card-foreground">{stage.stage}</p>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {new Date(stage.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {stage.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
