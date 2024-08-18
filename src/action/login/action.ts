"use server";

import {
  createClient,
  serverSupabase,
} from "@/utils/supabase/server/supabase.server";
import { ZodError } from "zod";

export async function login(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await serverSupabase.auth.signInWithPassword(data);

    if (error) {
      return fromErrorToFormState(error);
    }

    return { redirectUrl: "/dashboard" }; // Return redirect URL instead
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
