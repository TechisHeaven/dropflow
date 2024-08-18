"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps extends File {
  path: string;
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
  size: number;
  type: File["type"];
}

const FileUpload = () => {
  const [files, setFiles] = useState<FileUploadProps[]>([]);

  //handle Upload here
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFiles(acceptedFiles as FileUploadProps[]);
  }, []);

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
    <div
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
  );
};

export default FileUpload;
