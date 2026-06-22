import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "RO-TEA checkout forma za slanje narudžbe bez plaćanja u početnoj verziji.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-normal text-slate-950 md:text-6xl">
            Checkout
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Unesite podatke za dostavu i pošaljite narudžbu kao upit. Plaćanje nije aktivirano
            u ovoj fazi.
          </p>
        </div>
        <CheckoutForm />
      </div>
    </div>
  );
}
