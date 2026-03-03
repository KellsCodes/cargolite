-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `invoiceStatus` ENUM('PAID', 'UNPAID', 'REFUND', 'OVERDUE') NOT NULL DEFAULT 'UNPAID';

-- CreateIndex
CREATE INDEX `ClientEnquiryMessage_senderEmail_idx` ON `ClientEnquiryMessage`(`senderEmail`);
