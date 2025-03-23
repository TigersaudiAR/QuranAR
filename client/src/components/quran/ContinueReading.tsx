import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ReadingProgress } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContinueReading() {
  const { data: lastRead, isLoading } = useQuery<ReadingProgress>({
    queryKey: ['/api/quran/reading-progress'],
    initialData: {
      surahId: 2,
      surahName: "البقرة",
      verseId: 255,
      verseText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ..."
    }
  });
  
  if (isLoading) {
    return (
      <section className="my-6">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg p-5 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-full">
              <Skeleton className="h-6 w-1/3 mb-2 bg-white/20" />
              <Skeleton className="h-5 w-1/2 mb-2 bg-white/20" />
              <Skeleton className="h-8 w-full bg-white/20" />
            </div>
            <Skeleton className="h-10 w-32 mt-4 md:mt-0 bg-white/20" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-6">
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg p-5 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">تابع القراءة</h2>
            <p className="mb-2">سورة {lastRead.surahName} - الآية {lastRead.verseId}</p>
            <p className="font-arabic text-2xl line-clamp-2">{lastRead.verseText}</p>
          </div>
          <Link href={`/surah/${lastRead.surahId}?verse=${lastRead.verseId}`}>
            <button className="mt-4 md:mt-0 bg-white text-primary hover:bg-gray-100 font-bold py-2 px-6 rounded-lg transition duration-300 shadow">
              استئناف القراءة
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
