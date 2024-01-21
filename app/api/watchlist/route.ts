import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
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
    const watchlist = await db.watchlist.findMany({
      include: { items: true },
      where: {
        userId: userId,
      },
    });
    return NextResponse.json({ watchlist }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new Response("Could not find user with id", { status: 404 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}

const itemIdSchema = z.object({
  id: z.string().min(1),
});

const createWatchlistSchema = z.object({
  userId: z.string().min(1),
  items: z.array(itemIdSchema),
});

export async function POST(req: Request) {
  const { session } = await getUserAuth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const reqBody = await req.json();
  const body = createWatchlistSchema.parse(reqBody);
  try {
    const watchlist = await db.watchlist.create({
      data: {
        userId: body.userId,
        items: {
          connect: [...body.items],
        },
      },
    });
    return NextResponse.json({ watchlist }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
