import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quranController } from "./controllers/quranController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quran API routes
  app.get("/api/quran/surahs", quranController.getAllSurahs);
  app.get("/api/quran/surahs/:id", quranController.getSurahById);
  app.get("/api/quran/last-read", quranController.getLastRead);
  app.post("/api/quran/last-read", quranController.saveLastRead);

  const httpServer = createServer(app);

  return httpServer;
}
