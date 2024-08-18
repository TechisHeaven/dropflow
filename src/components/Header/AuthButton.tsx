"use client";
import { clientSupabase } from "@/utils/supabase/client/supabase.client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AuthButton = ({ email }: { email: string | null }) => {
  const navigate = useRouter();
  async function handleLogout() {
    await clientSupabase.auth.signOut();
    toast.success("Logout User");
    navigate.push("/login");
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage />
          <AvatarFallback className="bg-black text-white">
            {(email && email[0]) || "DF"}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <p
          onClick={handleLogout}
          className="p-2 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Logout
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default AuthButton;
