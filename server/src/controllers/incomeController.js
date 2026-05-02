import prisma from "../config/prisma.js";

// ─────────────────────────────────────────
// CREATE INCOME
// ─────────────────────────────────────────
export const createIncome = async (req, res, next) => {
  try {
    const { amount, company, position, source, note, status, type, creditDay } =
      req.body;

    const userId = req.user.id;

    if (
      !amount ||
      !company ||
      !position ||
      !source ||
      !status ||
      !type ||
      creditDay === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "amount, company, position, source, status, and type are required",
      });
    }

    // ───── Validate amount ─────
    const parsedAmount = Number(amount);

    if (!Number.isInteger(parsedAmount) || parsedAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "amount must be a valid positive integer",
      });
    }

    // ───── Validate creditDay ─────
    const parsedCreditDay = Number(creditDay);

    if (
      !Number.isInteger(parsedCreditDay) ||
      parsedCreditDay < 1 ||
      parsedCreditDay > 31
    ) {
      return res.status(400).json({
        success: false,
        message: "creditDay must be an integer between 1 and 31",
      });
    }

    // ───── Validate type ─────
    const validTypes = ["FIXED", "VARIABLE"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be FIXED or VARIABLE",
      });
    }

    // ───── Validate status ─────
    const validStatus = ["ACTIVE", "PAUSED"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be ACTIVE or PAUSED",
      });
    }

    // ───── Build data ─────
    const data = {
      amount: parsedAmount,
      company,
      position,
      source,
      status,
      type,
      creditDay: parsedCreditDay,
      userId,
    };

    if (note) data.note = note;

    // ───── Create income ─────
    const income = await prisma.income.create({
      data,
    });

    return res.status(201).json({
      success: true,
      message: "Income created successfully",
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// GET INCOMES
// ─────────────────────────────────────────
export const getIncomes = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const incomes = await prisma.income.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    // ───── Summary calculations ─────
    const totalIncome = incomes.reduce(
      (sum, inc) => sum + Number(inc.amount),
      0,
    );

    const fixedIncome = incomes
      .filter((i) => i.type === "FIXED")
      .reduce((sum, i) => sum + Number(i.amount), 0);

    const variableIncome = incomes
      .filter((i) => i.type === "VARIABLE")
      .reduce((sum, i) => sum + Number(i.amount), 0);

    const activeIncome = incomes
      .filter((i) => i.status === "ACTIVE")
      .reduce((sum, i) => sum + Number(i.amount), 0);

    const endedIncome = incomes
      .filter((i) => i.status === "ENDED")
      .reduce((sum, i) => sum + Number(i.amount), 0);

    return res.status(200).json({
      success: true,
      data: {
        incomes,
        summary: {
          totalIncome,
          fixedIncome,
          variableIncome,
          activeIncome,
          endedIncome,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// GET INCOME BY ID
// ─────────────────────────────────────────
export const getIncomeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const income = await prisma.income.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// UPDATE INCOME
// ─────────────────────────────────────────
export const updateIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, company, position, source, note, status, type } =
      req.body;

    const userId = req.user.id;

    // ───── Check ownership ─────
    const existing = await prisma.income.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    // ───── Validate amount ─────
    let parsedAmount = existing.amount;

    if (amount !== undefined) {
      parsedAmount = Number(amount);

      if (!Number.isInteger(parsedAmount) || parsedAmount < 0) {
        return res.status(400).json({
          success: false,
          message: "amount must be a valid positive integer",
        });
      }
    }

    // ───── Validate creditDay ─────
    let parsedCreditDay = existing.creditDay;

    if (creditDay !== undefined) {
      parsedCreditDay = Number(creditDay);

      if (
        !Number.isInteger(parsedCreditDay) ||
        parsedCreditDay < 1 ||
        parsedCreditDay > 31
      ) {
        return res.status(400).json({
          success: false,
          message: "creditDay must be an integer between 1 and 31",
        });
      }
    }

    // ───── Validate type ─────
    if (type !== undefined) {
      const validTypes = ["FIXED", "VARIABLE"];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid type. Must be FIXED or VARIABLE",
        });
      }
    }

    // ───── Validate status ─────
    if (status !== undefined) {
      const validStatus = ["ACTIVE", "PAUSED"]; // ✅ fixed
      if (!validStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be ACTIVE or PAUSED",
        });
      }
    }

    // ───── Build update object ─────
    const data = {
      amount: parsedAmount,
      company: company ?? existing.company,
      position: position ?? existing.position,
      source: source ?? existing.source,
      note: note ?? existing.note,
      status: status ?? existing.status,
      type: type ?? existing.type,
      creditDay: parsedCreditDay,
    };

    // ───── Update income ─────
    const updated = await prisma.income.update({
      where: { id },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Income updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// DELETE INCOME
// ─────────────────────────────────────────
export const deleteIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // ───── Check ownership ─────
    const existing = await prisma.income.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    // ───── Delete income ─────
    await prisma.income.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
