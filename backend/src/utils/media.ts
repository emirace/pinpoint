// s3Utils.ts
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
const region = process.env.AWS_BUCKET_REGION || "";
const bucket = process.env.AWS_BUCKET_NAME || "";

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

export const uploadMediaToS3 = async (
  filePath: string,
  fileName: string,
  mediaType: string
) => {
  const fileStream = fs.createReadStream(filePath);
  const key = `${uuidv4()}_${fileName}`;
  const uploadParams = {
    Bucket: bucket,
    Key: key,
    Body: fileStream,
    ContentType: mediaType === "image" ? "image/jpeg" : "video/mp4", // Adjust based on your media type
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));

    // Construct the public URL of the uploaded file
    const s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    console.log(s3Url);

    return { url: s3Url, type: mediaType }; // Return the S3 URL to access the uploaded file
  } catch (err) {
    console.error("Error uploading file to S3:", err);
    throw new Error("Could not upload file to S3");
  } finally {
    // Clean up temporary file
    fs.unlinkSync(filePath);
  }
};

export const deleteMediaFromS3 = async (url: string) => {
  try {
    // Parse the S3 URL to extract the bucket and key
    const parsedUrl = new URL(url);
    const bucketName = parsedUrl.host.split(".")[0];
    const key = decodeURIComponent(parsedUrl.pathname.substring(1));

    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`Successfully deleted ${key} from S3 bucket: ${bucketName}`);
  } catch (error: any) {
    console.error(`Error deleting media from S3: `, error);
    throw new Error(`Could not delete media from S3: ${error.message}`);
  }
};
