"use server";
import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { registerSchema, registerValue } from "@/lib/validation";
import argon2 from "argon2";

import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(
  credentials: registerValue
): Promise<{ error?: string; success?: boolean }> {
  try {
    const { username, email, password } = registerSchema.parse(credentials);

    const passwordHash = await argon2.hash(password);
    const userId = generateIdFromEntropySize(10);

    const existingUser = await prisma.user.findFirst({
      where: { username: { equals: username, mode: "insensitive" } },
    });
    if (existingUser) {
      return { error: "User with this username already exists" };
    }

    const existingEmail = await prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });
    if (existingEmail) {
      return { error: "User with this email already exists" };
    }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
      },
    });

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    const session = await lucia.createSession(userId, {});

    // Check if the session already exists before creating
    const existingSession = await prisma.session.findUnique({
      where: { id: session.id },
    });

    if (existingSession) {
      return { error: "Session already exists" };
    }

    await prisma.session.create({
      data: {
        id: session.id,
        userId: userId,
        expiresAt: expirationDate,
      },
    });

    const sessionCookies = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookies.name,
      sessionCookies.value,
      sessionCookies.attributes
    );

    redirect("/");
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: "An error occurred while signing up. Please try again.",
    };
  }
}
