
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuranSurah, useQuranJuz, useQuranPage } from "@/lib/hooks/useQuran";
import { Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookmarksManager from "./BookmarksManager";
import { ViewType, ReciterType } from "@/lib/types";

interface QuranMushafViewProps {
  surahId?: number;
  juzId?: number;
  pageId?: number;
  viewType: ViewType;
  fontSize: number;
  fontFamily: string;
  showTranslation: boolean;
  translationLanguage: string;
  showTafseer: boolean;
  tafseerSource: string;
  reciter: ReciterType;
}

const QuranMushafView = ({
  surahId = 1,
  juzId,
  pageId,
  viewType,
  fontSize,
  fontFamily,
  showTranslation,
  translationLanguage,
  showTafseer,
  tafseerSource,
  reciter
}: QuranMushafViewProps) => {
  const [location, navigate] = useLocation();
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const { surah, isLoading: isSurahLoading } = useQuranSurah(surahId);
  
  // التحقق من المعلمات المطلوبة
  if (viewType === "surah" && !surahId) {
    return <div className="text-center p-8">يرجى تحديد سورة</div>;
  }
  
  if (isSurahLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-custom mb-4" />
        <p className="text-gray-600">جاري تحميل السورة...</p>
      </div>
    );
  }
  
  if (!surah) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">لا يمكن تحميل السورة</p>
        <Button onClick={() => navigate("/quran")}>
          <BookOpen className="ml-2 h-4 w-4" />
          العودة إلى فهرس السور
        </Button>
      </div>
    );
  }
  
  const verses = surah.verses || [];
  
  return (
    <div className="quran-mushaf-view">
      {/* الإطار الزخرفي العلوي */}
      <div className="mushaf-header">
        <div className="mushaf-header-content">
          <div className="surah-info right-panel">
            <h3 className="surah-name">{surah.name}</h3>
          </div>
          <div className="info-separator"></div>
          <div className="juz-info left-panel">
            <h3 className="juz-name">الجزء {surah.juzNumber || Math.ceil(surah.id / 10)}</h3>
          </div>
        </div>
      </div>
      
      {/* محتوى السورة */}
      <div className="mushaf-content" style={{ fontSize: `${fontSize}px`, fontFamily }}>
        {surah.id === 1 || surah.id === 9 ? null : (
          <div className="bismillah-container">
            <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        )}
        
        <div className="verses-container">
          {verses.map((verse) => (
            <span 
              key={verse.id} 
              className={`verse ${currentAyah === verse.numberInSurah ? 'active-verse' : ''}`}
              onClick={() => setCurrentAyah(verse.numberInSurah)}
            >
              {verse.text}
              <span className="verse-number">{verse.numberInSurah}</span>
            </span>
          ))}
        </div>
      </div>
      
      {/* الإطار الزخرفي السفلي */}
      <div className="mushaf-footer">
        <div className="page-number">{surah.page || surah.id}</div>
      </div>
      
      {/* أدوات تفاعلية */}
      <div className="interactive-tools">
        {currentAyah && (
          <BookmarksManager
            currentSurahId={surahId}
            currentVerseNumber={currentAyah}
            currentVerseText={verses.find(v => v.numberInSurah === currentAyah)?.text}
          />
        )}
      </div>
    </div>
  );
};

export default QuranMushafView;
