export interface Verse {
  id: number;
  number: number;
  numberInSurah: number;
  text: string;
  surahName: string;
  juzNumber?: number;
  pageNumber?: number;
  audio?: string;
  translation?: string;
  transliteration?: string;
  tafseer?: string;
}

export interface Surah {
  id: number;
  name: string;
  englishName?: string;
  revelationType: "meccan" | "medinan";
  versesCount: number;
  verses: Verse[];
  nextSurah?: string;
  previousSurah?: string;
  juzNumber?: number;
  page?: number;
}

export interface LastRead {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText?: string;
}

export interface Bookmark {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  timestamp: number;
  notes?: string;
  color?: string;
}

export interface Favorite {
  id?: number;
  surahId: number;
  surahName: string;
  timestamp: number;
  category?: string;
}

export interface FavoriteVerse {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  timestamp: number;
  category?: string;
}

export interface Collection {
  id?: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  timestamp: number;
  itemCount?: number;
}

export interface CollectionItem {
  id: string;
  collectionId: number;
  itemType: 'bookmark' | 'favorite' | 'verse';
  itemId: string;
  timestamp: number;
}

export interface AudioPlayer {
  isPlaying: boolean;
  surahId: number | null;
  verseId: number | null;
  duration: number;
  currentTime: number;
  reciter: string;
}

export interface TranslationSettings {
  enabled: boolean;
  language: string;
}

export interface TafseerSettings {
  enabled: boolean;
  source: string;
}

export type ThemeType = 'light' | 'dark' | 'sepia' | 'gold';

export interface QuranSettings {
  fontSize: number;
  fontFamily: string;
  theme: ThemeType;
  showTranslation: boolean;
  translationLanguage: string;
  showTafseer: boolean;
  tafseerSource: string;
  reciter: ReciterType;
  viewType: ViewType;
}
export type ViewType = "page" | "surah" | "juz" | "continuous";
export type ReciterType = "mishari_rashid_alafasy" | "abdul_basit" | "mahmoud_khalil_al-husary" | "mohamed_siddiq_al-minshawi";
