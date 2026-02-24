import React from "react"

interface AnalysisSummaryProps {
  data: any
}

export function AnalysisSummary({ data }: AnalysisSummaryProps) {
  const primary = data.diagnosis?.primary
  return (
    <div className="rounded-2xl bg-[#ffffff] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] mb-8">
      <h3 className="text-lg font-semibold text-[#111827]">Latest Analysis</h3>
      {primary ? (
        <p className="mt-2 text-sm">
          <strong>Primary pattern:</strong> {primary.pattern} ({primary.confidence_pct}%)
        </p>
      ) : (
        <p className="mt-2 text-sm text-[#676767]">No diagnosis available.</p>
      )}

      {data.reasoning && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold">Reasoning</h4>
          <p className="text-xs whitespace-pre-wrap">{data.reasoning}</p>
        </div>
      )}

      {data.recommendations && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold">Recommendations</h4>
          <ul className="mt-1 list-disc list-inside text-xs">
            {data.recommendations.acupressure_points?.length && (
              <li>
                <strong>Acupressure:</strong>{" "}
                {data.recommendations.acupressure_points.join(", ")}
              </li>
            )}
            {data.recommendations.lifestyle && (
              <li>
                <strong>Lifestyle:</strong> {data.recommendations.lifestyle}
              </li>
            )}
            {data.recommendations.follow_up && (
              <li>
                <strong>Follow-up:</strong> {data.recommendations.follow_up}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
