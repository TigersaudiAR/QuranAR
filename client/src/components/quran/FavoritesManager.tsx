import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Search, Trash2, BookOpen, Loader2, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoriteVerse, Favorite } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getFavoriteSurahs, 
  getFavoriteVerses, 
  addFavoriteSurah, 
  addFavoriteVerse, 
  removeFavoriteSurah, 
  removeFavoriteVerse 
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FavoritesManagerProps {
  currentSurahId?: number;
  currentSurahName?: string;
  currentVerseNumber?: number;
  currentVerseText?: string;
}

const categories = [
  { value: "general", label: "عام", class: "bg-slate-100 text-slate-800 border-slate-300" },
  { value: "spiritual", label: "روحاني", class: "bg-purple-100 text-purple-800 border-purple-300" },
  { value: "guidance", label: "هداية", class: "bg-green-100 text-green-800 border-green-300" },
  { value: "remember", label: "للحفظ", class: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { value: "stories", label: "قصص", class: "bg-blue-100 text-blue-800 border-blue-300" },
  { value: "laws", label: "أحكام", class: "bg-red-100 text-red-800 border-red-300" },
];

const getCategoryClass = (category?: string) => {
  return categories.find(c => c.value === category)?.class || categories[0].class;
};

const getCategoryLabel = (category?: string) => {
  return categories.find(c => c.value === category)?.label || categories[0].label;
};

export default function FavoritesManager({ 
  currentSurahId, 
  currentSurahName, 
  currentVerseNumber, 
  currentVerseText 
}: FavoritesManagerProps) {
  const [location, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("verses");
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch favorite surahs
  const { 
    data: favoriteSurahs = [], 
    isLoading: isLoadingSurahs 
  } = useQuery({
    queryKey: ['/api/favorites/surahs'],
    queryFn: getFavoriteSurahs
  });

  // Fetch favorite verses
  const { 
    data: favoriteVerses = [], 
    isLoading: isLoadingVerses 
  } = useQuery({
    queryKey: ['/api/favorites/verses'],
    queryFn: getFavoriteVerses
  });

  // Add surah to favorites mutation
  const addFavoriteSurahMutation = useMutation({
    mutationFn: addFavoriteSurah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites/surahs'] });
      toast({
        title: "تم الإضافة",
        description: "تمت إضافة السورة إلى المفضلة",
      });
      setIsAddingToFavorites(false);
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة السورة للمفضلة",
        variant: "destructive",
      });
    }
  });

  // Add verse to favorites mutation
  const addFavoriteVerseMutation = useMutation({
    mutationFn: addFavoriteVerse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites/verses'] });
      toast({
        title: "تم الإضافة",
        description: "تمت إضافة الآية إلى المفضلة",
      });
      setIsAddingToFavorites(false);
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة الآية للمفضلة",
        variant: "destructive",
      });
    }
  });

  // Remove surah from favorites mutation
  const removeFavoriteSurahMutation = useMutation({
    mutationFn: removeFavoriteSurah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites/surahs'] });
      toast({
        title: "تم الحذف",
        description: "تم حذف السورة من المفضلة",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف السورة من المفضلة",
        variant: "destructive",
      });
    }
  });

  // Remove verse from favorites mutation
  const removeFavoriteVerseMutation = useMutation({
    mutationFn: removeFavoriteVerse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites/verses'] });
      toast({
        title: "تم الحذف",
        description: "تم حذف الآية من المفضلة",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الآية من المفضلة",
        variant: "destructive",
      });
    }
  });

  const handleOpenDialog = () => {
    // أختار التبويب المناسب بناءً على السياق الحالي
    if (currentVerseNumber && currentVerseText) {
      setActiveTab("verses");
    } else if (currentSurahId && currentSurahName) {
      setActiveTab("surahs");
    }
  };

  const handleAddToFavorites = () => {
    if (activeTab === "verses" && currentSurahId && currentVerseNumber && currentVerseText && currentSurahName) {
      // إضافة آية للمفضلة
      const newFavoriteVerse: Omit<FavoriteVerse, 'id'> = {
        surahId: currentSurahId,
        surahName: currentSurahName,
        ayahNumber: currentVerseNumber,
        ayahText: currentVerseText,
        timestamp: Date.now(),
        category: selectedCategory
      };
      
      addFavoriteVerseMutation.mutate(newFavoriteVerse);
    } else if (activeTab === "surahs" && currentSurahId && currentSurahName) {
      // إضافة سورة للمفضلة
      const newFavoriteSurah: Omit<Favorite, 'id'> = {
        surahId: currentSurahId,
        surahName: currentSurahName,
        timestamp: Date.now(),
        category: selectedCategory
      };
      
      addFavoriteSurahMutation.mutate(newFavoriteSurah);
    }
  };

  const handleRemoveSurah = (surahId: number) => {
    if (confirm("هل أنت متأكد من حذف هذه السورة من المفضلة؟")) {
      removeFavoriteSurahMutation.mutate(surahId);
    }
  };

  const handleRemoveVerse = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الآية من المفضلة؟")) {
      removeFavoriteVerseMutation.mutate(id);
    }
  };

  const navigateToSurah = (surahId: number) => {
    navigate(`/quran/${surahId}`);
  };

  const navigateToVerse = (surahId: number, verseNumber: number) => {
    navigate(`/quran/${surahId}?ayah=${verseNumber}`);
  };

  const filteredSurahs = searchTerm
    ? favoriteSurahs.filter(surah => 
        surah.surahName.includes(searchTerm) ||
        (surah.category && getCategoryLabel(surah.category).includes(searchTerm))
      )
    : favoriteSurahs;

  const filteredVerses = searchTerm
    ? favoriteVerses.filter(verse => 
        verse.surahName.includes(searchTerm) ||
        verse.ayahText.includes(searchTerm) ||
        (verse.category && getCategoryLabel(verse.category).includes(searchTerm))
      )
    : favoriteVerses;

  const isCurrentSurahFavorite = favoriteSurahs.some(s => s.surahId === currentSurahId);
  const isCurrentVerseFavorite = favoriteVerses.some(v => 
    v.surahId === currentSurahId && v.ayahNumber === currentVerseNumber
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="p-2 text-gray-600 hover:text-red-500 rounded-full bg-gray-100 hover:bg-red-50 transition"
          onClick={handleOpenDialog}
        >
          <Heart size={20} className={
            (currentSurahId && currentVerseNumber && isCurrentVerseFavorite) || 
            (currentSurahId && !currentVerseNumber && isCurrentSurahFavorite) 
              ? "fill-red-500 text-red-500" 
              : ""
          } />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>المفضلة</span>
            
            {((activeTab === "verses" && currentSurahId && currentVerseNumber && currentVerseText && !isCurrentVerseFavorite) ||
               (activeTab === "surahs" && currentSurahId && currentSurahName && !isCurrentSurahFavorite)) && (
              <Button 
                onClick={() => setIsAddingToFavorites(true)} 
                size="sm" 
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Heart size={16} className="ml-1" />
                إضافة للمفضلة
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 space-x-reverse mb-4">
          <Search className="text-gray-400" size={20} />
          <Input 
            placeholder="البحث في المفضلة..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
        
        <Tabs 
          defaultValue={activeTab}
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="mx-auto mb-4">
            <TabsTrigger value="verses" className="px-6">الآيات</TabsTrigger>
            <TabsTrigger value="surahs" className="px-6">السور</TabsTrigger>
          </TabsList>
          
          <TabsContent value="verses" className="flex-1 overflow-hidden flex flex-col">
            {isLoadingVerses ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary-custom" />
                <span className="text-lg">جاري التحميل...</span>
              </div>
            ) : favoriteVerses.length === 0 ? (
              <div className="py-8 text-center">
                <Heart className="mx-auto mb-2 text-gray-400" size={48} />
                <p className="text-gray-500">لا توجد آيات مفضلة</p>
                <p className="text-gray-500 text-sm">أضف آيات للمفضلة لتتمكن من الوصول إليها بسرعة</p>
              </div>
            ) : (
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {filteredVerses.map((verse) => (
                    <Card key={verse.id} className="relative">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold flex items-center justify-between">
                          <span>{verse.surahName} - الآية {verse.ayahNumber}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveVerse(verse.id)}
                            className="h-8 w-8 text-gray-500 hover:text-red-500"
                            disabled={removeFavoriteVerseMutation.isPending}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500 flex items-center justify-between">
                          <span>{new Date(verse.timestamp).toLocaleDateString('ar-SA')}</span>
                          {verse.category && (
                            <Badge variant="outline" className={getCategoryClass(verse.category)}>
                              {getCategoryLabel(verse.category)}
                            </Badge>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-right font-arabic text-lg">{verse.ayahText}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigateToVerse(verse.surahId, verse.ayahNumber)}
                          className="w-full"
                        >
                          <BookOpen className="ml-2 h-4 w-4" />
                          الذهاب إلى الآية
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
          
          <TabsContent value="surahs" className="flex-1 overflow-hidden flex flex-col">
            {isLoadingSurahs ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary-custom" />
                <span className="text-lg">جاري التحميل...</span>
              </div>
            ) : favoriteSurahs.length === 0 ? (
              <div className="py-8 text-center">
                <Heart className="mx-auto mb-2 text-gray-400" size={48} />
                <p className="text-gray-500">لا توجد سور مفضلة</p>
                <p className="text-gray-500 text-sm">أضف سور للمفضلة لتتمكن من الوصول إليها بسرعة</p>
              </div>
            ) : (
              <ScrollArea className="flex-1 pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSurahs.map((surah) => (
                    <Card key={surah.id} className="relative hover:shadow-md transition">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold flex items-center justify-between">
                          <span>{surah.surahName}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveSurah(surah.surahId)}
                            className="h-8 w-8 text-gray-500 hover:text-red-500"
                            disabled={removeFavoriteSurahMutation.isPending}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </CardTitle>
                        {surah.category && (
                          <CardDescription className="text-sm text-right">
                            <Badge variant="outline" className={getCategoryClass(surah.category)}>
                              {getCategoryLabel(surah.category)}
                            </Badge>
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigateToSurah(surah.surahId)}
                          className="w-full"
                        >
                          <BookOpen className="ml-2 h-4 w-4" />
                          قراءة السورة
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
        
        {isAddingToFavorites && (
          <Dialog open={isAddingToFavorites} onOpenChange={setIsAddingToFavorites}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {activeTab === "verses" ? "إضافة آية للمفضلة" : "إضافة سورة للمفضلة"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">التصنيف (اختياري)</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر تصنيفاً" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${category.class.replace('bg-', 'bg-')}`}></div>
                            <span>{category.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingToFavorites(false)}
                    disabled={addFavoriteVerseMutation.isPending || addFavoriteSurahMutation.isPending}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={handleAddToFavorites}
                    className="bg-red-500 hover:bg-red-600 text-white"
                    disabled={addFavoriteVerseMutation.isPending || addFavoriteSurahMutation.isPending}
                  >
                    {(addFavoriteVerseMutation.isPending || addFavoriteSurahMutation.isPending) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Heart size={16} className="ml-1" />
                        إضافة للمفضلة
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        
      </DialogContent>
    </Dialog>
  );
}