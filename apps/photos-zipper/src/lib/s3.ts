import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import type { ReadStream } from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { Buffer } from "buffer";

dotenv.config();

const region = process.env.S3_REGION!;
const bucketName = process.env.S3_BUCKET_NAME!;
const accessKeyId = process.env.S3_ACCESS_KEY!;
const secretAccessKey = process.env.S3_ACCESS_SECRET!;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Upload a file to S3.
 * @param key - The S3 object key (filename).
 * @param body - The file content as a ReadStream.
 */
export async function uploadToS3(key: string, body: Buffer | ReadStream): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
  });

  try {
    await s3Client.send(command);
  } catch (err) {
    throw new Error("Failed to upload");
  }
}

/**
 * Generate a signed URL for a file in S3.
 * @param key - The S3 object key (filename).
 * @returns The signed URL.
 */
export async function createSignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn: 60 * 10 }); // expires in 10 minutes
}
