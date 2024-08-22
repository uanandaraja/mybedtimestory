import { NextResponse } from "next/server";
import { db } from "@/app/db/db";
import { images } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const data = await req.json();

  if (data.status === "succeeded") {
    const updateResult = await db
      .update(images)
      .set({
        storyId: data.storyId,
        imageUrl: data.output[0],
        status: "succeeded",
      })
      .where(eq(images.id, data.id))
      .returning();

    if (updateResult.length > 0) {
      return NextResponse.json({ success: true, image: updateResult[0] });
    }
  }

  return NextResponse.json({ success: false });
}
