import Header from "@/components/Header/Header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="max-w-[1400px] m-auto">{children}</div>
    </div>
  );
}
