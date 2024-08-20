import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DocumentCardsProps } from "@/types/main.types";

import Link from "next/link";
import React from "react";
import CardDropDown from "./CardDropDown";
import { File, Image } from "lucide-react";
import CustomDialog from "@/components/Dialog/PreviewDialog";
import PreviewCard from "./PreviewCard";

const Card = ({ item }: { item: DocumentCardsProps }) => {
  function formatDate(date: Date): string {
    const dateFromPrisma = new Date(date);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formatter.format(dateFromPrisma);
  }
  return (
    <div className="p-1 bg-gray-100 rounded-2xl flex flex-col gap-2">
      <div className="heading inline-flex items-center justify-between p-4 w-full">
        <div className="inline-flex items-center  gap-2">
          <File />
          {item.fileName}
        </div>
        <CardDropDown filename={item.fileName} downloadUrl={item.downloadUrl} />
      </div>
      <PreviewCard item={item} />
      <div className="info p-4 inline-flex gap-2 items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage></AvatarImage>
          <AvatarFallback className="bg-black text-white">V</AvatarFallback>
        </Avatar>
        <p>{formatDate(item.updatedAt)}</p>
      </div>
    </div>
  );
};

export default Card;
