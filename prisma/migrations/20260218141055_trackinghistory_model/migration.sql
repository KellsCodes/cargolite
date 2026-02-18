-- CreateTable
CREATE TABLE `TrackingHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('PICKED_UP', 'IN_TRANSIT', 'WAREHOUSE_ARRIVED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'DELAYED', 'RETURNED') NOT NULL DEFAULT 'PICKED_UP',
    `location` VARCHAR(150) NOT NULL,
    `notes` TEXT NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `shipmentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TrackingHistory_shipmentId_idx`(`shipmentId`),
    INDEX `TrackingHistory_updatedById_idx`(`updatedById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TrackingHistory` ADD CONSTRAINT `TrackingHistory_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrackingHistory` ADD CONSTRAINT `TrackingHistory_shipmentId_fkey` FOREIGN KEY (`shipmentId`) REFERENCES `Shipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
