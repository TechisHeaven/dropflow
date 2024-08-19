"use server";
import prisma from "@/config/prisma.config";

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
        userId,
      },
      orderBy: { createdAt: "desc" },
    });
    return files;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Failed to fetch files");
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
