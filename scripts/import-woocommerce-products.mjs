#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const defaultXmlPath = path.join(projectRoot, "ro-tea.WordPress.2026-06-22.xml");
const xmlPath = path.resolve(process.argv[2] ?? process.env.WOO_XML_PATH ?? defaultXmlPath);

const outputProductsPath = path.join(projectRoot, "src/data/products.json");
const outputCategoriesPath = path.join(projectRoot, "src/data/categories.json");
const outputBrandsPath = path.join(projectRoot, "src/data/brands.json");
const placeholderImage = "/products/placeholder.svg";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  cdataPropName: "#cdata",
  trimValues: false,
  parseTagValue: false,
  parseAttributeValue: false,
  isArray: (_name, jpath) =>
    jpath === "rss.channel.item" ||
    jpath === "rss.channel.item.category" ||
    jpath === "rss.channel.item.wp:postmeta",
});

const textOf = (node) => {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (typeof node !== "object") return "";
  if (node["#cdata"] != null) return String(node["#cdata"]);
  if (node["#text"] != null) return String(node["#text"]);
  return "";
};

const asArray = (value) => {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
};

const decodeEntities = (value) =>
  value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)));

const cleanText = (value) => {
  const withoutShortcodes = textOf(value).replace(/\[[^\]]+]/g, " ");
  return decodeEntities(
    withoutShortcodes
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/\r/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim(),
  );
};

const excerpt = (value, maxLength = 180) => {
  const clean = cleanText(value);
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).replace(/\s+\S*$/, "")}...`;
};

const parsePrice = (value) => {
  const raw = textOf(value).trim();
  if (!raw) return null;
  const normalized =
    raw.includes(",") && !raw.includes(".") ? raw.replace(",", ".") : raw.replace(/,/g, "");
  const number = Number.parseFloat(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(number) ? number : null;
};

const parseStock = (value) => {
  const raw = textOf(value).trim();
  if (!raw) return null;
  const stock = Number.parseInt(raw, 10);
  return Number.isFinite(stock) ? stock : null;
};

const slugify = (value) =>
  value
    .toLocaleLowerCase("hr-HR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const categoryData = (node) => ({
  domain: node?.["@_domain"] ?? "",
  slug: node?.["@_nicename"] ?? slugify(textOf(node)),
  name: textOf(node).trim(),
});

const buildMetaMap = (item) => {
  const meta = new Map();

  for (const row of asArray(item["wp:postmeta"])) {
    const key = textOf(row?.["wp:meta_key"]);
    if (!key) continue;
    meta.set(key, textOf(row?.["wp:meta_value"]));
  }

  return meta;
};

const getAttachmentUrl = (attachmentMap, id) => {
  const cleanId = textOf(id).trim();
  if (!cleanId) return null;
  return attachmentMap.get(cleanId)?.url ?? null;
};

const addCount = (map, item) => {
  if (!item.slug || !item.name) return;

  const existing = map.get(item.slug);
  map.set(item.slug, {
    id: item.slug,
    slug: item.slug,
    name: item.name,
    description: existing?.description ?? `Proizvodi u kategoriji ${item.name}.`,
    count: (existing?.count ?? 0) + 1,
  });
};

const addBrandCount = (map, item) => {
  if (!item.slug || !item.name) return;

  const existing = map.get(item.slug);
  map.set(item.slug, {
    id: item.slug,
    slug: item.slug,
    name: item.name,
    count: (existing?.count ?? 0) + 1,
  });
};

const stockStatusLabel = (stockStatus) => {
  if (stockStatus === "instock") return "Dostupno";
  if (stockStatus === "outofstock") return "Nije dostupno";
  if (stockStatus === "onbackorder") return "Dostupno uz narudžbu";
  return "Provjeriti dostupnost";
};

if (!fs.existsSync(xmlPath)) {
  console.error(`XML datoteka nije pronađena: ${xmlPath}`);
  console.error("Pokrenite: npm run import:products -- /putanja/do/export.xml");
  process.exit(1);
}

const xml = fs.readFileSync(xmlPath, "utf8");
const document = parser.parse(xml);
const items = asArray(document?.rss?.channel?.item);

const attachmentMap = new Map();
for (const item of items) {
  if (textOf(item["wp:post_type"]) !== "attachment") continue;

  const id = textOf(item["wp:post_id"]).trim();
  const url = textOf(item["wp:attachment_url"]).trim();
  if (!id || !url) continue;

  attachmentMap.set(id, {
    id,
    url,
    title: cleanText(item.title),
  });
}

const products = [];
const categoryMap = new Map();
const brandMap = new Map();
let foundProducts = 0;
let publishedProducts = 0;
let productsWithoutImage = 0;
let productsWithoutPrice = 0;

for (const item of items) {
  if (textOf(item["wp:post_type"]) !== "product") continue;

  foundProducts += 1;

  const status = textOf(item["wp:status"]).trim();
  if (status === "publish") publishedProducts += 1;
  if (status !== "publish") continue;

  const meta = buildMetaMap(item);
  const taxonomyTerms = asArray(item.category).map(categoryData);
  const productCategories = taxonomyTerms.filter((term) => term.domain === "product_cat");
  const productBrands = taxonomyTerms.filter((term) => term.domain === "product_brand");
  const productType = taxonomyTerms.find((term) => term.domain === "product_type");
  const visibilityTerms = taxonomyTerms.filter((term) => term.domain === "product_visibility");
  const featured =
    visibilityTerms.some((term) => term.slug === "featured" || term.name === "featured") ||
    meta.get("_featured") === "yes";

  const name = cleanText(item.title);
  const slug = textOf(item["wp:post_name"]).trim() || slugify(name);
  const sku = meta.get("_sku")?.trim() || null;
  const brandTerm = productBrands[0] ?? null;
  const brand = brandTerm?.name || null;
  const type =
    productType?.slug === "simple" || productType?.slug === "variable"
      ? productType.slug
      : "unknown";

  const categorySlugs = productCategories.map((category) => category.slug);
  const primaryCategory = categorySlugs[0] ?? "nekategorizirano";

  for (const category of productCategories) addCount(categoryMap, category);
  for (const productBrand of productBrands) addBrandCount(brandMap, productBrand);

  const regularPrice = parsePrice(meta.get("_regular_price"));
  const salePrice = parsePrice(meta.get("_sale_price"));
  const explicitPrice = parsePrice(meta.get("_price"));
  const price = explicitPrice ?? salePrice ?? regularPrice ?? 0;

  if (price === 0) productsWithoutPrice += 1;

  const thumbnailUrl = getAttachmentUrl(attachmentMap, meta.get("_thumbnail_id"));
  if (!thumbnailUrl) productsWithoutImage += 1;

  const galleryIds = (meta.get("_product_image_gallery") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const galleryUrls = galleryIds
    .map((id) => getAttachmentUrl(attachmentMap, id))
    .filter(Boolean);
  const gallery = [...new Set([thumbnailUrl, ...galleryUrls].filter(Boolean))];
  const image = thumbnailUrl ?? placeholderImage;

  const stock = parseStock(meta.get("_stock"));
  const rawStockStatus = meta.get("_stock_status")?.trim();
  const stockStatus = ["instock", "outofstock", "onbackorder"].includes(rawStockStatus)
    ? rawStockStatus
    : "unknown";

  const description = cleanText(item["content:encoded"]);
  const shortDescription =
    cleanText(item["excerpt:encoded"]) ||
    excerpt(description) ||
    "Detalji proizvoda trenutno nisu dostupni. Kontaktirajte nas za više informacija.";

  const specifications = {};
  if (sku) specifications.SKU = sku;
  if (brand) specifications.Brend = brand;
  if (type !== "unknown") specifications["Tip proizvoda"] = type;
  if (productCategories.length > 0) {
    specifications.Kategorije = productCategories.map((category) => category.name).join(", ");
  }
  specifications.Dostupnost = stockStatusLabel(stockStatus);

  const dimensions = [
    ["Težina", meta.get("_weight")],
    ["Duljina", meta.get("_length")],
    ["Širina", meta.get("_width")],
    ["Visina", meta.get("_height")],
  ];
  for (const [label, value] of dimensions) {
    const cleanValue = textOf(value).trim();
    if (cleanValue) specifications[label] = cleanValue;
  }

  let badge = null;
  if (price === 0) badge = "Cijena na upit";
  else if (salePrice != null && regularPrice != null && salePrice < regularPrice)
    badge = "Akcija";
  else if (type === "variable") badge = "Više opcija";
  else if (featured) badge = "Istaknuto";

  products.push({
    id: textOf(item["wp:post_id"]).trim() || slug,
    slug,
    name,
    sku,
    brand,
    category: primaryCategory,
    categories: categorySlugs,
    price,
    regularPrice,
    oldPrice: regularPrice != null && regularPrice > price ? regularPrice : null,
    salePrice,
    image,
    gallery: gallery.length > 0 ? gallery : [image],
    shortDescription,
    description,
    specifications,
    stock,
    stockStatus,
    featured,
    badge,
    type,
  });
}

const sortByCountThenName = (a, b) =>
  b.count - a.count || a.name.localeCompare(b.name, "hr-HR");
const categories = [...categoryMap.values()].sort(sortByCountThenName);
const brands = [...brandMap.values()].sort(sortByCountThenName);

fs.writeFileSync(outputProductsPath, `${JSON.stringify(products, null, 2)}\n`);
fs.writeFileSync(outputCategoriesPath, `${JSON.stringify(categories, null, 2)}\n`);
fs.writeFileSync(outputBrandsPath, `${JSON.stringify(brands, null, 2)}\n`);

const stats = {
  foundProducts,
  publishedProducts,
  importedProducts: products.length,
  categories: categories.length,
  brands: brands.length,
  productsWithoutImage,
  productsWithoutPrice,
  attachments: attachmentMap.size,
};

console.log("WooCommerce import završen:");
for (const [key, value] of Object.entries(stats)) {
  console.log(`- ${key}: ${value}`);
}
