"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function StoryGenerator() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const { user } = useUser();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      generateStory.mutate(prompt);
    }
  };

  const suggestions = [
    "A little star's adventure to brighten the night sky",
    "The brave teddy bear who protected dreams",
    "A magical treehouse that travels through time",
    "A friendly monster who helps kids fall asleep",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl text-center">
            Write a bedtime story
          </CardTitle>
          <CardDescription className="text-xl text-center">
            What magical tale shall we weave tonight?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your story idea..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={generateStory.isPending}
              />
              <Button
                type="submit"
                disabled={generateStory.isPending || !prompt.trim()}
              >
                {generateStory.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2">Try one of these:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  className="text-xs rounded-3xl"
                  variant="outline"
                  onClick={() => setPrompt(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {generateStory.isError && (
            <p className="text-destructive mt-4 text-center">
              Error creating story. Please try again.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
