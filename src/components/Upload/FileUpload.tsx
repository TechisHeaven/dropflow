"use client";
import { UploadFile } from "@/action/s3/upload/action";
import { cn } from "@/lib/utils";
import { useUploadStore } from "@/store/upload.file.store";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface FileUploadMainProps extends File {
  path: string;
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
  size: number;
  type: File["type"];
}

interface FileUploadProps {
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "completed" | "failed";
}

const FileUpload = () => {
  const {
    isVisible,
    files,
    showUpload,
    hideUpload,
    addFiles,
    updateFileProgress,
    setFileStatus,
  } = useUploadStore();

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  //handle Upload here
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        progress: 0,
        status: "uploading",
      })) as FileUploadProps[];

      newFiles.map((file) => {
        addFiles(file);
      });

      showUpload();

      try {
        for (const file of acceptedFiles) {
          const base64File = await fileToBase64(file);

          const props = {
            path: file.path,
            name: file.name,
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            webkitRelativePath: file.webkitRelativePath,
            size: file.size,
            type: file.type,
          };
          const result = await UploadFile({
            file: props,
            base64: base64File,
          });

          if (result.status === 201) {
            setFileStatus(file.name, "completed");
            toast.success("File Uploaded Successfully");
          }
        }
      } catch (error) {
        newFiles.forEach((file) => setFileStatus(file.name, "failed"));
      }
    },
    [addFiles, showUpload, updateFileProgress, setFileStatus, hideUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //convert file size from kb to mb
  function convertFileSize(fileSize: number) {
    const units = ["B", "KB", "MB"];

    if (fileSize === 0) return "0 B";

    const i = Math.floor(Math.log(fileSize) / Math.log(1024));
    const size = fileSize / Math.pow(1024, i);

    return `${size.toFixed(2)} ${units[i]}`;
  }

  return (
    <>
      <form action={UploadFile}>
        <input type="file" name="file" id="file" />
        <button type="submit">Send</button>
      </form>
      <div
        key={"FileUpload"}
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center border-2  rounded-lg p-6 min-h-40 transition-colors duration-300 cursor-pointer",
          isDragActive && "border-mainColor bg-blue-50"
        )}
      >
        <div className="image">
          <Image
            src={"/file-upload-folder.png"}
            alt="file upload folder image"
            width={200}
            height={200}
          />
          <h3 className="font-semibold text-lg">Upload your Files/Photos</h3>
        </div>
        <input {...getInputProps()} />
        <div className="text-gray-600 text-center">
          {isDragActive ? (
            "Drop the files here ..."
          ) : (
            <p>
              Drag & drop your files here, or{" "}
              <span className="underline text-mainColor">choose files</span>
            </p>
          )}
        </div>
        {files?.map((file: FileUploadProps) => {
          return (
            <div>
              {file.name} {convertFileSize(file.size)}
            </div>
          );
        })}
        <p className="text-xs text-gray-500 mt-2">Max file size: 2MB</p>
      </div>
    </>
  );
};

export default FileUpload;

interface FileUploadMainProps extends File {
  path: string;
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
  size: number;
  type: File["type"];
}

interface FileUploadProps {
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "completed" | "failed";
}
