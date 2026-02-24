"use client"

import { Users, Activity, FileUp, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Total Users",
    value: "1,248",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    label: "Active Sessions",
    value: "342",
    change: "+8%",
    changeType: "positive" as const,
    icon: Activity,
  },
  {
    label: "Waveforms Uploaded",
    value: "8,921",
    change: "+24%",
    changeType: "positive" as const,
    icon: FileUp,
  },
  {
    label: "Avg. Confidence",
    value: "84.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

export function AdminStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-[#e1e3e8] bg-[#ffffff] py-5">
          <CardContent className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e4f3ea]">
              <stat.icon className="h-5 w-5 text-[#276220]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-[#676767]">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#111827]">{stat.value}</span>
                <span className="text-xs font-medium text-[#27ae60]">{stat.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
