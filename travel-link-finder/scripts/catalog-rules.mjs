const categories = new Set(["search", "map", "card", "wallet", "airline", "partner"]);
const marketPattern = /^(global|kr|jp|tw-hk|sea|in|anz|na|eu|gcc|latam)$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export function validateCatalog(catalog, { publicOnly = false } = {}) {
  const errors = [];
  if (catalog?.version !== 1 || !Array.isArray(catalog.records)) return ["catalogue must have version 1 and records array"];
  const ids = new Set(); const cids = new Set(); const today = new Date().toISOString().slice(0, 10);
  for (const record of catalog.records) {
    const at = `[${record?.id || "unknown"}]`;
    if (!record?.id || ids.has(record.id)) errors.push(`${at} duplicate or missing id`); ids.add(record?.id);
    if (!record?.state || !["verified", "candidate", "expired"].includes(record.state)) errors.push(`${at} invalid state`);
    if (!record?.kind || !["hotel", "promotion"].includes(record.kind)) errors.push(`${at} invalid kind`);
    if (!record?.label || !record?.eligibility || !categories.has(record?.category)) errors.push(`${at} missing label, eligibility, or category`);
    if (!Array.isArray(record?.markets) || !record.markets.length || record.markets.some((market) => !marketPattern.test(market))) errors.push(`${at} invalid markets`);
    const hasDatedEvidence = Array.isArray(record?.evidence) && record.evidence.some((item) => /^https:\/\//.test(item.url) && datePattern.test(item.checkedAt));
    if (!hasDatedEvidence) errors.push(`${at} needs dated evidence`);
    if (record.state === "verified" && !record.evidence.some((item) => item.sourceType === "official" && /^https:\/\//.test(item.url) && datePattern.test(item.checkedAt))) errors.push(`${at} verified record needs dated official evidence`);
    if (record.kind === "hotel") {
      if (!/^\d{6,9}$/.test(record.cid || "")) errors.push(`${at} hotel record needs numeric CID`);
      if (cids.has(record.cid)) errors.push(`${at} duplicate CID`); cids.add(record.cid);
    }
    if (record.kind === "promotion" && !/^https:\/\/([a-z0-9-]+\.)?agoda\.com(\/|$)/i.test(record.target || "")) errors.push(`${at} promotion needs an Agoda target`);
    if (record.validUntil && (!datePattern.test(record.validUntil) || record.validUntil < today) && record.state === "verified") errors.push(`${at} verified record is expired`);
    if (publicOnly && record.state !== "verified" && record.state !== "candidate" && record.state !== "expired") errors.push(`${at} invalid publication state`);
  }
  return errors;
}
