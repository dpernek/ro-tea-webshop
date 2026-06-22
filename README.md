# RO-TEA webshop

Moderna početna verzija web trgovine za RO-TEA tehničku opremu. Projekt koristi JSON katalog proizvoda i kategorija, responzivan frontend na hrvatskom jeziku, košaricu s LocalStorage spremanjem, checkout flow bez plaćanja i Vercel-ready konfiguraciju.

## Stack

- Next.js 16.2.9 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP za animacije hero sekcije, kartica i scroll reveal efekata
- Zustand za stanje košarice
- LocalStorage persistencija košarice
- JSON datoteke za proizvode, kategorije i osnovni sadržaj
- ESLint i Prettier
- Vercel konfiguracija kroz `vercel.json`

Odabran je Zustand umjesto React Contexta jer je košarica izolirano globalno stanje s jednostavnom LocalStorage persistencijom, manjim brojem rerendera i čistim API-jem za kasnije spajanje na backend.

## Lokalno pokretanje

```bash
npm install
npm run dev
```

Lokalni server se pokreće na `http://localhost:3000` ako je port slobodan.

## Build

```bash
npm run lint
npm run build
```

## Deploy na Vercel

Ako koristite Vercel dashboard:

1. Pushajte projekt na GitHub.
2. U Vercelu odaberite **Add New Project**.
3. Uvezite GitHub repo `ro-tea-webshop`.
4. Framework preset treba biti **Next.js**.
5. Build command: `npm run build`.
6. Install command: `npm install`.
7. Deployajte `main` branch.

Ako koristite CLI:

```bash
npm install -g vercel
vercel
vercel --prod
```

Deployment URL: https://ro-tea-webshop.vercel.app

## GitHub deploy koraci

Ako repo nije kreiran automatski, ručno pokrenite:

```bash
npm install
npm run dev
npm run build
git init
git add .
git commit -m "Initial RO-TEA webshop"
git branch -M main
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
```

## Promjena proizvoda

Proizvodi se uređuju u `src/data/products.json`. Svaki proizvod ima:

- `id`
- `slug`
- `name`
- `category`
- `price`
- `oldPrice`
- `image`
- `gallery`
- `shortDescription`
- `description`
- `specifications`
- `stock`
- `featured`
- `badge`

Kategorije se uređuju u `src/data/categories.json`. Vrijednost `product.category` mora odgovarati `category.slug`.

Trenutni product vizuali su kodno generirani placeholderi po kategoriji kako se ne bi koristili tuđi protected asseti. Prave slike se kasnije mogu dodati u `public/products` i prikazivati kroz postojeća `image` i `gallery` polja.

## Važni folderi

- `src/app` - App Router rute
- `src/components` - reusable UI i e-commerce komponente
- `src/data` - JSON proizvodi, kategorije i site sadržaj
- `src/hooks` - client hookovi
- `src/lib` - helper funkcije za proizvode, formatiranje i klase
- `src/store` - Zustand košarica
- `src/types` - TypeScript tipovi

## Što je napravljeno

- Homepage s headerom, hero sekcijom, kategorijama, popularnim proizvodima, prednostima, CTA sekcijom i footerom
- Katalog proizvoda s pretragom, filterom po kategoriji i sortiranjem po cijeni/nazivu
- Dinamičke stranice proizvoda i kategorija
- Košarica s dodavanjem, promjenom količine, uklanjanjem, međuzbrojem i ukupnim iznosom
- LocalStorage persistencija košarice
- Checkout forma s osnovnom validacijom na hrvatskom jeziku i confirmation screenom
- JSON katalog s 12 demo proizvoda i 6 kategorija
- GSAP animacije bez server-side inicijalizacije
- SEO metadata, semantički HTML i responzivan layout
- ESLint, Prettier i Vercel-ready konfiguracija

## Što dodati za produkcijsku trgovinu

- Stripe, Monri ili Corvus payment
- CMS ili admin panel za proizvode, kategorije i sadržaj
- Backend za narudžbe
- Email potvrde kupcu i trgovini
- Baza podataka
- ERP integracija
- Fiskalizacija ako bude potrebna
- Prava obrada narudžbi, statusi i povijest kupnji
- Prave produkt fotografije i optimizirani media pipeline
