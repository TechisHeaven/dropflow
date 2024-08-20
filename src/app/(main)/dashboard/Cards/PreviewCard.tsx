"use client";
import CustomDialog from "@/components/Dialog/PreviewDialog";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import React from "react";
import { DocumentCardsProps } from "@/types/main.types";

const PreviewCard = ({ item }: { item: DocumentCardsProps }) => {
  return (
    <CustomDialog
      trigger={
        <div className="preview bg-white min-h-36 flex items-center justify-center">
          <ImageIcon className="w-10 h-10 text-mainColor" />
        </div>
      }
    >
      <div className="bg-white inline-flex items-center justify-center  p-4">
        <Image
          src={item.downloadUrl || ""}
          width={200}
          height={200}
          alt={item.fileName}
        ></Image>
      </div>
    </CustomDialog>
  );
};

export default PreviewCard;
