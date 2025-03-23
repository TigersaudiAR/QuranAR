import { Surah, Verse, LastRead, Bookmark, Favorite, FavoriteVerse, Collection, CollectionItem } from "./types";
import { apiRequest } from "./queryClient";

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
    const response = await fetch('/api/quran/surahs');
    if (!response.ok) {
      throw new Error('Failed to fetch surahs');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching surahs:", error);
    
    // Fallback to mock data if API fails
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
  }
};

// Function to fetch a specific surah with its verses
export const fetchSurah = async (id: number): Promise<Surah> => {
  try {
    const response = await fetch(`/api/quran/surahs/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch surah ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    
    // Fallback to mock data if API fails
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
  }
};

// Function to get the last read position
export const getLastRead = async (): Promise<LastRead | null> => {
  try {
    const response = await fetch('/api/quran/last-read');
    if (!response.ok) {
      throw new Error('Failed to fetch last read position');
    }
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Error getting last read position:", error);
    
    // Fallback to localStorage if API fails
    const lastReadStr = localStorage.getItem('quran_last_read');
    return lastReadStr ? JSON.parse(lastReadStr) : null;
  }
};

// Function to save the last read position
export const saveLastRead = async (lastRead: LastRead): Promise<void> => {
  try {
    const response = await fetch('/api/quran/last-read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lastRead),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save last read position');
    }
    
    // Also save to localStorage as a fallback
    localStorage.setItem('quran_last_read', JSON.stringify(lastRead));
  } catch (error) {
    console.error("Error saving last read position:", error);
    
    // Save to localStorage if server save fails
    localStorage.setItem('quran_last_read', JSON.stringify(lastRead));
    throw error;
  }
};

// ===== الإشارات المرجعية (Bookmarks) =====

// Get all bookmarks
export const getBookmarks = async (): Promise<Bookmark[]> => {
  return apiRequest<Bookmark[]>('/api/bookmarks');
};

// Get bookmark by ID
export const getBookmarkById = async (id: string): Promise<Bookmark> => {
  return apiRequest<Bookmark>(`/api/bookmarks/${id}`);
};

// Get bookmarks by surah
export const getBookmarksBySurah = async (surahId: number): Promise<Bookmark[]> => {
  return apiRequest<Bookmark[]>(`/api/bookmarks/surah/${surahId}`);
};

// Create a new bookmark
export const createBookmark = async (bookmark: Omit<Bookmark, 'id'>): Promise<Bookmark> => {
  return apiRequest<Bookmark>('/api/bookmarks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookmark),
  });
};

// Update an existing bookmark
export const updateBookmark = async (id: string, data: Partial<Bookmark>): Promise<Bookmark> => {
  return apiRequest<Bookmark>(`/api/bookmarks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// Delete a bookmark
export const deleteBookmark = async (id: string): Promise<boolean> => {
  await apiRequest<void>(`/api/bookmarks/${id}`, {
    method: 'DELETE',
  });
  return true;
};

// ===== المفضلة (Favorites) =====

// Get all favorite surahs
export const getFavoriteSurahs = async (): Promise<Favorite[]> => {
  return apiRequest<Favorite[]>('/api/favorites/surahs');
};

// Check if a surah is favorited
export const checkFavoriteSurah = async (surahId: number): Promise<boolean> => {
  try {
    await apiRequest<Favorite>(`/api/favorites/surahs/${surahId}`);
    return true;
  } catch (error) {
    return false;
  }
};

// Add a surah to favorites
export const addFavoriteSurah = async (favorite: Omit<Favorite, 'id'>): Promise<Favorite> => {
  return apiRequest<Favorite>('/api/favorites/surahs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favorite),
  });
};

// Remove a surah from favorites
export const removeFavoriteSurah = async (surahId: number): Promise<boolean> => {
  await apiRequest<void>(`/api/favorites/surahs/${surahId}`, {
    method: 'DELETE',
  });
  return true;
};

// ===== آيات مفضلة (Favorite Verses) =====

// Get all favorite verses
export const getFavoriteVerses = async (): Promise<FavoriteVerse[]> => {
  return apiRequest<FavoriteVerse[]>('/api/favorites/verses');
};

// Check if a verse is favorited
export const checkFavoriteVerse = async (surahId: number, ayahNumber: number): Promise<boolean> => {
  try {
    await apiRequest<FavoriteVerse>(`/api/favorites/verses/${surahId}/${ayahNumber}`);
    return true;
  } catch (error) {
    return false;
  }
};

// Add a verse to favorites
export const addFavoriteVerse = async (verse: Omit<FavoriteVerse, 'id'>): Promise<FavoriteVerse> => {
  return apiRequest<FavoriteVerse>('/api/favorites/verses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(verse),
  });
};

// Update a favorite verse (e.g., change category)
export const updateFavoriteVerse = async (id: string, data: Partial<FavoriteVerse>): Promise<FavoriteVerse> => {
  return apiRequest<FavoriteVerse>(`/api/favorites/verses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// Remove a verse from favorites
export const removeFavoriteVerse = async (id: string): Promise<boolean> => {
  await apiRequest<void>(`/api/favorites/verses/${id}`, {
    method: 'DELETE',
  });
  return true;
};

// ===== المجموعات (Collections) =====

// Get all collections
export const getCollections = async (): Promise<Collection[]> => {
  return apiRequest<Collection[]>('/api/collections');
};

// Get a specific collection
export const getCollectionById = async (id: number): Promise<Collection> => {
  return apiRequest<Collection>(`/api/collections/${id}`);
};

// Create a new collection
export const createCollection = async (collection: Omit<Collection, 'id'>): Promise<Collection> => {
  return apiRequest<Collection>('/api/collections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection),
  });
};

// Update a collection
export const updateCollection = async (id: number, data: Partial<Collection>): Promise<Collection> => {
  return apiRequest<Collection>(`/api/collections/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// Delete a collection
export const deleteCollection = async (id: number): Promise<boolean> => {
  await apiRequest<void>(`/api/collections/${id}`, {
    method: 'DELETE',
  });
  return true;
};

// Add item to a collection
export const addItemToCollection = async (collectionId: number, item: Omit<CollectionItem, 'id' | 'collectionId'>): Promise<CollectionItem> => {
  return apiRequest<CollectionItem>(`/api/collections/${collectionId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
};

// Remove item from a collection
export const removeItemFromCollection = async (itemId: string): Promise<boolean> => {
  await apiRequest<void>(`/api/collections/items/${itemId}`, {
    method: 'DELETE',
  });
  return true;
};
