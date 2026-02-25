import sharp from "sharp";
import path from "path";
import fs from "fs";
import {
  cloudImageUpload,
  deleteCloudImage,
} from "@/app/api/utils/uploadImage.utils";

export const processImage = async (
  file: File,
  userId: number,
  type: string
) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const isImage = file.type.startsWith("image/");
    const cloudinaryResourceType = isImage ? "image" : "raw";

    let filename =
      `${userId}_${Date.now()}_` +
      file.name
        .split(".")[0]
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    if (!isImage) {
      filename += `.${file.name.split(".")[1]}`; // Append file extension for non-image files
    }
    const fileURL = await cloudImageUpload(
      buffer,
      type,
      filename,
      cloudinaryResourceType
    );
    return fileURL as string;
  } catch (error) {
    console.error(error);
    return null;
  }
};
