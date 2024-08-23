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
import Link from "next/link";

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

    try {
      const response = await fetch(`/api/getstory?userId=${user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stories");
      }
      const data: Story[] = await response.json();
      setStories(data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(stories.length / ITEMS_PER_PAGE);
  const paginatedStories = stories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <StoryGenerator />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Stories</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {paginatedStories.map((story) => (
              <Link href={`/story/${story.id}`} key={story.id} passHref>
                <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-3">{story.content}</p>
                    {story.images && story.images.length > 0 && (
                      <div className="relative w-full h-48">
                        <Image
                          src={story.images[0].imageUrl}
                          alt={story.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
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
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
