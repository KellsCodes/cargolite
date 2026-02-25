-- CreateTable
CREATE TABLE `ClientEnquiryMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(200) NOT NULL,
    `body` TEXT NOT NULL,
    `senderEmail` VARCHAR(200) NOT NULL,
    `senderName` VARCHAR(200) NOT NULL,
    `messageStatus` INTEGER NOT NULL DEFAULT 1,
    `packageHeight` VARCHAR(191) NULL,
    `packageWeight` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ClientEnquiryMessage_messageStatus_idx`(`messageStatus`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RepliedEnquiryMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `body` TEXT NOT NULL,
    `clientEnquiryMessageId` INTEGER NOT NULL,
    `adminId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RepliedEnquiryMessage_clientEnquiryMessageId_idx`(`clientEnquiryMessageId`),
    INDEX `RepliedEnquiryMessage_adminId_idx`(`adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RepliedEnquiryMessage` ADD CONSTRAINT `RepliedEnquiryMessage_clientEnquiryMessageId_fkey` FOREIGN KEY (`clientEnquiryMessageId`) REFERENCES `ClientEnquiryMessage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepliedEnquiryMessage` ADD CONSTRAINT `RepliedEnquiryMessage_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
