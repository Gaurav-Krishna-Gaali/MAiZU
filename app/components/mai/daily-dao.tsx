"use client"

import { useState } from "react"

const tabs = ["Focus", "Enlighten", "Thrive"]

const tabContent: Record<string, { text: string; iconBg: string; iconSvg: React.ReactNode }> = {
  Focus: {
    text: "You may be experiencing Liver Yang Rising (frustration) lately. We recommend holding acupressure point LIV-3 for 2 minutes",
    iconBg: "#fbc4b2",
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4 L14 12 M10 8 L18 8 M8 16 C8 20 11 24 14 24 C17 24 20 20 20 16" stroke="#276220" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="18" r="1.5" fill="#276220" />
        <circle cx="18" cy="18" r="1.5" fill="#276220" />
      </svg>
    ),
  },
  Enlighten: {
    text: "Your Spleen Qi could benefit from warm, cooked foods. Try ginger tea with honey in the mornings to support digestion.",
    iconBg: "#fed39c",
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M8 18 C8 12 14 8 20 10 C20 16 14 20 8 18Z" fill="#acd8a7" stroke="#276220" strokeWidth="1" />
        <path d="M14 10 L14 20" stroke="#276220" strokeWidth="1" />
        <path d="M14 14 L10 16" stroke="#276220" strokeWidth="1" />
      </svg>
    ),
  },
  Thrive: {
    text: "Your Heart meridian shows strong vitality. Continue your evening meditation practice to maintain emotional balance.",
    iconBg: "#d5d7f8",
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="8" stroke="#276220" strokeWidth="1.2" />
        <path d="M14 8 L14 14 L18 16" stroke="#276220" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="14" cy="14" r="1.5" fill="#276220" />
      </svg>
    ),
  },
}

export function DailyDao() {
  const [activeTab, setActiveTab] = useState("Focus")
  const content = tabContent[activeTab]

  return (
    <div className="rounded-2xl bg-[#ffffff] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <h3 className="text-base font-semibold text-[#111827]">Your Daily Dao</h3>

      {/* Tabs */}
      <div className="mt-3 flex gap-0 border-b border-[#e1e3e8]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 pb-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-[#276220] text-[#276220]"
                : "text-[#bababa] hover:text-[#676767]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4 flex gap-4 rounded-xl bg-[#e4f3ea] p-4">
        <p className="flex-1 text-sm leading-relaxed text-[#111827]">
          {content.text}
        </p>
        <div
          className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: content.iconBg }}
        >
          {content.iconSvg}
        </div>
      </div>
    </div>
  )
}
