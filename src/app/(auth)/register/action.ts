"use server";
import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { registerSchema, registerValue } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(
  credentials: registerValue
): Promise<{ error: string }> {
  try {
    const { username, email, password } = registerSchema.parse(credentials);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const userId = generateIdFromEntropySize(10);
    const existingUser = await prisma.decentralizedUser.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (existingUser) {
      return {
        error: "User with this username already exists",
      };
    }
    const existingEmail = await prisma.decentralizedUser.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
    if (existingEmail) {
      return { error: "User with this email already exists" };
    }
    await prisma.decentralizedUser.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
      },
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookies = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookies.name,
      sessionCookies.value,
      sessionCookies.attributes
    );
    return redirect("/");
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred while signing up",
    };
  }
}
