const normalizeText = (value) => {
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

const parseDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getRemainingAmount = (budget) => {
  return Math.max((budget.amount ?? 0) - (budget.spendAmount ?? 0), 0);
};

const isWithinRange = (budget, receiptDate) => {
  if (!receiptDate) {
    return false;
  }

  const startingDate = parseDate(budget.startingDate);
  const expireDate = parseDate(budget.expireDate);

  if (!startingDate || !expireDate) {
    return false;
  }

  return receiptDate >= startingDate && receiptDate <= expireDate;
};

const pickBestBudget = (budgets, receiptDate) => {
  if (!Array.isArray(budgets) || budgets.length === 0) {
    return null;
  }

  return [...budgets].sort((left, right) => {
    const leftInRange = isWithinRange(left, receiptDate);
    const rightInRange = isWithinRange(right, receiptDate);

    if (leftInRange !== rightInRange) {
      return leftInRange ? -1 : 1;
    }

    const leftHasRemaining = getRemainingAmount(left) > 0;
    const rightHasRemaining = getRemainingAmount(right) > 0;

    if (leftHasRemaining !== rightHasRemaining) {
      return leftHasRemaining ? -1 : 1;
    }

    const leftStartingDate = parseDate(left.startingDate)?.getTime() ?? 0;
    const rightStartingDate = parseDate(right.startingDate)?.getTime() ?? 0;

    return rightStartingDate - leftStartingDate;
  })[0] ?? null;
};

export const matchReceiptBudget = ({
  budgets = [],
  categoryId,
  categoryName,
  receiptDate,
}) => {
  if (!Array.isArray(budgets) || budgets.length === 0) {
    return null;
  }

  const normalizedCategoryId = normalizeText(categoryId);
  const normalizedCategoryName = normalizeText(categoryName);
  const receiptDateValue = parseDate(receiptDate);

  const directMatches = budgets.filter((budget) => {
    const budgetCategoryId = normalizeText(budget.category?.id ?? budget.categoryId);
    const budgetCategoryName = normalizeText(budget.category?.name);

    return (
      (normalizedCategoryId && budgetCategoryId === normalizedCategoryId) ||
      (normalizedCategoryName && budgetCategoryName === normalizedCategoryName)
    );
  });

  if (directMatches.length > 0) {
    return pickBestBudget(directMatches, receiptDateValue);
  }

  return null;
};