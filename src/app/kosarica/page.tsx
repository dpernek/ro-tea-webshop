import type { Metadata } from "next";
import { CartPageClient } from "@/components/CartPageClient";

export const metadata: Metadata = {
  title: "Košarica",
  description: "Pregled RO-TEA košarice, promjena količina i nastavak na checkout.",
};

export default function CartPage() {
  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-normal text-slate-950 md:text-6xl">
            Košarica
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Pregledajte proizvode, promijenite količine ili uklonite artikle prije slanja
            narudžbe.
          </p>
        </div>
        <CartPageClient />
      </div>
    </div>
  );
}
