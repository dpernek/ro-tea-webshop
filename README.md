# RO-TEA webshop

Moderna početna verzija web trgovine za RO-TEA tehničku opremu. Projekt koristi JSON katalog uvezen iz WooCommerce XML exporta, responzivan frontend na hrvatskom jeziku, košaricu s LocalStorage spremanjem, checkout flow bez plaćanja i Vercel-ready konfiguraciju.

## Stack

- Next.js 16.2.9 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP za animacije hero sekcije, kartica i scroll reveal efekata
- Zustand za stanje košarice
- LocalStorage persistencija košarice
- JSON datoteke za proizvode, kategorije i osnovni sadržaj
- WooCommerce XML importer za proizvode, kategorije, brendove, cijene, zalihe i slike
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

## Import proizvoda iz WooCommerce XML-a

Importer čita WordPress/WooCommerce XML export i generira:

- `src/data/products.json`
- `src/data/categories.json`
- `src/data/brands.json`

Pokretanje:

```bash
npm run import:products -- /putanja/do/ro-tea.WordPress.2026-06-22.xml
```

Zadnji import iz datoteke `/Users/macbookair/Desktop/ro-tea.WordPress.2026-06-22.xml` generirao je 848 objavljenih proizvoda, 21 kategoriju i 3 brenda. Slike ostaju na izvornim `https://ro-tea.hr/...` URL-ovima, a `next.config.ts` dopušta taj remote image domain. Ako se slike žele hostati lokalno, potrebno ih je preuzeti u `public/products` i ažurirati `image`/`gallery` vrijednosti u JSON-u.

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

Proizvodi se uređuju u `src/data/products.json` ili ponovo generiraju kroz importer. Svaki proizvod ima:

- `id`
- `slug`
- `name`
- `sku`
- `brand`
- `category`
- `categories`
- `price`
- `regularPrice`
- `oldPrice`
- `salePrice`
- `image`
- `gallery`
- `shortDescription`
- `description`
- `specifications`
- `stock`
- `stockStatus`
- `featured`
- `badge`
- `type`

Kategorije se uređuju u `src/data/categories.json`. Vrijednost `product.category` mora odgovarati `category.slug`, a dodatne kategorije proizvoda nalaze se u `product.categories`.

Brendovi se uređuju u `src/data/brands.json` i koriste se u katalog filteru. Trenutne product slike dolaze iz RO-TEA WooCommerce exporta preko `ro-tea.hr` URL-ova.

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
- Katalog proizvoda s pretragom, filterom po kategoriji, filterom po brendu, opcijom samo istaknuti i sortiranjem po cijeni/nazivu
- Dinamičke stranice proizvoda i kategorija
- Košarica s dodavanjem, promjenom količine, uklanjanjem, međuzbrojem i ukupnim iznosom
- LocalStorage persistencija košarice
- Checkout forma s osnovnom validacijom na hrvatskom jeziku i confirmation screenom
- JSON katalog s 848 stvarnih proizvoda iz WooCommerce XML exporta, 21 kategorijom i 3 brenda
- Importer za ponovno generiranje JSON kataloga iz WordPress/WooCommerce XML datoteke
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
