/*
  Warnings:

  - A unique constraint covering the columns `[shipmentId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shipmentId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Shipment` DROP FOREIGN KEY `Shipment_invoiceId_fkey`;

-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `shipmentId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Invoice_shipmentId_key` ON `Invoice`(`shipmentId`);

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_shipmentId_fkey` FOREIGN KEY (`shipmentId`) REFERENCES `Shipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
