import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const stories = pgTable("stories", {
  id: text("id").primaryKey(),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
  userId: text("user_id"),
});

export const images = pgTable("images", {
  id: text("id").primaryKey(),
  storyId: text("story_id").references(() => stories.id),
  imageUrl: text("image_url"),
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow(),
});
