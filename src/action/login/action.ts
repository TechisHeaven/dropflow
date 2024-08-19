"use server";

import prisma from "@/config/prisma.config";
import { serverSupabase } from "@/utils/supabase/server/supabase.server";
import { ZodError } from "zod";
import { v4 as uuidv4 } from "uuid";

export async function login(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error, data: user } = await serverSupabase.auth.signInWithPassword(
      data
    );

    if (error) {
      return fromErrorToFormState(error);
    }
    console.log(data, user);
    if (user) {
      return { redirectUrl: "/dashboard" }; // Return redirect URL instead
    }
  } catch (error) {
    return fromErrorToFormState(error);
  }
}

export async function signup(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await serverSupabase.auth.signUp(data);

    if (error) {
      return fromErrorToFormState(error);
    }
    const {
      data: { user },
    } = await serverSupabase.auth.getUser();
    if (!user) {
      return { message: "user not found", status: 404 };
    }
    const userId = user?.id;
    const userCreate = await prisma.user.create({
      data: {
        id: userId,
        email: data.email,
        name: "user",
      },
    });

    if (!userCreate) {
      return { message: "Failed to create user", status: 401 };
    }
    return { redirectUrl: "/dashboard" }; // Return redirect URL instead
  } catch (error) {
    return fromErrorToFormState(error);
  }
}

export const fromErrorToFormState = (error: unknown) => {
  if (error instanceof ZodError) {
    return { message: error.errors[0].message };
  } else if (error instanceof Error) {
    return { message: error.message };
  } else {
    return { message: "An unknown error occurred" };
  }
};
