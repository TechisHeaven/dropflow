"use client";
import { useUploadStore } from "@/store/upload.file.store";
import { Check, ChevronDown, Folder, Image, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const BottomUploadInfoComponent = () => {
  const {
    isCollapsed,
    isVisible,
    files,
    showUpload,
    hideUpload,
    updateFileProgress,
    toggleCollapsed,
    setFileStatus,
  } = useUploadStore();

  return (
    isVisible && (
      <div
        className={`fixed bottom-0 right-4 rounded-t-3xl rounded-b-none overflow-hidden bg-white text-black border focus:border-mainColor max-w-96 w-full`}
      >
        <h1 className="p-4 bg-gray-200 font-semibold capitalize text-black inline-flex justify-between w-full">
          <p>1 upload complete</p>
          <div className="inline-flex gap-2">
            <ChevronDown
              className={`${
                isCollapsed ? "rotate-180" : "rotate-0"
              } transition-all`}
              onClick={toggleCollapsed}
            />{" "}
            <X onClick={hideUpload} />
          </div>
        </h1>
        {!isCollapsed && (
          <div className="items">
            {files.length > 0 &&
              files?.map((file) => (
                <div
                  key={file.name}
                  className="item group hover:bg-gray-100 transition-colors cursor-pointer inline-flex p-4 w-full justify-between text-black"
                >
                  <div className="inline-flex gap-2">
                    <Image />
                    <span>{file.name}</span>
                  </div>
                  <div>
                    {file.progress < 100 && file.status === "uploading" ? (
                      <Loader />
                    ) : file.status === "completed" ? (
                      <>
                        <div className="bg-green-600 rounded-full transition-all text-black group-hover:hidden">
                          <Check />
                        </div>
                        <div className=" rounded-full transition-all text-black hidden group-hover:block">
                          <Folder />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-red-600 p-1 rounded-full transition-all text-black">
                          <X className="w-4 h-4" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    )
  );
};

export default BottomUploadInfoComponent;
