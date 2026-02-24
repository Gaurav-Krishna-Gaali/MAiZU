"use client"

import { FileText } from "lucide-react"

export function DataFormatGuide() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-card-foreground">
          Data Format Guide
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            CSV Format
          </p>
          <div className="rounded-lg bg-secondary/50 p-3">
            <pre className="font-mono text-[11px] text-card-foreground/80 leading-relaxed overflow-x-auto">
{`timestamp,amplitude,systolic,diastolic
0.000,0.6234,0.7500,0.3500
0.020,0.6412,0.7620,0.3560
0.040,0.6589,0.7740,0.3620`}
            </pre>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            JSON Format
          </p>
          <div className="rounded-lg bg-secondary/50 p-3">
            <pre className="font-mono text-[11px] text-card-foreground/80 leading-relaxed overflow-x-auto">
{`{
  "patient_id": "SYN-P001",
  "sample_rate": 500,
  "position": "Left Guan",
  "data": [
    { "t": 0.000, "amp": 0.623 },
    { "t": 0.020, "amp": 0.641 }
  ]
}`}
            </pre>
          </div>
        </div>

        <div className="rounded-lg bg-primary/5 p-3">
          <p className="text-xs font-medium text-primary">Requirements</p>
          <ul className="mt-1.5 flex flex-col gap-1 text-xs text-muted-foreground">
            <li>Minimum 100 data points per waveform</li>
            <li>Sample rate: 250-1000 Hz recommended</li>
            <li>Synthetic / simulated data only (no PII)</li>
            <li>Max file size: 10MB</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
