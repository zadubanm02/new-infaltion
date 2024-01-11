import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { getPrismaClient } from "@/utils/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const { session } = await getUserAuth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const products = await db.product.findMany({
      where: {
        AND: [
          {
            discountedPrice: {
              gte: transformNumber(priceRange[0]),
              lte: transformNumber(priceRange[1]),
            },
          },
          {
            title: {
              contains: searchTerm,
            },
          },
          {
            store: {
              contains: store === Store.All ? "" : (store as string),
            },
          },
        ],
      },
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
