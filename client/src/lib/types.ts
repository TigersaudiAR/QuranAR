export interface Verse {
  id: number;
  number: number;
  numberInSurah: number;
  text: string;
  surahName: string;
  juzNumber?: number;
  pageNumber?: number;
  audio?: string;
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
}

export interface LastRead {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText?: string;
}

export type ViewType = "page" | "surah" | "juz";
