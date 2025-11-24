import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quranController } from "./controllers/quranController";
import { bookmarksController } from "./controllers/bookmarksController";
import { favoritesController } from "./controllers/favoritesController";
import { collectionsController } from "./controllers/collectionsController";
import { authController } from "./controllers/authController";
import { adminController } from "./controllers/adminController";
import { memorizationController } from "./controllers/memorizationController";
import { halaqatController } from "./controllers/halaqatController";
import { lessonsController } from "./controllers/lessonsController";
import { dhikrController } from "./controllers/dhikrController";
import { authMiddleware, requireRole } from "./middleware/auth";
import { UserRole } from "./constants";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes (public)
  app.post("/api/auth/register", authController.register);
  app.post("/api/auth/login", authController.login);
  app.get("/api/auth/me", authMiddleware, authController.me);

  // Admin routes (protected - admin only)
  app.get("/api/admin/users", authMiddleware, requireRole(UserRole.ADMIN), adminController.getAllUsers);
  app.post("/api/admin/users", authMiddleware, requireRole(UserRole.ADMIN), adminController.createUser);
  app.put("/api/admin/users/:id", authMiddleware, requireRole(UserRole.ADMIN), adminController.updateUser);
  app.delete("/api/admin/users/:id", authMiddleware, requireRole(UserRole.ADMIN), adminController.deleteUser);
  
  app.get("/api/admin/lessons", authMiddleware, requireRole(UserRole.ADMIN), adminController.getAllLessons);
  app.post("/api/admin/lessons", authMiddleware, requireRole(UserRole.ADMIN), adminController.createLesson);
  app.put("/api/admin/lessons/:id", authMiddleware, requireRole(UserRole.ADMIN), adminController.updateLesson);
  app.delete("/api/admin/lessons/:id", authMiddleware, requireRole(UserRole.ADMIN), adminController.deleteLesson);
  
  app.get("/api/admin/halaqat", authMiddleware, requireRole(UserRole.ADMIN), adminController.getAllHalaqat);
  app.delete("/api/admin/halaqat/:id", authMiddleware, requireRole(UserRole.ADMIN), adminController.deleteHalaqah);
  
  app.get("/api/admin/dhikr", authMiddleware, requireRole(UserRole.ADMIN), adminController.getAllDhikr);
  app.post("/api/admin/dhikr", authMiddleware, requireRole(UserRole.ADMIN), adminController.createDhikr);
  app.put("/api/admin/dhikr/:id", authMiddleware, requireRole(UserRole.ADMIN), adminController.updateDhikr);
  app.delete("/api/admin/dhikr/:id", authMiddleware, requireRole(UserRole.ADMIN), adminController.deleteDhikr);

  // Memorization routes (protected)
  app.get("/api/memorization/sets", authMiddleware, memorizationController.getAllSets);
  app.get("/api/memorization/sets/:id", authMiddleware, memorizationController.getSetById);
  app.post("/api/memorization/sets", authMiddleware, memorizationController.createSet);
  app.put("/api/memorization/sets/:id", authMiddleware, memorizationController.updateSet);
  app.delete("/api/memorization/sets/:id", authMiddleware, memorizationController.deleteSet);
  app.post("/api/memorization/sets/:setId/items", authMiddleware, memorizationController.addItem);
  app.put("/api/memorization/items/:itemId", authMiddleware, memorizationController.updateItem);
  app.delete("/api/memorization/items/:itemId", authMiddleware, memorizationController.deleteItem);

  // Halaqat routes (protected)
  app.get("/api/halaqat", authMiddleware, halaqatController.getMyHalaqat);
  app.get("/api/halaqat/:id", authMiddleware, halaqatController.getHalaqahById);
  app.post("/api/halaqat", authMiddleware, halaqatController.createHalaqah);
  app.put("/api/halaqat/:id", authMiddleware, halaqatController.updateHalaqah);
  app.post("/api/halaqat/:id/members", authMiddleware, halaqatController.addMember);
  app.delete("/api/halaqat/:id/members/:memberId", authMiddleware, halaqatController.removeMember);
  app.post("/api/halaqat/:id/assignments", authMiddleware, halaqatController.createAssignment);
  app.get("/api/assignments", authMiddleware, halaqatController.getMyAssignments);
  app.put("/api/assignments/:assignmentId", authMiddleware, halaqatController.updateAssignment);
  app.post("/api/halaqat/:id/session-logs", authMiddleware, halaqatController.createSessionLog);
  app.get("/api/halaqat/:id/session-logs", authMiddleware, halaqatController.getSessionLogs);

  // Lessons routes (public for reading)
  app.get("/api/lessons", lessonsController.getAllLessons);
  app.get("/api/lessons/:id", lessonsController.getLessonById);

  // Dhikr routes (public)
  app.get("/api/dhikr", dhikrController.getAllDhikr);
  app.get("/api/dhikr/:id", dhikrController.getDhikrById);

  // Quran API routes (existing - keeping for compatibility)
  app.get("/api/quran/surahs", quranController.getAllSurahs);
  app.get("/api/quran/surahs/:id", quranController.getSurahById);
  app.get("/api/quran/last-read", quranController.getLastRead);
  app.post("/api/quran/last-read", quranController.saveLastRead);

  // Bookmarks API routes
  app.get("/api/bookmarks", bookmarksController.getAllBookmarks);
  app.get("/api/bookmarks/:id", bookmarksController.getBookmarkById);
  app.get("/api/bookmarks/surah/:surahId", bookmarksController.getBookmarksBySurah);
  app.post("/api/bookmarks", bookmarksController.createBookmark);
  app.put("/api/bookmarks/:id", bookmarksController.updateBookmark);
  app.delete("/api/bookmarks/:id", bookmarksController.deleteBookmark);

  // Favorites API routes - Surahs
  app.get("/api/favorites/surahs", favoritesController.getAllFavoriteSurahs);
  app.get("/api/favorites/surahs/:surahId", favoritesController.checkFavoriteSurah);
  app.post("/api/favorites/surahs", favoritesController.addFavoriteSurah);
  app.delete("/api/favorites/surahs/:surahId", favoritesController.removeFavoriteSurah);
  
  // Favorites API routes - Verses
  app.get("/api/favorites/verses", favoritesController.getAllFavoriteVerses);
  app.get("/api/favorites/verses/:surahId/:ayahNumber", favoritesController.checkFavoriteVerse);
  app.post("/api/favorites/verses", favoritesController.addFavoriteVerse);
  app.put("/api/favorites/verses/:id", favoritesController.updateFavoriteVerse);
  app.delete("/api/favorites/verses/:id", favoritesController.removeFavoriteVerse);
  
  // Collections API routes
  app.get("/api/collections", collectionsController.getAllCollections);
  app.get("/api/collections/:id", collectionsController.getCollectionById);
  app.post("/api/collections", collectionsController.createCollection);
  app.put("/api/collections/:id", collectionsController.updateCollection);
  app.delete("/api/collections/:id", collectionsController.deleteCollection);
  app.post("/api/collections/:collectionId/items", collectionsController.addItemToCollection);
  app.delete("/api/collections/items/:itemId", collectionsController.removeItemFromCollection);

  const httpServer = createServer(app);

  return httpServer;
}
