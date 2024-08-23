"use client";

import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const handleCreateStory = () => {
    if (isSignedIn) {
      router.push("/story");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">MyBedtimeStory</span>
            </div>
            <div>
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="ml-4 px-4 py-2 rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              ) : (
                <Link
                  href="/story"
                  className="ml-4 px-4 py-2 rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                >
                  My Stories
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Bedtime Stories, Reimagined
        </h1>
        <p className="text-xl sm:text-2xl text-indigo-700 mb-8 max-w-2xl">
          Spark your child imagination with AI-generated, personalized bedtime
          tales.
        </p>
        <button
          onClick={handleCreateStory}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-lg font-semibold"
        >
          Create a Bedtime Story
        </button>
      </main>
    </div>
  );
}
