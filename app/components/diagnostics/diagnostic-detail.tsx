"use client"

import type { DiagnosticSnapshot } from "@/lib/pulse-data"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { AlertCircle, Brain, Heart, MessageSquare, Stethoscope } from "lucide-react"

interface DiagnosticDetailProps {
  diagnostic: DiagnosticSnapshot
}

export function DiagnosticDetail({ diagnostic }: DiagnosticDetailProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Diagnostic Snapshot
              </h3>
              <span className="font-mono text-xs text-muted-foreground">{diagnostic.id}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Patient: {diagnostic.patientId} | {diagnostic.metadata.position} |{" "}
              {diagnostic.metadata.pressure} pressure
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Overall Confidence</p>
              <p className="text-2xl font-bold text-primary">
                {Math.round(diagnostic.overallConfidence * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waveform mini chart */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold text-card-foreground">Waveform Profile</h4>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={diagnostic.waveformData.slice(0, 100)} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="detailGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.15 180)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="oklch(0.72 0.15 180)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.008 260)" />
              <XAxis dataKey="time" tick={false} axisLine={{ stroke: "oklch(0.25 0.008 260)" }} />
              <YAxis tick={{ fontSize: 9, fill: "oklch(0.60 0.01 260)" }} axisLine={{ stroke: "oklch(0.25 0.008 260)" }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.005 260)",
                  border: "1px solid oklch(0.25 0.008 260)",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "oklch(0.95 0.005 260)",
                }}
              />
              <Area type="monotone" dataKey="amplitude" stroke="oklch(0.72 0.15 180)" strokeWidth={1.5} fill="url(#detailGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span>Sample Rate: {diagnostic.metadata.sampleRate} Hz</span>
          <span>Duration: {diagnostic.metadata.duration}s</span>
          <span>Position: {diagnostic.metadata.position}</span>
        </div>
      </div>

      {/* Pattern mapping */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Pulse Qualities */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-card-foreground">Pulse Qualities</h4>
          </div>
          <div className="flex flex-col gap-3">
            {diagnostic.pulseQualities.map((quality) => (
              <div key={quality.name} className="rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-card-foreground">{quality.name}</p>
                  <span className="text-xs font-semibold text-primary">
                    {Math.round(quality.confidence * 100)}%
                  </span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${quality.confidence * 100}%` }}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {quality.features.map((f) => (
                    <span key={f} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TCM Patterns */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-card-foreground">TCM Patterns</h4>
          </div>
          <div className="flex flex-col gap-3">
            {diagnostic.patterns.map((pattern) => (
              <div key={pattern.name} className="rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{pattern.name}</p>
                    <span className="text-[10px] text-muted-foreground">{pattern.category}</span>
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    {Math.round(pattern.confidence * 100)}%
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {pattern.description}
                </p>
                <div className="mt-2">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    Recommendations
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {pattern.recommendations.map((rec) => (
                      <li key={rec} className="text-[11px] text-card-foreground/80">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Rationale */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold text-card-foreground">AI Rationale</h4>
        </div>
        <p className="text-sm text-card-foreground/90 leading-relaxed">
          {diagnostic.rationale}
        </p>
      </div>

      {/* Clarification Questions */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-warning" />
          <h4 className="text-sm font-semibold text-card-foreground">
            Practitioner Review Questions
          </h4>
        </div>
        <div className="flex flex-col gap-2">
          {diagnostic.clarificationQuestions.map((q, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-warning/5 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-warning/10 text-[10px] font-bold text-warning">
                {i + 1}
              </span>
              <p className="text-xs text-card-foreground leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
