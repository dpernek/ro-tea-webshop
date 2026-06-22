"use client";

import { ArrowDownAZ, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import type { Brand, Category } from "@/types/product";

export type ProductSort = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export function SearchAndFilters({
  categories,
  brands,
  query,
  category,
  brand,
  featuredOnly,
  sort,
  onQueryChange,
  onCategoryChange,
  onBrandChange,
  onFeaturedOnlyChange,
  onSortChange,
}: {
  categories: Category[];
  brands: Brand[];
  query: string;
  category: string;
  brand: string;
  featuredOnly: boolean;
  sort: ProductSort;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onFeaturedOnlyChange: (value: boolean) => void;
  onSortChange: (value: ProductSort) => void;
}) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-4 md:p-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_220px_220px_220px] lg:items-end">
        <div className="relative">
          <Input
            label="Pretraži proizvode"
            name="search"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="npr. bušilica, LED, termostat"
            value={query}
          />
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 right-4 text-slate-400"
            size={18}
          />
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800">Kategorija</span>
          <select
            className="h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-[#0055a8] focus:ring-4 focus:ring-[#0055a8]/10"
            onChange={(event) => onCategoryChange(event.target.value)}
            value={category}
          >
            <option value="sve">Sve kategorije</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800">Brend</span>
          <select
            className="h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-[#0055a8] focus:ring-4 focus:ring-[#0055a8]/10"
            onChange={(event) => onBrandChange(event.target.value)}
            value={brand}
          >
            <option value="svi">Svi brendovi</option>
            {brands.map((item) => (
              <option key={item.slug} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <ArrowDownAZ aria-hidden="true" size={16} />
            Sortiranje
          </span>
          <select
            className="h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-[#0055a8] focus:ring-4 focus:ring-[#0055a8]/10"
            onChange={(event) => onSortChange(event.target.value as ProductSort)}
            value={sort}
          >
            <option value="featured">Preporučeno</option>
            <option value="price-asc">Cijena: niža prema višoj</option>
            <option value="price-desc">Cijena: viša prema nižoj</option>
            <option value="name-asc">Naziv: A - Ž</option>
            <option value="name-desc">Naziv: Ž - A</option>
          </select>
        </label>
      </div>
      <label className="mt-5 flex w-fit items-center gap-3 text-sm font-semibold text-slate-700">
        <input
          checked={featuredOnly}
          className="size-4 accent-[#0055a8]"
          onChange={(event) => onFeaturedOnlyChange(event.target.checked)}
          type="checkbox"
        />
        Samo istaknuti proizvodi
      </label>
    </aside>
  );
}
