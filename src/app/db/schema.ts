import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const stories = pgTable("stories", {
  id: text("id").primaryKey(),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
  userId: text("user_id"),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  storyId: serial("story_id").references(() => stories.id),
  imageUrl: varchar("image_url", { length: 255 }),
  status: varchar("status", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});
