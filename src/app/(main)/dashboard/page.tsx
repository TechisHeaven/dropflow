import FileUpload from "@/components/Upload/FileUpload";
import React from "react";
import DriveInfo from "./DriveInfo";
import DocumentsCards from "./Cards/DocumentsCards";
import { getFilesByUserId } from "@/action/s3/action";
import { serverSupabase } from "@/utils/supabase/server/supabase.server";
export default async function Dashboard() {
  const {
    data: { user },
  } = await serverSupabase.auth.getUser();

  const files = await getFilesByUserId(user!.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-xl ">Dashboard </h1>
        <DriveInfo />
        <FileUpload />
      </div>
      <div className="documents flex flex-col gap-4">
        <div>
          <h1 className="font-semibold text-xl">All Documents</h1>
          <p>overview of every files or document that you have stored.</p>
        </div>
        <DocumentsCards items={files || []} />
      </div>
    </div>
  );
}
