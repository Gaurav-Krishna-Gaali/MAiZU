"use client"

import { Activity, Upload, UserPlus, AlertTriangle } from "lucide-react"

const activities = [
  {
    icon: Upload,
    iconBg: "bg-[#e4f3ea]",
    iconColor: "text-[#276220]",
    text: "Waveform uploaded for Katie Woelfel",
    detail: "12 waveform points processed, 87% confidence",
    time: "2 minutes ago",
  },
  {
    icon: Activity,
    iconBg: "bg-[#d5d7f8]/30",
    iconColor: "text-[#3f48cc]",
    text: "Diagnostic completed for Elena Rodrigo",
    detail: "Liver Qi Stagnation pattern detected",
    time: "15 minutes ago",
  },
  {
    icon: UserPlus,
    iconBg: "bg-[#fed39c]/30",
    iconColor: "text-[#ff8b2b]",
    text: "New user James Okafor registered",
    detail: "Pending first waveform upload",
    time: "1 hour ago",
  },
  {
    icon: Upload,
    iconBg: "bg-[#e4f3ea]",
    iconColor: "text-[#276220]",
    text: "Waveform uploaded for David Park",
    detail: "18 waveform points processed, 86% confidence",
    time: "3 hours ago",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-[#fbc4b2]/30",
    iconColor: "text-[#f94a26]",
    text: "Low confidence score for Amir Patel",
    detail: "Recommend re-scan with better sensor contact",
    time: "5 hours ago",
  },
  {
    icon: Activity,
    iconBg: "bg-[#d5d7f8]/30",
    iconColor: "text-[#3f48cc]",
    text: "Batch processing completed",
    detail: "42 waveforms processed in pipeline",
    time: "8 hours ago",
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-[#e1e3e8] bg-[#ffffff] p-5">
      <h3 className="mb-4 text-sm font-semibold text-[#111827]">Recent Activity</h3>
      <div className="flex flex-col gap-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${a.iconBg}`}>
              <a.icon className={`h-4 w-4 ${a.iconColor}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#111827]">{a.text}</p>
              <p className="text-xs text-[#676767]">{a.detail}</p>
            </div>
            <span className="shrink-0 text-xs text-[#bababa]">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
