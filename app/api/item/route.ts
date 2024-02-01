import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
  const { session } = await getUserAuth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const items = await db.item.findMany();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new Response("Could not find products", { status: 404 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
