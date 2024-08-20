"use server";

import s3Client from "@/utils/AWS/s3Upload.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createFileUpload } from "../action";
import { v4 as uuidv4 } from "uuid";
import { serverSupabase } from "@/utils/supabase/server/supabase.server";
import { revalidatePath } from "next/cache";
import { generateFileKey } from "@/utils/generateUniqueKey";

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

export async function UploadFile(data: any) {
  try {
    if (data?.size === 0) {
      return { status: 404, message: "Please Select a file" };
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

    const props = {
      id: id,
      userId: userId!,
      fileName: name,
      fileKey: fileKey,
      fileUrl: fileUrl,
      size: data.file.size,
      type: data.file.type,
    };
    createFileUpload(props);

    revalidatePath("/dashboard");
    return { status: 201, message: "File Uploaded SuccessFully" };
  } catch (error) {
    console.log(error);
    return { status: 401, message: "Failed to upload file", error };
  }
}
