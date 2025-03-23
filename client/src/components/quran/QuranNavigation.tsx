import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useAllSurahs } from "@/lib/hooks/useQuran";

interface QuranNavigationProps {
  currentSurahId: number;
}

const QuranNavigation = ({ currentSurahId }: QuranNavigationProps) => {
  const { surahs } = useAllSurahs();
  
  if (!surahs || surahs.length === 0) {
    return null;
  }

  const currentIndex = surahs.findIndex(s => s.id === currentSurahId);
  const prevSurah = currentIndex > 0 ? surahs[currentIndex - 1] : null;
  const nextSurah = currentIndex < surahs.length - 1 ? surahs[currentIndex + 1] : null;

  return (
    <div className="flex justify-between items-center my-6 py-4 border-t border-b">
      <div>
        {prevSurah && (
          <Link href={`/quran/${prevSurah.id}`}>
            <Button variant="ghost" className="flex items-center">
              <ChevronRight className="ml-1" size={20} />
              <span>السابق: سورة {prevSurah.name}</span>
            </Button>
          </Link>
        )}
      </div>
      
      <div className="flex items-center">
        <Link href="/quran">
          <Button variant="outline" className="mx-2">
            فهرس السور
          </Button>
        </Link>
      </div>
      
      <div>
        {nextSurah && (
          <Link href={`/quran/${nextSurah.id}`}>
            <Button variant="ghost" className="flex items-center">
              <span>التالي: سورة {nextSurah.name}</span>
              <ChevronLeft className="mr-1" size={20} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuranNavigation;
