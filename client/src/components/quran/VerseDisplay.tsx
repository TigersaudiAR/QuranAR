import { useState } from "react";
import { Verse } from "@/lib/types";
import { useSetLastRead } from "@/lib/hooks/useQuran";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Share, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VerseDisplayProps {
  verses: Verse[];
  surahId: number;
}

const VerseDisplay = ({ verses, surahId }: VerseDisplayProps) => {
  const { setLastRead } = useSetLastRead();
  const { toast } = useToast();
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerse(verseNumber === selectedVerse ? null : verseNumber);
  };

  const handleBookmark = (verse: Verse) => {
    setLastRead({
      surahId,
      surahName: verse.surahName,
      ayahNumber: verse.number,
      ayahText: verse.text.substring(0, 50) + "..."
    });
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ موقع القراءة بنجاح",
    });
  };

  const handleShare = (verse: Verse) => {
    if (navigator.share) {
      navigator.share({
        title: `سورة ${verse.surahName} - الآية ${verse.number}`,
        text: verse.text,
        url: `${window.location.origin}/quran/${surahId}?ayah=${verse.number}`
      }).catch(error => console.log('Error sharing', error));
    } else {
      const shareUrl = `${window.location.origin}/quran/${surahId}?ayah=${verse.number}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "تم النسخ",
        description: "تم نسخ رابط الآية إلى الحافظة",
      });
    }
  };

  const handleCopy = (verse: Verse) => {
    navigator.clipboard.writeText(verse.text);
    toast({
      title: "تم النسخ",
      description: "تم نسخ الآية إلى الحافظة",
    });
  };

  if (!verses || verses.length === 0) {
    return (
      <div className="quran-text uthmani mb-6 text-center">
        <p className="text-gray-600">لا توجد آيات متاحة لهذه السورة</p>
      </div>
    );
  }

  return (
    <div className="quran-text uthmani mb-6 leading-loose">
      {surahId !== 9 && ( // Do not show Bismillah for Surah At-Tawbah (9)
        <p className="text-center mb-8 text-accent-custom text-2xl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      )}
      
      {verses.map((verse) => (
        <div 
          key={verse.number} 
          id={`ayah-${verse.number}`}
          className={`mb-4 p-2 rounded-lg transition-colors ${selectedVerse === verse.number ? 'bg-primary-light' : 'hover:bg-gray-50'}`}
          onClick={() => handleVerseClick(verse.number)}
        >
          <p>
            <Badge 
              variant="outline" 
              className="inline-block bg-gray-100 text-primary-custom text-sm rounded-full w-6 h-6 text-center leading-6 ml-2"
            >
              {verse.numberInSurah}
            </Badge>
            {verse.text}
          </p>
          
          {selectedVerse === verse.number && (
            <div className="flex justify-end mt-2 space-x-2 space-x-reverse">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-600 hover:text-primary-custom bg-white"
                onClick={() => handleBookmark(verse)}
              >
                <Bookmark size={16} className="ml-1" />
                <span className="text-xs">حفظ الموقع</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-600 hover:text-primary-custom bg-white"
                onClick={() => handleShare(verse)}
              >
                <Share size={16} className="ml-1" />
                <span className="text-xs">مشاركة</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-600 hover:text-primary-custom bg-white"
                onClick={() => handleCopy(verse)}
              >
                <Copy size={16} className="ml-1" />
                <span className="text-xs">نسخ</span>
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VerseDisplay;
