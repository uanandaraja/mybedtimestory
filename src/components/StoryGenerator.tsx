"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export function StoryGenerator() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const generateStory = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await fetch("/api/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate story");
      }
      return response.json();
    },
    onSuccess: (data) => {
      router.push(`/story/${data.story[0].id}`);
    },
  });

  // const generateImage = useMutation({
  //   mutationFn: async (storyId: string) => {
  //     const response = await fetch("/api/generate-image", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ storyId }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to generate image");
  //     }
  //     return response.json();
  //   },
  // });

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Bring your imagination to life
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create magical stories for you and your little ones with our
                  AI-powered story generator.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter a story idea..."
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button
                  onClick={() => generateStory.mutate(prompt)}
                  disabled={generateStory.isPending || !prompt.trim()}
                >
                  {generateStory.isPending ? "Generating..." : "Generate Story"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
