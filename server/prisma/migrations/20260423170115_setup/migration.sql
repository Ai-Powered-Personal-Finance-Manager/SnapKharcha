/*
  Warnings:

  - You are about to drop the column `month` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Budget` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,categoryId]` on the table `Budget` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expireDate` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startingDate` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Budget_userId_categoryId_month_year_key";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "alert" BOOLEAN,
ADD COLUMN     "alertLimit" DECIMAL(65,30),
ADD COLUMN     "expireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "spendAmount" DOUBLE PRECISION,
ADD COLUMN     "startingDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "icon" TEXT,
ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Budget_userId_categoryId_key" ON "Budget"("userId", "categoryId");
