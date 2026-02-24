"use client"

import { CheckCircle2, Clock, FileText } from "lucide-react"

const history = [
  {
    name: "SYN-P001-waveform.csv",
    patient: "SYN-P001",
    size: "2.4 MB",
    uploadedAt: "Feb 22, 2026 10:28 AM",
    status: "completed" as const,
    result: "Wiry + Rapid | Liver Qi Stagnation",
  },
  {
    name: "SYN-P002-waveform.json",
    patient: "SYN-P002",
    size: "1.8 MB",
    uploadedAt: "Feb 22, 2026 11:12 AM",
    status: "completed" as const,
    result: "Slippery + Thready | Phlegm-Dampness",
  },
  {
    name: "SYN-P003-waveform.csv",
    patient: "SYN-P003",
    size: "3.1 MB",
    uploadedAt: "Feb 22, 2026 1:58 PM",
    status: "completed" as const,
    result: "Thready | Qi Deficiency",
  },
  {
    name: "SYN-P004-waveform.json",
    patient: "SYN-P004",
    size: "2.7 MB",
    uploadedAt: "Feb 22, 2026 2:45 PM",
    status: "processing" as const,
    result: "Processing...",
  },
]

export function UploadHistory() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">
        Upload History
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                File
              </th>
              <th className="pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Patient
              </th>
              <th className="hidden pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                Size
              </th>
              <th className="hidden pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
                Uploaded
              </th>
              <th className="pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="hidden pb-3 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground lg:table-cell">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.name} className="border-b border-border/50 last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-card-foreground truncate max-w-32">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="font-mono text-xs text-muted-foreground">{item.patient}</span>
                </td>
                <td className="hidden py-3 sm:table-cell">
                  <span className="text-xs text-muted-foreground">{item.size}</span>
                </td>
                <td className="hidden py-3 md:table-cell">
                  <span className="text-xs text-muted-foreground">{item.uploadedAt}</span>
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1.5">
                    {item.status === "completed" ? (
                      <CheckCircle2 className="h-3 w-3 text-success" />
                    ) : (
                      <Clock className="h-3 w-3 text-warning" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        item.status === "completed" ? "text-success" : "text-warning"
                      }`}
                    >
                      {item.status === "completed" ? "Complete" : "Processing"}
                    </span>
                  </span>
                </td>
                <td className="hidden py-3 lg:table-cell">
                  <span className="text-xs text-muted-foreground">{item.result}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
