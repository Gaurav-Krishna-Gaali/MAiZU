"use client"

import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import { AdminStats } from "@/components/admin/admin-stats"
import { UsersTable } from "@/components/admin/users-table"
import { RecentActivity } from "@/components/admin/recent-activity"

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

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Admin header */}
      <header className="sticky top-0 z-40 border-b border-[#e1e3e8] bg-[#ffffff]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <YinYangIcon size={28} />
            <span className="text-lg font-bold tracking-tight text-[#111827]">MaiSync</span>
            <span className="flex items-center gap-1 rounded-full bg-[#276220] px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#ffffff] uppercase">
              <Shield className="h-3 w-3" />
              Admin
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[#676767] transition-colors hover:bg-[#e7e7e7] hover:text-[#111827]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-6 lg:px-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#111827]">Admin Console</h1>
          <p className="mt-1 text-sm text-[#676767]">
            Manage users, upload waveform data, and monitor company performance.
          </p>
        </div>

        {/* Stats row */}
        <AdminStats />

        {/* Users + Activity */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section>
            <h2 className="mb-4 text-lg font-semibold text-[#111827]">Users</h2>
            <UsersTable />
          </section>

          <aside className="hidden lg:block">
            <h2 className="mb-4 text-lg font-semibold text-[#111827]">Activity</h2>
            <RecentActivity />
          </aside>
        </div>

        {/* Mobile activity - below table */}
        <div className="mt-8 lg:hidden">
          <h2 className="mb-4 text-lg font-semibold text-[#111827]">Activity</h2>
          <RecentActivity />
        </div>
      </main>
    </div>
  )
}
