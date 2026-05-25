const normalizeCategoryName = (value) => {
  if (!value) {
    return "";
  }

  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
};

const isFallbackCategory = (categoryName) => {
  const normalizedCategoryName = normalizeCategoryName(categoryName);

  return (
    normalizedCategoryName === "other" ||
    normalizedCategoryName === "other expense" ||
    normalizedCategoryName === "other expenses" ||
    normalizedCategoryName === "others"
  );
};

const normalizeCandidateName = (candidate) => {
  if (typeof candidate === "string") {
    return candidate.trim();
  }

  if (!candidate || typeof candidate !== "object") {
    return "";
  }

  return (
    candidate.categoryName ||
    candidate.name ||
    candidate.category ||
    ""
  ).toString().trim();
};

export const matchReceiptCategory = (categories = [], categoryName, categoryCandidates = []) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  const normalizedTargetName = normalizeCategoryName(categoryName);

  if (normalizedTargetName) {
    const exactMatch = categories.find(
      (category) => normalizeCategoryName(category.name) === normalizedTargetName,
    );

    if (exactMatch) {
      return exactMatch;
    }
  }

  for (const candidate of Array.isArray(categoryCandidates) ? categoryCandidates : []) {
    const normalizedCandidateName = normalizeCategoryName(normalizeCandidateName(candidate));

    if (!normalizedCandidateName) {
      continue;
    }

    const candidateMatch = categories.find(
      (category) => normalizeCategoryName(category.name) === normalizedCandidateName,
    );

    if (candidateMatch) {
      return candidateMatch;
    }
  }

  const fallbackCategory = categories.find((category) => isFallbackCategory(category.name));

  return fallbackCategory ?? null;
};