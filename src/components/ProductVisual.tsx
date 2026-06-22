import Image from "next/image";
import { Bolt, Drill, Droplets, Home, Lightbulb, Wifi } from "lucide-react";
import { cn } from "@/lib/cn";

const categoryVisuals = {
  alati: {
    icon: Drill,
    accent: "#0055a8",
    soft: "#e7f0fb",
    label: "ALAT",
  },
  "elektro-materijal": {
    icon: Bolt,
    accent: "#d97706",
    soft: "#fff7ed",
    label: "ELEKTRO",
  },
  rasvjeta: {
    icon: Lightbulb,
    accent: "#f59e0b",
    soft: "#fffbeb",
    label: "LED",
  },
  vodoinstalacije: {
    icon: Droplets,
    accent: "#0284c7",
    soft: "#e0f2fe",
    label: "VODA",
  },
  "oprema-za-dom": {
    icon: Home,
    accent: "#0f766e",
    soft: "#ccfbf1",
    label: "DOM",
  },
  "pametna-kuca": {
    icon: Wifi,
    accent: "#7c3aed",
    soft: "#f3e8ff",
    label: "SMART",
  },
};

type CategoryKey = keyof typeof categoryVisuals;

export function ProductVisual({
  category,
  name,
  image,
  priority = false,
  className,
}: {
  category: string;
  name: string;
  image?: string;
  priority?: boolean;
  className?: string;
}) {
  const visual =
    categoryVisuals[(category as CategoryKey) ?? "alati"] ?? categoryVisuals.alati;
  const Icon = visual.icon;
  const resolvedImage = image || null;

  return (
    <div
      aria-label={`Vizual proizvoda: ${name}`}
      className={cn(
        "relative isolate aspect-[4/3] overflow-hidden rounded-lg bg-slate-50",
        className,
      )}
      data-image-path={resolvedImage ?? undefined}
      role="img"
      style={{
        background:
          "linear-gradient(145deg, #ffffff 0%, #f8fafc 52%, rgba(0,85,168,0.08) 100%)",
      }}
    >
      {resolvedImage ? (
        <Image
          alt={name}
          className="object-contain p-4"
          fill
          priority={priority}
          sizes="(min-width: 1280px) 280px, (min-width: 768px) 33vw, 100vw"
          src={resolvedImage}
        />
      ) : null}
      {resolvedImage ? (
        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-slate-900/5" />
      ) : (
        <>
          <div
            className="absolute left-5 top-5 rounded-md px-2 py-1 text-[10px] font-bold text-slate-600"
            style={{ backgroundColor: visual.soft }}
          >
            RO-TEA
          </div>
          <div className="absolute inset-x-8 bottom-7 h-5 rounded-full bg-slate-300/40 blur-xl" />
          <div className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-white/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] md:size-32">
            <div
              className="grid size-16 place-items-center rounded-md text-white"
              style={{ backgroundColor: visual.accent }}
            >
              <Icon aria-hidden="true" size={34} strokeWidth={1.8} />
            </div>
          </div>
          <svg
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 400 300"
          >
            <path
              d="M40 245C82 198 111 209 154 163C193 121 230 82 360 61"
              fill="none"
              stroke={visual.accent}
              strokeOpacity="0.22"
              strokeWidth="18"
            />
            <path
              d="M44 74H162M238 229H360M300 40H366"
              fill="none"
              stroke="#0f172a"
              strokeLinecap="round"
              strokeOpacity="0.08"
              strokeWidth="10"
            />
          </svg>
          <div className="absolute bottom-5 left-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            {visual.label}
          </div>
        </>
      )}
    </div>
  );
}
