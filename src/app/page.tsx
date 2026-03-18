"use client";

import { useState, useCallback } from "react";
import { Sparkles, RotateCcw, Github } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import DashboardCards from "@/components/DashboardCards";
import FallbackAnalysis from "@/components/FallbackAnalysis";

interface AnalysisResult {
  geminiAnalysis: string;
  dashboard: Record<string, unknown> | null;
  fallback: boolean;
  error?: string;
}

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>("");

  const handleImageSelected = useCallback(
    async (dataUrl: string, mimeType: string) => {
      setIsProcessing(true);
      setErrorMessage(null);
      setResult(null);
      setScreenshotPreview(dataUrl);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: dataUrl, mimeType }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.error || "Analysis failed");
        } else {
          setResult(data);
        }
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "Network error occurred"
        );
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
    setScreenshotPreview("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-purple/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-blue/[0.03] blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-accent-cyan/[0.02] blur-[100px]" />
      </div>

      {/* Header */}
      <header className="w-full border-b border-border-subtle/50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-primary tracking-tight">
                Thinx<span className="text-accent-purple">.fun</span>
              </h1>
              <p className="text-[10px] text-text-muted uppercase tracking-widest leading-none mt-0.5">
                Screenshot Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {result && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-border-subtle text-text-secondary text-sm hover:text-text-primary hover:border-border-glow/30 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                New Analysis
              </button>
            )}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {errorMessage && !result && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/20 text-accent-rose text-sm text-center animate-fade-in-up">
            {errorMessage}
          </div>
        )}

        {!result ? (
          <div className="flex flex-col items-center">
            {/* Hero Section */}
            <div className="text-center mb-12 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-medium mb-6">
                <Sparkles className="w-3 h-3" />
                Powered by Gemini + Opus
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
                Turn any screenshot into an{" "}
                <span className="bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan bg-clip-text text-transparent">
                  insight dashboard
                </span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Drop an iPhone screenshot and watch as AI extracts every detail,
                then beautifully organizes it into an interactive card dashboard.
              </p>
            </div>

            <ImageUploader
              onImageSelected={handleImageSelected}
              isProcessing={isProcessing}
            />

            {/* Feature pills */}
            {!isProcessing && (
              <div className="mt-12 flex flex-wrap justify-center gap-4 text-text-muted text-xs">
                {[
                  "Gemini vision analysis",
                  "Opus card design",
                  "Works with any screenshot",
                  "Clipboard paste support",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-card/50 border border-border-subtle/50"
                  >
                    <div className="w-1 h-1 rounded-full bg-accent-emerald" />
                    {f}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : result.dashboard && !result.fallback ? (
          <DashboardCards
            data={result.dashboard as never}
            screenshotPreview={screenshotPreview}
          />
        ) : (
          <FallbackAnalysis
            analysis={result.geminiAnalysis}
            error={result.error}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border-subtle/50 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-text-muted text-xs">
          <span>Thinx.fun &mdash; Screenshot Intelligence</span>
          <span>
            Built with Gemini &bull; Opus &bull; Next.js
          </span>
        </div>
      </footer>
    </div>
  );
}
