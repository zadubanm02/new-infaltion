import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { getPrismaClient } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
  const { session } = await getUserAuth();
  const { pathname } = new URL(req.url);
  const parts = pathname.split("/");
  const userId = parts[parts.length - 1];
  if (!userId) {
    console.log("USerID", userId);
    return NextResponse.json(
      { error: "Could not obtain userId" },
      { status: 404 }
    );
  }
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: `Could not find User with id ${userId}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
