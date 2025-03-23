import { pgTable, text, serial, integer, boolean, jsonb, timestamp, uuid } from "drizzle-orm/pg-core";
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

// جدول الإشارات المرجعية
export const quranBookmarks = pgTable("quran_bookmarks", {
  id: text("id").primaryKey(), // UUID 
  userId: text("user_id").notNull(),
  surahId: integer("surah_id").notNull(),
  surahName: text("surah_name").notNull(),
  ayahNumber: integer("ayah_number").notNull(),
  ayahText: text("ayah_text").notNull(),
  timestamp: integer("timestamp").notNull(),
  notes: text("notes"),
  color: text("color").default("primary"), // لون الإشارة المرجعية
});

// جدول السور المفضلة
export const quranFavorites = pgTable("quran_favorites", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  surahId: integer("surah_id").notNull(),
  surahName: text("surah_name").notNull(),
  timestamp: integer("timestamp").notNull(),
  category: text("category").default("general"), // تصنيف المفضلة (عام، تلاوة، حفظ، إلخ)
});

// جدول الآيات المفضلة
export const quranFavoriteVerses = pgTable("quran_favorite_verses", {
  id: text("id").primaryKey(), // UUID
  userId: text("user_id").notNull(),
  surahId: integer("surah_id").notNull(),
  surahName: text("surah_name").notNull(),
  ayahNumber: integer("ayah_number").notNull(),
  ayahText: text("ayah_text").notNull(),
  timestamp: integer("timestamp").notNull(),
  category: text("category").default("general"), // تصنيف المفضلة (عام، تدبر، حفظ، إلخ)
});

// جدول مجموعات التصنيف المخصصة
export const quranCollections = pgTable("quran_collections", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon").default("bookmark"),
  color: text("color").default("primary"),
  timestamp: integer("timestamp").notNull(),
});

// جدول عناصر المجموعات
export const quranCollectionItems = pgTable("quran_collection_items", {
  id: text("id").primaryKey(), // UUID
  collectionId: integer("collection_id").notNull(),
  itemType: text("item_type").notNull(), // "surah", "verse", "bookmark"
  itemId: text("item_id").notNull(), // معرف العنصر
  timestamp: integer("timestamp").notNull(),
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

export const insertBookmarkSchema = createInsertSchema(quranBookmarks).pick({
  id: true,
  userId: true,
  surahId: true,
  surahName: true,
  ayahNumber: true,
  ayahText: true,
  timestamp: true,
  notes: true,
  color: true,
});

export const insertFavoriteSchema = createInsertSchema(quranFavorites).pick({
  userId: true,
  surahId: true,
  surahName: true,
  timestamp: true,
  category: true,
});

export const insertFavoriteVerseSchema = createInsertSchema(quranFavoriteVerses).pick({
  id: true,
  userId: true,
  surahId: true,
  surahName: true,
  ayahNumber: true,
  ayahText: true,
  timestamp: true,
  category: true,
});

export const insertCollectionSchema = createInsertSchema(quranCollections).pick({
  userId: true,
  name: true,
  description: true,
  icon: true,
  color: true,
  timestamp: true,
});

export const insertCollectionItemSchema = createInsertSchema(quranCollectionItems).pick({
  id: true,
  collectionId: true,
  itemType: true,
  itemId: true,
  timestamp: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLastRead = z.infer<typeof insertLastReadSchema>;
export type LastRead = typeof quranLastRead.$inferSelect;

export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
export type Bookmark = typeof quranBookmarks.$inferSelect;

export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof quranFavorites.$inferSelect;

export type InsertFavoriteVerse = z.infer<typeof insertFavoriteVerseSchema>;
export type FavoriteVerse = typeof quranFavoriteVerses.$inferSelect;

export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type Collection = typeof quranCollections.$inferSelect;

export type InsertCollectionItem = z.infer<typeof insertCollectionItemSchema>;
export type CollectionItem = typeof quranCollectionItems.$inferSelect;
