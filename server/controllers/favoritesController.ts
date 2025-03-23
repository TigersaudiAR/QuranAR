import { Request, Response } from "express";
import { storage, DBFavorite, DBFavoriteVerse } from "../storage";
import { v4 as uuidv4 } from 'uuid';

// تعريف معرف المستخدم الافتراضي 
// في النسخة النهائية من التطبيق، سيتم استبدال هذا بمعرف المستخدم الحقيقي من جلسة المستخدم
const DEFAULT_USER_ID = "user_1";

export const favoritesController = {
  /**
   * الحصول على جميع السور المفضلة للمستخدم
   */
  getAllFavoriteSurahs: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string || DEFAULT_USER_ID;
      const favorites = await storage.getFavorites(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error in getAllFavoriteSurahs:", error);
      res.status(500).json({ error: "حدث خطأ أثناء استرجاع السور المفضلة" });
    }
  },

  /**
   * التحقق مما إذا كانت سورة محددة مفضلة للمستخدم
   */
  checkFavoriteSurah: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string || DEFAULT_USER_ID;
      const surahId = parseInt(req.params.surahId);
      
      if (isNaN(surahId)) {
        return res.status(400).json({ error: "معرف السورة غير صالح" });
      }
      
      const favorite = await storage.getFavoritesBySurah(userId, surahId);
      res.json({ isFavorite: favorite !== null, favorite });
    } catch (error) {
      console.error("Error in checkFavoriteSurah:", error);
      res.status(500).json({ error: "حدث خطأ أثناء التحقق من السورة المفضلة" });
    }
  },

  /**
   * إضافة سورة إلى المفضلة
   */
  addFavoriteSurah: async (req: Request, res: Response) => {
    try {
      const { surahId, surahName, category } = req.body;
      const userId = req.body.userId || DEFAULT_USER_ID;
      
      // التحقق من البيانات المطلوبة
      if (!surahId || !surahName) {
        return res.status(400).json({ error: "البيانات المرسلة غير مكتملة" });
      }
      
      // إنشاء كائن المفضلة
      const favorite: DBFavorite = {
        userId,
        surahId,
        surahName,
        timestamp: Date.now(),
        category: category || "general"
      };
      
      // حفظ المفضلة
      const createdFavorite = await storage.createFavorite(favorite);
      res.status(201).json(createdFavorite);
    } catch (error) {
      console.error("Error in addFavoriteSurah:", error);
      res.status(500).json({ error: "حدث خطأ أثناء إضافة السورة إلى المفضلة" });
    }
  },

  /**
   * حذف سورة من المفضلة
   */
  removeFavoriteSurah: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string || DEFAULT_USER_ID;
      const surahId = parseInt(req.params.surahId);
      
      if (isNaN(surahId)) {
        return res.status(400).json({ error: "معرف السورة غير صالح" });
      }
      
      // حذف المفضلة
      const result = await storage.deleteFavorite(userId, surahId);
      
      if (!result) {
        return res.status(404).json({ error: "السورة غير موجودة في المفضلة" });
      }
      
      res.json({ success: true, message: "تم حذف السورة من المفضلة بنجاح" });
    } catch (error) {
      console.error("Error in removeFavoriteSurah:", error);
      res.status(500).json({ error: "حدث خطأ أثناء حذف السورة من المفضلة" });
    }
  },

  /**
   * الحصول على جميع الآيات المفضلة للمستخدم
   */
  getAllFavoriteVerses: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string || DEFAULT_USER_ID;
      const favoriteVerses = await storage.getFavoriteVerses(userId);
      res.json(favoriteVerses);
    } catch (error) {
      console.error("Error in getAllFavoriteVerses:", error);
      res.status(500).json({ error: "حدث خطأ أثناء استرجاع الآيات المفضلة" });
    }
  },

  /**
   * التحقق مما إذا كانت آية محددة مفضلة للمستخدم
   */
  checkFavoriteVerse: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string || DEFAULT_USER_ID;
      const surahId = parseInt(req.params.surahId);
      const ayahNumber = parseInt(req.params.ayahNumber);
      
      if (isNaN(surahId) || isNaN(ayahNumber)) {
        return res.status(400).json({ error: "معرف السورة أو رقم الآية غير صالح" });
      }
      
      const favorite = await storage.getFavoriteVerseByAyah(userId, surahId, ayahNumber);
      res.json({ isFavorite: favorite !== null, favorite });
    } catch (error) {
      console.error("Error in checkFavoriteVerse:", error);
      res.status(500).json({ error: "حدث خطأ أثناء التحقق من الآية المفضلة" });
    }
  },

  /**
   * إضافة آية إلى المفضلة
   */
  addFavoriteVerse: async (req: Request, res: Response) => {
    try {
      const { surahId, surahName, ayahNumber, ayahText, category } = req.body;
      const userId = req.body.userId || DEFAULT_USER_ID;
      
      // التحقق من البيانات المطلوبة
      if (!surahId || !surahName || !ayahNumber || !ayahText) {
        return res.status(400).json({ error: "البيانات المرسلة غير مكتملة" });
      }
      
      // التحقق ما إذا كانت الآية مفضلة بالفعل
      const existingFavorite = await storage.getFavoriteVerseByAyah(userId, surahId, ayahNumber);
      if (existingFavorite) {
        return res.status(400).json({ error: "الآية موجودة بالفعل في المفضلة" });
      }
      
      // إنشاء كائن الآية المفضلة
      const favoriteVerse: DBFavoriteVerse = {
        id: uuidv4(),
        userId,
        surahId,
        surahName,
        ayahNumber,
        ayahText,
        timestamp: Date.now(),
        category: category || "general"
      };
      
      // حفظ الآية المفضلة
      const createdFavorite = await storage.createFavoriteVerse(favoriteVerse);
      res.status(201).json(createdFavorite);
    } catch (error) {
      console.error("Error in addFavoriteVerse:", error);
      res.status(500).json({ error: "حدث خطأ أثناء إضافة الآية إلى المفضلة" });
    }
  },

  /**
   * تحديث تصنيف آية مفضلة
   */
  updateFavoriteVerse: async (req: Request, res: Response) => {
    try {
      const verseId = req.params.id;
      const { category } = req.body;
      
      // التحقق من المعرف
      if (!verseId) {
        return res.status(400).json({ error: "معرف الآية المفضلة مطلوب" });
      }
      
      // البحث عن الآية المفضلة
      const existingVerse = await storage.getFavoriteVerse(verseId);
      if (!existingVerse) {
        return res.status(404).json({ error: "الآية المفضلة غير موجودة" });
      }
      
      // تحديث الآية المفضلة - نسمح فقط بتحديث التصنيف
      const updatedData: Partial<DBFavoriteVerse> = {};
      if (category !== undefined) updatedData.category = category;
      
      const updatedVerse = await storage.updateFavoriteVerse(verseId, updatedData);
      res.json(updatedVerse);
    } catch (error) {
      console.error("Error in updateFavoriteVerse:", error);
      res.status(500).json({ error: "حدث خطأ أثناء تحديث الآية المفضلة" });
    }
  },

  /**
   * حذف آية من المفضلة
   */
  removeFavoriteVerse: async (req: Request, res: Response) => {
    try {
      const verseId = req.params.id;
      
      // التحقق من المعرف
      if (!verseId) {
        return res.status(400).json({ error: "معرف الآية المفضلة مطلوب" });
      }
      
      // حذف الآية المفضلة
      const result = await storage.deleteFavoriteVerse(verseId);
      
      if (!result) {
        return res.status(404).json({ error: "الآية المفضلة غير موجودة" });
      }
      
      res.json({ success: true, message: "تم حذف الآية من المفضلة بنجاح" });
    } catch (error) {
      console.error("Error in removeFavoriteVerse:", error);
      res.status(500).json({ error: "حدث خطأ أثناء حذف الآية من المفضلة" });
    }
  }
};