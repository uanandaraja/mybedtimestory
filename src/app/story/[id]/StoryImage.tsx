"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

async function fetchStoryImage(userId: string, storyId: string) {
  const response = await fetch(
    `/api/getstoryimage?userId=${userId}&storyId=${storyId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch story image");
  }
  const data = await response.json();
  return data.imageUrl;
}

export default function StoryImage({ storyId }: { storyId: string }) {
  const { user } = useUser();
  const userId = user?.id!;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: imageUrl,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["storyImage", userId, storyId],
    queryFn: () => fetchStoryImage(userId, storyId),
    enabled: !!userId && !!storyId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    const startRefetching = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        refetch();
      }, 2000);
    };

    const stopRefetching = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (imageUrl === null) {
      startRefetching();
    } else {
      stopRefetching();
    }

    return () => {
      stopRefetching();
    };
  }, [imageUrl, refetch]);

  console.log(imageUrl);

  if (isLoading || isError || imageUrl === null) {
    return (
      <div className="w-full h-64 bg-gray-100 animate-pulse rounded-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-gradient" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 mb-4 text-gray-400 animate-spin mx-auto" />
            <p className="text-sm text-gray-500">
              Crafting a beautiful image for your story
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt="Story illustration"
      width={1000}
      height={400}
      className="w-full h-auto rounded-md"
    />
  );
}
