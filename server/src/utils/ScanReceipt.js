import Groq from "groq-sdk";
import Tesseract from "tesseract.js";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const scanReceipt = async (file) => {
    try {
        // STEP 1: OCR the receipt image
        const ocrResult = await Tesseract.recognize(
            file.buffer,
            "eng"
        );

        const extractedText = ocrResult.data.text;

        console.log("OCR TEXT:");
        console.log(extractedText);

        // STEP 2: Send OCR text to Groq
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content:
                        "You are a receipt analysis AI. Always return only valid JSON.",
                },
                {
                    role: "user",
                    content: `
                        Analyze this receipt text and extract:

                        - Total amount
                        - Date
                        - Merchant/store
                        - Brief note
                        - Suggested category

                        Possible categories:
                        housing,
                        transportation,
                        groceries,
                        utilities,
                        entertainment,
                        food,
                        shopping,
                        healthcare,
                        education,
                        personal,
                        travel,
                        insurance,
                        gifts,
                        bills,
                        other-expense

                        Receipt text:

                        ${extractedText}

                        Return ONLY valid JSON:

                        {
                        "amount": number,
                        "date": "ISO date string",
                        "note": "string",
                        "merchant": "string",
                        "category": "string"
                        }

                        If not a receipt return:
                        {}
                    `,
                },
            ],

            temperature: 0.1,
        });

        const text =
            completion.choices[0]?.message?.content || "{}";

        console.log("AI RESPONSE:");
        console.log(text);

        const cleanedText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const data = JSON.parse(cleanedText);

        return {
            amount: parseFloat(data.amount) || 0,
            date: data.date ? new Date(data.date) : new Date(),
            note: data.note || "",
            merchant: data.merchant || "",
            category: data.category || "other-expense",
        };
    } catch (error) {
        console.error("Receipt Scan Error:", error);

        throw new Error(error.message);
    }
};