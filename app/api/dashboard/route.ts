import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { title } from "process";
import { z } from "zod";

export async function GET(req: Request) {
  const { session } = await getUserAuth();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { error: "Could not obtain userId" },
      { status: 401 }
    );
  }

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const watchlistItems = await db.watchlist.findUnique({
      where: {
        userId,
      },
      include: { items: true },
    });
    if (
      watchlistItems &&
      watchlistItems.items &&
      watchlistItems.items.length < 1
    ) {
      return NextResponse.json(
        { error: "You dont have items in your watchlist" },
        { status: 404 }
      );
    }
    const productQueries =
      watchlistItems?.items.map((item) => ({
        title: {
          contains: item.itemName,
        },
      })) ?? [];
    const items = await db.product.findMany({
      where: {
        OR: productQueries,
      },
    });
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new Response("Could not find anything", { status: 404 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
