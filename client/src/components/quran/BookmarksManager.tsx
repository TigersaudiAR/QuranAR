import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark as BookmarkIcon, Search, Trash2, Edit, BookOpen, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookmarks, createBookmark, updateBookmark as updateBookmarkAPI, deleteBookmark as deleteBookmarkAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookmarksManagerProps {
  currentSurahId?: number;
  currentVerseNumber?: number;
  currentVerseText?: string;
  onAddBookmark?: (surahId: number, verseNumber: number) => void;
}

const colors = [
  { value: "blue", label: "أزرق", class: "bg-blue-100 text-blue-800 border-blue-300" },
  { value: "green", label: "أخضر", class: "bg-green-100 text-green-800 border-green-300" },
  { value: "red", label: "أحمر", class: "bg-red-100 text-red-800 border-red-300" },
  { value: "yellow", label: "أصفر", class: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { value: "purple", label: "بنفسجي", class: "bg-purple-100 text-purple-800 border-purple-300" },
  { value: "pink", label: "وردي", class: "bg-pink-100 text-pink-800 border-pink-300" },
  { value: "indigo", label: "نيلي", class: "bg-indigo-100 text-indigo-800 border-indigo-300" },
  { value: "gray", label: "رمادي", class: "bg-gray-100 text-gray-800 border-gray-300" },
];

const getColorClass = (color?: string) => {
  return colors.find(c => c.value === color)?.class || "";
};

const BookmarksManager = ({ currentSurahId, currentVerseNumber, currentVerseText, onAddBookmark }: BookmarksManagerProps) => {
  const [location, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [newBookmarkNotes, setNewBookmarkNotes] = useState("");
  const [newBookmarkColor, setNewBookmarkColor] = useState<string | undefined>(undefined);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch bookmarks
  const { data: bookmarks = [], isLoading, error } = useQuery({
    queryKey: ['/api/bookmarks'],
    queryFn: getBookmarks
  });

  // Create bookmark mutation
  const createBookmarkMutation = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "تم الحفظ",
        description: "تم إضافة الإشارة المرجعية بنجاح",
      });
      setIsAddingBookmark(false);
      setNewBookmarkNotes("");
      setNewBookmarkColor(undefined);
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة الإشارة المرجعية",
        variant: "destructive",
      });
    }
  });

  // Update bookmark mutation
  const updateBookmarkMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Bookmark> }) => 
      updateBookmarkAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "تم التحديث",
        description: "تم تحديث الإشارة المرجعية بنجاح",
      });
      setEditingBookmark(null);
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الإشارة المرجعية",
        variant: "destructive",
      });
    }
  });

  // Delete bookmark mutation
  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmarkAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "تم الحذف",
        description: "تم حذف الإشارة المرجعية بنجاح",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الإشارة المرجعية",
        variant: "destructive",
      });
    }
  });

  const handleAddBookmark = () => {
    if (currentSurahId && currentVerseNumber) {
      setIsAddingBookmark(true);
    }
  };

  const saveNewBookmark = () => {
    if (currentSurahId && currentVerseNumber && currentVerseText) {
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
      
      const newBookmark = {
        surahId: currentSurahId,
        surahName,
        ayahNumber: currentVerseNumber,
        ayahText: currentVerseText,
        timestamp: Date.now(),
        notes: newBookmarkNotes,
        color: newBookmarkColor
      };
      
      createBookmarkMutation.mutate(newBookmark);
    }
  };

  const handleDeleteBookmark = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الإشارة المرجعية؟")) {
      deleteBookmarkMutation.mutate(id);
    }
  };

  const handleUpdateBookmark = (bookmark: Bookmark) => {
    updateBookmarkMutation.mutate({
      id: bookmark.id,
      data: {
        notes: bookmark.notes,
        color: bookmark.color
      }
    });
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
              <Button 
                onClick={handleAddBookmark} 
                size="sm" 
                className="bg-primary-custom hover:bg-primary-custom/90"
              >
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
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary-custom" />
            <span className="text-lg">جاري التحميل...</span>
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-red-500">حدث خطأ أثناء تحميل الإشارات المرجعية</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="py-8 text-center">
            <BookmarkIcon className="mx-auto mb-2 text-gray-400" size={48} />
            <p className="text-gray-500">لا توجد إشارات مرجعية حتى الآن</p>
            <p className="text-gray-500 text-sm">أضف إشارات مرجعية للآيات لتتمكن من الوصول إليها بسرعة</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {filteredBookmarks.map((bookmark) => (
                <Card key={bookmark.id} className={`relative ${bookmark.color ? `border-l-4 border-l-${bookmark.color}-500` : ''}`}>
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
                          onClick={() => handleDeleteBookmark(bookmark.id)}
                          className="h-8 w-8 text-gray-500 hover:text-red-500"
                          disabled={deleteBookmarkMutation.isPending}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 flex items-center justify-between">
                      <span>{new Date(bookmark.timestamp).toLocaleDateString('ar-SA')}</span>
                      {bookmark.color && (
                        <Badge variant="outline" className={getColorClass(bookmark.color)}>
                          {colors.find(c => c.value === bookmark.color)?.label || bookmark.color}
                        </Badge>
                      )}
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
                  <Label className="mb-2 block">اللون (اختياري)</Label>
                  <Select
                    value={newBookmarkColor}
                    onValueChange={setNewBookmarkColor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر لوناً (اختياري)" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-2 ${color.value === 'gray' ? 'bg-gray-400' : `bg-${color.value}-500`}`}></div>
                            <span>{color.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2 block">ملاحظات (اختياري)</Label>
                  <Textarea 
                    placeholder="أضف ملاحظاتك حول هذه الآية..."
                    value={newBookmarkNotes}
                    onChange={(e) => setNewBookmarkNotes(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingBookmark(false)}
                    disabled={createBookmarkMutation.isPending}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={saveNewBookmark}
                    className="bg-primary-custom hover:bg-primary-custom/90"
                    disabled={createBookmarkMutation.isPending}
                  >
                    {createBookmarkMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : "حفظ"}
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
                  <Label className="mb-2 block">اللون (اختياري)</Label>
                  <Select
                    value={editingBookmark.color}
                    onValueChange={(value) => setEditingBookmark({...editingBookmark, color: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر لوناً (اختياري)" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-2 ${color.value === 'gray' ? 'bg-gray-400' : `bg-${color.value}-500`}`}></div>
                            <span>{color.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2 block">ملاحظات</Label>
                  <Textarea 
                    placeholder="أضف ملاحظاتك حول هذه الآية..."
                    value={editingBookmark.notes || ""}
                    onChange={(e) => setEditingBookmark({...editingBookmark, notes: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingBookmark(null)}
                    disabled={updateBookmarkMutation.isPending}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={() => handleUpdateBookmark(editingBookmark)}
                    className="bg-primary-custom hover:bg-primary-custom/90"
                    disabled={updateBookmarkMutation.isPending}
                  >
                    {updateBookmarkMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : "حفظ التغييرات"}
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