"use client"

import { mockPipelineStages } from "@/lib/pulse-data"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import Link from "next/link"

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-success" />
    case "processing":
      return <Loader2 className="h-4 w-4 animate-spin text-primary" />
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />
  }
}

export function PipelineStatusCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-card-foreground">
          Pipeline Status
        </h3>
        <Link
          href="/pipeline"
          className="text-xs font-medium text-primary hover:underline"
        >
          Monitor
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {mockPipelineStages.slice(0, 4).map((stage, i) => (
          <div key={i} className="flex items-center gap-3">
            <StatusIcon status={stage.status} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-card-foreground truncate">
                {stage.stage}
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground">
              {new Date(stage.timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
