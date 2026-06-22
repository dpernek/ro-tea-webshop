import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/CatalogClient";
import { brands, categories, getCategoryBySlug, getProductsByCategory } from "@/lib/products";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-normal text-slate-950 md:text-6xl">
            {category.name}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{category.description}</p>
        </div>
        <CatalogClient
          brands={brands}
          categories={categories}
          initialCategory={category.slug}
          products={categoryProducts}
        />
      </div>
    </div>
  );
}
