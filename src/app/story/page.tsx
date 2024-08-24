"use client";

import { useUser } from "@clerk/nextjs";
import { StoryGenerator } from "../../components/StoryGenerator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import StoryNavbar from "@/components/StoryNavbar";

interface Story {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  images?: Image[];
}

interface Image {
  id: string;
  story_id: string;
  imageUrl: string;
  status: string;
  created_at: string;
}

const ITEMS_PER_PAGE = 6;

export default function StoryPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingStories, setIsLoadingStories] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchStories();
    }
  }, [isSignedIn, user]);

  const fetchStories = async () => {
    if (!user) return;

    setIsLoadingStories(true);
    try {
      const response = await fetch(`/api/getstory?userId=${user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stories");
      }
      const data: Story[] = await response.json();
      setStories(data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setIsLoadingStories(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(stories.length / ITEMS_PER_PAGE);
  const paginatedStories = stories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <StoryNavbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <StoryGenerator />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Stories</h2>
            {isLoadingStories ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2">Loading stories...</p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  {paginatedStories.map((story) => (
                    <Link href={`/story/${story.id}`} key={story.id} passHref>
                      <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {story.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {story.images && story.images.length > 0 && (
                            <div className="relative w-full h-48">
                              <Image
                                src={story.images[0].imageUrl}
                                alt={story.title}
                                fill
                                className="rounded-lg"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                {stories.length > 0 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            onClick={() => setCurrentPage(index + 1)}
                            isActive={currentPage === index + 1}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages),
                            )
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
