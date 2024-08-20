import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Edit2,
  EllipsisVertical,
  Info,
  Trash,
  UserPlus,
} from "lucide-react";

const CardDropDown = ({
  downloadUrl = "",
  filename,
}: {
  downloadUrl?: string;
  filename: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <DropdownMenuLabel>{filename}</DropdownMenuLabel>
        <DropdownMenuItem className="inline-flex items-center gap-2">
          <a
            href={downloadUrl}
            target="__blank"
            download={downloadUrl}
            className="inline-flex items-center gap-2 w-full"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
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

export default CardDropDown;
