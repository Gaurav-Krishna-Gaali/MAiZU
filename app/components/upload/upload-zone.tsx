"use client"

import { CheckCircle2, Loader2, Upload } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"

export function UploadZone() {
  const [state, setState] = useState<"idle" | "dragging" | "uploading" | "success">("idle")
  const [fileName, setFileName] = useState("")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setState("dragging")
  }, [])

  const handleDragLeave = useCallback(() => {
    setState("idle")
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) simulateUpload(file.name)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) simulateUpload(file.name)
  }, [])

  const simulateUpload = (name: string) => {
    setFileName(name)
    setState("uploading")
    setTimeout(() => {
      setState("success")
      setTimeout(() => setState("idle"), 3000)
    }, 2500)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">
        Upload Waveform Data
      </h3>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all",
          state === "dragging"
            ? "border-primary bg-primary/5"
            : state === "success"
            ? "border-success bg-success/5"
            : "border-border hover:border-primary/40"
        )}
      >
        {state === "uploading" ? (
          <>
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-sm font-medium text-card-foreground">
              Processing {fileName}...
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Uploading to S3 and normalizing
            </p>
          </>
        ) : state === "success" ? (
          <>
            <CheckCircle2 className="h-10 w-10 text-success" />
            <p className="mt-4 text-sm font-medium text-success">Upload Complete</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {fileName} queued for analysis
            </p>
          </>
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <p className="mt-4 text-sm font-medium text-card-foreground">
              Drag and drop your waveform file
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Supports .csv and .json formats
            </p>
            <label className="mt-4 cursor-pointer rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Browse Files
              <input
                type="file"
                accept=".csv,.json"
                className="sr-only"
                onChange={handleFileSelect}
              />
            </label>
          </>
        )}
      </div>
    </div>
  )
}
