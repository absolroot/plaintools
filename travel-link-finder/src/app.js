import { restoreCatalog } from "./catalog-codec.js";

const allowlistedQuery = ["checkIn", "checkOut", "los", "adults", "children", "childAges", "rooms", "currencyCode", "priceCur", "countryId"];
const input = document.querySelector("#hotel-url");
const market = document.querySelector("#market");
const form = document.querySelector("#finder-form");
const status = document.querySelector("#status");
const results = document.querySelector("#results");
const direct = document.querySelector("#direct-results");
const promotions = document.querySelector("#promotion-results");
const noDirect = document.querySelector("#no-direct");
const noPromotions = document.querySelector("#no-promotions");
let catalog = null;

function isAgodaUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (url.hostname === "agoda.com" || url.hostname.endsWith(".agoda.com"));
  } catch {
    return false;
  }
}

function normalizeHotelUrl(value) {
  const inputUrl = new URL(value);
  const url = new URL(inputUrl.origin + inputUrl.pathname);
  for (const name of allowlistedQuery) {
    const entry = inputUrl.searchParams.get(name);
    if (entry) url.searchParams.set(name, entry);
  }
  return url;
}

function routeMatches(record, selectedMarket) {
  return record.state === "verified" && (selectedMarket === "all" || record.markets.includes("global") || record.markets.includes(selectedMarket));
}

function card(record, href) {
  const article = document.createElement("article");
  article.className = "route-card";
  const heading = document.createElement("h3");
  heading.textContent = record.label;
  const meta = document.createElement("p");
  meta.className = "route-meta";
  meta.textContent = `${record.category} · ${record.markets.join(", ")}`;
  const condition = document.createElement("p");
  condition.textContent = record.eligibility;
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Open on Agoda";
  article.append(heading, meta, condition, link);
  return article;
}

function render(value) {
  direct.replaceChildren();
  promotions.replaceChildren();
  const selected = catalog.records.filter((record) => routeMatches(record, market.value));
  const hotelUrl = normalizeHotelUrl(value);
  const hotelRecords = selected.filter((record) => record.kind === "hotel");
  const promotionRecords = selected.filter((record) => record.kind === "promotion");
  noDirect.hidden = hotelRecords.length > 0;
  noPromotions.hidden = promotionRecords.length > 0;
  for (const record of hotelRecords) {
    const href = new URL(hotelUrl);
    href.searchParams.set("cid", record.cid);
    direct.append(card(record, href.href));
  }
  for (const record of promotionRecords) promotions.append(card(record, record.target));
  results.hidden = false;
  status.textContent = hotelRecords.length
    ? `${hotelRecords.length} direct-check routes ready. Prices are checked on Agoda.`
    : "No verified hotel-preserving CID routes are ready for this market. Official promotions may still be available below.";
}

async function loadCatalog() {
  try {
  const response = await fetch("./catalog.payload.js", { cache: "no-store" });
    if (!response.ok) throw new Error("payload missing");
    const source = await response.text();
    const payload = source.match(/window\.TRAVEL_CATALOG_PAYLOAD\s*=\s*"([^"]+)"/);
    if (!payload) throw new Error("payload malformed");
    catalog = restoreCatalog(payload[1]);
    status.textContent = "Paste an Agoda hotel URL to prepare direct-check links.";
  } catch {
    status.textContent = "The verified route catalogue is not installed in this build.";
    form.querySelector("button").disabled = true;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isAgodaUrl(input.value)) {
    status.textContent = "Enter a valid HTTPS Agoda hotel URL.";
    results.hidden = true;
    return;
  }
  render(input.value);
});

loadCatalog();
