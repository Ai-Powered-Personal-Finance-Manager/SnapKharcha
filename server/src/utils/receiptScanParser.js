import { z } from "zod";

const receiptScanResponseSchema = z
  .object({
    amount: z.union([z.number(), z.string()]).optional().nullable(),
    date: z.union([z.string(), z.null()]).optional().nullable(),
    note: z.union([z.string(), z.null()]).optional().nullable(),
    merchant: z.union([z.string(), z.null()]).optional().nullable(),
    categoryName: z.union([z.string(), z.null()]).optional().nullable(),
    category: z.union([z.string(), z.null()]).optional().nullable(),
    categoryCandidates: z
      .array(
        z
          .union([
            z.string(),
            z.object({
              categoryName: z.union([z.string(), z.null()]).optional().nullable(),
              confidence: z.union([z.number(), z.string(), z.null()]).optional().nullable(),
              name: z.union([z.string(), z.null()]).optional().nullable(),
              category: z.union([z.string(), z.null()]).optional().nullable(),
            }).passthrough(),
          ])
      )
      .optional()
      .nullable(),
  })
  .passthrough();

const extractJsonCandidate = (text) => {
  if (!text) {
    return null;
  }

  const cleanedText = String(text)
    .replace(/```json/gi, "```")
    .replace(/```/g, "")
    .trim();

  const firstBraceIndex = cleanedText.indexOf("{");
  const lastBraceIndex = cleanedText.lastIndexOf("}");

  if (firstBraceIndex !== -1 && lastBraceIndex !== -1 && lastBraceIndex >= firstBraceIndex) {
    return cleanedText.slice(firstBraceIndex, lastBraceIndex + 1).trim();
  }

  if (cleanedText && !cleanedText.includes("\n") && cleanedText.length <= 120) {
    return JSON.stringify({ categoryName: cleanedText });
  }

  return null;
};

const parseAmount = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsedAmount = Number(value.replace(/,/g, "").trim());
    return Number.isFinite(parsedAmount) ? parsedAmount : 0;
  }

  return 0;
};

const toStringValue = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const toNumberValue = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const parsedValue = Number.parseFloat(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  return null;
};

const normalizeCandidate = (candidate) => {
  if (typeof candidate === "string") {
    const categoryName = candidate.trim();
    return categoryName ? { categoryName, confidence: null } : null;
  }

  if (!candidate || typeof candidate !== "object") {
    return null;
  }

  const categoryName =
    toStringValue(candidate.categoryName) ||
    toStringValue(candidate.name) ||
    toStringValue(candidate.category);

  if (!categoryName) {
    return null;
  }

  return {
    categoryName,
    confidence: toNumberValue(candidate.confidence),
  };
};

export const parseReceiptScanResponse = (text) => {
  const jsonCandidate = extractJsonCandidate(text);

  if (!jsonCandidate) {
    return null;
  }

  try {
    const parsed = JSON.parse(jsonCandidate);
    const validation = receiptScanResponseSchema.safeParse(parsed);

    if (!validation.success) {
      return null;
    }

    const data = validation.data;
    const categoryCandidates = Array.isArray(data.categoryCandidates)
      ? data.categoryCandidates.map(normalizeCandidate).filter(Boolean)
      : [];
    const topCandidateName = categoryCandidates[0]?.categoryName || "";

    return {
      amount: parseAmount(data.amount),
      date: toStringValue(data.date),
      note: toStringValue(data.note),
      merchant: toStringValue(data.merchant),
      categoryName: toStringValue(data.categoryName) || toStringValue(data.category) || topCandidateName,
      categoryCandidates,
    };
  } catch {
    return null;
  }
};