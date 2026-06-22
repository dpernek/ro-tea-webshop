import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/product";
import { ProductVisual } from "@/components/ProductVisual";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      className="group grid gap-4 rounded-lg border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-[#0055a8]/40 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
      href={`/kategorije/${category.slug}`}
    >
      <ProductVisual
        category={category.slug}
        className="aspect-[5/3]"
        image={category.image}
        name={category.name}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{category.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {category.description}
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-700 transition group-hover:bg-[#0055a8] group-hover:text-white">
          <ArrowUpRight aria-hidden="true" size={18} />
        </span>
      </div>
    </Link>
  );
}
