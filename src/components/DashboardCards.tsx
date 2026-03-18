"use client";

import { DynamicIcon } from "./IconMap";

interface StatItem {
  label: string;
  value: string;
}

interface CardContent {
  text?: string;
  items?: string[];
  stats?: StatItem[];
  tags?: string[];
  quote?: string;
  attribution?: string;
}

interface DashboardCard {
  title: string;
  icon: string;
  accent_color: string;
  size: "small" | "medium" | "large";
  content_type: "text" | "list" | "stats" | "tags" | "quote";
  content: CardContent;
  footer?: string;
}

interface HeroCard {
  title: string;
  subtitle: string;
  icon: string;
  accent_color: string;
  content: string;
  badges: string[];
}

interface DashboardData {
  dashboard_title: string;
  dashboard_subtitle: string;
  hero_card: HeroCard;
  cards: DashboardCard[];
}

const accentClasses: Record<string, { bg: string; text: string; border: string; badge: string; glow: string }> = {
  purple: {
    bg: "bg-accent-purple/10",
    text: "text-accent-purple",
    border: "border-accent-purple/20",
    badge: "bg-accent-purple/20 text-accent-purple",
    glow: "shadow-accent-purple/10",
  },
  blue: {
    bg: "bg-accent-blue/10",
    text: "text-accent-blue",
    border: "border-accent-blue/20",
    badge: "bg-accent-blue/20 text-accent-blue",
    glow: "shadow-accent-blue/10",
  },
  cyan: {
    bg: "bg-accent-cyan/10",
    text: "text-accent-cyan",
    border: "border-accent-cyan/20",
    badge: "bg-accent-cyan/20 text-accent-cyan",
    glow: "shadow-accent-cyan/10",
  },
  emerald: {
    bg: "bg-accent-emerald/10",
    text: "text-accent-emerald",
    border: "border-accent-emerald/20",
    badge: "bg-accent-emerald/20 text-accent-emerald",
    glow: "shadow-accent-emerald/10",
  },
  amber: {
    bg: "bg-accent-amber/10",
    text: "text-accent-amber",
    border: "border-accent-amber/20",
    badge: "bg-accent-amber/20 text-accent-amber",
    glow: "shadow-accent-amber/10",
  },
  rose: {
    bg: "bg-accent-rose/10",
    text: "text-accent-rose",
    border: "border-accent-rose/20",
    badge: "bg-accent-rose/20 text-accent-rose",
    glow: "shadow-accent-rose/10",
  },
  pink: {
    bg: "bg-accent-pink/10",
    text: "text-accent-pink",
    border: "border-accent-pink/20",
    badge: "bg-accent-pink/20 text-accent-pink",
    glow: "shadow-accent-pink/10",
  },
};

function getAccent(color: string) {
  return accentClasses[color] || accentClasses.purple;
}

function sizeToSpan(size: string) {
  switch (size) {
    case "large":
      return "md:col-span-2";
    case "medium":
      return "md:col-span-1";
    case "small":
    default:
      return "md:col-span-1";
  }
}

function HeroCardComponent({ card }: { card: HeroCard }) {
  const accent = getAccent(card.accent_color);
  return (
    <div className="animate-fade-in-up mb-8">
      <div
        className={`card-gradient rounded-2xl border border-border-subtle p-8 relative overflow-hidden glow-border shadow-lg ${accent.glow}`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-purple/5 to-transparent rounded-bl-full" />
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-14 h-14 rounded-xl ${accent.bg} flex items-center justify-center shrink-0`}>
              <DynamicIcon name={card.icon} className={`w-7 h-7 ${accent.text}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary leading-tight">
                {card.title}
              </h2>
              <p className="text-text-secondary mt-1">{card.subtitle}</p>
            </div>
          </div>
          <p className="text-text-secondary leading-relaxed mb-5 text-base">
            {card.content}
          </p>
          {card.badges?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {card.badges.map((badge, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${accent.badge}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TextContent({ content, accent }: { content: CardContent; accent: string }) {
  const a = getAccent(accent);
  return (
    <p className={`text-text-secondary text-sm leading-relaxed ${a.text ? "" : ""}`}>
      {content.text}
    </p>
  );
}

function ListContent({ content, accent }: { content: CardContent; accent: string }) {
  const a = getAccent(accent);
  return (
    <ul className="space-y-2.5">
      {content.items?.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm">
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${a.bg} shrink-0 ring-2 ${a.border}`} />
          <span className="text-text-secondary">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StatsContent({ content, accent }: { content: CardContent; accent: string }) {
  const a = getAccent(accent);
  return (
    <div className="grid grid-cols-2 gap-3">
      {content.stats?.map((stat, i) => (
        <div key={i} className={`rounded-xl ${a.bg} p-3`}>
          <div className={`text-lg font-bold ${a.text}`}>{stat.value}</div>
          <div className="text-text-muted text-xs mt-0.5">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function TagsContent({ content, accent }: { content: CardContent; accent: string }) {
  const a = getAccent(accent);
  return (
    <div className="flex flex-wrap gap-2">
      {content.tags?.map((tag, i) => (
        <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${a.badge} border ${a.border}`}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function QuoteContent({ content, accent }: { content: CardContent; accent: string }) {
  const a = getAccent(accent);
  return (
    <div>
      <div className={`border-l-[3px] ${a.border} pl-4`}>
        <p className="text-text-secondary text-sm italic leading-relaxed">
          &ldquo;{content.quote}&rdquo;
        </p>
        {content.attribution && (
          <p className={`mt-2 text-xs ${a.text} font-medium`}>
            &mdash; {content.attribution}
          </p>
        )}
      </div>
    </div>
  );
}

function CardComponent({ card, index }: { card: DashboardCard; index: number }) {
  const accent = getAccent(card.accent_color);
  const span = sizeToSpan(card.size);

  const renderContent = () => {
    switch (card.content_type) {
      case "list":
        return <ListContent content={card.content} accent={card.accent_color} />;
      case "stats":
        return <StatsContent content={card.content} accent={card.accent_color} />;
      case "tags":
        return <TagsContent content={card.content} accent={card.accent_color} />;
      case "quote":
        return <QuoteContent content={card.content} accent={card.accent_color} />;
      case "text":
      default:
        return <TextContent content={card.content} accent={card.accent_color} />;
    }
  };

  return (
    <div
      className={`animate-fade-in-up ${span}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="card-gradient rounded-xl border border-border-subtle p-5 h-full flex flex-col glow-border hover:border-border-subtle/80 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded-lg ${accent.bg} flex items-center justify-center shrink-0`}>
            <DynamicIcon name={card.icon} className={`w-4.5 h-4.5 ${accent.text}`} />
          </div>
          <h3 className="font-semibold text-text-primary text-sm leading-snug">
            {card.title}
          </h3>
        </div>
        <div className="flex-1">{renderContent()}</div>
        {card.footer && (
          <div className="mt-4 pt-3 border-t border-border-subtle">
            <p className="text-text-muted text-xs">{card.footer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface DashboardCardsProps {
  data: DashboardData;
  screenshotPreview: string;
}

export default function DashboardCards({ data, screenshotPreview }: DashboardCardsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan bg-clip-text text-transparent mb-2">
          {data.dashboard_title}
        </h1>
        <p className="text-text-secondary text-lg">{data.dashboard_subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <HeroCardComponent card={data.hero_card} />
        </div>
        <div className="lg:col-span-1">
          <div className="card-gradient rounded-2xl border border-border-subtle overflow-hidden h-full animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="p-3 text-center text-text-muted text-xs font-medium tracking-wide uppercase">
              Source Screenshot
            </div>
            <img
              src={screenshotPreview}
              alt="Analyzed screenshot"
              className="w-full object-contain max-h-[300px] bg-black/20"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.cards.map((card, i) => (
          <CardComponent key={i} card={card} index={i} />
        ))}
      </div>
    </div>
  );
}
