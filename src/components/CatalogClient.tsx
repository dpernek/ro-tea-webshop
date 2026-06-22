"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductSort, SearchAndFilters } from "@/components/SearchAndFilters";
import type { Category, Product } from "@/types/product";

const normalize = (value: string) => value.toLocaleLowerCase("hr-HR").trim();

export function CatalogClient({
  products,
  categories,
  initialCategory = "sve",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<ProductSort>("featured");

  const visibleProducts = useMemo(() => {
    const term = normalize(query);

    const filtered = products.filter((product) => {
      const categoryMatch = category === "sve" || product.category === category;
      const searchMatch =
        term.length === 0 ||
        normalize(product.name).includes(term) ||
        normalize(product.shortDescription).includes(term);

      return categoryMatch && searchMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name, "hr-HR");
      if (sort === "name-desc") return b.name.localeCompare(a.name, "hr-HR");
      return Number(b.featured) - Number(a.featured);
    });
  }, [category, products, query, sort]);

  return (
    <div className="space-y-7">
      <SearchAndFilters
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        onQueryChange={setQuery}
        onSortChange={setSort}
        query={query}
        sort={sort}
      />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-slate-600">
          Prikazano proizvoda: <span className="text-slate-950">{visibleProducts.length}</span>
        </p>
      </div>
      <ProductGrid products={visibleProducts} />
    </div>
  );
}
