"use client";

import { useUser } from "@clerk/nextjs";
import { StoryGenerator } from "../../components/StoryGenerator";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StoryPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/"); // Redirect to home if not signed in
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <StoryGenerator />
      </div>
    </div>
  );
}
