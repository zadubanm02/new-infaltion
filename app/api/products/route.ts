import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { getPrismaClient, transformNumber } from "@/utils/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

export enum Store {
  Kaufland = "Kaufland",
  Lidl = "Lidl",
  Tesco = "Tesco",
  All = "All",
}

export type Filters = {
  searchTerm: string;
  store: Store | null;
  priceRange: number[];
};

export async function GET(req: Request) {
  const { session } = await getUserAuth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const filters = searchParams.get("filters");
    const { store, searchTerm, priceRange } = JSON.parse(
      filters as string
    ) as Filters;

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
      take: parseInt(limit ?? "10"),
      skip: parseInt(offset ?? "0"),
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
