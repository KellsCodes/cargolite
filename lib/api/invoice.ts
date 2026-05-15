import { toast } from "react-toastify";
import api from "../axios";
import { Dispatch, SetStateAction } from "react";

export const handleDownloadInvoice = async (
  id: number,
  isDownloading: boolean,
  setIsDownloading: Dispatch<SetStateAction<boolean>>
) => {
  if (isDownloading) return;
  setIsDownloading(true);

  try {
    // Force response type to blob for binary data handling
    const response = await api.get(`/transaction/${id}/download`, {
      responseType: "blob",
    });

    // Create a local binary blob URL from the stream response
    const blob = new Blob([response.data], { type: "application/pdf" });
    const downloadUrl = window.URL.createObjectURL(blob);

    // Programmatically generate a hidden link element to click
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `invoice-${id}.pdf`); // Sets default save name

    // Trigger download execution and cleanup memory immediately
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

    toast.success("Invoice downloaded successfully");
  } catch (error) {
    console.error("Invoice download failed:", error);
    toast.error("Failed to download invoice. Please try again.");
  } finally {
    setIsDownloading(false);
  }
};
