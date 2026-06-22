import type { Metadata } from "next";
import { CatalogClient } from "@/components/CatalogClient";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Proizvodi",
  description:
    "RO-TEA katalog proizvoda s filterima, pretragom, sortiranjem i dodavanjem u košaricu.",
};

export default function ProductsPage() {
  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-normal text-slate-950 md:text-6xl">
            Proizvodi
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Pretražite RO-TEA katalog, filtrirajte po kategoriji i sortirajte po cijeni ili
            nazivu.
          </p>
        </div>
        <CatalogClient categories={categories} products={products} />
      </div>
    </div>
  );
}
