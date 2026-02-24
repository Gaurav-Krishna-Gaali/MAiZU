"use client"

import { generateWaveformData } from "@/lib/pulse-data"
import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function WaveformOverview() {
  const data = useMemo(() => generateWaveformData("wiry", 120), [])

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-card-foreground">
            Latest Waveform Signal
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Patient SYN-P001 | Left Guan Position
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          Wiry (Xian)
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="waveformGradient" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#waveformGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
