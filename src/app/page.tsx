"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles, Clock, Users } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleCreateStory = () => {
    if (isSignedIn) {
      router.push("/story");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-48 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-primary">
              Bedtime Stories, Reimagined
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
              Spark your child&apos;s imagination with personalized AI-generated
              bedtime tales.
            </p>
            <Button size="lg" onClick={handleCreateStory}>
              Create Your Bedtime Story
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-primary">
              Why Choose Our Stories?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Personalized Content",
                  description:
                    "Tailored stories featuring your child's name and interests",
                },
                {
                  icon: Sparkles,
                  title: "AI-Powered Creativity",
                  description: "Unique plots and characters in every story",
                },
                {
                  icon: Clock,
                  title: "Quick Generation",
                  description:
                    "New stories in seconds, perfect for busy parents",
                },
                {
                  icon: Users,
                  title: "Age-Appropriate",
                  description: "Content suitable for children aged 0-8 years",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="w-10 h-10 mb-4 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Ready to Create Magical Moments?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
              Join thousands of parents who are enriching their children&apos;s
              bedtime routine with our AI-generated stories.
            </p>
            <Button size="lg" onClick={handleCreateStory}>
              Try for Free!
            </Button>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
