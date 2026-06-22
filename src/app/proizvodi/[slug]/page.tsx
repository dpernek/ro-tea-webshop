import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "@/components/ProductDetailsClient";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductDetailsClient product={product} />

        <section className="mt-16">
          <SectionTitle
            description="Proizvodi iz iste ili srodne kategorije koji nadopunjuju odabrani artikl."
            title="Srodni proizvodi"
          />
          <ProductGrid products={relatedProducts} />
        </section>
      </div>
    </div>
  );
}
