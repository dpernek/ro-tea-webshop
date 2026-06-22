import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import site from "@/data/site.json";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt forma i poslovni podaci za RO-TEA tehničku trgovinu i B2B upite.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.78fr] lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 md:p-7">
          <h1 className="text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">
            Kontakt
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Pošaljite upit za proizvod, veću količinu ili poslovnu ponudu. Forma je
            frontend-only u ovoj verziji i spremna za kasnije spajanje na backend.
          </p>

          <form className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input label="Ime i prezime" name="contact-name" />
            </div>
            <Input label="Email" name="contact-email" type="email" />
            <Input label="Telefon" name="contact-phone" type="tel" />
            <div className="sm:col-span-2">
              <Input label="Tvrtka" name="contact-company" placeholder="Opcionalno" />
            </div>
            <label className="block sm:col-span-2" htmlFor="contact-message">
              <span className="mb-2 block text-sm font-semibold text-slate-800">Poruka</span>
              <textarea
                className="min-h-36 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#0055a8] focus:ring-4 focus:ring-[#0055a8]/10"
                id="contact-message"
                name="contact-message"
              />
            </label>
            <Button className="sm:w-fit" type="button">
              Pošalji upit
            </Button>
          </form>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white md:p-8">
          <h2 className="text-2xl font-semibold">Podaci za kontakt</h2>
          <div className="mt-7 space-y-5 text-slate-300">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
              {site.contact.address}
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
              {site.contact.phone}
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
              {site.contact.email}
            </p>
          </div>
          <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">Za poslovne kupce</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              U poruci navedite tražene količine, rok isporuke, lokaciju i podatke za ponudu.
              Sustav je spreman za kasnije povezivanje s ERP-om i obradom narudžbi.
            </p>
          </div>
          <Button className="mt-7 w-full" href="/proizvodi" variant="secondary">
            Pregledaj katalog
          </Button>
        </aside>
      </div>
    </div>
  );
}
