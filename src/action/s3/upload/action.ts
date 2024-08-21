"use server";

import s3Client from "@/utils/AWS/s3Upload.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createFileUpload } from "../action";
import { v4 as uuidv4 } from "uuid";
import { serverSupabase } from "@/utils/supabase/server/supabase.server";
import { revalidatePath } from "next/cache";
import { generateFileKey } from "@/utils/generateUniqueKey";
import prisma from "@/config/prisma.config";
import { MAX_UPLOAD_SIZE } from "@/constants/main.constants";

// Upload File to S3 Query
async function uploadFileToS3(
  file: Buffer,
  filename: string,
  fileType: string,
  fileKey: string
) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: fileType,
  };

  const command = new PutObjectCommand(params);

  try {
    const response = await s3Client.send(command);
    console.log("File Upload Success", response);

    return filename;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Handle Upload File Action
export async function UploadFile(data: any) {
  try {
    if (data?.size === 0) {
      return { status: 404, message: "Please Select a file" };
    }
    // Check if the file exceeds the max upload size
    if (data.file.size > MAX_UPLOAD_SIZE) {
      return { status: 413, message: "File size exceeds the 5 MB limit" };
    }
    const base64Data = data.base64.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");

    // Generate unique file key
    const fileKey = generateFileKey(data.file.name);
    const name = data.file.name.replace(/\s+/g, "-");
    const filename = await uploadFileToS3(
      buffer,
      name,
      data.file.type,
      fileKey
    );

    const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${filename}`;
    const id = uuidv4();
    const {
      data: { user },
    } = await serverSupabase.auth.getUser();

    const userId = user?.id;
    const userRecord = await prisma.user.findUnique({
      where: { id: userId },
      select: { totalSpaceUsed: true, maxStorage: true },
    });

    if (!userRecord) {
      return { status: 401, message: "User not found" };
    }

    const totalSpaceUsed = userRecord.totalSpaceUsed;
    const maxStorage = userRecord.maxStorage;

    if (totalSpaceUsed + data.file.size > maxStorage) {
      return { status: 403, message: "Storage limit exceeded" };
    }

    const props = {
      id: id,
      userId: userId!,
      fileName: name,
      fileKey: fileKey,
      fileUrl: fileUrl,
      size: data.file.size,
      type: data.file.type,
    };

    // Update the user's totalSpaceUsed
    await prisma.user.update({
      where: { id: userId },
      data: { totalSpaceUsed: totalSpaceUsed + data.file.size },
    });

    createFileUpload(props);

    revalidatePath("/dashboard");
    return { status: 201, message: "File Uploaded SuccessFully" };
  } catch (error) {
    console.log(error);
    return { status: 401, message: "Failed to upload file", error };
  }
}
