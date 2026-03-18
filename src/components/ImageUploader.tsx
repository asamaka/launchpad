"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, Clipboard, Image as ImageIcon, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (dataUrl: string, mimeType: string) => void;
  isProcessing: boolean;
}

export default function ImageUploader({
  onImageSelected,
  isProcessing,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        onImageSelected(dataUrl, file.type);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) processFile(file);
          break;
        }
      }
    },
    [processFile]
  );

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const clearPreview = () => {
    setPreview(null);
  };

  if (isProcessing) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="card-gradient rounded-2xl border border-border-subtle p-12 text-center animate-pulse-glow">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-accent-purple/20 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-accent-purple animate-spin" />
              </div>
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-accent-purple/30 animate-ping" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Analyzing your screenshot...
              </h3>
              <p className="text-text-secondary text-sm">
                Gemini is reading every pixel, then Opus crafts your dashboard
              </p>
            </div>
            <div className="w-full max-w-xs">
              <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan rounded-full animate-shimmer" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {preview ? (
        <div className="animate-scale-in">
          <div className="card-gradient rounded-2xl border border-border-subtle overflow-hidden">
            <div className="relative">
              <img
                src={preview}
                alt="Screenshot preview"
                className="w-full max-h-[400px] object-contain bg-black/30"
              />
              <button
                onClick={clearPreview}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 glass flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <ImageIcon className="w-4 h-4" />
                <span>Screenshot loaded — ready for analysis</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed p-16 text-center
            transition-all duration-300
            ${
              isDragging
                ? "border-accent-purple bg-accent-purple/5 scale-[1.02]"
                : "border-border-subtle hover:border-accent-purple/50 hover:bg-bg-card/50"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
            }}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-5">
            <div
              className={`
                w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                ${isDragging ? "bg-accent-purple/20" : "bg-bg-card"}
              `}
            >
              <Upload
                className={`w-8 h-8 transition-colors ${isDragging ? "text-accent-purple" : "text-text-muted"}`}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                Drop your screenshot here
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                or click to browse files
              </p>
            </div>

            <div className="flex items-center gap-3 text-text-muted text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-card border border-border-subtle">
                <Clipboard className="w-3 h-3" />
                <span>Ctrl+V to paste</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-card border border-border-subtle">
                <ImageIcon className="w-3 h-3" />
                <span>PNG, JPG, WebP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
