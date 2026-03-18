"use client";

import { AlertTriangle } from "lucide-react";

interface FallbackAnalysisProps {
  analysis: string;
  error?: string;
}

export default function FallbackAnalysis({ analysis, error }: FallbackAnalysisProps) {
  let parsed: Record<string, unknown> | null = null;
  try {
    let cleaned = analysis.trim();
    const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) cleaned = fenceMatch[1].trim();
    parsed = JSON.parse(cleaned);
  } catch {
    // not JSON — display raw
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      {error && (
        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-accent-amber/10 border border-accent-amber/20">
          <AlertTriangle className="w-5 h-5 text-accent-amber shrink-0" />
          <p className="text-accent-amber text-sm">{error}</p>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Gemini Analysis Results
        </h2>
        <p className="text-text-secondary text-sm">Raw analysis output</p>
      </div>

      {parsed ? (
        <div className="card-gradient rounded-2xl border border-border-subtle p-6">
          <pre className="text-text-secondary text-sm whitespace-pre-wrap overflow-auto leading-relaxed font-mono">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="card-gradient rounded-2xl border border-border-subtle p-6">
          <p className="text-text-secondary text-sm whitespace-pre-wrap leading-relaxed">
            {analysis}
          </p>
        </div>
      )}
    </div>
  );
}
