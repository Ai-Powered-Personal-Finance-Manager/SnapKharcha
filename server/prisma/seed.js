import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "../src/config/prisma.js";
async function main() {
  console.log("🌱 Seeding data...");

  const hashedPassword = await bcrypt.hash("123456", 10);

  // 1. Create user
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@test.com",
      password: hashedPassword,
    },
  });

  // 2. Create categories
  const food = await prisma.category.create({
    data: {
      name: "Food",
      userId: user.id,
    },
  });

  const shopping = await prisma.category.create({
    data: {
      name: "Shopping",
      userId: user.id,
    },
  });

  // 3. Create budgets
  const foodBudget = await prisma.budget.create({
    data: {
      name: "Food Budget",
      amount: 10000,
      startingDate: new Date(),
      expireDate: new Date("2025-12-31"),
      spendAmount: 9500,
      userId: user.id,
      categoryId: food.id,
    },
  });

  const shoppingBudget = await prisma.budget.create({
    data: {
      name: "Shopping Budget",
      amount: 8000,
      startingDate: new Date(),
      expireDate: new Date("2025-12-31"),
      spendAmount: 9000,
      userId: user.id,
      categoryId: shopping.id,
    },
  });

  // 4. Expenses (for Rule 2 testing)
  await prisma.expense.createMany({
    data: [
      {
        amount: 6000,
        note: "Food this month",
        userId: user.id,
        categoryId: food.id,
        budgetId: foodBudget.id,
      },
      {
        amount: 4000,
        note: "Shopping this month",
        userId: user.id,
        categoryId: shopping.id,
        budgetId: shoppingBudget.id,
      },
    ],
  });

  // 5. Last month expenses (Rule 2)
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  await prisma.expense.createMany({
    data: [
      {
        amount: 2000,
        note: "Food last month",
        userId: user.id,
        categoryId: food.id,
        budgetId: foodBudget.id,
        date: lastMonth,
      },
      {
        amount: 1000,
        note: "Shopping last month",
        userId: user.id,
        categoryId: shopping.id,
        budgetId: shoppingBudget.id,
        date: lastMonth,
      },
    ],
  });

  // 6. Income (Rule 4 + Rule 6)
  await prisma.income.create({
    data: {
      amount: 50000,
      company: "Test Company",
      position: "Developer",
      source: "Salary",
      type: "FIXED",
      status: "ACTIVE",
      userId: user.id,
    },
  });

  // 7. Loans (Rule 6)
  await prisma.loan.createMany({
    data: [
      {
        name: "Car Loan",
        lenderName: "Bank A",
        interestRate: 10,
        amount: 200000,
        emiAmount: 12000,
        timeUnit: "MONTH",
        timeValue: 12,
        status: "ACTIVE",
        userId: user.id,
      },
      {
        name: "Personal Loan",
        lenderName: "Bank B",
        interestRate: 12,
        amount: 100000,
        emiAmount: 9000,
        timeUnit: "MONTH",
        timeValue: 10,
        status: "ACTIVE",
        userId: user.id,
      },
    ],
  });

  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
