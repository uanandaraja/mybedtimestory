"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isSignedIn } = useUser();
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
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Bedtime Stories, Reimagined
        </h1>
        <p className="text-xl sm:text-2xl mb-8 max-w-2xl">
          Spark your child imagination with their own personalized bedtime
          tales.
        </p>
        <Button onClick={handleCreateStory}>Create Your Bedtime Story</Button>
      </main>
    </div>
  );
}
