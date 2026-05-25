const formatCategoryTags = (tags) => {
  if (!Array.isArray(tags) || tags.length === 0) {
    return "None";
  }

  return tags.join(", ");
};

export const buildReceiptScanMessages = ({ receiptText, categories = [] }) => {
  const availableCategories =
    categories.length > 0
      ? categories
          .map(
            (category, index) =>
              `${index + 1}. ${category.name}\nTags: ${formatCategoryTags(category.tags)}`,
          )
          .join("\n\n")
      : "No available categories were found for this user.";

  return [
    {
      role: "system",
      content:
        "You analyze OCR text from expense receipts. Use semantic understanding of the merchant, items, and context to classify the expense, even if the exact category words do not appear. Return a ranked shortlist of category options and always return valid JSON only.",
    },
    {
      role: "user",
      content: `Analyze this receipt text and extract:\n\n- Total amount\n- Date\n- Merchant/store\n- Brief note\n- The top 3 semantic category options from the available categories below\n\nAvailable Categories:\n\n${availableCategories}\n\nInstructions:\n- Infer the meaning of the receipt first, then rank the BEST matching categories from the available categories above.\n- Return a shortlist of up to 3 category options ranked from most likely to least likely.\n- Return ONLY exact category names from the available categories.\n- Do not invent new categories.\n- If nothing clearly matches, include "Other" only if it appears in the available categories.\n- Use the full receipt meaning, merchant knowledge, and item context. Do not require literal keyword overlap with the category name or tags.\n- If the text is not a receipt, return an empty JSON object.\n\nReturn ONLY valid JSON in this exact format:\n\n{\n  "amount": number,\n  "date": "ISO date string",\n  "note": "string",\n  "merchant": "string",\n  "categoryCandidates": [\n    { "categoryName": "Food & Dining", "confidence": 0.96 },\n    { "categoryName": "Shopping", "confidence": 0.62 },\n    { "categoryName": "Other", "confidence": 0.12 }\n  ],\n  "categoryName": "Food & Dining"\n}\n\nReceipt text:\n\n${receiptText}`,
    },
  ];
};