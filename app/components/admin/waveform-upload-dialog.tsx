"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, FileText, X, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface WaveformUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userName: string
  userId: string
  onUploadComplete: (userId: string) => void
}

export function WaveformUploadDialog({
  open,
  onOpenChange,
  userName,
  userId,
  onUploadComplete,
}: WaveformUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) return
    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      setUploaded(true)
      onUploadComplete(userId)
      setTimeout(() => {
        setFile(null)
        setUploaded(false)
        onOpenChange(false)
      }, 1200)
    }, 1500)
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setFile(null)
      setUploaded(false)
      setUploading(false)
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-[#e1e3e8] bg-[#ffffff] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#111827]">Upload Waveform Data</DialogTitle>
          <DialogDescription className="text-[#676767]">
            Upload pulse waveform data for <span className="font-medium text-[#111827]">{userName}</span>
          </DialogDescription>
        </DialogHeader>

        {uploaded ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle2 className="h-12 w-12 text-[#27ae60]" />
            <p className="text-sm font-medium text-[#111827]">Upload Complete</p>
            <p className="text-xs text-[#676767]">Waveform data has been processed successfully.</p>
          </div>
        ) : (
          <div
            className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-10 transition-colors ${
              dragActive
                ? "border-[#46913c] bg-[#e4f3ea]/50"
                : file
                  ? "border-[#27ae60] bg-[#e4f3ea]/30"
                  : "border-[#dadada] bg-[#fafafa]"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f3ea]">
                  <FileText className="h-5 w-5 text-[#276220]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[#111827]">{file.name}</p>
                  <p className="text-xs text-[#676767]">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="absolute right-3 top-3 rounded-lg p-1 text-[#bababa] transition-colors hover:bg-[#e7e7e7] hover:text-[#676767]"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7e7e7]">
                  <Upload className="h-5 w-5 text-[#676767]" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#111827]">
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="font-medium text-[#276220] hover:underline"
                    >
                      Choose file
                    </button>
                    {" or drag and drop"}
                  </p>
                  <p className="mt-1 text-xs text-[#bababa]">CSV, JSON, or WAV up to 10MB</p>
                </div>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.json,.wav"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload waveform file"
            />
          </div>
        )}

        {!uploaded && (
          <DialogFooter>
            <Button variant="outline" onClick={() => handleClose(false)} className="border-[#e1e3e8] text-[#676767]">
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="bg-[#276220] text-[#ffffff] hover:bg-[#46913c] disabled:opacity-50"
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Upload Waveform"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
