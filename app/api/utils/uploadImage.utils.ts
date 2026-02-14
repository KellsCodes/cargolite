import { v2 as cloudinary } from "cloudinary";

/**
 * Uploads image file to cloudinary service
 * @returns {object}: The uploaded image object
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function cloudImageUpload(
  buffer: Buffer,
  folder: string,
  filename: string
) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `cargolite/${folder}`,
        public_id: filename.replace(/\.[^/.]+$/, ""),
        resource_type: "image",
        format: "webp",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url);
      }
    );

    // Pipe buffer to cloudinary stream
    uploadStream.end(buffer);
  });
}

export async function deleteCloudImage(imageID: string) {
  return await cloudinary.uploader.destroy(imageID);
}
