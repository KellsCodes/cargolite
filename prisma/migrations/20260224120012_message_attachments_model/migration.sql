/*
  Warnings:

  - You are about to drop the column `type` on the `AdminMessageAttachment` table. All the data in the column will be lost.
  - Added the required column `fileType` to the `AdminMessageAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AdminMessageAttachment` DROP COLUMN `type`,
    ADD COLUMN `fileName` VARCHAR(191) NULL,
    ADD COLUMN `fileType` ENUM('IMAGE', 'DOC') NOT NULL;
