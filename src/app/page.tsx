"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Sparkles,
  Clock,
  Users,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

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
              Join thousands of parents who are enriching their children's
              bedtime routine with our AI-generated stories.
            </p>
            <Button size="lg" onClick={handleCreateStory}>
              Try for Free!
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AI Bedtime Stories</h3>
              <p className="text-sm text-muted-foreground">
                Inspiring young minds with personalized AI-generated stories.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="w-6 h-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Bedtime Stories. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
