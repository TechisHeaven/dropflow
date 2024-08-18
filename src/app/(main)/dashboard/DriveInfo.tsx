import { Progress } from "@/components/ui/progress";
import React from "react";
import { HardDrive } from "lucide-react";
const DriveInfo = () => {
  return (
    <div>
      <div className="inline-flex items-center gap-2">
        <HardDrive />
        <h3 className="text-xl font-semibold">
          20 MB <span className="text-sm text-gray-500">used from 1 GB</span>
        </h3>
      </div>
      <Progress value={33} />
    </div>
  );
};

export default DriveInfo;
