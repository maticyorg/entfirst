import Link from "next/link";
import { Logo } from "@/components/logo";
import { Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  { href: "#services", label: "Services" },
  { href: "#engine", label: "Engine" },
  { href: "#portfolio", label: "Verticals" },
  { href: "#proof", label: "Proof" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-zinc-950/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              AI consultancy and media intelligence from Stockholm\u2014services and assets built for teams
              that operate under real constraints.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {footerLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
              aria-label="LinkedIn (update URL)"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
              aria-label="X / Twitter (update URL)"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-muted-foreground">
          <p>
            © {year} Enterprise First AB. All rights reserved.
            <span className="hidden sm:inline"> · enterprisefirst.ai</span>
          </p>
          <p className="font-mono text-xs sm:text-sm">Stockholm, Sweden</p>
        </div>
      </div>
    </footer>
  );
}
