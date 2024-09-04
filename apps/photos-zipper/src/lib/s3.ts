import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { Buffer } from "buffer";
import dotenv from "dotenv";
import type { ReadStream } from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const region = process.env.S3_REGION!;
const bucketName = process.env.S3_BUCKET_NAME!;
const accessKeyId = process.env.S3_ACCESS_KEY!;
const secretAccessKey = process.env.S3_ACCESS_SECRET!;

class S3 {
  private s3: S3Client;
  private bucketName: string;

  constructor() {
    this.bucketName = bucketName;
    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  public async upload(key: string, body: ReadStream) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: "zip",
    });

    try {
      const res = await this.s3.send(command);

      return res;
    } catch (err) {
      throw new Error("Failed to upload");
    }
  }

  public async getSignedUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3, command, { expiresIn: 60 * 10 }); // expires in 10 minutes
  }
}

export default S3;
