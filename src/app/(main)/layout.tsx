import Header from "@/components/Header/Header";
import BottomUploadInfoComponent from "@/components/Upload/BottomUploadInfoComponent";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="max-w-[1400px] m-auto">
        {children}
        <BottomUploadInfoComponent />
      </div>
    </div>
  );
}
