"use client";

import { useState, FormEvent } from "react";
import { MotionSection } from "@/components/motion-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

const CONTACT_EMAIL = "hello@enterprisefirst.ai";

export function Contact() {
  const [status, setStatus] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent("Enterprise First — inquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\n\n${message}`,
    );
    setStatus("Opening your email client…");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus(null), 4000);
  }

  return (
    <MotionSection id="contact" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Risk model banner */}
        <div className="mb-12 rounded-2xl border border-brand/20 bg-brand/5 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-7 w-7 text-brand shrink-0 mt-0.5" aria-hidden />
            <div>
              <h3 className="text-lg font-semibold text-zinc-100">
                Low risk, measurable results, full transparency
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand text-xs font-bold">1</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Setup</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Pipeline config, first articles live. 50% upfront.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand text-xs font-bold">2</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Verification</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Up to 8 articles, indexing verified in GSC. Not satisfied? Walk away.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand text-xs font-bold">3</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Ongoing</p>
                    <p className="text-xs text-muted-foreground mt-0.5">10% of setup cost/month. Articles, keyword optimization, GSC reporting. 30-day cancellation.</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs font-mono text-brand/80">
                Maximum exposure: 50% of setup cost. No lock-in. No dependencies.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black p-8 sm:p-12 lg:p-16 overflow-hidden relative">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="text-sm font-mono text-brand tracking-wide">Contact</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Ready to put AI to work?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Tell us about your use case\u2014we respond with next steps and a realistic timeline.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Or email us directly at{" "}
              <a className="text-brand hover:underline font-mono" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>

            <form onSubmit={onSubmit} className="mt-10 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium block mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="bg-zinc-950/80 border-white/15"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="text-sm font-medium block mb-2">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Organization"
                    className="bg-zinc-950/80 border-white/15"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you trying to achieve?"
                  className="flex w-full rounded-md border border-white/15 bg-zinc-950/80 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <Button type="submit" size="lg" className="mt-2">
                Send via email
              </Button>
              {status && <p className="text-sm text-muted-foreground">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
