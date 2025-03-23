import axios from 'axios';
import { Surah, Verse } from '@shared/types';

// Cache mechanism to avoid repeated API calls
const cache: Record<string, any> = {};
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Base URL for the Quran API
const QURAN_API_BASE_URL = 'https://api.alquran.cloud/v1';

// Get all Surahs
export async function getAllSurahs(): Promise<Surah[]> {
  const cacheKey = 'all_surahs';
  
  if (cache[cacheKey] && cache[cacheKey].timestamp > Date.now() - CACHE_TTL) {
    return cache[cacheKey].data;
  }
  
  try {
    const response = await axios.get(`${QURAN_API_BASE_URL}/surah`);
    
    if (response.data.code === 200 && response.data.status === 'OK') {
      const surahs = response.data.data.map((surah: any) => ({
        id: surah.number,
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        englishNameTranslation: surah.englishNameTranslation,
        revelationType: surah.revelationType,
        numberOfAyahs: surah.numberOfAyahs
      }));
      
      cache[cacheKey] = {
        data: surahs,
        timestamp: Date.now()
      };
      
      return surahs;
    } else {
      throw new Error('Failed to fetch surahs');
    }
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
}

// Get Surah by ID with verses
export async function getSurahById(id: number): Promise<Surah> {
  const cacheKey = `surah_${id}`;
  
  if (cache[cacheKey] && cache[cacheKey].timestamp > Date.now() - CACHE_TTL) {
    return cache[cacheKey].data;
  }
  
  try {
    // Get Surah text
    const surahResponse = await axios.get(`${QURAN_API_BASE_URL}/surah/${id}`);
    
    // Get Tafsir for this Surah
    const tafsirResponse = await axios.get(`${QURAN_API_BASE_URL}/surah/${id}/ar.muyassar`);
    
    if (
      surahResponse.data.code === 200 && 
      surahResponse.data.status === 'OK' &&
      tafsirResponse.data.code === 200 && 
      tafsirResponse.data.status === 'OK'
    ) {
      const surahData = surahResponse.data.data;
      const tafsirData = tafsirResponse.data.data;
      
      // Map verses with tafsir
      const ayahs = surahData.ayahs.map((ayah: any, index: number) => {
        const tafsir = tafsirData.ayahs[index]?.text || '';
        
        return {
          number: ayah.number,
          text: ayah.text,
          numberInSurah: ayah.numberInSurah,
          juz: ayah.juz,
          page: ayah.page,
          tafsir: tafsir
        };
      });
      
      const surah: Surah = {
        id: surahData.number,
        number: surahData.number,
        name: surahData.name,
        englishName: surahData.englishName,
        englishNameTranslation: surahData.englishNameTranslation,
        revelationType: surahData.revelationType,
        numberOfAyahs: surahData.numberOfAyahs,
        ayahs: ayahs
      };
      
      cache[cacheKey] = {
        data: surah,
        timestamp: Date.now()
      };
      
      return surah;
    } else {
      throw new Error(`Failed to fetch surah with ID ${id}`);
    }
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    throw error;
  }
}

// Get basic Surah info by ID (without verses)
export async function getSurahBasicInfo(id: number): Promise<{ id: number, name: string } | null> {
  if (id < 1 || id > 114) {
    return null;
  }
  
  try {
    const allSurahs = await getAllSurahs();
    const surah = allSurahs.find(s => s.number === id);
    
    if (surah) {
      return {
        id: surah.number,
        name: surah.name
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching basic surah info for ${id}:`, error);
    return null;
  }
}

// Mock reading progress data (in a real app, this would be from a database)
export function getMockReadingProgress(): { surahId: number, surahName: string, verseId: number, verseText: string } {
  return {
    surahId: 2,
    surahName: "البقرة",
    verseId: 255,
    verseText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ..."
  };
}
