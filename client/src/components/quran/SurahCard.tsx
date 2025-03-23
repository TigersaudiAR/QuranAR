import { Link } from "wouter";
import { Surah } from "@/lib/types";
import { getRevelationTypeInArabic, toArabicNumerals } from "@/lib/utils";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface SurahCardProps {
  surah: Surah;
}

export default function SurahCard({ surah }: SurahCardProps) {
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // In a real app, fetch bookmarks from API
  const { data: bookmarks = [] } = useQuery<number[]>({
    queryKey: ['/api/quran/bookmarks'],
    initialData: [],
  });
  
  // Toggle bookmark mutation
  const toggleBookmark = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', `/api/quran/bookmarks/${surah.id}`, { 
        action: isBookmarked ? 'remove' : 'add' 
      });
    },
    onSuccess: () => {
      setIsBookmarked(!isBookmarked);
      queryClient.invalidateQueries({ queryKey: ['/api/quran/bookmarks'] });
    }
  });
  
  return (
    <div className="surah-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-r-4 border-primary transition duration-300">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm ml-2">
            {toArabicNumerals(surah.number)}
          </div>
          <div>
            <h3 className="font-bold text-lg dark:text-white">{surah.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{surah.englishName}</p>
          </div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{getRevelationTypeInArabic(surah.revelationType)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
        <span>عدد الآيات: {toArabicNumerals(surah.numberOfAyahs)}</span>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark.mutate();
          }}
          className="focus:outline-none"
        >
          <i className={`${isBookmarked ? 'fas text-accent' : 'far text-gray-400'} fa-bookmark ml-1`}></i>
        </button>
      </div>
      <Link href={`/surah/${surah.id}`}>
        <a className="absolute inset-0 cursor-pointer" aria-label={`سورة ${surah.name}`}></a>
      </Link>
    </div>
  );
}
