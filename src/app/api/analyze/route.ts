import { NextRequest, NextResponse } from "next/server";
import { analyzeImageWithGemini } from "@/lib/gemini";
import { generateDashboardWithClaude } from "@/lib/claude";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const { image, mimeType } = await request.json();

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: "Image data and MIME type are required" },
        { status: 400 }
      );
    }

    const base64Data = image.includes(",") ? image.split(",")[1] : image;

    const geminiAnalysis = await analyzeImageWithGemini(base64Data, mimeType);

    let dashboardJson: string;
    try {
      dashboardJson = await generateDashboardWithClaude(geminiAnalysis);
    } catch (claudeError) {
      console.error("Claude error, falling back to raw Gemini output:", claudeError);
      return NextResponse.json({
        geminiAnalysis,
        dashboard: null,
        fallback: true,
        error: "Claude processing failed — showing raw Gemini analysis",
      });
    }

    let cleanJson = dashboardJson.trim();
    const fenceMatch = cleanJson.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      cleanJson = fenceMatch[1].trim();
    }

    let dashboard;
    try {
      dashboard = JSON.parse(cleanJson);
    } catch {
      console.error("Failed to parse Claude JSON, raw output:", dashboardJson);
      return NextResponse.json({
        geminiAnalysis,
        dashboard: null,
        rawClaudeOutput: dashboardJson,
        fallback: true,
        error: "Failed to parse dashboard layout",
      });
    }

    return NextResponse.json({
      geminiAnalysis,
      dashboard,
      fallback: false,
    });
  } catch (error: unknown) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
