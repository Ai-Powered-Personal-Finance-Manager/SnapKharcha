import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";

// ─────────────────────────────────────────
// CREATE CATEGORY
// ─────────────────────────────────────────
export const createCategory = async (req, res, next) => {
  try {
    let { name, tags, icon } = req.body;
    const userId = req.user.id;

    // ✅ validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // ✅ normalize name (prevents duplicates like "Food" vs " food ")
    name = name.trim();

    // ✅ ensure tags is array
    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({
        success: false,
        message: "Tags must be an array",
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
        userId,
        tags: tags || [],
        icon: icon || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: "Category already exists for this user",
      });
    }

    next(error);
  }
};

// ─────────────────────────────────────────
// GET CATEGORY
// ─────────────────────────────────────────
export const getCategories = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// GET CATEGORY BY ID
// ─────────────────────────────────────────
export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const category = await prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// UDPATE CATEGORY
// ─────────────────────────────────────────
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { name, tags, icon } = req.body;
    const userId = req.user.id;

    // check category exists and is NOT deleted
    const existing = await prisma.category.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // normalize name
    if (name) {
      name = name.trim();

      // prevent duplicate active category name
      const duplicate = await prisma.category.findFirst({
        where: {
          userId,
          name,
          deletedAt: null,
          NOT: { id },
        },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Category with this name already exists",
        });
      }
    }

    // validate tags
    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({
        success: false,
        message: "Tags must be an array",
      });
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        tags: tags ?? existing.tags,
        icon: icon ?? existing.icon,
      },
    });

    return res.json({
      success: true,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// DELETE CATEGORY
// ─────────────────────────────────────────
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // 1. Check if category exists and is not already deleted
    const existing = await prisma.category.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // 2. Soft delete (no FK errors anymore)
    await prisma.category.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("inside controller error:", error);
    next(error);
  }
};
