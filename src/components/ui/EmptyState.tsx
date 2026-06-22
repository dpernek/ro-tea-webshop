import type { ReactNode } from "react";
import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="mb-5 flex size-14 items-center justify-center rounded-md bg-[#0055a8]/10 text-[#0055a8]">
        <PackageSearch aria-hidden="true" size={28} />
      </div>
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 max-w-md text-slate-600">{description}</p>
      <div className="mt-7">
        {action ?? <Button href="/proizvodi">Pogledaj proizvode</Button>}
      </div>
    </div>
  );
}
