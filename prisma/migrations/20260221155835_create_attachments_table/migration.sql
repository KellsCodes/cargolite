/*
  Warnings:

  - You are about to drop the column `attachmentUrl` on the `AdminMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AdminMessage` DROP COLUMN `attachmentUrl`;

-- CreateTable
CREATE TABLE `AdminMessageAttachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` TEXT NOT NULL,
    `type` ENUM('IMAGE', 'DOC') NOT NULL,
    `adminMessageId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AdminMessageAttachment_adminMessageId_idx`(`adminMessageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdminMessageAttachment` ADD CONSTRAINT `AdminMessageAttachment_adminMessageId_fkey` FOREIGN KEY (`adminMessageId`) REFERENCES `AdminMessage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
