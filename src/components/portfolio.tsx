import { MotionSection } from "@/components/motion-section";
import { ExternalLink, Zap } from "lucide-react";

const products = [
  {
    name: "Kurerad",
    vertical: "Sports media",
    description:
      "AI-curated match content, video segments with deep links, and news feeds for supporter communities.",
    color: "from-emerald-950/60 to-zinc-950",
  },
  {
    name: "MatchFokus",
    vertical: "Football analytics",
    description:
      "Match-week highlights, deep-linked clips, and editorial tools for rights holders, fans, and sponsors.",
    color: "from-amber-950/40 to-zinc-950",
  },
  {
    name: "NewsApper",
    vertical: "News & PR agencies",
    description:
      "Media monitoring and AI-powered newsroom with source confirmation, competing with Cision and Meltwater.",
    color: "from-blue-950/40 to-zinc-950",
  },
  {
    name: "GG Sweden",
    vertical: "Esports & gaming",
    description:
      "Competitive gaming content hub with tournament coverage and community-driven highlights.",
    color: "from-violet-950/40 to-zinc-950",
  },
  {
    name: "Pajen",
    vertical: "Entertainment",
    description:
      "Niche audience capture with trend-driven content and segment-specific landing experiences.",
    color: "from-rose-950/40 to-zinc-950",
  },
];

export function Portfolio() {
  return (
    <MotionSection
      id="portfolio"
      className="scroll-mt-24 py-24 sm:py-28 border-b border-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-mono text-brand tracking-wide">Portfolio</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
          Built on the engine
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          Same engine, different markets. Each vertical deployed in days, not months.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-sm font-mono text-brand">
          <Zap className="h-3.5 w-3.5" aria-hidden />
          6&ndash;8 hours to market
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.name}
              className={`group relative rounded-2xl border border-white/10 bg-gradient-to-br ${p.color} p-6 transition-all hover:border-brand/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.08)]`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold font-mono">{p.name}</h3>
                  <span className="mt-1 inline-block rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-xs font-mono text-zinc-400">
                    {p.vertical}
                  </span>
                </div>
                <ExternalLink
                  className="h-4 w-4 text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
