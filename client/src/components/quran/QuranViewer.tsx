import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useSurah, useSetLastRead } from "@/lib/hooks/useQuran";
import SurahHeader from "./SurahHeader";
import VerseDisplay from "./VerseDisplay";
import QuranNavigation from "./QuranNavigation";
import { Button } from "@/components/ui/button";
import { ViewType } from "@/lib/types";
import { 
  Settings, 
  Search, 
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Share,
  Copy
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const QuranViewer = () => {
  const params = useParams<{ surahId: string }>();
  const surahId = params?.surahId ? parseInt(params.surahId) : 1;
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const ayahParam = urlParams.get("ayah");
  
  const [viewType, setViewType] = useState<ViewType>("page");
  const [reciter, setReciter] = useState("mishari_rashid_alafasy");
  const { surah, isLoading, error } = useSurah(surahId);
  const { setLastRead } = useSetLastRead();

  useEffect(() => {
    if (surah && !isLoading) {
      // If an ayah parameter is provided, scroll to that ayah
      if (ayahParam) {
        const ayahNumber = parseInt(ayahParam);
        const ayahElement = document.getElementById(`ayah-${ayahNumber}`);
        if (ayahElement) {
          ayahElement.scrollIntoView({ behavior: "smooth" });
        }
      }
      
      // Set the last read position
      setLastRead({
        surahId,
        surahName: surah.name,
        ayahNumber: ayahParam ? parseInt(ayahParam) : 1,
        ayahText: ayahParam && surah.verses ? 
          surah.verses.find(v => v.number === parseInt(ayahParam))?.text : 
          surah.verses?.[0]?.text
      });
    }
  }, [surah, isLoading, surahId, ayahParam, setLastRead]);

  if (isLoading) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-20 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-4">حدث خطأ</h2>
        <p className="text-gray-600">
          لم نتمكن من تحميل السورة. يرجى المحاولة مرة أخرى.
        </p>
        <Button className="mt-4 bg-primary-custom hover:bg-primary-custom/90" onClick={() => window.location.reload()}>
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Quran Viewer Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold">القرآن الكريم</h2>
          <p className="text-gray-600">قراءة وتلاوة القرآن الكريم</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition">
            <Search size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition">
            <BookOpen size={20} />
          </button>
        </div>
      </div>

      {/* Reading View Selector */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="text-primary-custom font-semibold">طريقة العرض:</div>
          <Button 
            className={viewType === "page" ? "bg-primary-custom text-white" : "bg-gray-100 text-gray-600 hover:text-primary-custom"}
            onClick={() => setViewType("page")}
          >
            صفحة
          </Button>
          <Button 
            className={viewType === "surah" ? "bg-primary-custom text-white" : "bg-gray-100 text-gray-600 hover:text-primary-custom"}
            onClick={() => setViewType("surah")}
          >
            سورة
          </Button>
          <Button 
            className={viewType === "juz" ? "bg-primary-custom text-white" : "bg-gray-100 text-gray-600 hover:text-primary-custom"}
            onClick={() => setViewType("juz")}
          >
            جزء
          </Button>
        </div>
        
        <div className="flex items-center">
          <span className="text-gray-600 ml-2">القارئ:</span>
          <Select value={reciter} onValueChange={setReciter}>
            <SelectTrigger className="border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-48">
              <SelectValue placeholder="اختر القارئ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mishari_rashid_alafasy">مشاري راشد العفاسي</SelectItem>
              <SelectItem value="abdul_basit_abdus_samad">عبد الباسط عبد الصمد</SelectItem>
              <SelectItem value="maher_al_muaiqly">ماهر المعيقلي</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Surah Header */}
      <SurahHeader surah={surah} reciter={reciter} />

      {/* Quran Content */}
      <VerseDisplay verses={surah.verses} surahId={surahId} />

      {/* Surah Navigation */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t">
        <button 
          className={`flex items-center px-4 py-2 ${surahId < 114 ? "text-gray-600 hover:text-primary-custom transition" : "text-gray-400 cursor-not-allowed"}`}
          onClick={() => surahId < 114 && window.location.assign(`/quran/${surahId + 1}`)}
          disabled={surahId >= 114}
        >
          <ArrowRight className="mr-1" size={20} />
          {surahId < 114 ? `سورة ${surah.nextSurah}` : ""}
        </button>
        <div className="flex items-center">
          <button className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition mx-1">
            <Bookmark size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition mx-1">
            <Share size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition mx-1">
            <Copy size={20} />
          </button>
        </div>
        <button 
          className={`flex items-center px-4 py-2 ${surahId > 1 ? "text-gray-600 hover:text-primary-custom transition" : "text-gray-400 cursor-not-allowed"}`}
          onClick={() => surahId > 1 && window.location.assign(`/quran/${surahId - 1}`)}
          disabled={surahId <= 1}
        >
          {surahId > 1 ? `سورة ${surah.previousSurah}` : ""}
          <ArrowLeft className="mr-1" size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuranViewer;
