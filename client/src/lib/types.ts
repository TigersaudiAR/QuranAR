export interface Surah {
  id: number;
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: "Meccan" | "Medinan";
  numberOfAyahs: number;
  ayahs?: Verse[];
}

export interface Verse {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  translation?: string;
  tafsir?: string;
}

export interface PrayerTime {
  name: string;
  time: string;
}

export interface DateInfo {
  hijri: string;
  gregorian: string;
}

export interface ViewMode {
  id: string;
  name: string;
}

export interface ReadingProgress {
  surahId: number;
  surahName: string;
  verseId: number;
  verseText: string;
}

export enum QuranFont {
  Uthmani = "uthmani",
  IndoPak = "indopak",
  MeQuran = "me_quran"
}

export enum Reciter {
  MishariAlafasy = "mishari_alafasy",
  AbdulBasit = "abdul_basit",
  MahmoudKhalil = "mahmoud_khalil"
}
