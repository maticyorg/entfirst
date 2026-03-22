import { MotionSection } from "@/components/motion-section";
import {
  Rss,
  MessagesSquare,
  Youtube,
  Mic2,
  CalendarDays,
  BarChart3,
  Cpu,
} from "lucide-react";

const sources = [
  { icon: Rss, label: "News & media", desc: "Articles, wires, and publisher feeds" },
  { icon: MessagesSquare, label: "Forums & text", desc: "Discussion and long-form text surfaces" },
  { icon: Youtube, label: "YouTube segments", desc: "Moving media with timestamp deep links" },
  { icon: Mic2, label: "Podcast segments", desc: "Episode-accurate clips and citations" },
  { icon: CalendarDays, label: "Calendar", desc: "Events, fixtures, and scheduled moments" },
  { icon: BarChart3, label: "Statistics", desc: "Structured metrics that ground narratives" },
];

export function Engine() {
  return (
    <MotionSection id="engine" className="scroll-mt-24 py-24 sm:py-28 border-b border-white/10 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(34,197,94,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-mono text-brand tracking-wide">Platform</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
          One engine. Every signal.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          All Enterprise First products run on the same media intelligence core—normalize, enrich, and
          deliver what your teams actually use.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
          <div className="relative rounded-2xl border border-white/10 bg-zinc-900/40 p-8 ef-grid min-h-[320px] flex items-center justify-center">
            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-brand/40 bg-zinc-950 shadow-[0_0_60px_rgba(34,197,94,0.2)]">
                <Cpu className="h-10 w-10 text-brand" aria-hidden />
              </div>
              <p className="font-mono text-sm text-muted-foreground">Media Intelligence Engine</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                {sources.map((s) => (
                  <span
                    key={s.label}
                    className="text-xs font-mono px-2 py-1 rounded-md border border-white/10 bg-black/30 text-zinc-300"
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
            {/* Decorative flow lines */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent animate-pulse" />
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 gap-4">
            {sources.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.label}
                  className="flex gap-4 rounded-xl border border-white/10 bg-card/50 p-4 hover:border-brand/25 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="font-medium">{s.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <blockquote className="rounded-xl border-l-2 border-brand/40 bg-zinc-900/30 px-5 py-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              &ldquo;AI is a driving factor throughout the entire media production chain, from creation
              to distribution. Content can be continuously analyzed and adapted based on direct feedback
              from users.&rdquo;
            </p>
            <footer className="mt-3 text-xs font-mono text-zinc-500">
              Deloitte &mdash; Digital Media Trends
            </footer>
          </blockquote>
          <blockquote className="rounded-xl border-l-2 border-brand/40 bg-zinc-900/30 px-5 py-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              &ldquo;Future media consumers will expect immediate, seamless access to relevant content
              across multiple platforms. Data- and insight-driven strategies are increasingly important
              for creating value.&rdquo;
            </p>
            <footer className="mt-3 text-xs font-mono text-zinc-500">
              PwC &mdash; Global Entertainment &amp; Media Outlook
            </footer>
          </blockquote>
        </div>
      </div>
    </MotionSection>
  );
}
