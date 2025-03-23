import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quranController } from "./controllers/quranController";
import { bookmarksController } from "./controllers/bookmarksController";
import { favoritesController } from "./controllers/favoritesController";
import { collectionsController } from "./controllers/collectionsController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quran API routes
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
