"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import Link from "next/link";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Define the submit handler
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to an API
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  placeholder="Enter your username"
                  autoComplete="off"
                />
                {errors.username && (
                  <span className="text-red-500 text-[12px]">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                {errors.email && (
                  <span className="text-red-500 text-[12px]">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <span className="text-red-500 text-[12px]">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="text-muted-foreground text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-black hover:underline">
              Login here
            </Link>{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
