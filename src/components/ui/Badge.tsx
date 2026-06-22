import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  tone = "blue",
  className,
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "slate";
  className?: string;
}) {
  const tones = {
    blue: "bg-[#0055a8] text-white",
    green: "bg-emerald-100 text-emerald-800",
    amber: "bg-amber-100 text-amber-900",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-md px-2.5 text-xs font-bold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
