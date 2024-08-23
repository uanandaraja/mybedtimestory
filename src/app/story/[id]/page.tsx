import React from "react";
import { db } from "@/app/db/db";
import { stories, images } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EB_Garamond } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const garamond = EB_Garamond({ subsets: ["latin"] });

async function getStory(id: string) {
  const storyResult = await db.select().from(stories).where(eq(stories.id, id));
  if (storyResult.length === 0) {
    throw new Error("Story not found");
  }
  return storyResult[0];
}

async function getImage(storyId: string) {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (true) {
    const imageResult = await db
      .select()
      .from(images)
      .where(eq(images.storyId, storyId));

    if (imageResult[0]?.imageUrl) {
      return imageResult[0];
    }

    await delay(500); // Wait 2 seconds before trying again
  }
}

function ImageComponent({ storyId }: { storyId: string }) {
  const ImageWithRetry = React.lazy(() =>
    getImage(storyId).then((image) => ({
      default: () => (
        <Image
          src={image.imageUrl!}
          alt="Story illustration"
          width={1000}
          height={400}
          className="w-full h-auto rounded-md"
        />
      ),
    })),
  );

  return (
    <Suspense
      fallback={
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md"></div>
      }
    >
      <ImageWithRetry />
    </Suspense>
  );
}

export default async function StoryPage({
  params,
}: {
  params: { id: string };
}) {
  const story = await getStory(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card
        className={cn(
          "max-w-2xl mx-auto bg-white border shadow-md text-black rounded-3xl p-2",
        )}
      >
        <CardHeader>
          <CardTitle
            className={`${garamond.className} space-y-2 text-3xl text-gray-700`}
          >
            {story.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <ImageComponent storyId={params.id} />
          </div>
          <div className={`${garamond.className} text-lg whitespace-pre-wrap`}>
            {story.content}
          </div>
        </CardContent>
      </Card>
      <div className="fixed bottom-0 left-0 right-0 p-4 text-white flex justify-center">
        <Link href="/story">
          <Button
            variant="secondary"
            size="lg"
            className="font-semibold shadow-2xl rounded-3xl"
          >
            ⬅️ Back to Story
          </Button>
        </Link>
      </div>
    </div>
  );
}
