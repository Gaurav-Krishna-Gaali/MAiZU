"use client"

import { CheckCircle2, Loader2, Upload } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { sendWaveform } from "@/lib/api"

interface UploadZoneProps {
  onResult?: (data: any) => void;
  showRaw?: boolean;
}

export function UploadZone({ onResult, showRaw = false }: UploadZoneProps) {
  const [state, setState] = useState<"idle" | "dragging" | "uploading" | "success">("idle")
  const [fileName, setFileName] = useState("")
  const [response, setResponse] = useState<string | null>(null)
  const [parsedData, setParsedData] = useState<any>(null)

  const normalizeApiResponse = (resp: any) => {
    if (!resp) return resp

    const parseMaybeFencedJson = (raw: string) => {
      const trimmed = raw.trim()
      if (trimmed.startsWith("```")) {
        const match = trimmed.match(/```[a-zA-Z]*\n([\s\S]*?)```/)
        if (match && match[1]) {
          try {
            return JSON.parse(match[1])
          } catch (e) {
            console.warn("Failed to parse fenced JSON payload", e)
          }
        }
      }
      try {
        return JSON.parse(trimmed)
      } catch (e) {
        console.warn("Failed to parse JSON payload", e)
        return null
      }
    }

    const tryParseInner = (node: any) => {
      if (!node) return null
      const text = typeof node.content?.[0]?.text === "string" ? node.content[0].text : null
      if (!text) return null
      return parseMaybeFencedJson(text)
    }

    // 1) Direct Anthropic-style message
    const direct = tryParseInner(resp)
    if (direct) return direct

    // 2) Wrapped in result / data
    const fromResult = tryParseInner(resp.result)
    if (fromResult) return fromResult
    const fromData = tryParseInner(resp.data)
    if (fromData) return fromData

    // 3) Flatten result/data if they already look like the final object
    if (resp.result && (resp.result.diagnosis || resp.result.organ_scores)) {
      return resp.result
    }
    if (resp.data && (resp.data.diagnosis || resp.data.organ_scores)) {
      return resp.data
    }

    return resp
  }

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
    if (file) processFile(file)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }, [])

  const processFile = (file: File) => {
    setFileName(file.name)
    setState("uploading")
    setResponse(null)

    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const text = reader.result as string
        const json = JSON.parse(text)
        const resp = await sendWaveform(json)
        const normalized = normalizeApiResponse(resp)
        setResponse(JSON.stringify(normalized, null, 2))
        setParsedData(normalized)
        if (onResult) onResult(normalized)
        setState("success")
        setTimeout(() => setState("idle"), 3000)
      } catch (err) {
        console.error(err)
        setResponse(String(err))
        setState("idle")
        alert("Failed to upload payload: " + err)
      }
    }
    reader.onerror = () => {
      console.error(reader.error)
      setState("idle")
      alert("Unable to read file")
    }
    reader.readAsText(file)
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
      {showRaw && response && (
        <pre className="mt-4 max-h-40 overflow-auto rounded bg-[#F5F5F5] p-2 text-xs">
          {response}
        </pre>
      )}
    </div>
  )
}
