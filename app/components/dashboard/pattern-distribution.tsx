"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { pattern: "Qi Stagnation", count: 187, confidence: 84 },
  { pattern: "Blood Stasis", count: 142, confidence: 76 },
  { pattern: "Phlegm-Damp", count: 134, confidence: 88 },
  { pattern: "Qi Deficiency", count: 121, confidence: 79 },
  { pattern: "Blood Deficiency", count: 98, confidence: 71 },
  { pattern: "Heat Pattern", count: 89, confidence: 68 },
  { pattern: "Yin Deficiency", count: 72, confidence: 73 },
  { pattern: "Wind-Cold", count: 49, confidence: 65 },
]

export function PatternDistribution() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-card-foreground">
          TCM Pattern Distribution
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Frequency of identified patterns across all diagnostics
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.008 260)" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: "oklch(0.60 0.01 260)" }}
              axisLine={{ stroke: "oklch(0.25 0.008 260)" }}
              tickLine={false}
            />
            <YAxis
              dataKey="pattern"
              type="category"
              tick={{ fontSize: 10, fill: "oklch(0.60 0.01 260)" }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0.005 260)",
                border: "1px solid oklch(0.25 0.008 260)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "oklch(0.95 0.005 260)",
              }}
              formatter={(value: number, name: string) => [
                name === "count" ? `${value} cases` : `${value}%`,
                name === "count" ? "Cases" : "Avg Confidence",
              ]}
            />
            <Bar
              dataKey="count"
              fill="oklch(0.72 0.15 180)"
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
