"use client";
import CustomDialog from "@/components/Dialog/PreviewDialog";
import Image from "next/image";
import { Image as ImageIcon, Video } from "lucide-react";
import React from "react";
import { DocumentCardsProps } from "@/types/main.types";

const PreviewCard = ({ item }: { item: DocumentCardsProps }) => {
  return (
    <CustomDialog
      trigger={
        <div className="preview bg-white min-h-36 flex items-center justify-center">
          {item.type === "video/webm" ? (
            <Video className="w-10 h-10 text-mainColor" />
          ) : (
            <ImageIcon className="w-10 h-10 text-mainColor" />
          )}
        </div>
      }
    >
      <div className="bg-white inline-flex items-center justify-center w-full h-full p-4">
        {item.type === "video/webm" && (
          <video src={item.downloadUrl} about="uploaded-video" controls></video>
        )}
        {item.type !== "video/webm" && (
          <Image
            src={item.downloadUrl || ""}
            width={500}
            height={500}
            alt={item.fileName}
          ></Image>
        )}
      </div>
    </CustomDialog>
  );
};

export default PreviewCard;
