/*
  Warnings:

  - You are about to drop the column `categoryId` on the `subcategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `subcategory` DROP FOREIGN KEY `Subcategory_categoryId_fkey`;

-- DropIndex
DROP INDEX `Subcategory_categoryId_fkey` ON `subcategory`;

-- AlterTable
ALTER TABLE `subcategory` DROP COLUMN `categoryId`,
    ADD COLUMN `combinedCategoryId` INTEGER NULL;

-- CreateTable
CREATE TABLE `CombinedCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `CombinedCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CombinedCategory` ADD CONSTRAINT `CombinedCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD CONSTRAINT `Subcategory_combinedCategoryId_fkey` FOREIGN KEY (`combinedCategoryId`) REFERENCES `CombinedCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
