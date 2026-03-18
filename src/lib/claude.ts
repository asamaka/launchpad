import Anthropic from "@anthropic-ai/sdk";

const CARD_DESIGN_PROMPT = `You are a world-class dashboard designer. You receive a JSON analysis of a screenshot and your job is to transform it into a beautiful card-based dashboard layout.

IMPORTANT: Return ONLY valid JSON, no markdown fences, no explanation outside the JSON.

Design a set of cards that present the analysis data in the most visually appealing and informative way possible. Each card should focus on a specific aspect of the analysis.

Return a JSON object with this structure:
{
  "dashboard_title": "A catchy, descriptive title for this dashboard",
  "dashboard_subtitle": "A brief tagline",
  "hero_card": {
    "title": "The main headline card title",
    "subtitle": "Supporting text",
    "icon": "one of: smartphone, monitor, layout, zap, eye, globe, palette, code, shield, bell, star, heart, info, alertTriangle, checkCircle, clock, mapPin, users, settings, trending, barChart, pieChart, activity, cpu, database, wifi, camera, image, messageCircle, mail, search, filter, layers, grid, list, hash, tag, bookmark, award, target, compass, navigation, terminal, briefcase, shoppingCart, music, film, mic",
    "accent_color": "one of: purple, blue, cyan, emerald, amber, rose, pink",
    "content": "Main content text for the hero card",
    "badges": ["badge1", "badge2"]
  },
  "cards": [
    {
      "title": "Card title",
      "icon": "icon name from the list above",
      "accent_color": "color from the list above",
      "size": "small or medium or large",
      "content_type": "text or list or stats or tags or quote",
      "content": {
        "text": "For text type - the main text content",
        "items": ["For list type - array of items"],
        "stats": [{"label": "Stat name", "value": "Stat value"}],
        "tags": ["For tags type - array of tag strings"],
        "quote": "For quote type - a notable quote or finding",
        "attribution": "For quote type - who/what said it"
      },
      "footer": "Optional footer text"
    }
  ]
}

Design guidelines:
- Use varied card sizes for visual interest (mix of small, medium, large)
- Use varied content types (text, list, stats, tags, quote)
- Choose icons that semantically match the content
- Use different accent colors for visual variety
- Create 6-12 cards depending on how much content is available
- Make card titles punchy and descriptive
- Hero card should capture the essence of the screenshot
- Group related information logically
- Include all key information from the analysis
- Make it feel like a premium analytics dashboard`;

export async function generateDashboardWithClaude(
  geminiAnalysis: string
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 8192,
    messages: [
      {
        role: "user",
        content: `${CARD_DESIGN_PROMPT}\n\nHere is the screenshot analysis from Gemini:\n\n${geminiAnalysis}`,
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  return textBlock.text;
}
