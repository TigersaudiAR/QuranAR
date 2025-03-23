import { useState } from "react";
import { Verse } from "@/lib/types";
import { toArabicNumerals } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";

interface VerseItemProps {
  verse: Verse;
  surahId: number;
  onPlayAudio: (verseNumber: number) => void;
}

export default function VerseItem({ verse, surahId, onPlayAudio }: VerseItemProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const queryClient = useQueryClient();
  
  // Toggle bookmark mutation
  const toggleBookmark = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', `/api/quran/bookmarks/${surahId}/${verse.numberInSurah}`, { 
        action: isBookmarked ? 'remove' : 'add' 
      });
    },
    onSuccess: () => {
      setIsBookmarked(!isBookmarked);
      queryClient.invalidateQueries({ queryKey: ['/api/quran/bookmarks'] });
    }
  });
  
  // Share verse
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `سورة ${surahId} - الآية ${verse.numberInSurah}`,
          text: verse.text,
          url: `${window.location.origin}/surah/${surahId}?verse=${verse.numberInSurah}`
        });
      } else {
        await navigator.clipboard.writeText(verse.text);
        toast({
          title: "تم النسخ",
          description: "تم نسخ الآية إلى الحافظة",
        });
      }
    } catch (error) {
      console.error("Error sharing verse:", error);
    }
  };
  
  return (
    <div className="verse-container bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition duration-300 hover:bg-primary/5 dark:hover:bg-primary/10">
      <div className="flex justify-between items-start mb-4">
        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">
          {toArabicNumerals(verse.numberInSurah)}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => toggleBookmark.mutate()}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          >
            <i className={`${isBookmarked ? 'fas text-accent' : 'far'} fa-bookmark`}></i>
          </button>
          <button 
            onClick={handleShare}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          >
            <i className="fas fa-share-alt"></i>
          </button>
          <button 
            onClick={() => onPlayAudio(verse.numberInSurah)}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          >
            <i className="fas fa-play"></i>
          </button>
        </div>
      </div>
      
      <p className="font-arabic text-3xl text-center leading-loose mb-4 dark:text-white" dir="rtl">
        {verse.text}
      </p>
      
      {verse.tafsir && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h4 className="font-semibold mb-2 text-secondary dark:text-secondary">التفسير الميسر:</h4>
          <p className="text-gray-700 dark:text-gray-300">
            {verse.tafsir}
          </p>
        </div>
      )}
    </div>
  );
}
