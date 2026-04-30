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
      timeValue,
      timeUnit,
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
      timeValue === undefined ||
      !timeUnit ||
      !amount ||
      !emiAmount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, lenderName, interestRate, timeValue, timeUnit, amount, and emiAmount are required",
      });
    }

    // ───── Parse numeric values ─────
    const parsedInterestRate = Number(interestRate);
    const parsedTimeValue = Number(timeValue);
    const parsedAmount = Number(amount);
    const parsedEmi = Number(emiAmount);

    if (
      isNaN(parsedInterestRate) ||
      isNaN(parsedTimeValue) ||
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
      parsedTimeValue <= 0 ||
      parsedAmount < 0 ||
      parsedEmi < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Values must be positive",
      });
    }

    // ───── Validate timeUnit ─────
    const validTimeUnits = ["MONTH", "YEAR"];
    if (!validTimeUnits.includes(timeUnit)) {
      return res.status(400).json({
        success: false,
        message: "timeUnit must be either 'MONTH' or 'YEAR'",
      });
    }

    // ───── Normalize loan status ─────
    const loanStatus = status === "paid" ? "paid" : "active";

    // ───── Prepare data object ─────
    const data = {
      name,
      lenderName,
      interestRate: new Prisma.Decimal(parsedInterestRate),
      timeValue: parsedTimeValue,
      timeUnit,
      amount: parsedAmount,
      emiAmount: parsedEmi,
      note: note || null,
      status: loanStatus,
      userId,
    };

    // ───── Create loan record ─────
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

// ─────────────────────────────────────────
// GET LOANS
// ─────────────────────────────────────────
export const getLoans = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const loans = await prisma.loan.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    // ───── Calculate total loan amounts and total paid ─────
    const totalLoanAmount = loans.reduce(
      (sum, loan) => sum + Number(loan.amount),
      0,
    );
    const totalPaidAmount = loans.reduce(
      (sum, loan) => sum + Number(loan.paidAmount || 0),
      0,
    );

    const remainingLoan = totalLoanAmount - totalPaidAmount;

    const overallPercentage =
      totalLoanAmount > 0 ? (totalPaidAmount / totalLoanAmount) * 100 : 0;

    const formattedLoans = loans.map((loan) => ({
      ...loan,
      status: loan.status === "active" ? "Active Loan" : "Paid Off",
    }));

    return res.status(200).json({
      success: true,
      data: {
        loans: formattedLoans,
        summary: {
          totalLoanAmount: totalLoanAmount,
          totalPaidAmount: totalPaidAmount,
          remainingLoan: remainingLoan,
          overallPercentage: overallPercentage,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// GET LOAN BY ID
// ─────────────────────────────────────────
export const getLoanById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const loan = await prisma.loan.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    const formattedLoan = {
      ...loan,
      status: loan.status === "active" ? "Active Loan" : "Paid Off",
    };

    return res.status(200).json({
      success: true,
      data: formattedLoan,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// UPDATE LOAN
// ─────────────────────────────────────────
export const updateLoan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      lenderName,
      interestRate,
      timeValue,
      timeUnit,
      amount,
      emiAmount,
      note,
      status,
    } = req.body;

    const userId = req.user.id;

    // ───── Check if the loan exists and belongs to the user ─────
    const existingLoan = await prisma.loan.findFirst({
      where: {
        id,
        userId, // Ensure the user can only update their own loans
      },
    });

    // ───── If loan does not exist, return 404 ─────
    if (!existingLoan) {
      return res.status(404).json({
        success: false,
        message:
          "Loan not found or you do not have permission to update this loan",
      });
    }

    // ───── Validate the input values ─────
    const parsedInterestRate = interestRate
      ? Number(interestRate)
      : existingLoan.interestRate;
    const parsedTimeValue =
      timeValue !== undefined ? Number(timeValue) : existingLoan.timeValue;
    const parsedAmount =
      amount !== undefined ? Number(amount) : existingLoan.amount;
    const parsedEmi =
      emiAmount !== undefined ? Number(emiAmount) : existingLoan.emiAmount;

    if (
      isNaN(parsedInterestRate) ||
      isNaN(parsedTimeValue) ||
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
      parsedTimeValue <= 0 ||
      parsedAmount < 0 ||
      parsedEmi < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Values must be positive",
      });
    }

    // ───── Validate timeUnit ─────
    const validTimeUnits = ["MONTH", "YEAR"];
    if (timeUnit && !validTimeUnits.includes(timeUnit)) {
      return res.status(400).json({
        success: false,
        message: "timeUnit must be either 'MONTH' or 'YEAR'",
      });
    }

    // ───── Normalize loan status ─────
    const loanStatus = status === "paid" ? "paid" : "active";

    // ───── Prepare data object for update ─────
    const updatedData = {
      name: name ?? existingLoan.name,
      lenderName: lenderName ?? existingLoan.lenderName,
      interestRate: interestRate
        ? new Prisma.Decimal(parsedInterestRate)
        : existingLoan.interestRate,
      timeValue: timeValue ?? existingLoan.timeValue,
      timeUnit: timeUnit ?? existingLoan.timeUnit,
      amount: amount ?? existingLoan.amount,
      emiAmount: emiAmount ?? existingLoan.emiAmount,
      note: note ?? existingLoan.note,
      status: status ?? existingLoan.status,
    };

    // ───── Update the loan record ─────
    const updatedLoan = await prisma.loan.update({
      where: { id },
      data: updatedData,
    });

    return res.status(200).json({
      success: true,
      message: "Loan updated successfully",
      data: updatedLoan,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// DELETE LOAN
// ─────────────────────────────────────────
export const deleteLoan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // ───── Check if the loan exists ─────
    const existingLoan = await prisma.loan.findFirst({
      where: {
        id,
        userId, // Ensure the user can only delete their own loans
      },
    });

    // ───── If loan does not exist, return 404 ─────
    if (!existingLoan) {
      return res.status(404).json({
        success: false,
        message:
          "Loan not found or you do not have permission to delete this loan",
      });
    }

    // ───── Delete the loan ─────
    await prisma.loan.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Loan deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
