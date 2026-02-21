-- CreateTable
CREATE TABLE `AdminMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(200) NOT NULL,
    `body` TEXT NOT NULL,
    `attachmentUrl` TEXT NULL,
    `recipientId` INTEGER NOT NULL,
    `adminId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AdminMessage_recipientId_idx`(`recipientId`),
    INDEX `AdminMessage_adminId_idx`(`adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdminMessage` ADD CONSTRAINT `AdminMessage_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdminMessage` ADD CONSTRAINT `AdminMessage_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
