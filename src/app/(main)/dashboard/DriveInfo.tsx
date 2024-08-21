import { Progress } from "@/components/ui/progress";
import React from "react";
import { HardDrive } from "lucide-react";
import { getUser } from "@/action/user/action";
const DriveInfo = async () => {
  const result = await getUser();
  const user = result?.result;

  function convertBytesToReleventValue(value: number = 0) {
    // bytes value
    if (value === 0) return "No Space";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(value) / Math.log(k));
    return parseFloat((value / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  return (
    <div>
      <div className="inline-flex items-center gap-2">
        <HardDrive />
        <h3 className="text-xl font-semibold">
          {convertBytesToReleventValue(user?.totalSpaceUsed)}{" "}
          <span className="text-sm text-gray-500">
            used from {convertBytesToReleventValue(user?.maxStorage)}
          </span>
        </h3>
      </div>
      <Progress value={33} />
    </div>
  );
};

export default DriveInfo;
