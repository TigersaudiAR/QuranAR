import { Request, Response } from "express";
import { quranService } from "../services/quranService";
import { z } from "zod";

// Validation schema for last read
const lastReadSchema = z.object({
  surahId: z.number(),
  surahName: z.string(),
  ayahNumber: z.number(),
  ayahText: z.string().optional(),
});

export const quranController = {
  // Get all surahs
  getAllSurahs: async (req: Request, res: Response) => {
    try {
      const surahs = await quranService.getAllSurahs();
      res.json(surahs);
    } catch (error) {
      console.error("Error fetching all surahs:", error);
      res.status(500).json({ message: "Failed to fetch surahs" });
    }
  },

  // Get a specific surah by ID
  getSurahById: async (req: Request, res: Response) => {
    try {
      const surahId = parseInt(req.params.id);
      
      if (isNaN(surahId) || surahId < 1 || surahId > 114) {
        return res.status(400).json({ message: "Invalid surah ID" });
      }
      
      const surah = await quranService.getSurahById(surahId);
      
      if (!surah) {
        return res.status(404).json({ message: "Surah not found" });
      }
      
      res.json(surah);
    } catch (error) {
      console.error(`Error fetching surah ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch surah" });
    }
  },

  // Get the last read position
  getLastRead: async (req: Request, res: Response) => {
    try {
      const lastRead = await quranService.getLastRead(req.sessionID || "default");
      res.json(lastRead);
    } catch (error) {
      console.error("Error fetching last read position:", error);
      res.status(500).json({ message: "Failed to fetch last read position" });
    }
  },

  // Save the last read position
  saveLastRead: async (req: Request, res: Response) => {
    try {
      const validation = lastReadSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid last read data",
          errors: validation.error.errors 
        });
      }
      
      await quranService.saveLastRead(req.sessionID || "default", validation.data);
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving last read position:", error);
      res.status(500).json({ message: "Failed to save last read position" });
    }
  }
};
