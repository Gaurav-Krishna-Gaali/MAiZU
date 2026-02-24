"use client"

const weekDays = ["S", "M", "T", "W", "T", "F", "S"]
const barHeights = [55, 72, 65, 80, 60, 50, 68]

function MovementCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-[#e1e3e8] bg-[#ffffff] p-4">
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 12 L6 6 L8 10 L10 4 L12 8" stroke="#46913c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="5" cy="3" r="1.5" fill="#46913c" />
          <circle cx="11" cy="3" r="1.5" fill="#46913c" />
        </svg>
        <span className="text-sm font-semibold text-[#276220]">Movement</span>
      </div>
      <span className="mt-2 inline-block w-fit rounded-full bg-[#e4f3ea] px-3 py-0.5 text-xs font-medium text-[#276220]">
        6,400 Steps
      </span>
      {/* Blue bar chart */}
      <div className="mt-3 flex items-end justify-between gap-1">
        {barHeights.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t-sm bg-[#3498db]"
              style={{ height: `${h * 0.6}px` }}
            />
            <span className="text-[9px] text-[#bababa]">{weekDays[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StressCard() {
  // Concentric semi-circle heatmap: red center to yellow outer
  const arcs = [
    { color: "#e74c3c", r: 20 },
    { color: "#ff6b35", r: 32 },
    { color: "#ff8b2b", r: 44 },
    { color: "#feb23c", r: 56 },
    { color: "#fed39c", r: 68 },
  ]

  return (
    <div className="flex flex-col rounded-2xl border border-[#e1e3e8] bg-[#ffffff] p-4">
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6" stroke="#46913c" strokeWidth="1" />
          <circle cx="6" cy="7" r="0.8" fill="#46913c" />
          <circle cx="10" cy="7" r="0.8" fill="#46913c" />
          <path d="M6 10.5 Q8 9 10 10.5" stroke="#46913c" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        </svg>
        <span className="text-sm font-semibold text-[#276220]">Stress</span>
      </div>
      <span className="mt-2 inline-block w-fit rounded-full bg-[#e4f3ea] px-3 py-0.5 text-xs font-medium text-[#676767]">
        1.5
      </span>
      {/* Semi-circle heatmap */}
      <div className="mt-3 flex items-end justify-center">
        <svg viewBox="0 0 140 75" className="h-auto w-full max-w-[140px]">
          {arcs.reverse().map((arc, i) => (
            <path
              key={i}
              d={`M ${70 - arc.r} 72 A ${arc.r} ${arc.r} 0 0 1 ${70 + arc.r} 72`}
              fill={arc.color}
              opacity={0.85}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

function BreathCard() {
  // Green wave / area chart
  return (
    <div className="flex flex-col rounded-2xl border border-[#e1e3e8] bg-[#e4f3ea] p-4">
      <span className="text-sm font-semibold text-[#276220]">Breath</span>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-xs text-[#676767]">BPM</span>
        <span className="text-xl font-bold text-[#111827]">14</span>
      </div>
      {/* Green wave area */}
      <svg viewBox="0 0 120 40" className="mt-2 h-10 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="breathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#acd8a7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#acd8a7" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M0,30 Q10,12 20,22 Q30,32 40,18 Q50,5 60,20 Q70,35 80,15 Q90,0 100,22 Q110,35 120,20 L120,40 L0,40 Z"
          fill="url(#breathGrad)"
        />
        <path
          d="M0,30 Q10,12 20,22 Q30,32 40,18 Q50,5 60,20 Q70,35 80,15 Q90,0 100,22 Q110,35 120,20"
          fill="none"
          stroke="#46913c"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function RestCard() {
  // Donut ring chart in greens
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const segments = [
    { pct: 0.45, color: "#276220" },
    { pct: 0.30, color: "#6fcf97" },
    { pct: 0.25, color: "#acd8a7" },
  ]

  let offset = 0

  return (
    <div className="flex flex-col rounded-2xl border border-[#e1e3e8] bg-[#ffd5bd]/30 p-4">
      <span className="text-sm font-semibold text-[#276220]">Rest</span>
      <p className="mt-1 text-xs leading-relaxed text-[#676767]">
        Efficient Sleep Summary
      </p>
      <div className="mt-2 flex justify-end">
        <svg width="68" height="68" viewBox="0 0 68 68">
          {segments.map((seg, i) => {
            const dashLength = seg.pct * circumference
            const gapLength = circumference - dashLength
            const currentOffset = offset
            offset += dashLength

            return (
              <circle
                key={i}
                cx="34"
                cy="34"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="8"
                strokeDasharray={`${dashLength} ${gapLength}`}
                strokeDashoffset={-currentOffset}
                transform="rotate(-90 34 34)"
                strokeLinecap="round"
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export function VitalPatterns({ analysisData }: { analysisData?: any }) {
  const perPos = analysisData?.per_position_analysis

  return (
    <div>
      <h3 className="text-base font-semibold text-[#111827]">Vital Patterns</h3>
      {perPos ? (
        <div className="mt-4 grid grid-cols-1 gap-3">
          {Object.entries(perPos).map(([pos, info]: any) => (
            <div
              key={pos}
              className="flex flex-col rounded-2xl border border-[#e1e3e8] bg-[#ffffff] p-4"
            >
              <span className="text-sm font-semibold text-[#276220]">
                {pos.replace(/_/g, ' ')}
              </span>
              <span className="mt-1 text-xs text-[#676767]">
                {info.dominant_quality} ({info.category})
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MovementCard />
          <StressCard />
          <BreathCard />
          <RestCard />
        </div>
      )}
    </div>
  )
}
