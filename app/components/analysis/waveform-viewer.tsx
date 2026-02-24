"use client"

import type { PulseDataPoint } from "@/lib/pulse-data"
import { Loader2 } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useState } from "react"

interface WaveformViewerProps {
  data: PulseDataPoint[]
  pulseType: string
  isAnalyzing: boolean
}

export function WaveformViewer({ data, pulseType, isAnalyzing }: WaveformViewerProps) {
  const [view, setView] = useState<"area" | "line">("area")

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-card-foreground">
            Waveform Signal
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Pulse type: {pulseType.charAt(0).toUpperCase() + pulseType.slice(1)} | 200
            data points
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isAnalyzing && (
            <span className="flex items-center gap-1.5 text-xs text-primary">
              <Loader2 className="h-3 w-3 animate-spin" />
              Analyzing...
            </span>
          )}
          <div className="flex rounded-lg border border-border">
            <button
              onClick={() => setView("area")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                view === "area"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              } rounded-l-lg`}
            >
              Area
            </button>
            <button
              onClick={() => setView("line")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                view === "line"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              } rounded-r-lg`}
            >
              Multi-Line
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {view === "area" ? (
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="analysisGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.15 180)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.72 0.15 180)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.008 260)" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: "oklch(0.60 0.01 260)" }}
                axisLine={{ stroke: "oklch(0.25 0.008 260)" }}
                tickLine={false}
                tickFormatter={(v) => `${v}s`}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "oklch(0.60 0.01 260)" }}
                axisLine={{ stroke: "oklch(0.25 0.008 260)" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.005 260)",
                  border: "1px solid oklch(0.25 0.008 260)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "oklch(0.95 0.005 260)",
                }}
                labelFormatter={(v) => `Time: ${v}s`}
              />
              <Area
                type="monotone"
                dataKey="amplitude"
                stroke="oklch(0.72 0.15 180)"
                strokeWidth={2}
                fill="url(#analysisGradient)"
                animationDuration={1200}
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.008 260)" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: "oklch(0.60 0.01 260)" }}
                axisLine={{ stroke: "oklch(0.25 0.008 260)" }}
                tickLine={false}
                tickFormatter={(v) => `${v}s`}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "oklch(0.60 0.01 260)" }}
                axisLine={{ stroke: "oklch(0.25 0.008 260)" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.005 260)",
                  border: "1px solid oklch(0.25 0.008 260)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "oklch(0.95 0.005 260)",
                }}
                labelFormatter={(v) => `Time: ${v}s`}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", color: "oklch(0.60 0.01 260)" }}
              />
              <Line
                type="monotone"
                dataKey="amplitude"
                stroke="oklch(0.72 0.15 180)"
                strokeWidth={2}
                dot={false}
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="oklch(0.65 0.18 155)"
                strokeWidth={1.5}
                dot={false}
                strokeDasharray="5 5"
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="oklch(0.78 0.12 90)"
                strokeWidth={1.5}
                dot={false}
                strokeDasharray="3 3"
                animationDuration={1200}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
