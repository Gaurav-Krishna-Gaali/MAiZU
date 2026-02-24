"use client"

import { useState } from "react"
import { Upload, Search, ChevronDown, ChevronUp, Clock } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WaveformUploadDialog } from "./waveform-upload-dialog"

export interface UserRecord {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "pending"
  lastUpdated: string | null
  waveformCount: number
  confidenceAvg: number | null
}

const initialUsers: UserRecord[] = [
  {
    id: "USR-001",
    name: "Katie Woelfel",
    email: "katie.woelfel@example.com",
    status: "active",
    lastUpdated: "2026-02-22T14:30:00Z",
    waveformCount: 12,
    confidenceAvg: 87,
  },
  {
    id: "USR-002",
    name: "Marcus Liu",
    email: "marcus.liu@example.com",
    status: "active",
    lastUpdated: "2026-02-21T09:15:00Z",
    waveformCount: 8,
    confidenceAvg: 82,
  },
  {
    id: "USR-003",
    name: "Sakura Tanaka",
    email: "s.tanaka@example.com",
    status: "active",
    lastUpdated: "2026-02-20T16:45:00Z",
    waveformCount: 15,
    confidenceAvg: 91,
  },
  {
    id: "USR-004",
    name: "Amir Patel",
    email: "amir.patel@example.com",
    status: "inactive",
    lastUpdated: "2026-02-10T08:00:00Z",
    waveformCount: 3,
    confidenceAvg: 74,
  },
  {
    id: "USR-005",
    name: "Elena Rodrigo",
    email: "elena.r@example.com",
    status: "active",
    lastUpdated: "2026-02-22T11:00:00Z",
    waveformCount: 22,
    confidenceAvg: 89,
  },
  {
    id: "USR-006",
    name: "James Okafor",
    email: "j.okafor@example.com",
    status: "pending",
    lastUpdated: null,
    waveformCount: 0,
    confidenceAvg: null,
  },
  {
    id: "USR-007",
    name: "Lin Mei Wong",
    email: "linmei.w@example.com",
    status: "active",
    lastUpdated: "2026-02-19T13:22:00Z",
    waveformCount: 6,
    confidenceAvg: 79,
  },
  {
    id: "USR-008",
    name: "David Park",
    email: "d.park@example.com",
    status: "active",
    lastUpdated: "2026-02-22T08:45:00Z",
    waveformCount: 18,
    confidenceAvg: 86,
  },
]

const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(iso: string | null) {
  if (!iso) return "Never"
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return `${monthsShort[d.getMonth()]} ${d.getDate()}`
}

function statusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-[#e4f3ea] text-[#276220] border-transparent"
    case "inactive":
      return "bg-[#fafafa] text-[#676767] border-[#e1e3e8]"
    case "pending":
      return "bg-[#fed39c]/30 text-[#ff8b2b] border-transparent"
    default:
      return ""
  }
}

type SortKey = "name" | "lastUpdated" | "waveformCount" | "confidenceAvg"

export function UsersTable() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("lastUpdated")
  const [sortAsc, setSortAsc] = useState(false)
  const [uploadTarget, setUploadTarget] = useState<UserRecord | null>(null)

  const filtered = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name)
          break
        case "lastUpdated":
          cmp = (a.lastUpdated ?? "").localeCompare(b.lastUpdated ?? "")
          break
        case "waveformCount":
          cmp = a.waveformCount - b.waveformCount
          break
        case "confidenceAvg":
          cmp = (a.confidenceAvg ?? 0) - (b.confidenceAvg ?? 0)
          break
      }
      return sortAsc ? cmp : -cmp
    })

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(false)
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronDown className="h-3 w-3 opacity-30" />
    return sortAsc ? (
      <ChevronUp className="h-3 w-3 text-[#276220]" />
    ) : (
      <ChevronDown className="h-3 w-3 text-[#276220]" />
    )
  }

  function handleUploadComplete(userId: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              lastUpdated: new Date().toISOString(),
              waveformCount: u.waveformCount + 1,
            }
          : u
      )
    )
  }

  return (
    <>
      {/* Search bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bababa]" />
          <input
            type="text"
            placeholder="Search users by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#e1e3e8] bg-[#ffffff] py-2.5 pl-10 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#bababa] focus:border-[#46913c] focus:ring-2 focus:ring-[#46913c]/20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-[#e1e3e8] bg-[#ffffff]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#e1e3e8] hover:bg-transparent">
              <TableHead className="text-[#676767]">User</TableHead>
              <TableHead className="text-[#676767]">Status</TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort("waveformCount")}
                  className="flex items-center gap-1 text-[#676767] hover:text-[#111827]"
                >
                  Waveforms <SortIcon col="waveformCount" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort("confidenceAvg")}
                  className="flex items-center gap-1 text-[#676767] hover:text-[#111827]"
                >
                  Confidence <SortIcon col="confidenceAvg" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort("lastUpdated")}
                  className="flex items-center gap-1 text-[#676767] hover:text-[#111827]"
                >
                  Last Updated <SortIcon col="lastUpdated" />
                </button>
              </TableHead>
              <TableHead className="text-right text-[#676767]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id} className="border-[#e1e3e8]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e4f3ea] text-xs font-semibold text-[#276220]">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#111827]">{user.name}</p>
                      <p className="text-xs text-[#bababa]">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-[#111827]">{user.waveformCount}</span>
                </TableCell>
                <TableCell>
                  {user.confidenceAvg != null ? (
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#e7e7e7]">
                        <div
                          className="h-full rounded-full bg-[#27ae60]"
                          style={{ width: `${user.confidenceAvg}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-[#111827]">{user.confidenceAvg}%</span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#bababa]">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-[#676767]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{formatDate(user.lastUpdated)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => setUploadTarget(user)}
                    className="bg-[#276220] text-[#ffffff] hover:bg-[#46913c]"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Upload</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <p className="text-sm text-[#bababa]">No users found matching your search.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Upload dialog */}
      {uploadTarget && (
        <WaveformUploadDialog
          open={!!uploadTarget}
          onOpenChange={(open) => {
            if (!open) setUploadTarget(null)
          }}
          userName={uploadTarget.name}
          userId={uploadTarget.id}
          onUploadComplete={handleUploadComplete}
        />
      )}
    </>
  )
}
