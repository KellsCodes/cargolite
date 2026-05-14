/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Shipment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sentShipmentId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receivedShipmentId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Shipment` DROP FOREIGN KEY `Shipment_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Shipment` DROP FOREIGN KEY `Shipment_senderId_fkey`;

-- DropIndex
DROP INDEX `Shipment_invoiceId_key` ON `Shipment`;

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `receivedShipmentId` INTEGER NULL,
    ADD COLUMN `sentShipmentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Shipment` DROP COLUMN `invoiceId`;

-- CreateIndex
CREATE UNIQUE INDEX `Client_sentShipmentId_key` ON `Client`(`sentShipmentId`);

-- CreateIndex
CREATE UNIQUE INDEX `Client_receivedShipmentId_key` ON `Client`(`receivedShipmentId`);

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_sentShipmentId_fkey` FOREIGN KEY (`sentShipmentId`) REFERENCES `Shipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_receivedShipmentId_fkey` FOREIGN KEY (`receivedShipmentId`) REFERENCES `Shipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
