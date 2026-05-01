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
      amount === undefined ||
      emiAmount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, lenderName, interestRate, timeValue, timeUnit, amount and emiAmount are required",
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
    const normalizedTimeUnit = timeUnit?.toUpperCase();

    if (!validTimeUnits.includes(normalizedTimeUnit)) {
      return res.status(400).json({
        success: false,
        message: "timeUnit must be either 'MONTH' or 'YEAR'",
      });
    }

    // ───── Validate & normalize status ─────
    const validStatuses = ["ACTIVE", "PAID"];
    const normalizedStatus = status?.toUpperCase() || "ACTIVE";

    if (!validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: "status must be either 'ACTIVE' or 'PAID'",
      });
    }

    // ───── Prepare data object ─────
    const data = {
      name,
      lenderName,
      interestRate: new Prisma.Decimal(parsedInterestRate),
      timeValue: parsedTimeValue,
      timeUnit: normalizedTimeUnit,
      amount: parsedAmount,
      emiAmount: parsedEmi,
      note: note || null,
      status: normalizedStatus,
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
      status: loan.status === "ACTIVE" ? "ACTIVE" : "PAID",
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
      status: loan.status === "ACTIVE" ? "ACTIVE" : "PAID",
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

    // ───── Check ownership ─────
    const existingLoan = await prisma.loan.findFirst({
      where: { id, userId },
    });

    if (!existingLoan) {
      return res.status(404).json({
        success: false,
        message:
          "Loan not found or you do not have permission to update this loan",
      });
    }

    // ───── Parse values safely ─────
    const parsedInterestRate =
      interestRate !== undefined
        ? Number(interestRate)
        : Number(existingLoan.interestRate);

    const parsedTimeValue =
      timeValue !== undefined ? Number(timeValue) : existingLoan.timeValue;

    const parsedAmount =
      amount !== undefined ? Number(amount) : existingLoan.amount;

    const parsedEmi =
      emiAmount !== undefined ? Number(emiAmount) : existingLoan.emiAmount;

    // ───── Validate numbers ─────
    if (
      [parsedInterestRate, parsedTimeValue, parsedAmount, parsedEmi].some(
        (val) => isNaN(val),
      )
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

    // ───── Validate & normalize status ─────
    let normalizedStatus = existingLoan.status;

    if (status) {
      const upperStatus = status.toUpperCase();
      const validStatuses = ["ACTIVE", "PAID"];

      if (!validStatuses.includes(upperStatus)) {
        return res.status(400).json({
          success: false,
          message: "status must be either 'ACTIVE' or 'PAID'",
        });
      }

      normalizedStatus = upperStatus;
    }

    // ───── Prepare update data ─────
    const updatedData = {
      name: name ?? existingLoan.name,
      lenderName: lenderName ?? existingLoan.lenderName,
      interestRate: new Prisma.Decimal(parsedInterestRate),
      timeValue: parsedTimeValue,
      timeUnit: timeUnit ?? existingLoan.timeUnit,
      amount: parsedAmount,
      emiAmount: parsedEmi,
      note: note ?? existingLoan.note,
      status: normalizedStatus,
    };

    // ───── Update ─────
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
