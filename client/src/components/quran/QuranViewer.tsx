import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useSurah, useSetLastRead, useLastRead } from "@/lib/hooks/useQuran";
import SurahHeader from "./SurahHeader";
import VerseDisplay from "./VerseDisplay";
import VerseDisplayEnhanced from "./VerseDisplayEnhanced";
import QuranNavigation from "./QuranNavigation";
import QuranSettingsDialog from "./QuranSettings";
import QuranSearch from "./QuranSearch";
import BookmarksManager from "./BookmarksManager";
import FavoritesManager from "./FavoritesManager";
import CollectionsManager from "./CollectionsManager";
import ReadingTracker from "./ReadingTracker";
import BackButton from "@/components/layout/BackButton";
import { Button } from "@/components/ui/button";
import { ViewType, QuranSettings, ReciterType, ThemeType } from "@/lib/types";
import { 
  Settings, 
  Search, 
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Share,
  Copy,
  ChevronDown,
  Lightbulb,
  Moon,
  Sun,
  Heart,
  Folder
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import QuranMushafView from "./QuranMushafView"; // Added import

const DEFAULT_SETTINGS: QuranSettings = {
  fontSize: 22,
  fontFamily: "Uthmani",
  theme: "light",
  showTranslation: false,
  translationLanguage: "english",
  showTafseer: false,
  tafseerSource: "ibn-kathir",
  reciter: "mishari_rashid_alafasy",
  viewType: "surah"
};

const QuranViewer = () => {
  const params = useParams<{ surahId: string }>();
  const surahId = params?.surahId ? parseInt(params.surahId) : 1;
  const [location, navigate] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const ayahParam = urlParams.get("ayah");

  const [settings, setSettings] = useState<QuranSettings>(() => {
    // Try to load settings from localStorage
    const savedSettings = localStorage.getItem("quran-settings");
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (error) {
        console.error("Error parsing settings:", error);
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const { surah, isLoading, error } = useSurah(surahId);
  const { lastRead } = useLastRead();
  const { setLastRead } = useSetLastRead();
  const [showSettingsPrompt, setShowSettingsPrompt] = useState(false);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("quran-settings", JSON.stringify(settings));

    // Apply theme to body
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-sepia', 'theme-gold');
    document.body.classList.add(`theme-${settings.theme}`);
  }, [settings]);

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

  // Show settings prompt to new users
  useEffect(() => {
    const hasSeenSettingsPrompt = localStorage.getItem("seen-quran-settings-prompt");
    if (!hasSeenSettingsPrompt) {
      setShowSettingsPrompt(true);
      localStorage.setItem("seen-quran-settings-prompt", "true");
    }
  }, []);

  const handleSettingsChange = (newSettings: QuranSettings) => {
    setSettings(newSettings);
  };

  const handleNavigateToLastRead = () => {
    if (lastRead) {
      navigate(`/quran/${lastRead.surahId}?ayah=${lastRead.ayahNumber}`);
    }
  };

  const handleSelectVerseFromSearch = (surahId: number, verseNumber: number) => {
    navigate(`/quran/${surahId}?ayah=${verseNumber}`);
  };

  const getThemeIcon = () => {
    switch (settings.theme) {
      case "light":
        return <Sun size={20} />;
      case "dark":
        return <Moon size={20} />;
      case "sepia":
        return <Lightbulb size={20} />;
      case "gold":
        return <Lightbulb className="text-yellow-500" size={20} />;
      default:
        return <Sun size={20} />;
    }
  };

  const handleThemeChange = (theme: ThemeType) => {
    setSettings(prev => ({ ...prev, theme }));
  };

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
    <div className={`bg-white rounded-lg shadow-lg p-6 theme-${settings.theme}`}>
      {/* زر العودة */}
      <div className="flex justify-start mb-4">
        <BackButton to="/" className="mr-auto" />
      </div>

      {/* Settings Prompt */}
      {showSettingsPrompt && (
        <Alert className="mb-6 border-primary-custom/20 bg-primary-light/30">
          <AlertCircle className="h-4 w-4 text-primary-custom" />
          <AlertTitle>مرحباً بك في مصحف القرآن الكريم</AlertTitle>
          <AlertDescription className="text-sm">
            يمكنك تخصيص إعدادات القراءة من خلال النقر على أيقونة الإعدادات ⚙️ (حجم الخط، نوع الخط، اللغة، السمة، وغيرها)
          </AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2" 
            onClick={() => setShowSettingsPrompt(false)}
          >
            حسناً، فهمت
          </Button>
        </Alert>
      )}

      {/* Quran Viewer Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold">القرآن الكريم</h2>
          <p className="text-gray-600">قراءة وتلاوة القرآن الكريم</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <QuranSettingsDialog settings={settings} onSettingsChange={handleSettingsChange} />

          <QuranSearch onSelectVerse={handleSelectVerseFromSearch} />

          <BookmarksManager 
            currentSurahId={surahId}
            currentVerseNumber={ayahParam ? parseInt(ayahParam) : 1}
            currentVerseText={ayahParam && surah.verses ? 
              surah.verses.find(v => v.numberInSurah === parseInt(ayahParam))?.text : 
              surah.verses?.[0]?.text}
          />

          <FavoritesManager
            currentSurahId={surahId}
            currentSurahName={surah.name}
            currentVerseNumber={ayahParam ? parseInt(ayahParam) : 1}
            currentVerseText={ayahParam && surah.verses ? 
              surah.verses.find(v => v.numberInSurah === parseInt(ayahParam))?.text : 
              surah.verses?.[0]?.text}
          />

          <CollectionsManager />

          <ReadingTracker onNavigateToLastRead={handleNavigateToLastRead} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition">
                {getThemeIcon()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                <Sun className="ml-2 h-4 w-4" />
                <span>فاتح</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                <Moon className="ml-2 h-4 w-4" />
                <span>داكن</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("sepia")}>
                <Lightbulb className="ml-2 h-4 w-4" />
                <span>سيبيا</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("gold")}>
                <Lightbulb className="ml-2 h-4 w-4 text-yellow-500" />
                <span>ذهبي</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Reading View Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <Tabs 
          value={settings.viewType} 
          onValueChange={(value) => setSettings(prev => ({ ...prev, viewType: value as ViewType }))}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full sm:w-auto grid-cols-4">
            <TabsTrigger value="page">صفحة</TabsTrigger>
            <TabsTrigger value="surah">سورة</TabsTrigger>
            <TabsTrigger value="juz">جزء</TabsTrigger>
            <TabsTrigger value="continuous">متواصل</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center">
          <span className="text-gray-600 ml-2">القارئ:</span>
          <Select 
            value={settings.reciter} 
            onValueChange={(value) => setSettings(prev => ({ ...prev, reciter: value as ReciterType }))}
          >
            <SelectTrigger className="border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-48">
              <SelectValue placeholder="اختر القارئ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mishari_rashid_alafasy">مشاري راشد العفاسي</SelectItem>
              <SelectItem value="abdul_basit">عبد الباسط عبد الصمد</SelectItem>
              <SelectItem value="mahmoud_khalil_al-husary">محمود خليل الحصري</SelectItem>
              <SelectItem value="mohamed_siddiq_al-minshawi">محمد صديق المنشاوي</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Surah Header */}
      <SurahHeader surah={surah} reciter={settings.reciter} />

      {/* Quran Content */}
      {settings.viewType === "page" ? (
        <QuranMushafView 
          surahId={surahId}
          viewType={settings.viewType}
          fontSize={settings.fontSize}
          fontFamily={settings.fontFamily}
          showTranslation={settings.showTranslation}
          translationLanguage={settings.translationLanguage}
          showTafseer={settings.showTafseer}
          tafseerSource={settings.tafseerSource}
          reciter={settings.reciter}
        />
      ) : (
        <VerseDisplayEnhanced 
          verses={surah.verses} 
          surahId={surahId}
          viewType={settings.viewType}
          fontSize={settings.fontSize}
          fontFamily={settings.fontFamily}
          showTranslation={settings.showTranslation}
          translationLanguage={settings.translationLanguage}
          showTafseer={settings.showTafseer}
          tafseerSource={settings.tafseerSource}
          reciter={settings.reciter}
        />
      )}

      {/* Surah Navigation */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t">
        <button 
          className={`flex items-center px-4 py-2 ${surahId < 114 ? "text-gray-600 hover:text-primary-custom transition" : "text-gray-400 cursor-not-allowed"}`}
          onClick={() => surahId < 114 && navigate(`/quran/${surahId + 1}`)}
          disabled={surahId >= 114}
        >
          <ArrowRight className="mr-1" size={20} />
          {surahId < 114 ? `${surah.nextSurah || ''}` : ""}
        </button>
        <div className="hidden sm:flex items-center">
          <Button 
            variant="outline"
            className="mx-1"
            onClick={() => navigate("/quran")}
          >
            <BookOpen className="ml-2 h-4 w-4" />
            فهرس السور
          </Button>
        </div>
        <button 
          className={`flex items-center px-4 py-2 ${surahId > 1 ? "text-gray-600 hover:text-primary-custom transition" : "text-gray-400 cursor-not-allowed"}`}
          onClick={() => surahId > 1 && navigate(`/quran/${surahId - 1}`)}
          disabled={surahId <= 1}
        >
          {surahId > 1 ? `${surah.previousSurah || ''}` : ""}
          <ArrowLeft className="mr-1" size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuranViewer;