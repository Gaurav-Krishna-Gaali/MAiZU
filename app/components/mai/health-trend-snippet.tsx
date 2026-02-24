"use client"

interface OrganScore {
  name: string
  score: number
  color: string
  trackColor: string
  icon: React.ReactNode
}

const organs: OrganScore[] = [
  {
    name: "Heart",
    score: 8.2,
    color: "#e74c3c",
    trackColor: "#fbc4b2",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 12 L2 7 C0 5 1 2 3.5 2 C5 2 6.5 3 7 4 C7.5 3 9 2 10.5 2 C13 2 14 5 12 7 Z" fill="#e74c3c" />
      </svg>
    ),
  },
  {
    name: "Lungs",
    score: 9.1,
    color: "#bdc3c7",
    trackColor: "#e7e7e7",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2 L7 9 M4 5 C2 6 1 9 2 11 L5 11 L5 7 M10 5 C12 6 13 9 12 11 L9 11 L9 7" stroke="#bdc3c7" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Liver",
    score: 9.4,
    color: "#27ae60",
    trackColor: "#acd8a7",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <ellipse cx="7" cy="8" rx="5" ry="4" fill="#27ae60" opacity="0.7" />
        <path d="M7 4 L7 8" stroke="#27ae60" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: "Spleen",
    score: 7.1,
    color: "#f4d03f",
    trackColor: "#fed39c",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <ellipse cx="7" cy="7" rx="4" ry="5" fill="#f4d03f" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: "Left kidney",
    score: 7.9,
    color: "#3498db",
    trackColor: "#b3daff",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M4 3 C2 4 2 10 4 11 C6 12 8 10 7 7 C6 4 6 2 4 3Z" fill="#3498db" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: "Right kidney",
    score: 8,
    color: "#3f48cc",
    trackColor: "#d5d7f8",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M10 3 C12 4 12 10 10 11 C8 12 6 10 7 7 C8 4 8 2 10 3Z" fill="#3f48cc" opacity="0.7" />
      </svg>
    ),
  },
]

function CircularProgress({
  score,
  color,
  trackColor,
  size = 80,
}: {
  score: number
  color: string
  trackColor: string
  size?: number
}) {
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 10) * circumference
  const gap = circumference - progress

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth="6"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={`${progress} ${gap}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

export function HealthTrendSnippet() {
  return (
    <div>
      <h3 className="text-base font-semibold text-[#111827]">Health Trend Snippet</h3>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {organs.map((organ) => (
          <div
            key={organ.name}
            className="flex flex-col items-center rounded-2xl bg-[#ffffff] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
          >
            <div className="flex w-full items-center gap-1.5">
              {organ.icon}
              <span className="text-xs font-medium text-[#111827]">{organ.name}</span>
            </div>
            <div className="relative mt-2">
              <CircularProgress
                score={organ.score}
                color={organ.color}
                trackColor={organ.trackColor}
                size={80}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-[#111827]">{organ.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
