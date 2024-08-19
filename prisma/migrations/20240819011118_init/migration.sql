/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SharedFile" DROP CONSTRAINT "SharedFile_fileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SharedFile" DROP CONSTRAINT "SharedFile_sharedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."SharedFile" DROP CONSTRAINT "SharedFile_sharedWithId_fkey";

-- DropTable
DROP TABLE "public"."File";

-- DropTable
DROP TABLE "public"."SharedFile";

-- DropTable
DROP TABLE "public"."User";

-- DropEnum
DROP TYPE "public"."AccessLevel";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
