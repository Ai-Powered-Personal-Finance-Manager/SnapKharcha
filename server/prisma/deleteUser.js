import "dotenv/config";
import prisma from "../src/config/prisma.js";

async function main() {
  const email = "test@test.com";

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return console.log("User not found");

  // 1. delete children first
  await prisma.expense.deleteMany({ where: { userId: user.id } });
  await prisma.budget.deleteMany({ where: { userId: user.id } });
  await prisma.category.deleteMany({ where: { userId: user.id } });
  await prisma.income.deleteMany({ where: { userId: user.id } });
  await prisma.loan.deleteMany({ where: { userId: user.id } });

  // 2. delete user
  await prisma.user.delete({ where: { id: user.id } });

  console.log("🗑️ User + all data deleted");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
