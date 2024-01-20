import { getUserAuth } from "@/lib/auth/utils";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { userSchema } from "@/prisma/zod";

export type User = z.infer<typeof userSchema>;

export async function POST(req: Request) {
  const { session } = await getUserAuth();
  const reqBody = await req.json();
  console.log("REQ BODY", reqBody);
  const body = userSchema.parse(reqBody.data);
  console.log("REQ BODY", body);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const foundUser = await db.user.findUnique({
      where: {
        id: body.id,
      },
    });
    console.log("FOUND", foundUser);
    if (foundUser) return NextResponse.json({ foundUser }, { status: 200 });
    const user = await db.user.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
