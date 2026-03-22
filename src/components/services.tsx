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
    short:
      "High-quality AI content on trending terms, topics, keywords, and key phrases—delivered to your pages as a managed service.",
    details:
      "We align editorial and SEO intent with real-time signals so your site stays relevant without a heavy in-house newsroom. Pipelines cover research, drafting, on-page structure, and refresh cycles tuned to your brand voice.",
  },
  {
    icon: Radar,
    title: "Brand Surveillance",
    short:
      "Weekly and on-demand intelligence on how your brand shows up across media—sentiment, narratives, risks, and opportunities.",
    details:
      "Configurable aspects (product lines, spokespeople, campaigns) roll into executive-ready summaries. Alerts highlight anomalies so comms and leadership can act before a story hardens.",
  },
  {
    icon: MapPin,
    title: "Event Context",
    short:
      "For hotels, restaurants, and venues: become visible in the event context around arenas and major happenings.",
    details:
      "We surface what audiences search and read near events, then land timely, compliant pages and updates so hospitality brands capture demand when footfall spikes—without generic filler.",
  },
  {
    icon: Newspaper,
    title: "Media Intelligence",
    short:
      "For PR, news, and media agencies: faster story discovery, source confirmation, and competitive awareness vs. suites like Cision or Meltwater.",
    details:
      "Ingest breadth across text and moving media with deep links into the exact clip or segment. Built for teams that need to verify, publish, and brief under pressure.",
  },
  {
    icon: LayoutGrid,
    title: "Segment Capture",
    short:
      "Niche web applications engineered to attract and convert specific customer segments for advertising and commercial programs.",
    details:
      "From landing experiences to lightweight apps, we pair segmentation strategy with measurable funnels—always grounded in the same intelligence engine so creative and targeting stay honest.",
  },
];

export function Services() {
  return (
    <MotionSection id="services" className="scroll-mt-24 py-24 sm:py-28 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-mono text-brand tracking-wide">Offerings</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
          Assets as a service—built for operators, not slide decks
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          Five ways to plug our engine into your growth, communications, and product roadmap.
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/80 text-brand mb-2">
                    <Icon className="h-5 w-5" aria-hidden />
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
