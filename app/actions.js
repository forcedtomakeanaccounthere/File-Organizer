"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Ensure required environment variables are set
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("Missing AWS credentials in environment variables.");
}

// Configure AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to generate signed URL
export async function getSignedurl(name, type) {
  try {
    if (!process.env.AWS_S3_BUCKET_NAME) {
      throw new Error("Missing AWS_S3_BUCKET_NAME in environment variables.");
    }

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: name,
      ContentType: type,
    });

    // Generate a signed URL valid for 1 hour (3600s)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return { success: true, url: signedUrl };
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return {
      success: false,
      error: error.message || "Failed to generate signed URL",
    };
  }
}
