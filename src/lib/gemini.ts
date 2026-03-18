import { GoogleGenerativeAI } from "@google/generative-ai";

const ANALYSIS_PROMPT = `You are an expert screen analyst. Analyze this screenshot in thorough detail.

Break down EVERYTHING you see into structured categories. Be extremely detailed and insightful.

Return your analysis in the following JSON format (no markdown, raw JSON only):
{
  "title": "A concise, descriptive title for what this screen shows",
  "summary": "A 2-3 sentence executive summary of what's on screen",
  "app_context": {
    "app_name": "The app or website name if identifiable",
    "platform": "iOS/Android/Web/Desktop",
    "screen_type": "What type of screen this is (e.g., settings, feed, chat, dashboard, etc.)"
  },
  "sections": [
    {
      "heading": "Section name",
      "content": "Detailed description of this section",
      "elements": ["List of UI elements or content items in this section"],
      "data_points": ["Any specific data, numbers, stats, or metrics visible"],
      "insights": "Any notable observations about this section"
    }
  ],
  "visual_design": {
    "color_scheme": "Description of colors used",
    "layout_style": "Description of layout approach",
    "typography": "Notable typography choices",
    "overall_aesthetic": "General design quality assessment"
  },
  "content_analysis": {
    "primary_content": "The main content or purpose of this screen",
    "key_information": ["List of the most important pieces of information"],
    "user_actions": ["What actions the user can take on this screen"],
    "notifications_or_alerts": ["Any notifications, badges, or alerts visible"]
  },
  "technical_observations": ["Any technical details noticeable (status bar info, connectivity, battery, time, etc.)"],
  "interesting_findings": ["Unique or noteworthy things about this screenshot"]
}`;

export async function analyzeImageWithGemini(
  base64Image: string,
  mimeType: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent([
    { text: ANALYSIS_PROMPT },
    {
      inlineData: {
        mimeType,
        data: base64Image,
      },
    },
  ]);

  const response = result.response;
  return response.text();
}
