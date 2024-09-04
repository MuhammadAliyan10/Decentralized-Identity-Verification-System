"use server";
import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, loginValue } from "@/lib/validation";
import argon2 from "argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  credentials: loginValue
): Promise<{ error?: string; success?: boolean }> {
  try {
    const { username, password } = loginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser) {
      return { error: "No user found." };
    }

    if (!existingUser.passwordHash) {
      return { error: "Invalid password" };
    }

    const validPassword = await argon2.verify(
      existingUser.passwordHash,
      password
    );

    if (!validPassword) {
      return { error: "Incorrect password" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred while logging in. Please try again." };
  }
}
