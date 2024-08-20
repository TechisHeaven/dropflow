"use server";
import prisma from "@/config/prisma.config";
import s3Client from "@/utils/AWS/s3Upload.config";
import { serverSupabase } from "@/utils/supabase/server/supabase.server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function createFileUpload(data: {
  userId: string;
  fileName: string;
  fileKey: string;
  fileUrl: string;
  size: number;
  type: string;
}) {
  try {
    const file = await prisma.file.create({
      data: {
        userId: data.userId,
        fileName: data.fileName,
        fileKey: data.fileKey,
        fileUrl: data.fileUrl,
        size: data.size,
        type: data.type,
      },
    });
    return file;
  } catch (error) {
    console.error("Error creating file record:", error);
    return { status: 401, message: "Failed to create file record", error };
  }
}
export async function getFilesByUserId(userId: string) {
  try {
    const files = await prisma.file.findMany({
      where: {
        userId: userId,
      },
      orderBy: { createdAt: "desc" },
    });
    return files;
  } catch (error: any) {
    console.error("Error fetching files:", error);
    return {
      status: error.status || 404,
      message: "Failed to fetch files" + error,
    };
  }
}

export async function getFileById(fileId: string) {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });
    return file;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw new Error("Failed to fetch file");
  }
}

export async function getSignedFileUrl(fileId: string) {
  try {
    if (typeof fileId !== "string") {
      return { status: 409, message: "Invalid File Id" };
    }

    const {
      data: { user },
    } = await serverSupabase.auth.getUser();

    if (!user) {
      return { status: 404, message: "User not found Unauthorized" };
    }

    const userId = user?.id;

    // Fetch file information and permissions
    const file = await prisma.file.findUnique({
      where: { id: fileId },
      include: {
        shared: {
          where: {
            sharedWithId: userId,
          },
        },
      },
    });
    if (!file) {
      return {
        status: 404,
        message: "File not found",
      };
    }

    const hasAccess = file.shared.some(
      (share) => share.accessLevel === "DOWNLOAD"
    );
    const currentFileIsOfAdmin = file.userId === userId;
    if (!hasAccess && !currentFileIsOfAdmin) {
      return { status: 401, message: "Access Denied" };
    }

    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: file.fileKey,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 15 * 60 });

    return { status: 200, message: "Signed Url Successfully Created", url };
  } catch (error) {
    console.error("Error fetching file:", error);
    return { status: 401, message: "Failed to Fetch file record", error };
  }
}
