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
    const processedBuffer = await sharp(buffer)
      .resize(500, 500, {
        fit: "cover",
      })
      .webp({ quality: 80 })
      .toBuffer();
    const filename = `${type}_${userId}_${Date.now()}.webp`;
    const imageURL = await cloudImageUpload(buffer, type, filename);
    return imageURL as string;
  } catch (error) {
    console.error(error);
    return null;
  }
};
