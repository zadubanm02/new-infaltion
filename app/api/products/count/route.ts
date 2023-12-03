import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { getPrismaClient, transformNumber } from "@/utils/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
  const { session } = await getUserAuth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const count = await db.product.count();
    console.log("COUNT", count);
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
