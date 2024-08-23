import { NextResponse } from "next/server";
import { db } from "@/app/db/db";
import { stories, images } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const userStories = await db
      .select()
      .from(stories)
      .where(eq(stories.userId, userId));

    const storiesWithImages = await Promise.all(
      userStories.map(async (story) => {
        const storyImages = await db
          .select()
          .from(images)
          .where(eq(images.storyId, story.id));

        return { ...story, images: storyImages };
      }),
    );

    return NextResponse.json(storiesWithImages);
  } catch (error) {
    console.error("Failed to fetch stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 },
    );
  }
}
