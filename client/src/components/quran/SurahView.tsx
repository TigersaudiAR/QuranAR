import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Surah, Verse, QuranFont, Reciter } from "@/lib/types";
import { toArabicNumerals, getRevelationTypeInArabic } from "@/lib/utils";
import VerseItem from "./VerseItem";
import BasmalaImage from "./BasmalaImage";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SurahViewProps {
  surahId: number;
  initialVerseId?: number;
}

export default function SurahView({ surahId, initialVerseId }: SurahViewProps) {
  const [font, setFont] = useState<QuranFont>(QuranFont.Uthmani);
  const [reciter, setReciter] = useState<Reciter>(Reciter.MishariAlafasy);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentVerseRef = useRef<HTMLDivElement | null>(null);
  
  const { data: surah, isLoading } = useQuery<Surah>({
    queryKey: [`/api/quran/surah/${surahId}`],
  });
  
  const { data: nextSurah } = useQuery<{ id: number, name: string }>({
    queryKey: [`/api/quran/surah/${surahId + 1}/basic`],
    enabled: !!surah,
  });
  
  const { data: prevSurah } = useQuery<{ id: number, name: string }>({
    queryKey: [`/api/quran/surah/${surahId - 1}/basic`],
    enabled: !!surah && surahId > 1,
  });
  
  useEffect(() => {
    // Scroll to specified verse if initialVerseId is provided
    if (initialVerseId && surah?.ayahs) {
      setTimeout(() => {
        currentVerseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [initialVerseId, surah]);
  
  const handlePlayAudio = (verseNumber: number) => {
    if (!surah) return;
    
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.${reciter}/${surah.id * 1000 + verseNumber}.mp3`;
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.play();
    setIsPlaying(true);
    
    audioRef.current.onended = () => {
      setIsPlaying(false);
    };
  };
  
  const handlePlayAll = () => {
    // Implementation for playing the entire surah
    if (!surah?.ayahs?.length) return;
    
    handlePlayAudio(1); // Start from first verse
  };
  
  if (isLoading || !surah) {
    return (
      <section>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="text-center">
              <Skeleton className="h-8 w-40 mx-auto mb-2" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          
          <div className="text-center mb-8">
            <Skeleton className="h-12 w-64 mx-auto" />
          </div>
        </div>
        
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </section>
    );
  }
  
  return (
    <section>
      <div className="islamic-pattern bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          {prevSurah ? (
            <Link href={`/surah/${surahId - 1}`}>
              <a className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80">
                <i className="fas fa-arrow-right text-xl"></i>
              </a>
            </Link>
          ) : (
            <div className="w-6"></div> // Empty space for alignment
          )}
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-1">سورة {surah.name}</h2>
            <div className="flex justify-center items-center text-sm text-gray-600 dark:text-gray-400">
              <span>{getRevelationTypeInArabic(surah.revelationType)}</span>
              <span className="mx-2">•</span>
              <span>{toArabicNumerals(surah.numberOfAyahs)} آية</span>
            </div>
          </div>
          
          {nextSurah ? (
            <Link href={`/surah/${surahId + 1}`}>
              <a className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80">
                <i className="fas fa-arrow-left text-xl"></i>
              </a>
            </Link>
          ) : (
            <div className="w-6"></div> // Empty space for alignment
          )}
        </div>
        
        {/* Bismillah except for surah 9 */}
        {surahId !== 9 && (
          <div className="text-center mb-8">
            <div className="inline-block border-b-2 border-accent pb-2 mb-4">
              <BasmalaImage />
            </div>
          </div>
        )}
      </div>
      
      {/* Verse Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <Select value={font} onValueChange={(value) => setFont(value as QuranFont)}>
            <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary w-40">
              <SelectValue placeholder="نوع الخط" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={QuranFont.Uthmani}>عثماني</SelectItem>
              <SelectItem value={QuranFont.IndoPak}>هندي/باكستاني</SelectItem>
              <SelectItem value={QuranFont.MeQuran}>الشرق الأوسط</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={reciter} onValueChange={(value) => setReciter(value as Reciter)}>
            <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary w-40">
              <SelectValue placeholder="القراء" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Reciter.MishariAlafasy}>مشاري العفاسي</SelectItem>
              <SelectItem value={Reciter.AbdulBasit}>عبد الباسط عبد الصمد</SelectItem>
              <SelectItem value={Reciter.MahmoudKhalil}>محمود خليل الحصري</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={handlePlayAll} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-primary`}></i>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="fas fa-download text-primary"></i>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="fas fa-book-open text-primary"></i>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="fas fa-font text-primary"></i>
          </button>
        </div>
      </div>
      
      {/* Verses Container */}
      <div className="space-y-6">
        {surah.ayahs?.map((verse) => (
          <div 
            key={verse.numberInSurah}
            ref={verse.numberInSurah === initialVerseId ? currentVerseRef : null}
          >
            <VerseItem 
              verse={verse} 
              surahId={surahId} 
              onPlayAudio={handlePlayAudio} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
