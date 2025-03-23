import { useState, useEffect, useRef } from "react";
import { useSetLastRead } from "@/lib/hooks/useQuran";
import { Verse, ReciterType, ViewType } from "@/lib/types";
import { Bookmark, Share, Copy, PlayCircle, Info, ExternalLink, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import AudioPlayer from "./AudioPlayer";
import TafseerView from "./TafseerView";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VerseDisplayEnhancedProps {
  verses: Verse[];
  surahId: number;
  viewType: ViewType;
  fontSize: number;
  fontFamily: string;
  showTranslation: boolean;
  translationLanguage: string;
  showTafseer: boolean;
  tafseerSource: string;
  reciter: ReciterType;
}

const VerseDisplayEnhanced = ({
  verses,
  surahId,
  viewType,
  fontSize,
  fontFamily,
  showTranslation,
  translationLanguage,
  showTafseer,
  tafseerSource,
  reciter
}: VerseDisplayEnhancedProps) => {
  const [currentPlayingVerse, setCurrentPlayingVerse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTafseerDialog, setShowTafseerDialog] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  const verseRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const { setLastRead } = useSetLastRead();
  const { toast } = useToast();
  
  // Observer for tracking reading progress
  useEffect(() => {
    if (verses.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const verseElement = entry.target;
            const verseId = parseInt(verseElement.id.replace('ayah-', ''));
            const verse = verses.find(v => v.numberInSurah === verseId);
            
            if (verse) {
              // Update the last read position
              setLastRead({
                surahId,
                surahName: verse.surahName,
                ayahNumber: verse.numberInSurah,
                ayahText: verse.text
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    
    // Observe all verse elements
    Object.values(verseRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      Object.values(verseRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [verses, surahId, setLastRead, verseRefs.current]);
  
  const handleBookmark = (verse: Verse) => {
    // Implementation will be in BookmarksManager component
    toast({
      title: "تم إضافة الإشارة المرجعية",
      description: `سورة ${verse.surahName} - الآية ${verse.numberInSurah}`,
    });
  };
  
  const handleShare = (verse: Verse) => {
    if (navigator.share) {
      navigator.share({
        title: `سورة ${verse.surahName} - الآية ${verse.numberInSurah}`,
        text: verse.text,
        url: `${window.location.origin}/quran/${surahId}?ayah=${verse.numberInSurah}`
      }).catch(error => {
        console.error("Error sharing:", error);
      });
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(`${verse.text}\n\nسورة ${verse.surahName} - الآية ${verse.numberInSurah}`);
      toast({
        title: "تم نسخ الآية",
        description: "تم نسخ الآية إلى الحافظة"
      });
    }
  };
  
  const handleCopy = (verse: Verse) => {
    navigator.clipboard.writeText(verse.text);
    toast({
      title: "تم نسخ الآية",
      description: "تم نسخ الآية إلى الحافظة"
    });
  };
  
  const handlePlayAudio = (verse: Verse) => {
    if (currentPlayingVerse === verse.numberInSurah && isPlaying) {
      setIsPlaying(false);
      setCurrentPlayingVerse(null);
    } else {
      setCurrentPlayingVerse(verse.numberInSurah);
      setIsPlaying(true);
    }
  };
  
  const handleShowTafseer = (verse: Verse) => {
    setSelectedVerse(verse);
    setShowTafseerDialog(true);
  };
  
  const getTranslation = (verse: Verse) => {
    // In a real application, this would fetch the actual translation 
    // based on the selected language
    return verse.translation || "Translation not available";
  };
  
  const handleAudioComplete = () => {
    setIsPlaying(false);
    setCurrentPlayingVerse(null);
  };
  
  const getPageVerses = () => {
    // In a real application, this would group verses by page
    // For demo purposes, we'll create a simple grouping
    if (viewType !== "page") return [verses];
    
    const versesPerPage = 15; // Arbitrary number for demo
    return verses.reduce((pages: Verse[][], verse, index) => {
      const pageIndex = Math.floor(index / versesPerPage);
      
      if (!pages[pageIndex]) {
        pages[pageIndex] = [];
      }
      
      pages[pageIndex].push(verse);
      return pages;
    }, []);
  };
  
  const getJuzVerses = () => {
    // In a real application, this would group verses by juz
    // For demo purposes, we'll create a simple grouping
    if (viewType !== "juz") return [verses];
    
    const versesPerJuz = Math.ceil(verses.length / 3); // Arbitrary division for demo
    return verses.reduce((juzs: Verse[][], verse, index) => {
      const juzIndex = Math.floor(index / versesPerJuz);
      
      if (!juzs[juzIndex]) {
        juzs[juzIndex] = [];
      }
      
      juzs[juzIndex].push(verse);
      return juzs;
    }, []);
  };
  
  const renderVerse = (verse: Verse, index: number) => {
    const isPlaying = currentPlayingVerse === verse.numberInSurah;
    const isHighlighted = highlightedVerse === verse.numberInSurah;
    
    return (
      <div 
        id={`ayah-${verse.numberInSurah}`}
        key={verse.numberInSurah}
        ref={el => verseRefs.current[verse.numberInSurah] = el}
        className={`p-4 border-b ${isHighlighted ? 'bg-primary-custom/5 rounded-md' : ''}`}
        onMouseEnter={() => setHighlightedVerse(verse.numberInSurah)}
        onMouseLeave={() => setHighlightedVerse(null)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="w-10 h-10 rounded-full bg-primary-custom/10 flex items-center justify-center text-primary-custom font-semibold ml-4">
            {verse.numberInSurah}
          </div>
          <div className="flex space-x-1 space-x-reverse">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-primary-custom"
                    onClick={() => handleBookmark(verse)}
                  >
                    <Bookmark size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>إضافة إشارة مرجعية</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-primary-custom"
                    onClick={() => handleShare(verse)}
                  >
                    <Share size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>مشاركة الآية</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-primary-custom"
                    onClick={() => handleCopy(verse)}
                  >
                    <Copy size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>نسخ الآية</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-8 w-8 ${isPlaying ? 'text-primary-custom' : 'text-gray-400 hover:text-primary-custom'}`}
                    onClick={() => handlePlayAudio(verse)}
                  >
                    {isPlaying ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? 'إيقاف' : 'استماع للآية'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-primary-custom"
                    onClick={() => handleShowTafseer(verse)}
                  >
                    <Info size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>عرض التفسير</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div 
          className="text-right mt-4 text-wrapper leading-10"
          style={{ 
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily === "Uthmani" ? "Uthmani, Amiri, Arial" : 
                        fontFamily === "Scheherazade" ? "Scheherazade, Amiri, Arial" : 
                        fontFamily === "Amiri" ? "Amiri, Arial" : 
                        "Naskh, Arial",
          }}
        >
          {verse.text}
        </div>
        
        {showTranslation && (
          <div className="text-right mt-4 text-gray-600 text-sm">
            {getTranslation(verse)}
          </div>
        )}
        
        {showTafseer && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border text-sm text-gray-700">
            <div className="font-semibold mb-1 flex items-center justify-between">
              <span>التفسير ({tafseerSource === "ibn-kathir" ? "ابن كثير" : 
                              tafseerSource === "al-qurtubi" ? "القرطبي" : 
                              tafseerSource === "al-tabari" ? "الطبري" : 
                              "السعدي"})</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-primary-custom"
                onClick={() => handleShowTafseer(verse)}
              >
                عرض المزيد <ExternalLink className="w-3 h-3 mr-1" />
              </Button>
            </div>
            <p className="line-clamp-2">
              {verse.tafseer || "التفسير غير متوفر حالياً"}
            </p>
          </div>
        )}
        
        {isPlaying && currentPlayingVerse === verse.numberInSurah && (
          <div className="mt-4">
            <AudioPlayer 
              verseId={verse.numberInSurah}
              surahId={surahId}
              verseNumber={verse.numberInSurah}
              reciter={reciter}
              onComplete={handleAudioComplete}
              autoPlay={true}
            />
          </div>
        )}
      </div>
    );
  };
  
  const renderPageView = () => {
    const pages = getPageVerses();
    
    return (
      <div className="space-y-6">
        {pages.map((pageVerses, pageIndex) => (
          <div key={`page-${pageIndex}`} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-center text-gray-500 mb-4 pb-2 border-b">
              صفحة {pageIndex + 1}
            </div>
            <div className="space-y-4">
              {pageVerses.map((verse, verseIndex) => renderVerse(verse, verseIndex))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderJuzView = () => {
    const juzs = getJuzVerses();
    
    return (
      <div className="space-y-6">
        {juzs.map((juzVerses, juzIndex) => (
          <div key={`juz-${juzIndex}`} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-center text-gray-500 mb-4 pb-2 border-b">
              الجزء {juzIndex + 1}
            </div>
            <div className="space-y-4">
              {juzVerses.map((verse, verseIndex) => renderVerse(verse, verseIndex))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderSurahView = () => {
    return (
      <div className="space-y-4">
        {verses.map((verse, index) => renderVerse(verse, index))}
      </div>
    );
  };
  
  const renderContinuousView = () => {
    return (
      <div className="relative">
        <div className="absolute top-0 right-0 left-0 h-24 pointer-events-none bg-gradient-to-b from-white to-transparent z-10"></div>
        <div className="space-y-2">
          {verses.map((verse, index) => renderVerse(verse, index))}
        </div>
        <div className="absolute bottom-0 right-0 left-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent z-10"></div>
      </div>
    );
  };
  
  return (
    <div className="mt-6">
      {viewType === "page" && renderPageView()}
      {viewType === "juz" && renderJuzView()}
      {viewType === "surah" && renderSurahView()}
      {viewType === "continuous" && renderContinuousView()}
      
      {selectedVerse && (
        <Dialog open={showTafseerDialog} onOpenChange={setShowTafseerDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                تفسير - سورة {selectedVerse.surahName} - الآية {selectedVerse.numberInSurah}
              </DialogTitle>
            </DialogHeader>
            
            <div className="mt-4">
              <div className="p-4 bg-primary-custom/5 rounded-md text-right text-xl font-arabic">
                {selectedVerse.text}
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">التفسير</h3>
                <TafseerView 
                  surahId={surahId}
                  verseNumber={selectedVerse.numberInSurah}
                  verseText={selectedVerse.text}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VerseDisplayEnhanced;