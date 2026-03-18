# Thinx.fun — Screenshot Intelligence

Turn any screenshot into a beautiful AI-powered insight dashboard.

## How it works

1. **Upload or paste** an iPhone screenshot (or any image)
2. **Gemini 2.5 Flash** analyzes every pixel and extracts structured insights
3. **Claude Opus** transforms that analysis into a card-based dashboard design
4. The frontend renders a beautiful, interactive dashboard of cards

## Setup

```bash
npm install
```

Create a `.env.local` file with your API keys:

```
GEMINI_API_KEY=your_gemini_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 15** with App Router
- **Tailwind CSS v4** for styling
- **Google Gemini 2.5 Flash** for image analysis
- **Anthropic Claude Opus 4.6** for dashboard design
- **Lucide React** for icons
