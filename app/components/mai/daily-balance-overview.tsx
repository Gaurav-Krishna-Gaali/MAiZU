"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

const balanceData = [
  { day: "Sun", heart: 15, lungs: 20, liver: 25, spleen: 20, kidney: 20 },
  { day: "Mon", heart: 18, lungs: 15, liver: 30, spleen: 22, kidney: 15 },
  { day: "Tues", heart: 20, lungs: 18, liver: 22, spleen: 25, kidney: 15 },
  { day: "Wed", heart: 10, lungs: 25, liver: 20, spleen: 30, kidney: 15 },
  { day: "Thurs", heart: 22, lungs: 20, liver: 18, spleen: 20, kidney: 20 },
  { day: "Fri", heart: 25, lungs: 15, liver: 25, spleen: 15, kidney: 20 },
  { day: "Sat", heart: 18, lungs: 22, liver: 20, spleen: 20, kidney: 20 },
]

export function DailyBalanceOverview() {
  return (
    <div>
      <h3 className="text-base font-semibold text-[#111827]">Daily Balance Overview</h3>

      <div className="mt-4 rounded-2xl bg-[#ffffff] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={balanceData} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#676767" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#bababa" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e1e3e8",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "10px", color: "#676767" }}
              />
              <Bar dataKey="heart" stackId="balance" fill="#e74c3c" radius={[0, 0, 0, 0]} />
              <Bar dataKey="spleen" stackId="balance" fill="#f4d03f" radius={[0, 0, 0, 0]} />
              <Bar dataKey="liver" stackId="balance" fill="#27ae60" radius={[0, 0, 0, 0]} />
              <Bar dataKey="lungs" stackId="balance" fill="#04bfda" radius={[0, 0, 0, 0]} />
              <Bar dataKey="kidney" stackId="balance" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
