/*
  Warnings:

  - The values [delivered,fulfilled] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('requested', 'rejected', 'ordered', 'received', 'shorted');
ALTER TABLE "public"."SpecialOrder" ALTER COLUMN "orderStatus" DROP DEFAULT;
ALTER TABLE "SpecialOrder" ALTER COLUMN "orderStatus" TYPE "OrderStatus_new" USING ("orderStatus"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "SpecialOrder" ALTER COLUMN "orderStatus" SET DEFAULT 'requested';
COMMIT;

-- DropForeignKey
ALTER TABLE "SpecialOrder" DROP CONSTRAINT "SpecialOrder_supplierId_fkey";

-- DropIndex
DROP INDEX "SpecialOrder_brandId_idx";

-- DropIndex
DROP INDEX "SpecialOrder_createdById_idx";

-- AlterTable
ALTER TABLE "SpecialOrder" ADD COLUMN     "initialOrderAt" TIMESTAMP(3),
ADD COLUMN     "nextOrderAt" TIMESTAMP(3),
ADD COLUMN     "orderFrequency" INTEGER,
ADD COLUMN     "recurring" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "supplierId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "SpecialOrder_recurring_idx" ON "SpecialOrder"("recurring");

-- CreateIndex
CREATE INDEX "SpecialOrder_nextOrderAt_idx" ON "SpecialOrder"("nextOrderAt");

-- AddForeignKey
ALTER TABLE "SpecialOrder" ADD CONSTRAINT "SpecialOrder_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
