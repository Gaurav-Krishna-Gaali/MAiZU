"use client"

import Link from "next/link"
import { Battery, LogOut, Shield } from "lucide-react"

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

export function AppHeader() {
  return (
    <div className="flex items-center justify-between">
      {/* Left: Logo + title */}
      <div className="flex items-center gap-3">
        <YinYangIcon size={28} />
        <span className="text-lg font-bold tracking-tight text-[#111827] lg:text-xl">MaiSync</span>
      </div>

      {/* Center: Journal Prompts (visible on larger screens) */}
      <button className="hidden items-center gap-2 rounded-full bg-[#e4f3ea] px-4 py-2 text-xs font-medium text-[#276220] transition-colors hover:bg-[#acd8a7]/50 md:flex">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="6" stroke="#276220" strokeWidth="1.2" />
          <path d="M5 9.5C5 6 7 4.5 9.5 4.5" fill="none" stroke="#276220" strokeWidth="1.2" />
          <circle cx="7" cy="5" r="1" fill="#276220" />
          <circle cx="7" cy="10" r="1" fill="none" stroke="#276220" strokeWidth="0.8" />
        </svg>
        Journal Prompts
      </button>

      {/* Right: Admin + Battery + Avatar + Logout */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 rounded-full bg-[#e4f3ea] px-3 py-1.5 text-xs font-medium text-[#276220] transition-colors hover:bg-[#acd8a7]/50"
        >
          <Shield className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Admin</span>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-[#e1e3e8] px-2.5 py-1.5 text-xs text-[#676767] sm:flex">
          <Battery className="h-3.5 w-3.5" />
          <span>42%</span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd5bd] text-sm font-semibold text-[#111827]">
          K
        </div>
        <Link
          href="/login"
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-[#676767] transition-colors hover:bg-[#e7e7e7] hover:text-[#111827]"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign out</span>
        </Link>
      </div>
    </div>
  )
}
