import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import site from "@/data/site.json";
import { categories } from "@/lib/products";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-[#0055a8] text-sm font-black">
              RT
            </span>
            <span className="text-xl font-black">{site.brand.name}</span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
            {site.brand.tagline}
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
              {site.contact.address}
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
              {site.contact.phone}
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
              {site.contact.email}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-400">
            Navigacija
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {site.navigation.map((item) => (
              <li key={item.href}>
                <Link className="text-slate-300 transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-slate-300 transition hover:text-white" href="/kosarica">
                Košarica
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-400">
            Kategorije
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  className="text-slate-300 transition hover:text-white"
                  href={`/kategorije/${category.slug}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} RO-TEA. Demo webshop spreman za daljnju produkcijsku
        integraciju.
      </div>
    </footer>
  );
}
