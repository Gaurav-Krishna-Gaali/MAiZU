"use client"

interface InsightCardProps {
  analysisData?: any
}

export function InsightCard({ analysisData }: InsightCardProps) {
  if (!analysisData) return null

  const diagnosis = analysisData.diagnosis || {}
  const primary = diagnosis.primary
  const isHealthy = diagnosis.is_healthy as boolean | undefined
  const isCompound = diagnosis.is_compound as boolean | undefined
  const compoundName = diagnosis.compound_name as string | null | undefined
  const reasoning = analysisData.reasoning as string | undefined
  const contradictions = analysisData.contradictions as string | undefined

  const title = "Mai Insight"
  const badgeText = isHealthy ? "Balanced" : "Needs attention"
  const badgeClasses = isHealthy
    ? "bg-[#e4f3ea] text-[#276220]"
    : "bg-[#fff2e5] text-[#b45f06]"

  let summaryLine = ""
  if (isCompound && compoundName) {
    summaryLine = `Compound pattern: ${compoundName}.`
  } else if (primary?.pattern) {
    summaryLine = `Primary pattern: ${primary.pattern}.`
  } else if (isHealthy) {
    summaryLine = "Your pulse pattern appears broadly balanced."
  }

  return (
    <div className="rounded-2xl bg-[#ffffff] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClasses}`}>
          {badgeText}
        </span>
      </div>

      {summaryLine && (
        <p className="mt-2 text-sm leading-relaxed text-[#111827]">
          {summaryLine}
        </p>
      )}

      {reasoning && (
        <p className="mt-2 text-xs leading-relaxed text-[#4b5563] whitespace-pre-wrap">
          {reasoning}
        </p>
      )}

      {contradictions && contradictions !== "None" && (
        <p className="mt-3 text-xs leading-relaxed text-[#9b1c1c]">
          <span className="font-semibold">Contradictions:</span> {contradictions}
        </p>
      )}

      {!reasoning && !contradictions && (
        <p className="mt-2 text-xs text-[#676767]">
          Insights will appear here after your pulse waveform has been analysed.
        </p>
      )}
    </div>
  )
}

