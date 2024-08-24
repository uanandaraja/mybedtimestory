import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Stories | My Bedtime Story",
  description: "View and manage your bedtime stories",
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
