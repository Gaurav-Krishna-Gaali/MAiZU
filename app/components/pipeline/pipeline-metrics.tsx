"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const latencyData = [
  { time: "10:00", ingestion: 1.2, normalization: 3.4, extraction: 8.1, matching: 5.2, scoring: 2.1, total: 20.0 },
  { time: "10:15", ingestion: 1.1, normalization: 3.2, extraction: 7.8, matching: 4.9, scoring: 2.0, total: 19.0 },
  { time: "10:30", ingestion: 1.3, normalization: 3.5, extraction: 8.3, matching: 5.4, scoring: 2.2, total: 20.7 },
  { time: "10:45", ingestion: 1.0, normalization: 3.1, extraction: 7.5, matching: 4.8, scoring: 1.9, total: 18.3 },
  { time: "11:00", ingestion: 1.2, normalization: 3.3, extraction: 7.9, matching: 5.1, scoring: 2.0, total: 19.5 },
  { time: "11:15", ingestion: 1.1, normalization: 3.4, extraction: 8.0, matching: 5.0, scoring: 2.1, total: 19.6 },
  { time: "11:30", ingestion: 1.4, normalization: 3.6, extraction: 8.5, matching: 5.5, scoring: 2.3, total: 21.3 },
  { time: "11:45", ingestion: 1.0, normalization: 3.0, extraction: 7.4, matching: 4.7, scoring: 1.8, total: 17.9 },
]

const metrics = [
  { label: "Avg Latency", value: "19.5s", subtext: "End-to-end" },
  { label: "Throughput", value: "42/hr", subtext: "Waveforms processed" },
  { label: "Error Rate", value: "0.2%", subtext: "Last 24 hours" },
  { label: "Uptime", value: "99.9%", subtext: "30-day average" },
]

export function PipelineMetrics() {
  return (
    <div className="flex flex-col gap-4">
      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="mt-1 text-2xl font-semibold text-card-foreground">{m.value}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{m.subtext}</p>
          </div>
        ))}
      </div>

      {/* Latency chart */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-card-foreground">
            Pipeline Latency Over Time
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            End-to-end processing time (seconds) per pipeline run
          </p>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={latencyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.008 260)" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: "oklch(0.60 0.01 260)" }}
                axisLine={{ stroke: "oklch(0.25 0.008 260)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "oklch(0.60 0.01 260)" }}
                axisLine={{ stroke: "oklch(0.25 0.008 260)" }}
                tickLine={false}
                tickFormatter={(v) => `${v}s`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.005 260)",
                  border: "1px solid oklch(0.25 0.008 260)",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "oklch(0.95 0.005 260)",
                }}
                formatter={(value: number) => [`${value}s`]}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="oklch(0.72 0.15 180)"
                strokeWidth={2}
                dot={{ r: 3, fill: "oklch(0.72 0.15 180)" }}
              />
              <Line
                type="monotone"
                dataKey="extraction"
                stroke="oklch(0.65 0.18 155)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
