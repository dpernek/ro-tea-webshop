import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Kratka prezentacija RO-TEA trgovine, prednosti kupnje i povjerenje za tehničke kupce.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_0.8fr] md:items-center lg:px-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-normal text-slate-950 md:text-6xl">
              Tehnička trgovina za kupce koji žele jasan izbor
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              RO-TEA webshop je početna digitalna platforma za tehničku robu: alate, elektro
              materijal, rasvjetu, vodoinstalacije, opremu za dom i pametnu kuću. Struktura je
              pripremljena za stvarnu prodaju, katalog i buduće integracije.
            </p>
            <Button className="mt-8" href="/proizvodi" size="lg">
              Pogledaj katalog
            </Button>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            <div className="grid gap-4">
              {[
                "Uredan katalog s filtrima i pretragom",
                "Košarica s trajnim spremanjem u pregledniku",
                "Checkout prilagođen hrvatskom kupcu",
                "Arhitektura spremna za CMS i backend narudžbe",
              ].map((item) => (
                <p className="flex items-start gap-3 text-slate-700" key={item}>
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 text-emerald-600"
                    size={20}
                  />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              title: "Praktičan izbor",
              text: "Kategorije prate stvarne potrebe kupnje tehničke opreme za dom, radionicu i poslovne prostore.",
              icon: Wrench,
            },
            {
              title: "Povjerenje",
              text: "Jasni podaci o proizvodima, stanju zalihe i specifikacijama smanjuju nejasnoće prije narudžbe.",
              icon: ShieldCheck,
            },
            {
              title: "Prodajni temelj",
              text: "Projekt je spreman za spajanje na plaćanja, administraciju, ERP i obradu narudžbi.",
              icon: CheckCircle2,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="rounded-lg border border-slate-200 bg-white p-6"
                key={item.title}
              >
                <div className="mb-5 grid size-12 place-items-center rounded-md bg-[#0055a8]/10 text-[#0055a8]">
                  <Icon aria-hidden="true" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
