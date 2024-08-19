import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentCardsProps } from "@/types/main.types";
import {
  Download,
  Edit2,
  EllipsisVertical,
  File,
  Image,
  Info,
  Share,
  Trash,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import React from "react";

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
    <div className="p-1 bg-gray-100 rounded-2xl">
      <div className="heading inline-flex items-center justify-between p-4 w-full">
        <div className="inline-flex items-center  gap-2">
          <File />
          {item.fileName}
        </div>
        <CardDropDown />
      </div>
      <Link
        href={item.fileUrl}
        className="preview bg-white min-h-36 flex items-center justify-center"
      >
        <Image className="w-10 h-10 text-mainColor" />
      </Link>
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

const CardDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <DropdownMenuItem className="inline-flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem className="inline-flex items-center gap-2">
          <Edit2 className="w-4 h-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem className="inline-flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem className="inline-flex items-center gap-2">
          <Info className="w-4 h-4" />
          File Information
        </DropdownMenuItem>
        <DropdownMenuItem className="inline-flex items-center gap-2 bg-red-200 !text-red-500 cursor-pointer hover:bg-red-300 ">
          <Trash className="w-4 h-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
