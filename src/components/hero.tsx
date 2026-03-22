"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroNetwork } from "@/components/hero-network";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden border-b border-white/10 ef-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(34,197,94,0.18),transparent)]" />
      <HeroNetwork />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-20">
        <motion.p
          className="text-sm font-mono text-brand mb-4 tracking-wide"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Stockholm · Media intelligence · AI assets as a service
        </motion.p>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          AI assets.
          <span className="text-brand"> Enterprise results.</span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          Enterprise First AB builds production-grade AI offerings on a shared media intelligence
          engine—news, forums, video, podcasts, and analytics—so you ship faster with less risk.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          <Link
            href="#services"
            className={cn(buttonVariants({ size: "lg" }), "text-base px-8 h-11 inline-flex items-center justify-center")}
          >
            Explore our services
          </Link>
          <Link
            href="#contact"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "text-base px-8 h-11 inline-flex items-center justify-center border-white/20 bg-zinc-950/40 hover:bg-zinc-900/80",
            )}
          >
            Book a consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
