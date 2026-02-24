"use client"

import { useState } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function generatePulseData(position: string, hand: string) {
  const baseValues: Record<string, Record<string, number[]>> = {
    Left: {
      Cun: [52, 58, 55, 48, 64, 60, 57],
      Guan: [45, 50, 48, 52, 58, 55, 50],
      Chi: [60, 55, 62, 58, 54, 63, 59],
    },
    Right: {
      Cun: [48, 54, 50, 56, 60, 52, 55],
      Guan: [42, 47, 53, 49, 55, 51, 46],
      Chi: [55, 58, 50, 61, 57, 54, 62],
    },
  }
  const values = baseValues[hand]?.[position] || baseValues.Left.Cun
  return dayLabels.map((day, i) => ({ day, value: values[i] }))
}

const positions = ["Cun", "Guan", "Chi"]
const hands = ["Left", "Right"]

export function PulseInterpretation() {
  const [activePosition, setActivePosition] = useState("Cun")
  const [activeHand, setActiveHand] = useState("Left")
  const data = generatePulseData(activePosition, activeHand)

  return (
    <div className="rounded-2xl bg-[#ffffff] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#111827]">Pulse Interpretation:</h3>
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#e74c3c]" />
          <span className="h-3 w-3 rounded-full bg-[#f4d03f] ring-2 ring-[#276220] ring-offset-1" />
          <span className="h-3 w-3 rounded-full bg-[#bdc3c7]" />
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6fcf97" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6fcf97" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#676767" }}
            />
            <YAxis hide domain={[30, 80]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e1e3e8",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [value, "BPM"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#46913c"
              strokeWidth={2}
              fill="url(#pulseGradient)"
              dot={{ r: 4, fill: "#ffffff", stroke: "#46913c", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#276220", stroke: "#ffffff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Hand toggle: Left / Right */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-medium text-[#676767]">Hand:</span>
        <div className="flex rounded-full bg-[#e7e7e7] p-0.5">
          {hands.map((hand) => (
            <button
              key={hand}
              onClick={() => setActiveHand(hand)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                activeHand === hand
                  ? "bg-[#276220] text-[#ffffff] shadow-sm"
                  : "text-[#676767] hover:text-[#111827]"
              }`}
            >
              {hand}
            </button>
          ))}
        </div>
      </div>

      {/* Position Selector: Cun / Guan / Chi */}
      <div className="mt-3 flex gap-2">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setActivePosition(pos)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activePosition === pos
                ? "bg-[#276220] text-[#ffffff]"
                : "bg-[#e4f3ea] text-[#276220]"
            }`}
          >
            {pos === "Cun" && (
              <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0" aria-hidden="true">
                <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 9.5C5 6 7 4.5 9.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            )}
            {pos}
          </button>
        ))}
      </div>
    </div>
  )
}
