import { Request, Response } from "express";
import { storage, DBBookmark } from "../storage";
import { v4 as uuidv4 } from 'uuid';

// تعريف معرف المستخدم الافتراضي 
// في النسخة النهائية من التطبيق، سيتم استبدال هذا بمعرف المستخدم الحقيقي من جلسة المستخدم
const DEFAULT_USER_ID = "user_1";

export const bookmarksController = {
  /**
   * الحصول على جميع الإشارات المرجعية للمستخدم
   */
  getAllBookmarks: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string || DEFAULT_USER_ID;
      const bookmarks = await storage.getBookmarks(userId);
      res.json(bookmarks);
    } catch (error) {
      console.error("Error in getAllBookmarks:", error);
      res.status(500).json({ error: "حدث خطأ أثناء استرجاع الإشارات المرجعية" });
    }
  },

  /**
   * الحصول على إشارة مرجعية محددة حسب المعرف
   */
  getBookmarkById: async (req: Request, res: Response) => {
    try {
      const bookmarkId = req.params.id;
      const bookmark = await storage.getBookmark(bookmarkId);
      
      if (!bookmark) {
        return res.status(404).json({ error: "الإشارة المرجعية غير موجودة" });
      }
      
      res.json(bookmark);
    } catch (error) {
      console.error("Error in getBookmarkById:", error);
      res.status(500).json({ error: "حدث خطأ أثناء استرجاع الإشارة المرجعية" });
    }
  },

  /**
   * الحصول على الإشارات المرجعية لسورة محددة
   */
  getBookmarksBySurah: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string || DEFAULT_USER_ID;
      const surahId = parseInt(req.params.surahId);
      
      if (isNaN(surahId)) {
        return res.status(400).json({ error: "معرف السورة غير صالح" });
      }
      
      const bookmarks = await storage.getBookmarksBySurah(userId, surahId);
      res.json(bookmarks);
    } catch (error) {
      console.error("Error in getBookmarksBySurah:", error);
      res.status(500).json({ error: "حدث خطأ أثناء استرجاع الإشارات المرجعية للسورة" });
    }
  },

  /**
   * إنشاء إشارة مرجعية جديدة
   */
  createBookmark: async (req: Request, res: Response) => {
    try {
      const { surahId, surahName, ayahNumber, ayahText, notes, color } = req.body;
      const userId = req.body.userId || DEFAULT_USER_ID;
      
      // التحقق من البيانات المطلوبة
      if (!surahId || !ayahNumber || !surahName || !ayahText) {
        return res.status(400).json({ error: "البيانات المرسلة غير مكتملة" });
      }
      
      // إنشاء كائن الإشارة المرجعية
      const bookmark: DBBookmark = {
        id: uuidv4(),
        userId,
        surahId,
        surahName,
        ayahNumber,
        ayahText,
        timestamp: Date.now(),
        notes,
        color
      };
      
      // حفظ الإشارة المرجعية
      const createdBookmark = await storage.createBookmark(bookmark);
      res.status(201).json(createdBookmark);
    } catch (error) {
      console.error("Error in createBookmark:", error);
      res.status(500).json({ error: "حدث خطأ أثناء إنشاء الإشارة المرجعية" });
    }
  },

  /**
   * تحديث إشارة مرجعية
   */
  updateBookmark: async (req: Request, res: Response) => {
    try {
      const bookmarkId = req.params.id;
      const { notes, color } = req.body;
      
      // التحقق من المعرف
      if (!bookmarkId) {
        return res.status(400).json({ error: "معرف الإشارة المرجعية مطلوب" });
      }
      
      // البحث عن الإشارة المرجعية
      const existingBookmark = await storage.getBookmark(bookmarkId);
      if (!existingBookmark) {
        return res.status(404).json({ error: "الإشارة المرجعية غير موجودة" });
      }
      
      // تحديث الإشارة المرجعية - نسمح فقط بتحديث الملاحظات واللون
      const updatedData: Partial<DBBookmark> = {};
      if (notes !== undefined) updatedData.notes = notes;
      if (color !== undefined) updatedData.color = color;
      
      const updatedBookmark = await storage.updateBookmark(bookmarkId, updatedData);
      res.json(updatedBookmark);
    } catch (error) {
      console.error("Error in updateBookmark:", error);
      res.status(500).json({ error: "حدث خطأ أثناء تحديث الإشارة المرجعية" });
    }
  },

  /**
   * حذف إشارة مرجعية
   */
  deleteBookmark: async (req: Request, res: Response) => {
    try {
      const bookmarkId = req.params.id;
      
      // التحقق من المعرف
      if (!bookmarkId) {
        return res.status(400).json({ error: "معرف الإشارة المرجعية مطلوب" });
      }
      
      // حذف الإشارة المرجعية
      const result = await storage.deleteBookmark(bookmarkId);
      
      if (!result) {
        return res.status(404).json({ error: "الإشارة المرجعية غير موجودة" });
      }
      
      res.json({ success: true, message: "تم حذف الإشارة المرجعية بنجاح" });
    } catch (error) {
      console.error("Error in deleteBookmark:", error);
      res.status(500).json({ error: "حدث خطأ أثناء حذف الإشارة المرجعية" });
    }
  }
};