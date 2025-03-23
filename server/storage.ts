import { 
  users, quranLastRead, quranBookmarks, quranFavorites, quranFavoriteVerses, quranCollections, quranCollectionItems,
  type User, type InsertUser, type LastRead, type InsertLastRead, 
  type Bookmark, type InsertBookmark, type Favorite, type InsertFavorite, 
  type FavoriteVerse, type InsertFavoriteVerse, type Collection, type InsertCollection, type CollectionItem, type InsertCollectionItem 
} from "@shared/schema";
import { v4 as uuidv4 } from 'uuid';

// Define a database-specific type for LastRead that includes all DB fields
export interface DBLastRead {
  id?: number;
  userId: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string | null;
  timestamp: number;
}

// تعريف نوع للإشارات المرجعية
export interface DBBookmark {
  id: string;
  userId: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  timestamp: number;
  notes?: string;
  color?: string;
}

// تعريف نوع للسور المفضلة
export interface DBFavorite {
  id?: number;
  userId: string;
  surahId: number;
  surahName: string;
  timestamp: number;
  category?: string;
}

// تعريف نوع للآيات المفضلة
export interface DBFavoriteVerse {
  id: string;
  userId: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  timestamp: number;
  category?: string;
}

// تعريف نوع للمجموعات المخصصة
export interface DBCollection {
  id?: number;
  userId: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  timestamp: number;
}

// تعريف نوع لعناصر المجموعات
export interface DBCollectionItem {
  id: string;
  collectionId: number;
  itemType: string;
  itemId: string;
  timestamp: number;
}

// واجهة التخزين 
export interface IStorage {
  // المستخدمين
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // آخر قراءة
  getLastRead(userId: string): Promise<DBLastRead | null>;
  saveLastRead(userId: string, lastRead: DBLastRead): Promise<void>;
  
  // الإشارات المرجعية
  getBookmarks(userId: string): Promise<DBBookmark[]>;
  getBookmark(id: string): Promise<DBBookmark | null>;
  getBookmarksBySurah(userId: string, surahId: number): Promise<DBBookmark[]>;
  createBookmark(bookmark: DBBookmark): Promise<DBBookmark>;
  updateBookmark(id: string, bookmark: Partial<DBBookmark>): Promise<DBBookmark | null>;
  deleteBookmark(id: string): Promise<boolean>;
  
  // المفضلات للسور
  getFavorites(userId: string): Promise<DBFavorite[]>;
  getFavoritesBySurah(userId: string, surahId: number): Promise<DBFavorite | null>;
  createFavorite(favorite: DBFavorite): Promise<DBFavorite>;
  deleteFavorite(userId: string, surahId: number): Promise<boolean>;
  
  // المفضلات للآيات
  getFavoriteVerses(userId: string): Promise<DBFavoriteVerse[]>;
  getFavoriteVerse(id: string): Promise<DBFavoriteVerse | null>;
  getFavoriteVerseByAyah(userId: string, surahId: number, ayahNumber: number): Promise<DBFavoriteVerse | null>;
  createFavoriteVerse(verse: DBFavoriteVerse): Promise<DBFavoriteVerse>;
  updateFavoriteVerse(id: string, verse: Partial<DBFavoriteVerse>): Promise<DBFavoriteVerse | null>;
  deleteFavoriteVerse(id: string): Promise<boolean>;
  
  // المجموعات المخصصة
  getCollections(userId: string): Promise<DBCollection[]>;
  getCollection(id: number): Promise<DBCollection | null>;
  createCollection(collection: DBCollection): Promise<DBCollection>;
  updateCollection(id: number, collection: Partial<DBCollection>): Promise<DBCollection | null>;
  deleteCollection(id: number): Promise<boolean>;
  
  // عناصر المجموعات
  getCollectionItems(collectionId: number): Promise<DBCollectionItem[]>;
  addItemToCollection(item: DBCollectionItem): Promise<DBCollectionItem>;
  removeItemFromCollection(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lastReadMap: Map<string, DBLastRead>;
  private bookmarksMap: Map<string, DBBookmark>;
  private favoritesMap: Map<string, DBFavorite[]>;
  private favoriteVersesMap: Map<string, DBFavoriteVerse>;
  private collectionsMap: Map<number, DBCollection>;
  private collectionItemsMap: Map<string, DBCollectionItem>;
  
  currentId: number;
  private lastReadId: number;
  private favoriteId: number;
  private collectionId: number;

  constructor() {
    this.users = new Map();
    this.lastReadMap = new Map();
    this.bookmarksMap = new Map();
    this.favoritesMap = new Map();
    this.favoriteVersesMap = new Map();
    this.collectionsMap = new Map();
    this.collectionItemsMap = new Map();
    
    this.currentId = 1;
    this.lastReadId = 1;
    this.favoriteId = 1;
    this.collectionId = 1;
  }

  // ========== المستخدمين ==========
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // ========== آخر قراءة ==========
  async getLastRead(userId: string): Promise<DBLastRead | null> {
    const lastRead = this.lastReadMap.get(userId);
    return lastRead || null;
  }

  async saveLastRead(userId: string, lastRead: DBLastRead): Promise<void> {
    if (!lastRead.id) {
      lastRead.id = this.lastReadId++;
    }
    this.lastReadMap.set(userId, lastRead);
  }
  
  // ========== الإشارات المرجعية ==========
  async getBookmarks(userId: string): Promise<DBBookmark[]> {
    return Array.from(this.bookmarksMap.values())
      .filter(bookmark => bookmark.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }
  
  async getBookmark(id: string): Promise<DBBookmark | null> {
    const bookmark = this.bookmarksMap.get(id);
    return bookmark || null;
  }
  
  async getBookmarksBySurah(userId: string, surahId: number): Promise<DBBookmark[]> {
    return Array.from(this.bookmarksMap.values())
      .filter(bookmark => bookmark.userId === userId && bookmark.surahId === surahId)
      .sort((a, b) => a.ayahNumber - b.ayahNumber);
  }
  
  async createBookmark(bookmark: DBBookmark): Promise<DBBookmark> {
    // إذا لم يكن هناك معرف، قم بإنشائه
    if (!bookmark.id) {
      bookmark.id = uuidv4();
    }
    
    // إضافة الطابع الزمني إذا لم يكن موجودًا
    if (!bookmark.timestamp) {
      bookmark.timestamp = Date.now();
    }
    
    this.bookmarksMap.set(bookmark.id, bookmark);
    return bookmark;
  }
  
  async updateBookmark(id: string, updatedData: Partial<DBBookmark>): Promise<DBBookmark | null> {
    const bookmark = this.bookmarksMap.get(id);
    if (!bookmark) return null;
    
    const updatedBookmark = { ...bookmark, ...updatedData };
    this.bookmarksMap.set(id, updatedBookmark);
    return updatedBookmark;
  }
  
  async deleteBookmark(id: string): Promise<boolean> {
    return this.bookmarksMap.delete(id);
  }
  
  // ========== المفضلات للسور ==========
  async getFavorites(userId: string): Promise<DBFavorite[]> {
    const userFavorites = this.favoritesMap.get(userId) || [];
    return userFavorites.sort((a, b) => b.timestamp - a.timestamp);
  }
  
  async getFavoritesBySurah(userId: string, surahId: number): Promise<DBFavorite | null> {
    const userFavorites = this.favoritesMap.get(userId) || [];
    const favorite = userFavorites.find(fav => fav.surahId === surahId);
    return favorite || null;
  }
  
  async createFavorite(favorite: DBFavorite): Promise<DBFavorite> {
    // إضافة المعرف إذا لم يكن موجودًا
    if (!favorite.id) {
      favorite.id = this.favoriteId++;
    }
    
    // إضافة الطابع الزمني إذا لم يكن موجودًا
    if (!favorite.timestamp) {
      favorite.timestamp = Date.now();
    }
    
    const userFavorites = this.favoritesMap.get(favorite.userId) || [];
    
    // التحقق ما إذا كانت السورة مفضلة بالفعل
    const existingIndex = userFavorites.findIndex(fav => fav.surahId === favorite.surahId);
    
    if (existingIndex !== -1) {
      // تحديث المفضلة الموجودة
      userFavorites[existingIndex] = favorite;
    } else {
      // إضافة مفضلة جديدة
      userFavorites.push(favorite);
    }
    
    this.favoritesMap.set(favorite.userId, userFavorites);
    return favorite;
  }
  
  async deleteFavorite(userId: string, surahId: number): Promise<boolean> {
    const userFavorites = this.favoritesMap.get(userId) || [];
    const updatedFavorites = userFavorites.filter(fav => fav.surahId !== surahId);
    
    if (updatedFavorites.length === userFavorites.length) {
      return false; // لم يتم العثور على مفضلة للحذف
    }
    
    this.favoritesMap.set(userId, updatedFavorites);
    return true;
  }
  
  // ========== المفضلات للآيات ==========
  async getFavoriteVerses(userId: string): Promise<DBFavoriteVerse[]> {
    return Array.from(this.favoriteVersesMap.values())
      .filter(verse => verse.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }
  
  async getFavoriteVerse(id: string): Promise<DBFavoriteVerse | null> {
    const verse = this.favoriteVersesMap.get(id);
    return verse || null;
  }
  
  async getFavoriteVerseByAyah(userId: string, surahId: number, ayahNumber: number): Promise<DBFavoriteVerse | null> {
    const favoriteVerse = Array.from(this.favoriteVersesMap.values())
      .find(verse => verse.userId === userId && verse.surahId === surahId && verse.ayahNumber === ayahNumber);
    return favoriteVerse || null;
  }
  
  async createFavoriteVerse(verse: DBFavoriteVerse): Promise<DBFavoriteVerse> {
    // إذا لم يكن هناك معرف، قم بإنشائه
    if (!verse.id) {
      verse.id = uuidv4();
    }
    
    // إضافة الطابع الزمني إذا لم يكن موجودًا
    if (!verse.timestamp) {
      verse.timestamp = Date.now();
    }
    
    this.favoriteVersesMap.set(verse.id, verse);
    return verse;
  }
  
  async updateFavoriteVerse(id: string, updatedData: Partial<DBFavoriteVerse>): Promise<DBFavoriteVerse | null> {
    const verse = this.favoriteVersesMap.get(id);
    if (!verse) return null;
    
    const updatedVerse = { ...verse, ...updatedData };
    this.favoriteVersesMap.set(id, updatedVerse);
    return updatedVerse;
  }
  
  async deleteFavoriteVerse(id: string): Promise<boolean> {
    return this.favoriteVersesMap.delete(id);
  }
  
  // ========== المجموعات المخصصة ==========
  async getCollections(userId: string): Promise<DBCollection[]> {
    return Array.from(this.collectionsMap.values())
      .filter(collection => collection.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }
  
  async getCollection(id: number): Promise<DBCollection | null> {
    const collection = this.collectionsMap.get(id);
    return collection || null;
  }
  
  async createCollection(collection: DBCollection): Promise<DBCollection> {
    // إضافة المعرف إذا لم يكن موجودًا
    if (!collection.id) {
      collection.id = this.collectionId++;
    }
    
    // إضافة الطابع الزمني إذا لم يكن موجودًا
    if (!collection.timestamp) {
      collection.timestamp = Date.now();
    }
    
    this.collectionsMap.set(collection.id, collection);
    return collection;
  }
  
  async updateCollection(id: number, updatedData: Partial<DBCollection>): Promise<DBCollection | null> {
    const collection = this.collectionsMap.get(id);
    if (!collection) return null;
    
    const updatedCollection = { ...collection, ...updatedData };
    this.collectionsMap.set(id, updatedCollection);
    return updatedCollection;
  }
  
  async deleteCollection(id: number): Promise<boolean> {
    // حذف المجموعة
    const result = this.collectionsMap.delete(id);
    
    // حذف كل العناصر المرتبطة بالمجموعة
    if (result) {
      const itemsToDelete = Array.from(this.collectionItemsMap.entries())
        .filter(([_, item]) => item.collectionId === id);
      
      itemsToDelete.forEach(([itemId, _]) => {
        this.collectionItemsMap.delete(itemId);
      });
    }
    
    return result;
  }
  
  // ========== عناصر المجموعات ==========
  async getCollectionItems(collectionId: number): Promise<DBCollectionItem[]> {
    return Array.from(this.collectionItemsMap.values())
      .filter(item => item.collectionId === collectionId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }
  
  async addItemToCollection(item: DBCollectionItem): Promise<DBCollectionItem> {
    // إذا لم يكن هناك معرف، قم بإنشائه
    if (!item.id) {
      item.id = uuidv4();
    }
    
    // إضافة الطابع الزمني إذا لم يكن موجودًا
    if (!item.timestamp) {
      item.timestamp = Date.now();
    }
    
    // التحقق من وجود المجموعة
    const collection = this.collectionsMap.get(item.collectionId);
    if (!collection) {
      throw new Error(`Collection with id ${item.collectionId} not found`);
    }
    
    this.collectionItemsMap.set(item.id, item);
    return item;
  }
  
  async removeItemFromCollection(id: string): Promise<boolean> {
    return this.collectionItemsMap.delete(id);
  }
}

export const storage = new MemStorage();
