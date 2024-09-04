"use client";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import Link from "next/link";
import { registerSchema, registerValue } from "@/lib/validation";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";
import { register } from "./actions";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Page = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<registerValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  // Define the submit handler
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await register(data);
      if (error) setError(error);
    });
  };

  return (
    <div className="w-full h-screen bg-card flex justify-center items-center">
      <Card className="w-[30%]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>
            Decentralized Identity Verification System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {error && <p className="text-center text-destructive">{error}</p>}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        autoComplete="off"
                      />
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
                      <PasswordInput
                        placeholder="Password"
                        type="password"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                loading={isPending}
                type="submit"
                className="w-full"
              >
                Create Account
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="text-muted-foreground text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="hover:underline">
              Login here
            </Link>{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
