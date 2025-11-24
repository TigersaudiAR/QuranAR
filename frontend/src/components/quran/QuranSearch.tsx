import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, X, Loader2, BookOpen } from "lucide-react";
import { Surah, Verse } from "@/lib/types";
import { fetchSurahs } from "@/lib/api";

interface QuranSearchProps {
  onSelectVerse?: (surahId: number, verseNumber: number) => void;
}

interface SearchResult {
  surahId: number;
  surahName: string;
  verseNumber: number;
  text: string;
  score: number;
}

const QuranSearch = ({ onSelectVerse }: QuranSearchProps) => {
  const [location, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState<"text" | "surah">("text");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("search");

  // Load the search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("quran-search-history");
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error parsing search history:", error);
      }
    }
  }, []);

  // Save search history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("quran-search-history", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Fetch surahs for the surah index
  useEffect(() => {
    if (activeTab === "surahs") {
      const loadSurahs = async () => {
        setIsLoading(true);
        try {
          const surahsData = await fetchSurahs();
          setSurahs(surahsData);
        } catch (error) {
          console.error("Error fetching surahs:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadSurahs();
    }
  }, [activeTab]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Normally we would call an API here to get real search results
      // For demo purposes, we'll generate some mock results
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Store the search term in search history (if not already there)
      if (!searchHistory.includes(searchTerm)) {
        const newHistory = [searchTerm, ...searchHistory.slice(0, 9)]; // Keep only the 10 most recent searches
        setSearchHistory(newHistory);
      }
      
      const mockResults: SearchResult[] = [
        {
          surahId: 2,
          surahName: "البقرة",
          verseNumber: 255,
          text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ",
          score: 0.95
        },
        {
          surahId: 112,
          surahName: "الإخلاص",
          verseNumber: 1,
          text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
          score: 0.9
        },
        {
          surahId: 1,
          surahName: "الفاتحة",
          verseNumber: 2,
          text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
          score: 0.85
        },
      ];
      
      setResults(mockResults);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  const selectResult = (result: SearchResult) => {
    if (onSelectVerse) {
      onSelectVerse(result.surahId, result.verseNumber);
    } else {
      navigate(`/quran/${result.surahId}?ayah=${result.verseNumber}`);
    }
  };

  const navigateToSurah = (surahId: number) => {
    navigate(`/quran/${surahId}`);
  };

  const navigateToHistoryItem = (searchItem: string) => {
    setSearchTerm(searchItem);
    // We don't auto-submit to give users a chance to modify
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term.trim()) return text;
    
    try {
      const regex = new RegExp(`(${term})`, 'gi');
      return text.replace(regex, '<mark class="bg-yellow-200 text-black">$1</mark>');
    } catch (e) {
      // In case term has regex special characters
      return text;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition">
          <SearchIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">البحث في القرآن الكريم</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="search">بحث في النص</TabsTrigger>
            <TabsTrigger value="surahs">فهرس السور</TabsTrigger>
            <TabsTrigger value="history">سجل البحث</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input 
                  placeholder="ابحث في القرآن الكريم..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="pr-10"
                />
                {searchTerm && (
                  <button 
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={clearSearch}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isLoading || !searchTerm.trim()}
                className="bg-primary-custom hover:bg-primary-custom/90"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
                <span className="mr-2">بحث</span>
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary-custom" />
                  <p className="text-gray-500">جاري البحث...</p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <ScrollArea className="flex-1 h-[50vh]">
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div 
                      key={`${result.surahId}-${result.verseNumber}-${index}`}
                      className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => selectResult(result)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-primary-custom">
                          {result.surahName} - الآية {result.verseNumber}
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectResult(result);
                          }}
                        >
                          <BookOpen size={16} />
                        </Button>
                      </div>
                      <p 
                        className="text-right font-arabic text-lg"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightSearchTerm(result.text, searchTerm) 
                        }}
                      ></p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : searchTerm.trim() ? (
              <div className="py-10 text-center">
                <p className="text-gray-500">لا توجد نتائج للبحث</p>
                <p className="text-gray-500 text-sm">حاول استخدام كلمات بحث مختلفة</p>
              </div>
            ) : (
              <div className="py-10 text-center">
                <SearchIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-gray-500">اكتب كلمة بحث للعثور على آيات القرآن الكريم</p>
                <p className="text-gray-500 text-sm mt-2">يمكنك البحث بالكلمات أو النص بشكل كامل</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="surahs">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary-custom" />
                  <p className="text-gray-500">جاري تحميل السور...</p>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {surahs.map((surah) => (
                    <div 
                      key={surah.id}
                      className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex items-center justify-between"
                      onClick={() => navigateToSurah(surah.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-custom/10 flex items-center justify-center text-primary-custom font-semibold ml-3">
                          {surah.id}
                        </div>
                        <div>
                          <h3 className="font-semibold">{surah.name}</h3>
                          <p className="text-xs text-gray-500">{surah.versesCount} آية</p>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {surah.revelationType === 'meccan' ? 'مكية' : 'مدنية'}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {searchHistory.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">عمليات البحث السابقة</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearHistory}
                  >
                    مسح السجل
                  </Button>
                </div>
                <ScrollArea className="h-[50vh]">
                  <div className="space-y-2">
                    {searchHistory.map((item, index) => (
                      <div 
                        key={index}
                        className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex items-center justify-between"
                        onClick={() => navigateToHistoryItem(item)}
                      >
                        <div className="flex items-center">
                          <SearchIcon className="h-4 w-4 text-gray-400 ml-2" />
                          <span>{item}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-gray-400 hover:text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchHistory(prev => prev.filter((_, i) => i !== index));
                          }}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-gray-500">لا توجد عمليات بحث سابقة</p>
                <p className="text-gray-500 text-sm">ستظهر هنا عمليات البحث التي قمت بها</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuranSearch;