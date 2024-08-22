import { NextResponse } from "next/server";
import { db } from "@/app/db/db";
import { images } from "@/app/db/schema";

export async function POST(req: Request) {
  const data = await req.json();

  if (data.status === "succeeded") {
    const image = await db.insert(images).values({
      storyId: data.storyId,
      imageUrl: data.output[0],
      status: "succeeded",
    });

    return NextResponse.json({ success: true, image });
  }

  return NextResponse.json({ success: false });
}
