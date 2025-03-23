import { LastRead, Surah } from "@/lib/types";
import { storage, DBLastRead } from "../storage";
import { surahs, getSurahVerses, surahFatiha } from "../data/quranData";

export const quranService = {
  // الحصول على جميع السور
  getAllSurahs: async (): Promise<Surah[]> => {
    try {
      // إرجاع بيانات السور من قاعدة البيانات المحلية
      const surahsData = surahs.map(surah => ({
        id: surah.id,
        name: surah.name,
        englishName: surah.englishName,
        revelationType: (surah.revelationType || "meccan") as "meccan" | "medinan",
        versesCount: surah.versesCount,
        verses: [],
        previousSurah: surah.id > 1 ? surahs[surah.id - 2].name : undefined,
        nextSurah: surah.id < 114 ? surahs[surah.id].name : undefined
      }));
      
      console.log("Background refresh of surahs data complete");
      return surahsData;
    } catch (error) {
      console.error("Error in getAllSurahs service:", error);
      return surahs.map(surah => ({
        id: surah.id,
        name: surah.name,
        englishName: surah.englishName,
        revelationType: (surah.revelationType || "meccan") as "meccan" | "medinan",
        versesCount: surah.versesCount,
        verses: []
      }));
    }
  },

  // الحصول على سورة محددة بناء على رقمها
  getSurahById: async (id: number): Promise<Surah | null> => {
    try {
      // إذا كانت سورة الفاتحة، أعدها مباشرة
      if (id === 1) {
        console.log(`Background refresh of surah ${id} data complete`);
        return surahFatiha as Surah;
      }
      
      // ابحث عن السورة في قائمة السور
      const surah = surahs.find(s => s.id === id);
      if (!surah) return null;
      
      // اجلب آيات السورة
      const verses = getSurahVerses(id);
      
      // أنشئ كائن السورة كاملاً مع الآيات
      const fullSurah: Surah = {
        id: surah.id,
        name: surah.name,
        englishName: surah.englishName,
        revelationType: (surah.revelationType === "medinan" ? "medinan" : "meccan"),
        versesCount: surah.versesCount,
        verses: verses,
        previousSurah: surah.id > 1 ? surahs[surah.id - 2].name : undefined,
        nextSurah: surah.id < 114 ? surahs[surah.id].name : undefined
      };
      
      console.log(`Background refresh of surah ${id} data complete`);
      return fullSurah;
    } catch (error) {
      console.error(`Error in getSurahById service for surah ${id}:`, error);
      
      // في حالة حدوث خطأ، ابحث عن السورة
      const surah = surahs.find(s => s.id === id);
      if (!surah) return null;
      
      // أنشئ كائن سورة بأبسط آيات افتراضية
      return {
        id: surah.id,
        name: surah.name,
        englishName: surah.englishName,
        revelationType: (surah.revelationType === "medinan" ? "medinan" : "meccan"),
        versesCount: surah.versesCount,
        verses: Array.from({ length: surah.versesCount }, (_, i) => ({
          id: i + 1,
          number: i + 1,
          numberInSurah: i + 1,
          text: `الآية رقم ${i + 1} من سورة ${surah.name}`,
          surahName: surah.name,
          juzNumber: 1,
          pageNumber: 1,
        })),
        previousSurah: surah.id > 1 ? surahs[surah.id - 2].name : undefined,
        nextSurah: surah.id < 114 ? surahs[surah.id].name : undefined
      };
    }
  },

  // Get the last read position
  getLastRead: async (userId: string): Promise<LastRead | null> => {
    try {
      const result = await storage.getLastRead(userId);
      if (result) {
        // Only return the fields we need in the client
        return {
          surahId: result.surahId,
          surahName: result.surahName,
          ayahNumber: result.ayahNumber,
          ayahText: result.ayahText || undefined
        };
      }
      return null;
    } catch (error) {
      console.error(`Error in getLastRead service for user ${userId}:`, error);
      return null;
    }
  },

  // Save the last read position
  saveLastRead: async (userId: string, lastRead: LastRead): Promise<void> => {
    try {
      // Add the missing fields required by the database schema
      const completeLastRead: DBLastRead = {
        userId,
        surahId: lastRead.surahId,
        surahName: lastRead.surahName,
        ayahNumber: lastRead.ayahNumber,
        ayahText: lastRead.ayahText || null,
        timestamp: Date.now()
      };
      await storage.saveLastRead(userId, completeLastRead);
    } catch (error) {
      console.error(`Error in saveLastRead service for user ${userId}:`, error);
      throw error;
    }
  },
};
