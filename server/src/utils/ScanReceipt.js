import Groq from "groq-sdk";
import Tesseract from "tesseract.js";
import { buildReceiptScanMessages } from "./receiptScanPrompt.js";
import { matchReceiptCategory } from "./receiptCategoryMatcher.js";
import { parseReceiptScanResponse } from "./receiptScanParser.js";
import { matchReceiptBudget } from "./receiptBudgetMatcher.js";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const toReceiptIsoString = (value) => {
    const date = value ? new Date(value) : new Date();

    if (Number.isNaN(date.getTime())) {
        return new Date().toISOString();
    }

    return date.toISOString();
};

export const scanReceipt = async (file, categories = [], budgets = []) => {
    try {
        if (!file?.buffer) {
            throw new Error("Receipt file is required");
        }

        const ocrResult = await Tesseract.recognize(file.buffer, "eng");

        const extractedText = ocrResult.data.text ?? "";
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            messages: buildReceiptScanMessages({
                receiptText: extractedText,
                categories,
            }),

            temperature: 0.1,
        });

        const text = completion.choices[0]?.message?.content || "{}";
        const data = parseReceiptScanResponse(text) ?? {};
        const matchedCategory = matchReceiptCategory(categories, data.categoryName, data.categoryCandidates);
        const matchedBudget = matchReceiptBudget({
            budgets,
            categoryId: matchedCategory?.id ?? null,
            categoryName: matchedCategory?.name ?? null,
            receiptDate: data.date,
        });

        return {
            amount: Number.isFinite(data.amount) ? Math.max(Math.round(data.amount), 0) : 0,
            date: toReceiptIsoString(data.date),
            note: data.note || "",
            merchant: data.merchant || "",
            categoryId: matchedBudget?.categoryId ?? matchedBudget?.category?.id ?? matchedCategory?.id ?? null,
            category: matchedBudget?.category ?? matchedCategory,
            budgetId: matchedBudget?.id ?? null,
            budget: matchedBudget,
        };
    } catch (error) {
        console.error("Receipt Scan Error:", error);

        throw new Error(error?.message || "Failed to scan receipt");
    }
};