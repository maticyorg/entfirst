import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionSection } from "@/components/motion-section";
import {
  FileText,
  Radar,
  MapPin,
  Newspaper,
  LayoutGrid,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Content to Page",
    badge: "10% of agency cost",
    short:
      "E-E-A-T compliant articles with 30\u201350 verified sources each\u2014up to 8 per day, at 10\u2009% the cost of a traditional SEO agency.",
    details:
      "Each article is a permanent asset. On a high-authority domain Google indexes within days. 10 articles \u2248 3\u2009000 visitors/month. 20 articles \u2248 7\u2009000. Integration takes one DNS CNAME record (2 minutes)\u2014your existing site and SEO setup stay untouched. HubSpot\u2019s analysis of 13\u2009500 companies shows 16+ articles/month drives 3.5\u00D7 more traffic. Google\u2019s Nov 2025 stance: \u201CWe don\u2019t care if content is created by AI or humans. We care if it\u2019s helpful and accurate.\u201D",
  },
  {
    icon: Radar,
    title: "Brand Surveillance",
    short:
      "Real-time intelligence on how your brand appears across news, social, and forums\u2014sentiment shifts, emerging narratives, risks, and opportunities.",
    details:
      "Configure the aspects that matter (product lines, spokespeople, campaigns) and receive executive-ready summaries on a weekly or on-demand cadence. Anomaly alerts let comms and leadership act before a story hardens.",
  },
  {
    icon: MapPin,
    title: "Event Context",
    short:
      "Hotels, restaurants, and venues: capture demand around arenas and major events with timely, optimized content that surfaces when footfall spikes.",
    details:
      "We map what audiences search and read near events, then publish compliant pages so your hospitality brand appears in the right context\u2014without generic filler or manual effort.",
  },
  {
    icon: Newspaper,
    title: "Media Intelligence",
    short:
      "For PR, news, and media agencies: faster story discovery and source confirmation\u2014at a fraction of Cision or Meltwater pricing.",
    details:
      "Ingest breadth across text, YouTube segments, and podcasts with deep links into the exact clip or timestamp. Built for teams that need to verify, publish, and brief under pressure.",
  },
  {
    icon: LayoutGrid,
    title: "Segment Capture",
    badge: "6\u20138 h to market",
    short:
      "Niche web applications to acquire and convert specific customer segments\u2014deployed in 6\u20138 hours on a unified global template platform.",
    details:
      "Operating on a shared template, each vertical targets, acquires, and retains end users through AI-driven orchestration and optimization\u2014deep links to relevant segments across professional and social platforms included.",
  },
];

export function Services() {
  return (
    <MotionSection id="services" className="scroll-mt-24 py-24 sm:py-28 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-mono text-brand tracking-wide">Offerings</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
          Five services, one engine\u2014measurable results from day one
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          Each offering runs on our shared media intelligence core. Concrete KPIs, verified sources, and transparent pricing\u2014no retainers, no guesswork.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((s, index) => {
            const Icon = s.icon;
            return (
              <Card
                key={s.title}
                className="border-white/10 bg-card/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/80 text-brand">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    {"badge" in s && s.badge && (
                      <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{s.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {s.short}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion className="w-full">
                    <AccordionItem value={`more-${index}`} className="border-white/10">
                      <AccordionTrigger className="text-sm font-medium text-brand hover:text-brand/90 py-3">
                        Learn more
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-2">
                        {s.details}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
