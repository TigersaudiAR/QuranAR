import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark as BookmarkIcon, Search, Trash2, Edit, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark } from "@/lib/types";

interface BookmarksManagerProps {
  currentSurahId?: number;
  currentVerseNumber?: number;
  onAddBookmark?: (surahId: number, verseNumber: number) => void;
}

const BookmarksManager = ({ currentSurahId, currentVerseNumber, onAddBookmark }: BookmarksManagerProps) => {
  const [location, navigate] = useLocation();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [newBookmarkNotes, setNewBookmarkNotes] = useState("");
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  useEffect(() => {
    // Load bookmarks from localStorage on component mount
    const savedBookmarks = localStorage.getItem("quran-bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Error parsing bookmarks:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save bookmarks to localStorage when they change
    localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleAddBookmark = () => {
    if (currentSurahId && currentVerseNumber) {
      setIsAddingBookmark(true);
    }
  };

  const saveNewBookmark = (ayahText: string) => {
    if (currentSurahId && currentVerseNumber) {
      // Get the surah name based on surahId (simplified version)
      const surahNames = [
        "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
        "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
        "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
        "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
        "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
        "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
        "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
        "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
        "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
        "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
        "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
        "المسد", "الإخلاص", "الفلق", "الناس"
      ];
      const surahName = surahNames[currentSurahId - 1] || `سورة ${currentSurahId}`;
      
      const newBookmark: Bookmark = {
        id: `bookmark_${Date.now()}`,
        surahId: currentSurahId,
        surahName,
        ayahNumber: currentVerseNumber,
        ayahText,
        timestamp: Date.now(),
        notes: newBookmarkNotes
      };
      
      setBookmarks(prev => [...prev, newBookmark]);
      setNewBookmarkNotes("");
      setIsAddingBookmark(false);
    }
  };

  const deleteBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const updateBookmark = (updatedBookmark: Bookmark) => {
    setBookmarks(prev => prev.map(b => b.id === updatedBookmark.id ? updatedBookmark : b));
    setEditingBookmark(null);
  };

  const navigateToBookmark = (bookmark: Bookmark) => {
    navigate(`/quran/${bookmark.surahId}?ayah=${bookmark.ayahNumber}`);
  };

  const filteredBookmarks = searchTerm 
    ? bookmarks.filter(b => 
        b.surahName.includes(searchTerm) || 
        b.ayahText.includes(searchTerm) ||
        (b.notes && b.notes.includes(searchTerm))
      )
    : bookmarks;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition">
          <BookmarkIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>الإشارات المرجعية</span>
            {currentSurahId && currentVerseNumber && (
              <Button onClick={handleAddBookmark} size="sm" className="bg-primary-custom hover:bg-primary-custom/90">
                إضافة إشارة جديدة
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 space-x-reverse mb-4">
          <Search className="text-gray-400" size={20} />
          <Input 
            placeholder="البحث في الإشارات المرجعية..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
        
        {bookmarks.length === 0 ? (
          <div className="py-8 text-center">
            <BookmarkIcon className="mx-auto mb-2 text-gray-400" size={48} />
            <p className="text-gray-500">لا توجد إشارات مرجعية حتى الآن</p>
            <p className="text-gray-500 text-sm">أضف إشارات مرجعية للآيات لتتمكن من الوصول إليها بسرعة</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {filteredBookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="relative">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center justify-between">
                      <span>{bookmark.surahName} - الآية {bookmark.ayahNumber}</span>
                      <div className="flex space-x-1 space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setEditingBookmark(bookmark)}
                          className="h-8 w-8 text-gray-500 hover:text-primary-custom"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteBookmark(bookmark.id)}
                          className="h-8 w-8 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {new Date(bookmark.timestamp).toLocaleDateString('ar-SA')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-right font-arabic text-lg">{bookmark.ayahText}</p>
                    {bookmark.notes && (
                      <div className="mt-2 text-sm bg-gray-50 p-2 rounded-md">
                        <p className="text-gray-600">{bookmark.notes}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigateToBookmark(bookmark)}
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
        
        {isAddingBookmark && (
          <Dialog open={isAddingBookmark} onOpenChange={setIsAddingBookmark}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة إشارة مرجعية جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>ملاحظات (اختياري)</Label>
                  <Textarea 
                    placeholder="أضف ملاحظاتك حول هذه الآية..."
                    value={newBookmarkNotes}
                    onChange={(e) => setNewBookmarkNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingBookmark(false)}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={() => saveNewBookmark("نص الآية هنا")} // في التطبيق الكامل سيتم استخدام النص الفعلي للآية
                    className="bg-primary-custom hover:bg-primary-custom/90"
                  >
                    حفظ
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        
        {editingBookmark && (
          <Dialog open={!!editingBookmark} onOpenChange={(open) => !open && setEditingBookmark(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>تعديل إشارة مرجعية</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>ملاحظات</Label>
                  <Textarea 
                    placeholder="أضف ملاحظاتك حول هذه الآية..."
                    value={editingBookmark.notes || ""}
                    onChange={(e) => setEditingBookmark({...editingBookmark, notes: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingBookmark(null)}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={() => updateBookmark(editingBookmark)}
                    className="bg-primary-custom hover:bg-primary-custom/90"
                  >
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookmarksManager;