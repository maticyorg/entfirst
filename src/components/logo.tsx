import { cn } from "@/lib/utils";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <circle cx="12" cy="10" r="5" fill="currentColor" />
        <circle cx="12" cy="30" r="4" fill="currentColor" />
        <circle cx="30" cy="8" r="3" fill="currentColor" />
        <line x1="12" y1="15" x2="12" y2="26" />
        <line x1="15.5" y1="12" x2="27" y2="9.5" />
      </g>
    </svg>
  );
}

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  variant?: "default" | "compact";
};

export function Logo({ className, showWordmark = true, variant = "default" }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark className={cn("text-zinc-100", variant === "compact" ? "h-7 w-7" : "h-9 w-9")} />
      {showWordmark && (
        <span
          className={cn(
            "font-mono tracking-tight bg-zinc-950 border border-white/10 rounded-sm px-2.5 py-1 shadow-[0_0_24px_rgba(0,0,0,0.45)]",
            variant === "compact" ? "text-sm" : "text-base",
          )}
        >
          <span className="text-zinc-50">enterprisefirst</span>
          <span className="text-brand">.ai</span>
        </span>
      )}
    </div>
  );
}
