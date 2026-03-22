import { MotionSection } from "@/components/motion-section";
import { ShoppingBag, Trophy, Quote } from "lucide-react";

export function Proof() {
  return (
    <MotionSection id="proof" className="scroll-mt-24 py-24 sm:py-28 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-mono text-brand tracking-wide">Trust</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Trusted in high-stakes verticals
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          Reference work spans e-commerce and professional football in Sweden—where timing, accuracy,
          and brand safety are non-negotiable.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 text-brand mb-6">
              <ShoppingBag className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold">E-commerce</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Demand-aware content and intelligence that turns search and social signals into pages and
              campaigns your merchandising team can stand behind.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 text-brand mb-6">
              <Trophy className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold">Professional football (Sweden)</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Match-week velocity, verified sources, and clip-level depth for digital and partner
              channels—built for rights, fans, and sponsors.
            </p>
          </div>
        </div>

        <figure className="mt-12 rounded-2xl border border-dashed border-white/15 bg-zinc-950/50 p-8 sm:p-10">
          <Quote className="h-8 w-8 text-brand/80 mb-4" aria-hidden />
          <blockquote className="text-lg sm:text-xl text-zinc-200 leading-relaxed max-w-3xl">
            “Placeholder for your first public testimonial—swap in a quote from a reference customer when
            ready.”
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted-foreground font-mono">
            Name, Title · Company (optional)
          </figcaption>
        </figure>
      </div>
    </MotionSection>
  );
}
