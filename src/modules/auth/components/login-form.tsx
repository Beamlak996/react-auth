import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/general/password-input";
import {
  LoginSchema,
  loginSchema,
  loginSchemaDefaultValues,
} from "../types/login-schema";
import { useLoginMutation } from "../services/auth-queries";
import { FormError } from "@/components/general/form-error";

export const LoginForm = () => {
  const [error, setError] = useState<string>("")

  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginSchemaDefaultValues,
  });

  const { mutateAsync, isPending } = useLoginMutation();

  const onSubmit = async (values: LoginSchema) => {
    setError("")

    try {
      await mutateAsync(values);
      navigate('/test')
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const resErrorMessage =
          err.response?.data?.message || "An error occurred. Please try again.";
        setError(resErrorMessage)
      }
    }
  };

  return (
    <div className="flex h-full items-center p-4 lg:p-8 bg-slate-50">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your username and password to log in
          </p>
        </div>
        <FormError message={error} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Continue"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
