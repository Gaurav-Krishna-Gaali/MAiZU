"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react"

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]

interface CalendarDay {
  day: number
  currentMonth: boolean
  type?: "period" | "fertile" | "none"
}

function getCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const days: CalendarDay[] = []

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, currentMonth: false })
  }

  const periodDays = [13, 14, 15, 16]
  const fertileDays = [17, 18, 19]

  for (let d = 1; d <= daysInMonth; d++) {
    let type: CalendarDay["type"] = "none"
    if (periodDays.includes(d)) type = "period"
    if (fertileDays.includes(d)) type = "fertile"
    days.push({ day: d, currentMonth: true, type })
  }

  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, currentMonth: false })
  }

  return days
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function MenstruationCalendar() {
  const [monthOffset, setMonthOffset] = useState(0)
  const baseDate = new Date(2026, 6 + monthOffset)
  const year = baseDate.getFullYear()
  const month = baseDate.getMonth()
  const days = getCalendarDays(year, month)
  const monthName = monthNames[month]

  return (
    <div>
      <h3 className="text-base font-semibold text-[#111827]">Menstruation</h3>

      <div className="mt-3 rounded-2xl bg-[#ffffff] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#111827]">{monthName}</span>
          <div className="flex items-center gap-2">
            <button className="rounded-md p-1 text-[#676767] transition-colors hover:bg-[#e7e7e7] hover:text-[#111827]" aria-label="Edit">
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setMonthOffset((o) => o - 1)}
              className="rounded-md p-1 text-[#676767] transition-colors hover:bg-[#e7e7e7] hover:text-[#111827]"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMonthOffset((o) => o + 1)}
              className="rounded-md p-1 text-[#676767] transition-colors hover:bg-[#e7e7e7] hover:text-[#111827]"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map((d, i) => (
            <span key={i} className="text-xs font-medium text-[#bababa]">{d}</span>
          ))}
        </div>

        {/* Days grid */}
        <div className="mt-2 grid grid-cols-7 gap-1 text-center">
          {days.map((d, i) => {
            const isPeriod = d.currentMonth && d.type === "period"
            const isFertile = d.currentMonth && d.type === "fertile"

            return (
              <div
                key={i}
                className={`flex h-8 w-full items-center justify-center rounded-full text-xs font-medium transition-colors
                  ${!d.currentMonth ? "text-[#dadada]" : "text-[#111827]"}
                  ${isPeriod ? "bg-[#e74c3c] text-[#ffffff]" : ""}
                  ${isFertile ? "bg-[#27ae60] text-[#ffffff]" : ""}
                `}
              >
                {d.day}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e74c3c]" />
            <span className="text-[10px] text-[#676767]">Period</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#27ae60]" />
            <span className="text-[10px] text-[#676767]">Fertile</span>
          </div>
        </div>
      </div>
    </div>
  )
}
