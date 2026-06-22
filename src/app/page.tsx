import type { Metadata } from "next";
import { ArrowRight, Building2, Headphones, PackageCheck, RotateCcw } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getFeaturedCategories, getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Početna",
};

export default function Home() {
  const featuredCategories = getFeaturedCategories();
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Hero />

      <AnimatedSection className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            description="Kategorije su postavljene za stvarnu trgovinu i mogu se širiti iz JSON-a ili budućeg CMS-a."
            title="Istaknute kategorije"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="border-y border-slate-200 bg-slate-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            action={
              <Button href="/proizvodi" variant="secondary">
                Svi proizvodi
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
            }
            description="Popularni proizvodi iz JSON kataloga s cijenama, zalihom, badge oznakama i dodavanjem u košaricu."
            title="Popularni proizvodi"
          />
          <ProductGrid products={featuredProducts} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            description="RO-TEA je zamišljen kao webshop koji jednako dobro radi za kućnog kupca, majstora i poslovni upit."
            title="Prednosti kupnje"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Jasan katalog",
                text: "Kategorije, pretraga i sortiranje ubrzavaju pronalazak opreme.",
                icon: PackageCheck,
              },
              {
                title: "B2C i B2B pristup",
                text: "Checkout prima napomene za poslovne kupce, R1 podatke i dodatne zahtjeve.",
                icon: Building2,
              },
              {
                title: "Podrška prije kupnje",
                text: "Kontakt kanal je spreman za tehnička pitanja i ponude većih količina.",
                icon: Headphones,
              },
              {
                title: "Spremno za integracije",
                text: "Struktura je pripremljena za CMS, plaćanja, ERP i backend narudžbi.",
                icon: RotateCcw,
              },
            ].map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  className="rounded-lg border border-slate-200 bg-white p-6"
                  key={benefit.title}
                >
                  <div className="mb-5 grid size-12 place-items-center rounded-md bg-[#0055a8]/10 text-[#0055a8]">
                    <Icon aria-hidden="true" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-slate-950 py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">
              Spremni za opremanje projekta?
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Pregledajte katalog ili pošaljite upit za veću količinu, specifične tehničke
              zahtjeve i poslovnu ponudu.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/proizvodi" size="lg">
              Otvori katalog
            </Button>
            <Button href="/kontakt" size="lg" variant="secondary">
              Kontaktiraj RO-TEA
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
