"use client";

import { useUser } from "@clerk/nextjs";
import { StoryGenerator } from "../components/StoryGenerator";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome! {user.fullName}</h1>
        </div>
        <StoryGenerator />
      </div>
    </div>
  );
}
