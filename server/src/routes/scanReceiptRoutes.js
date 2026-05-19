import express from "express";
import { scanReceipt } from "../utils/ScanReceipt.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware ,async (req, res) => {
    try {
        const { file } = req.body;

        const result = await scanReceipt(file);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
        message: "Failed to scan receipt",
        });
    }
});

export default router;