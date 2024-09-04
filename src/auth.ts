import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./lib/prisma";
import { Session } from "@prisma/client";
import { cache } from "react";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      username: databaseUserAttributes.username,
      displayName: databaseUserAttributes.displayName,
      avatarUrl: databaseUserAttributes.avatarUrl,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
}
interface ExtendSessions extends Session {
  id: string;
  userId: string;
  expiresAt: Date;
  fresh: boolean;
}

export const validateRequest = cache(
  async (): Promise<{
    user: DatabaseUserAttributes | null;
    session: ExtendSessions | null;
  }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }
    try {
      const result = await lucia.validateSession(sessionId);
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      const user = result.user
        ? {
            id: result.user.id,
            username: result.user.username,
            displayName: result.user.displayName,
            avatarUrl: result.user.avatarUrl,
          }
        : null;

      const session = result.session
        ? {
            id: result.session.id,
            expiresAt: result.session.expiresAt,
            fresh: result.session.fresh,
            userId: result.session.userId,
          }
        : null;
      return {
        user,
        session,
      };
    } catch (error) {
      console.error("Session validation failed:", error);

      return {
        user: null,
        session: null,
      };
    }
  }
);
