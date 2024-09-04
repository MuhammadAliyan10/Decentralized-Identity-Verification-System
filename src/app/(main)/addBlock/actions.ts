"use server";

import { validateRequest } from "@/auth";
import { generateHash } from "@/lib/Block";
import prisma from "@/lib/prisma";

interface BlockProps {
  index: number;
  previousHash: string;
  data: JSON;
}
export async function addBlock({ index, previousHash, data }: BlockProps) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const timestamp = new Date();
    const currentHash = generateHash({ index, previousHash, data, timestamp });

    await prisma.block.create({
      data: {
        index,
        previousHash,
        currentHash,
        data: JSON.stringify(data),
        userId: user.id,
        timestamp,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
