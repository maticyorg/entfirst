"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#engine", label: "Engine" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#proof", label: "Proof" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-white/10 bg-zinc-950/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" aria-label="Enterprise First home">
          <Logo variant="compact" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className={cn(buttonVariants(), "hidden sm:inline-flex h-9 px-4")}
          >
            Get in touch
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-zinc-900/80 text-foreground"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-md px-4 py-4">
          <nav className="flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-foreground py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants(), "mt-2 w-full h-9 inline-flex items-center justify-center")}
            >
              Get in touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
