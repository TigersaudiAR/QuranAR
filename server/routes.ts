import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAllSurahs, getSurahById, getSurahBasicInfo, getMockReadingProgress } from "./api/quran";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for Quran data
  
  // Get all surahs
  app.get('/api/quran/surahs', async (req, res) => {
    try {
      const surahs = await getAllSurahs();
      res.json(surahs);
    } catch (error) {
      console.error('Error getting surahs:', error);
      res.status(500).json({ error: 'Failed to fetch surahs' });
    }
  });
  
  // Get surah by ID
  app.get('/api/quran/surah/:id', async (req, res) => {
    try {
      const surahId = parseInt(req.params.id, 10);
      
      if (isNaN(surahId) || surahId < 1 || surahId > 114) {
        return res.status(400).json({ error: 'Invalid surah ID. Must be between 1 and 114.' });
      }
      
      const surah = await getSurahById(surahId);
      res.json(surah);
    } catch (error) {
      console.error('Error getting surah:', error);
      res.status(500).json({ error: 'Failed to fetch surah details' });
    }
  });
  
  // Get basic surah info
  app.get('/api/quran/surah/:id/basic', async (req, res) => {
    try {
      const surahId = parseInt(req.params.id, 10);
      
      if (isNaN(surahId)) {
        return res.status(400).json({ error: 'Invalid surah ID' });
      }
      
      const surahInfo = await getSurahBasicInfo(surahId);
      
      if (!surahInfo) {
        return res.status(404).json({ error: 'Surah not found' });
      }
      
      res.json(surahInfo);
    } catch (error) {
      console.error('Error getting basic surah info:', error);
      res.status(500).json({ error: 'Failed to fetch surah information' });
    }
  });
  
  // Get reading progress (mock data for now)
  app.get('/api/quran/reading-progress', (req, res) => {
    try {
      const progress = getMockReadingProgress();
      res.json(progress);
    } catch (error) {
      console.error('Error getting reading progress:', error);
      res.status(500).json({ error: 'Failed to fetch reading progress' });
    }
  });
  
  // Mock prayer times (in a real app, this would use a prayer times API)
  app.get('/api/prayer-times', (req, res) => {
    // In a real app, these would be calculated based on user's location
    res.json([
      { name: "الفجر", time: "05:12" },
      { name: "الظهر", time: "12:30" },
      { name: "العصر", time: "15:45" },
      { name: "المغرب", time: "18:20" },
      { name: "العشاء", time: "19:50" },
    ]);
  });
  
  // Mock bookmarks (in a real app, this would be stored in a database)
  app.get('/api/quran/bookmarks', (req, res) => {
    res.json([1, 36, 67, 78]);
  });
  
  // Toggle bookmark (mock implementation)
  app.post('/api/quran/bookmarks/:surahId', (req, res) => {
    const { surahId } = req.params;
    const { action } = req.body;
    
    // In a real app, this would update a database
    res.json({ success: true, action, surahId });
  });
  
  // Toggle verse bookmark (mock implementation)
  app.post('/api/quran/bookmarks/:surahId/:verseId', (req, res) => {
    const { surahId, verseId } = req.params;
    const { action } = req.body;
    
    // In a real app, this would update a database
    res.json({ success: true, action, surahId, verseId });
  });

  const httpServer = createServer(app);

  return httpServer;
}
