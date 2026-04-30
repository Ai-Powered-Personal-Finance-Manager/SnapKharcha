import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";

// ─────────────────────────────────────────
// CREATE LOAN
// ─────────────────────────────────────────
export const createLoan = async (req, res, next) => {
  try {
    const {
      name,
      lenderName,
      interestRate,
      timePeriod,
      amount,
      emiAmount,
      note,
      status,
    } = req.body;

    const userId = req.user.id;

    // ───── Required fields ─────
    if (
      !name ||
      !lenderName ||
      interestRate === undefined ||
      !timePeriod ||
      !amount ||
      !emiAmount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, lenderName, interestRate, timePeriod, amount, and emiAmount are required",
      });
    }

    // ───── Parse numeric values ─────
    const parsedInterestRate = Number(interestRate);
    const parsedTimePeriod = Number(timePeriod);
    const parsedAmount = Number(amount);
    const parsedEmi = Number(emiAmount);

    if (
      isNaN(parsedInterestRate) ||
      isNaN(parsedTimePeriod) ||
      isNaN(parsedAmount) ||
      isNaN(parsedEmi)
    ) {
      return res.status(400).json({
        success: false,
        message: "Numeric fields must be valid numbers",
      });
    }

    if (
      parsedInterestRate < 0 ||
      parsedTimePeriod <= 0 ||
      parsedAmount < 0 ||
      parsedEmi < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Values must be positive",
      });
    }

    // ───── Validate status ─────
    const loanStatus = status === "paid" ? "paid" : "active";

    // ───── Build data ─────
    const data = {
      name,
      lenderName,
      interestRate: new Prisma.Decimal(parsedInterestRate),
      timePeriod: parsedTimePeriod,
      amount: parsedAmount,
      emiAmount: parsedEmi,
      note: note || null,
      status: loanStatus,
      userId,
    };

    // ───── Create loan ─────
    const loan = await prisma.loan.create({
      data,
    });

    return res.status(201).json({
      success: true,
      message: "Loan created successfully",
      data: loan,
    });
  } catch (error) {
    next(error);
  }
};
