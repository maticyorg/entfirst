import { MotionSection } from "@/components/motion-section";
import { MapPin } from "lucide-react";

export function About() {
  return (
    <MotionSection id="about" className="scroll-mt-24 py-24 sm:py-28 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <p className="text-sm font-mono text-brand tracking-wide">About</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Enterprise First AB
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              We are a Stockholm-based AI consultancy delivering services powered by reusable, production-grade
              assets. Our model is simple: shared pipelines, strict quality gates, and delivery that fits
              how enterprises actually operate\u2014not one-off demos.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you need pages that rank, brands that are watched, venues that ride event demand,
              or newsrooms that move first, the same engine powers the stack—so you compound learning
              instead of restarting projects.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-card/60 p-8 ef-grid">
            <div className="flex items-start gap-3">
              <MapPin className="h-6 w-6 text-brand shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-semibold text-lg">Stockholm, Sweden</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Legal entity: <span className="text-foreground">Enterprise First AB</span>
                  <br />
                  Serving clients across the Nordics and remotely.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Team
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Founder and core team bios can live here. Add portraits, LinkedIn, and focus areas when
                you are ready to publish.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
