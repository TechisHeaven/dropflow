"use server";

import prisma from "@/config/prisma.config";
import { serverSupabase } from "@/utils/supabase/server/supabase.server";

export async function getUser() {
  try {
    const {
      data: { user },
    } = await serverSupabase.auth.getUser();
    console.log(user);
    if (!user) {
      return {
        status: 401,
        message: "User not found",
      };
    }
    const userResult = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    return {
      status: 200,
      message: "User Get Successfully",
      result: userResult,
    };
  } catch (error) {
    console.error("Error fetching file:", error);
    return { status: 401, message: "Failed to Fetch User", error };
  }
}
