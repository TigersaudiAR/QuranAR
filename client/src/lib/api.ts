import { Surah, Verse, LastRead } from "./types";

// Mock data for surahs - in production this would be fetched from a Quran API
const SURAHS_DATA: Partial<Surah>[] = [
  { id: 1, name: "الفاتحة", englishName: "The Opening", revelationType: "meccan", versesCount: 7 },
  { id: 2, name: "البقرة", englishName: "The Cow", revelationType: "medinan", versesCount: 286 },
  { id: 3, name: "آل عمران", englishName: "The Family of Imran", revelationType: "medinan", versesCount: 200 },
  { id: 4, name: "النساء", englishName: "The Women", revelationType: "medinan", versesCount: 176 },
  { id: 5, name: "المائدة", englishName: "The Table Spread", revelationType: "medinan", versesCount: 120 },
  // The full list would contain all 114 surahs
];

// This is a utility function to get Arabic numerals (for display purposes)
export const getArabicNumber = (number: number): string => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
};

// Function to fetch the list of all surahs
export const fetchSurahs = async (): Promise<Surah[]> => {
  try {
    // In a real implementation, this would be an API call
    // For now, we'll use the mock data
    return SURAHS_DATA.map((surah, index) => {
      const prevIndex = index > 0 ? index - 1 : -1;
      const nextIndex = index < SURAHS_DATA.length - 1 ? index + 1 : -1;
      
      return {
        ...surah,
        previousSurah: prevIndex >= 0 ? SURAHS_DATA[prevIndex]?.name : undefined,
        nextSurah: nextIndex >= 0 ? SURAHS_DATA[nextIndex]?.name : undefined,
        verses: [], // Verses are loaded separately
      } as Surah;
    });
  } catch (error) {
    console.error("Error fetching surahs:", error);
    throw error;
  }
};

// Function to fetch a specific surah with its verses
export const fetchSurah = async (id: number): Promise<Surah> => {
  try {
    // In a real implementation, this would be an API call
    const surahData = SURAHS_DATA.find(s => s.id === id);
    
    if (!surahData) {
      throw new Error(`Surah with ID ${id} not found`);
    }
    
    // Generate mock verses for the surah
    const verses: Verse[] = Array.from({ length: surahData.versesCount || 0 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      numberInSurah: i + 1,
      text: `هذا نص الآية رقم ${getArabicNumber(i + 1)} من سورة ${surahData.name}`,
      surahName: surahData.name || "",
      juzNumber: Math.floor(i / 20) + 1,
      pageNumber: Math.floor(i / 15) + 1,
    }));
    
    const prevIndex = SURAHS_DATA.findIndex(s => s.id === id) - 1;
    const nextIndex = SURAHS_DATA.findIndex(s => s.id === id) + 1;
    
    return {
      ...surahData,
      verses,
      previousSurah: prevIndex >= 0 ? SURAHS_DATA[prevIndex]?.name : undefined,
      nextSurah: nextIndex < SURAHS_DATA.length ? SURAHS_DATA[nextIndex]?.name : undefined,
    } as Surah;
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    throw error;
  }
};

// Function to get the last read position
export const getLastRead = async (): Promise<LastRead | null> => {
  try {
    // In a real implementation, this would fetch from the server
    // For now, we'll check localStorage
    const lastReadStr = localStorage.getItem('quran_last_read');
    return lastReadStr ? JSON.parse(lastReadStr) : null;
  } catch (error) {
    console.error("Error getting last read position:", error);
    return null;
  }
};

// Function to save the last read position
export const saveLastRead = async (lastRead: LastRead): Promise<void> => {
  try {
    // In a real implementation, this would save to the server
    // For now, we'll save to localStorage
    localStorage.setItem('quran_last_read', JSON.stringify(lastRead));
  } catch (error) {
    console.error("Error saving last read position:", error);
    throw error;
  }
};
