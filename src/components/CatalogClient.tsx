"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductSort, SearchAndFilters } from "@/components/SearchAndFilters";
import { Button } from "@/components/ui/Button";
import type { Brand, Category, Product } from "@/types/product";

const normalize = (value: string) => value.toLocaleLowerCase("hr-HR").trim();
const pageSize = 24;
const sortablePrice = (product: Product) =>
  product.price > 0 ? product.price : Number.POSITIVE_INFINITY;

export function CatalogClient({
  products,
  categories,
  brands,
  initialCategory = "sve",
}: {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("svi");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sort, setSort] = useState<ProductSort>("featured");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const resetVisibleCount = () => setVisibleCount(pageSize);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    resetVisibleCount();
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    resetVisibleCount();
  };

  const handleBrandChange = (value: string) => {
    setBrand(value);
    resetVisibleCount();
  };

  const handleFeaturedOnlyChange = (value: boolean) => {
    setFeaturedOnly(value);
    resetVisibleCount();
  };

  const handleSortChange = (value: ProductSort) => {
    setSort(value);
    resetVisibleCount();
  };

  const visibleProducts = useMemo(() => {
    const term = normalize(query);

    const filtered = products.filter((product) => {
      const categoryMatch =
        category === "sve" ||
        product.category === category ||
        (product.categories ?? []).includes(category);
      const brandMatch =
        brand === "svi" || normalize(product.brand ?? "") === normalize(brand);
      const featuredMatch = !featuredOnly || product.featured;
      const searchMatch =
        term.length === 0 ||
        normalize(product.name).includes(term) ||
        normalize(product.shortDescription).includes(term) ||
        normalize(product.description).includes(term) ||
        normalize(product.sku ?? "").includes(term) ||
        normalize(product.brand ?? "").includes(term);

      return categoryMatch && brandMatch && featuredMatch && searchMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return sortablePrice(a) - sortablePrice(b);
      if (sort === "price-desc") return sortablePrice(b) - sortablePrice(a);
      if (sort === "name-asc") return a.name.localeCompare(b.name, "hr-HR");
      if (sort === "name-desc") return b.name.localeCompare(a.name, "hr-HR");
      return Number(b.featured) - Number(a.featured);
    });
  }, [brand, category, featuredOnly, products, query, sort]);

  const paginatedProducts = visibleProducts.slice(0, visibleCount);
  const hasMore = visibleCount < visibleProducts.length;

  return (
    <div className="space-y-7">
      <SearchAndFilters
        brands={brands}
        categories={categories}
        brand={brand}
        category={category}
        featuredOnly={featuredOnly}
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
        onFeaturedOnlyChange={handleFeaturedOnlyChange}
        onQueryChange={handleQueryChange}
        onSortChange={handleSortChange}
        query={query}
        sort={sort}
      />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-slate-600">
          Prikazano proizvoda:{" "}
          <span className="text-slate-950">
            {paginatedProducts.length} / {visibleProducts.length}
          </span>
        </p>
      </div>
      <ProductGrid products={paginatedProducts} />
      {hasMore ? (
        <div className="flex justify-center">
          <Button
            onClick={() => setVisibleCount((current) => current + pageSize)}
            variant="secondary"
          >
            Učitaj više proizvoda
          </Button>
        </div>
      ) : null}
    </div>
  );
}
