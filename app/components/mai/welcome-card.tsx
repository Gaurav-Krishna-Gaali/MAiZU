"use client"

import { X } from "lucide-react"
import { useState } from "react"

export function WelcomeCard() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#276220] p-5 text-[#ffffff] shadow-[0_2px_8px_rgba(39,98,32,0.3)]">
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-3 text-[#ffffff]/60 hover:text-[#ffffff] transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold leading-tight lg:text-xl">
            Welcome Katie,
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-[#ffffff]/80">
            {"Today's pulses call for qigong and yin foods."}
          </p>
          <button className="mt-3 rounded-full bg-[#46913c] px-4 py-1.5 text-xs font-medium text-[#ffffff] transition-colors hover:bg-[#6fcf97]">
            learn more
          </button>
        </div>

        {/* Circular Score */}
        <div className="relative flex-shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96" className="drop-shadow-lg">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="5"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#95ff87"
              strokeWidth="5"
              strokeDasharray={`${0.7 * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
              strokeLinecap="round"
              transform="rotate(-90 48 48)"
            />
            {/* Decorative dots */}
            <circle cx="42" cy="18" r="2" fill="#95ff87" opacity="0.5" />
            <circle cx="68" cy="32" r="1.5" fill="#ffffff" opacity="0.3" />
            <circle cx="32" cy="74" r="1.5" fill="#6fcf97" opacity="0.4" />
            <text
              x="48"
              y="46"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="26"
              fontWeight="700"
            >
              70%
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
