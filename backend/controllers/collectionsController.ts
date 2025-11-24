import { Request, Response } from "express";
import { storage, DBCollection, DBCollectionItem } from "../storage";
import { v4 as uuidv4 } from 'uuid';

// تعريف معرف المستخدم الافتراضي 
// في النسخة النهائية من التطبيق، سيتم استبدال هذا بمعرف المستخدم الحقيقي من جلسة المستخدم
const DEFAULT_USER_ID = "user_1";

export const collectionsController = {
  /**
   * الحصول على جميع المجموعات للمستخدم
   */
  getAllCollections: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string || DEFAULT_USER_ID;
      const collections = await storage.getCollections(userId);
      res.json(collections);
    } catch (error) {
      console.error("Error in getAllCollections:", error);
      res.status(500).json({ error: "حدث خطأ أثناء استرجاع المجموعات" });
    }
  },

  /**
   * الحصول على مجموعة محددة حسب المعرف
   */
  getCollectionById: async (req: Request, res: Response) => {
    try {
      const collectionId = parseInt(req.params.id);
      
      if (isNaN(collectionId)) {
        return res.status(400).json({ error: "معرف المجموعة غير صالح" });
      }
      
      const collection = await storage.getCollection(collectionId);
      
      if (!collection) {
        return res.status(404).json({ error: "المجموعة غير موجودة" });
      }
      
      // الحصول على العناصر المرتبطة بالمجموعة
      const items = await storage.getCollectionItems(collectionId);
      
      res.json({
        ...collection,
        items
      });
    } catch (error) {
      console.error("Error in getCollectionById:", error);
      res.status(500).json({ error: "حدث خطأ أثناء استرجاع المجموعة" });
    }
  },

  /**
   * إنشاء مجموعة جديدة
   */
  createCollection: async (req: Request, res: Response) => {
    try {
      const { name, description, icon, color } = req.body;
      const userId = req.body.userId || DEFAULT_USER_ID;
      
      // التحقق من البيانات المطلوبة
      if (!name) {
        return res.status(400).json({ error: "اسم المجموعة مطلوب" });
      }
      
      // إنشاء كائن المجموعة
      const collection: DBCollection = {
        userId,
        name,
        description,
        icon,
        color,
        timestamp: Date.now()
      };
      
      // حفظ المجموعة
      const createdCollection = await storage.createCollection(collection);
      res.status(201).json(createdCollection);
    } catch (error) {
      console.error("Error in createCollection:", error);
      res.status(500).json({ error: "حدث خطأ أثناء إنشاء المجموعة" });
    }
  },

  /**
   * تحديث مجموعة
   */
  updateCollection: async (req: Request, res: Response) => {
    try {
      const collectionId = parseInt(req.params.id);
      const { name, description, icon, color } = req.body;
      
      if (isNaN(collectionId)) {
        return res.status(400).json({ error: "معرف المجموعة غير صالح" });
      }
      
      // البحث عن المجموعة
      const existingCollection = await storage.getCollection(collectionId);
      if (!existingCollection) {
        return res.status(404).json({ error: "المجموعة غير موجودة" });
      }
      
      // التحقق من ملكية المستخدم للمجموعة
      const userId = req.body.userId || DEFAULT_USER_ID;
      if (existingCollection.userId !== userId) {
        return res.status(403).json({ error: "غير مصرح لك بتعديل هذه المجموعة" });
      }
      
      // تحديث المجموعة
      const updatedData: Partial<DBCollection> = {};
      if (name !== undefined) updatedData.name = name;
      if (description !== undefined) updatedData.description = description;
      if (icon !== undefined) updatedData.icon = icon;
      if (color !== undefined) updatedData.color = color;
      
      const updatedCollection = await storage.updateCollection(collectionId, updatedData);
      res.json(updatedCollection);
    } catch (error) {
      console.error("Error in updateCollection:", error);
      res.status(500).json({ error: "حدث خطأ أثناء تحديث المجموعة" });
    }
  },

  /**
   * حذف مجموعة
   */
  deleteCollection: async (req: Request, res: Response) => {
    try {
      const collectionId = parseInt(req.params.id);
      
      if (isNaN(collectionId)) {
        return res.status(400).json({ error: "معرف المجموعة غير صالح" });
      }
      
      // البحث عن المجموعة
      const existingCollection = await storage.getCollection(collectionId);
      if (!existingCollection) {
        return res.status(404).json({ error: "المجموعة غير موجودة" });
      }
      
      // التحقق من ملكية المستخدم للمجموعة
      const userId = req.query.userId as string || DEFAULT_USER_ID;
      if (existingCollection.userId !== userId) {
        return res.status(403).json({ error: "غير مصرح لك بحذف هذه المجموعة" });
      }
      
      // حذف المجموعة
      const result = await storage.deleteCollection(collectionId);
      
      if (!result) {
        return res.status(404).json({ error: "المجموعة غير موجودة" });
      }
      
      res.json({ success: true, message: "تم حذف المجموعة بنجاح" });
    } catch (error) {
      console.error("Error in deleteCollection:", error);
      res.status(500).json({ error: "حدث خطأ أثناء حذف المجموعة" });
    }
  },

  /**
   * إضافة عنصر إلى مجموعة
   */
  addItemToCollection: async (req: Request, res: Response) => {
    try {
      const collectionId = parseInt(req.params.collectionId);
      const { itemType, itemId } = req.body;
      
      if (isNaN(collectionId)) {
        return res.status(400).json({ error: "معرف المجموعة غير صالح" });
      }
      
      // التحقق من البيانات المطلوبة
      if (!itemType || !itemId) {
        return res.status(400).json({ error: "نوع العنصر ومعرفه مطلوبان" });
      }
      
      // التحقق من وجود المجموعة
      const existingCollection = await storage.getCollection(collectionId);
      if (!existingCollection) {
        return res.status(404).json({ error: "المجموعة غير موجودة" });
      }
      
      // إنشاء كائن العنصر
      const item: DBCollectionItem = {
        id: uuidv4(),
        collectionId,
        itemType,
        itemId,
        timestamp: Date.now()
      };
      
      // حفظ العنصر
      const addedItem = await storage.addItemToCollection(item);
      res.status(201).json(addedItem);
    } catch (error) {
      console.error("Error in addItemToCollection:", error);
      res.status(500).json({ error: "حدث خطأ أثناء إضافة العنصر إلى المجموعة" });
    }
  },

  /**
   * حذف عنصر من مجموعة
   */
  removeItemFromCollection: async (req: Request, res: Response) => {
    try {
      const itemId = req.params.itemId;
      
      // التحقق من المعرف
      if (!itemId) {
        return res.status(400).json({ error: "معرف العنصر مطلوب" });
      }
      
      // حذف العنصر
      const result = await storage.removeItemFromCollection(itemId);
      
      if (!result) {
        return res.status(404).json({ error: "العنصر غير موجود في المجموعة" });
      }
      
      res.json({ success: true, message: "تم حذف العنصر من المجموعة بنجاح" });
    } catch (error) {
      console.error("Error in removeItemFromCollection:", error);
      res.status(500).json({ error: "حدث خطأ أثناء حذف العنصر من المجموعة" });
    }
  }
};