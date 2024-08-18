"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login, signup } from "@/action/login/action";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Email must be valid" })
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function AuthForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function handleFormAction(
    formAction: (formData: FormData) => Promise<any>
  ) {
    const formData = new FormData();
    formData.append("email", form.getValues("email"));
    formData.append("password", form.getValues("password"));

    startTransition(async () => {
      const result = await formAction(formData);
      if (result?.redirectUrl) {
        toast.success("Success Login");
        router.push(result.redirectUrl); // Navigate to the redirect URL
      } else if (result?.message) {
        form.setError("email", { message: result.message });
      }
    });
  }

  return (
    <div className="h-full flex items-center justify-center w-full">
      <Form {...form}>
        <form className="space-y-8 w-full max-w-md">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending && <p>Loading...</p>}
          <Button
            type="button"
            onClick={() => handleFormAction(login)}
            disabled={isPending}
          >
            Login
          </Button>
          <Button
            type="button"
            onClick={() => handleFormAction(signup)}
            disabled={isPending}
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}
