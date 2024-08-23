"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold">MyBedtimeStory</span>
          </div>
          <div>
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <Button variant={"secondary"}>Sign In</Button>
              </SignInButton>
            ) : (
              <Link href="/story">
                <Button variant={"secondary"}>My Stories</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
