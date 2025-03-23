import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quranLastRead = pgTable("quran_last_read", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  surahId: integer("surah_id").notNull(),
  surahName: text("surah_name").notNull(),
  ayahNumber: integer("ayah_number").notNull(),
  ayahText: text("ayah_text"),
  timestamp: integer("timestamp").notNull()
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLastReadSchema = createInsertSchema(quranLastRead).pick({
  userId: true,
  surahId: true,
  surahName: true,
  ayahNumber: true,
  ayahText: true,
  timestamp: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLastRead = z.infer<typeof insertLastReadSchema>;
export type LastRead = typeof quranLastRead.$inferSelect;
