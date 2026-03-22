import { MotionSection } from "@/components/motion-section";
import { Check, X, Minus } from "lucide-react";

const rows = [
  {
    label: "Monthly cost",
    traditional: "100\u2009%",
    ef: "10\u2009% of nearest competitor",
    efHighlight: true,
  },
  {
    label: "Articles / month",
    traditional: "2\u20134 (freelance, long lead time)",
    ef: "Up to 8 (same-day delivery)",
    efHighlight: true,
  },
  {
    label: "Sources per article",
    traditional: "Manual, unpredictable quality",
    ef: "30\u201350 verified sources",
    efHighlight: true,
  },
  {
    label: "Regulated industries",
    traditional: "Rarely\u2014generic tools",
    ef: "Built for restricted categories",
    efHighlight: true,
  },
  {
    label: "Google E-E-A-T",
    traditional: "Varies",
    ef: "Compliant with verified sources",
    efHighlight: true,
  },
  {
    label: "Scaling",
    traditional: "Requires more writers",
    ef: "Scalable pipeline",
    efHighlight: true,
  },
  {
    label: "Integration",
    traditional: "CMS access, staging, QA cycles",
    ef: "1 DNS record (2 minutes)",
    efHighlight: true,
  },
];

export function Comparison() {
  return (
    <MotionSection
      id="comparison"
      className="scroll-mt-24 py-24 sm:py-28 border-b border-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-mono text-brand tracking-wide">
          Why Enterprise First
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
          Traditional SEO agency vs. AI-driven content pipeline
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          Side-by-side based on Backlinko, SiegMedia, OuterBox, TrySight, and
          BrightEdge benchmarks (2026).
        </p>

        <div className="mt-14 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full text-left text-sm border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="pb-4 pr-6 font-mono text-xs text-muted-foreground uppercase tracking-wider w-[30%]">
                  &nbsp;
                </th>
                <th className="pb-4 pr-6 font-mono text-xs text-muted-foreground uppercase tracking-wider w-[35%]">
                  Traditional SEO agency
                </th>
                <th className="pb-4 font-mono text-xs text-brand uppercase tracking-wider w-[35%]">
                  Enterprise First
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.label}
                  className={
                    i % 2 === 0
                      ? "bg-zinc-900/30"
                      : "bg-transparent"
                  }
                >
                  <td className="py-3.5 px-4 font-medium text-zinc-200 rounded-l-lg">
                    {r.label}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    {r.traditional}
                  </td>
                  <td className="py-3.5 px-4 rounded-r-lg text-zinc-100 font-medium">
                    {r.ef}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-muted-foreground font-mono">
          Sources: Backlinko/SiegMedia 2026, OuterBox 2026, TrySight 2026,
          BrightEdge.
        </p>
      </div>
    </MotionSection>
  );
}
