import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { validateRequest } from "@/auth"; // Import your authentication function

export async function GET() {
  try {
    // Validate the request to get user details
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const latestBlock = await prisma.block.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        index: "desc",
      },
    });

    if (!latestBlock) {
      return NextResponse.json({ previousHash: null });
    }

    return NextResponse.json({
      previousHash: latestBlock.currentHash,
      previousIndex: latestBlock.index,
    });
  } catch (error) {
    console.error("Error fetching latest block:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest block" },
      { status: 500 }
    );
  }
}
