import { NextResponse } from "next/server";
import { db } from "@/app/db/db";
import { images } from "@/app/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const storyId = searchParams.get("storyId");

  if (!userId || !storyId) {
    return NextResponse.json(
      { error: "User ID and Story ID are required" },
      { status: 400 },
    );
  }

  try {
    const storyImage = await db
      .select()
      .from(images)
      .where(eq(images.storyId, storyId))
      .orderBy(desc(images.createdAt))
      .limit(1);

    if (storyImage.length > 0) {
      return NextResponse.json({ imageUrl: storyImage[0].imageUrl });
    } else {
      return NextResponse.json({ imageUrl: null });
    }
  } catch (error) {
    console.error("Failed to fetch story image:", error);
    return NextResponse.json(
      { error: "Failed to fetch story image" },
      { status: 500 },
    );
  }
}
