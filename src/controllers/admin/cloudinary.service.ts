import cloudinary from "../../config/cloudinary";

export const uploadToCloudinary = (fileBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject("Upload failed");
        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};