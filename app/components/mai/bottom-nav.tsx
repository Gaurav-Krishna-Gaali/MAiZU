"use client"

import { useState } from "react"
import { AlignJustify, User, LayoutGrid } from "lucide-react"

function YinYangIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" stroke="#276220" strokeWidth="1.5" />
      <path
        d="M12 1C6.48 1 2 5.48 2 12s4.48 11 10 11c0-5.52 4.48-11 10-11S12 6.48 12 1z"
        fill="#276220"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <circle cx="12" cy="6.5" r="1.5" fill="#ffffff" />
      <circle cx="12" cy="17.5" r="1.5" fill="#276220" />
    </svg>
  )
}

const tabs = [
  { id: "home", icon: YinYangIcon, label: "Home" },
  { id: "menu", icon: AlignJustify, label: "Menu" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "grid", icon: LayoutGrid, label: "More" },
]

export function BottomNav() {
  const [active, setActive] = useState("home")

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e1e3e8] bg-[#ffffff] lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          const isYinYang = tab.id === "home"

          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-colors ${
                isActive ? "text-[#276220]" : "text-[#bababa]"
              }`}
              aria-label={tab.label}
            >
              {isYinYang ? (
                <YinYangIcon size={24} />
              ) : (
                <tab.icon className="h-5 w-5" />
              )}
              <span className="text-[10px]">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
