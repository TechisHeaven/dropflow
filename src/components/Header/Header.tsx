import React from "react";
import AuthButton from "./AuthButton";
import { serverSupabase } from "@/utils/supabase/server/supabase.server";

const Header = async () => {
  const { data, error } = await serverSupabase.auth.getUser();
  return (
    <div className="inline-flex items-center justify-between  w-full px-4 p-2">
      <h6 className="text-lg font-semibold">
        <span className="aspect-square bg-mainColor p-2 px-3 mr-1 rounded-md">
          D
        </span>
        DropFlow
      </h6>
      <AuthButton email={data?.user?.email || null} />
    </div>
  );
};

export default Header;
