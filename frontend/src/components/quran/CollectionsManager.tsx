import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Folder, 
  Search, 
  Trash2, 
  Edit, 
  BookOpen, 
  Loader2, 
  PlusCircle, 
  Bookmark, 
  Heart, 
  FolderPlus 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collection, CollectionItem, Bookmark as BookmarkType, FavoriteVerse } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getCollections, 
  getCollectionById, 
  createCollection, 
  updateCollection, 
  deleteCollection, 
  addItemToCollection, 
  removeItemFromCollection,
  getBookmarks,
  getFavoriteVerses,
  getBookmarkById,
  getFavoriteVerses as getFavoriteVersesApi
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CollectionsManagerProps {
  currentBookmarkId?: string;
  currentFavoriteVerseId?: string;
}

const icons = [
  { value: "folder", label: "مجلد", icon: <Folder size={16} /> },
  { value: "bookmark", label: "إشارة", icon: <Bookmark size={16} /> },
  { value: "heart", label: "قلب", icon: <Heart size={16} /> },
  { value: "book", label: "كتاب", icon: <BookOpen size={16} /> },
];

const colors = [
  { value: "blue", label: "أزرق", class: "bg-blue-100 text-blue-800 border-blue-300" },
  { value: "green", label: "أخضر", class: "bg-green-100 text-green-800 border-green-300" },
  { value: "red", label: "أحمر", class: "bg-red-100 text-red-800 border-red-300" },
  { value: "yellow", label: "أصفر", class: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { value: "purple", label: "بنفسجي", class: "bg-purple-100 text-purple-800 border-purple-300" },
  { value: "indigo", label: "نيلي", class: "bg-indigo-100 text-indigo-800 border-indigo-300" },
  { value: "gray", label: "رمادي", class: "bg-gray-100 text-gray-800 border-gray-300" },
];

const getColorClass = (color?: string) => {
  return colors.find(c => c.value === color)?.class || "";
};

const getIconComponent = (iconName?: string) => {
  const icon = icons.find(i => i.value === iconName);
  return icon ? icon.icon : <Folder size={16} />;
};

export default function CollectionsManager({ 
  currentBookmarkId,
  currentFavoriteVerseId
}: CollectionsManagerProps) {
  const [location, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [isAddingToCollection, setIsAddingToCollection] = useState(false);
  const [isViewingCollection, setIsViewingCollection] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [newCollection, setNewCollection] = useState<{
    name: string;
    description: string;
    icon?: string;
    color?: string;
  }>({
    name: "",
    description: "",
    icon: "folder",
    color: "blue"
  });
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch collections
  const { 
    data: collections = [], 
    isLoading: isLoadingCollections 
  } = useQuery({
    queryKey: ['/api/collections'],
    queryFn: getCollections
  });

  // Fetch collection items when viewing a collection
  const { 
    data: selectedCollection,
    isLoading: isLoadingCollection
  } = useQuery({
    queryKey: ['/api/collections', selectedCollectionId],
    queryFn: () => getCollectionById(selectedCollectionId!),
    enabled: !!selectedCollectionId && isViewingCollection
  });

  // Fetch bookmarks and favorite verses for selection
  const { data: bookmarks = [] } = useQuery({
    queryKey: ['/api/bookmarks'],
    queryFn: getBookmarks,
    enabled: isAddingToCollection
  });

  const { data: favoriteVerses = [] } = useQuery({
    queryKey: ['/api/favorites/verses'],
    queryFn: getFavoriteVersesApi,
    enabled: isAddingToCollection
  });

  // Create collection mutation
  const createCollectionMutation = useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
      toast({
        title: "تم الإنشاء",
        description: "تم إنشاء المجموعة بنجاح",
      });
      setIsCreatingCollection(false);
      setNewCollection({
        name: "",
        description: "",
        icon: "folder",
        color: "blue"
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء المجموعة",
        variant: "destructive",
      });
    }
  });

  // Update collection mutation
  const updateCollectionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Collection> }) => 
      updateCollection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
      toast({
        title: "تم التحديث",
        description: "تم تحديث المجموعة بنجاح",
      });
      setEditingCollection(null);
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث المجموعة",
        variant: "destructive",
      });
    }
  });

  // Delete collection mutation
  const deleteCollectionMutation = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
      toast({
        title: "تم الحذف",
        description: "تم حذف المجموعة بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المجموعة",
        variant: "destructive",
      });
    }
  });

  // Add item to collection mutation
  const addItemMutation = useMutation({
    mutationFn: ({ collectionId, item }: { 
      collectionId: number; 
      item: Omit<CollectionItem, 'id' | 'collectionId'> 
    }) => addItemToCollection(collectionId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
      if (selectedCollectionId) {
        queryClient.invalidateQueries({ queryKey: ['/api/collections', selectedCollectionId] });
      }
      toast({
        title: "تمت الإضافة",
        description: "تمت إضافة العنصر للمجموعة بنجاح",
      });
      setIsAddingToCollection(false);
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة العنصر للمجموعة",
        variant: "destructive",
      });
    }
  });

  // Remove item from collection mutation
  const removeItemMutation = useMutation({
    mutationFn: removeItemFromCollection,
    onSuccess: () => {
      if (selectedCollectionId) {
        queryClient.invalidateQueries({ queryKey: ['/api/collections', selectedCollectionId] });
      }
      toast({
        title: "تم الحذف",
        description: "تم حذف العنصر من المجموعة بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف العنصر من المجموعة",
        variant: "destructive",
      });
    }
  });

  const handleCreateCollection = () => {
    if (!newCollection.name.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم للمجموعة",
        variant: "destructive",
      });
      return;
    }

    createCollectionMutation.mutate({
      name: newCollection.name,
      description: newCollection.description,
      icon: newCollection.icon,
      color: newCollection.color,
      timestamp: Date.now()
    });
  };

  const handleUpdateCollection = () => {
    if (!editingCollection || !editingCollection.id) return;
    
    if (!editingCollection.name.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم للمجموعة",
        variant: "destructive",
      });
      return;
    }

    updateCollectionMutation.mutate({
      id: editingCollection.id,
      data: {
        name: editingCollection.name,
        description: editingCollection.description,
        icon: editingCollection.icon,
        color: editingCollection.color
      }
    });
  };

  const handleDeleteCollection = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه المجموعة؟ سيتم حذف جميع العناصر المرتبطة بها.")) {
      deleteCollectionMutation.mutate(id);
    }
  };

  const handleViewCollection = (collection: Collection) => {
    setSelectedCollectionId(collection.id!);
    setIsViewingCollection(true);
  };

  const handleAddCurrentItemToCollection = (collectionId: number) => {
    if (currentBookmarkId) {
      addItemMutation.mutate({
        collectionId,
        item: {
          itemType: 'bookmark',
          itemId: currentBookmarkId,
          timestamp: Date.now()
        }
      });
    } else if (currentFavoriteVerseId) {
      addItemMutation.mutate({
        collectionId,
        item: {
          itemType: 'verse',
          itemId: currentFavoriteVerseId,
          timestamp: Date.now()
        }
      });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (confirm("هل أنت متأكد من إزالة هذا العنصر من المجموعة؟")) {
      removeItemMutation.mutate(itemId);
    }
  };

  const filteredCollections = searchTerm
    ? collections.filter(collection => 
        collection.name.includes(searchTerm) ||
        (collection.description && collection.description.includes(searchTerm))
      )
    : collections;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition"
        >
          <Folder size={20} />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        {isViewingCollection ? (
          // عرض محتويات المجموعة
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsViewingCollection(false)}
                  className="mr-auto"
                >
                  العودة للمجموعات
                </Button>
                <span>
                  {selectedCollection?.name}
                </span>
              </DialogTitle>
            </DialogHeader>
            
            {isLoadingCollection ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary-custom" />
                <span className="text-lg">جاري التحميل...</span>
              </div>
            ) : (
              <div className="flex-1 overflow-hidden flex flex-col">
                {selectedCollection?.description && (
                  <p className="text-gray-600 text-sm mb-4">{selectedCollection.description}</p>
                )}
                
                {/* عناصر المجموعة ستظهر هنا */}
                <ScrollArea className="flex-1">
                  <div className="space-y-4">
                    {/* هنا سنعرض العناصر بعد استرجاعها من API */}
                    {/* حالياً سنعرض رسالة توضيحية فقط */}
                    <div className="py-8 text-center">
                      <Folder className="mx-auto mb-2 text-gray-400" size={48} />
                      <p className="text-gray-500">لا توجد عناصر في هذه المجموعة</p>
                      <p className="text-gray-500 text-sm">قم بإضافة إشارات مرجعية أو آيات مفضلة إلى هذه المجموعة</p>
                      
                      <Button 
                        onClick={() => setIsAddingToCollection(true)} 
                        variant="outline" 
                        className="mt-4"
                      >
                        <PlusCircle size={16} className="ml-2" />
                        إضافة عنصر
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            )}
          </>
        ) : (
          // عرض قائمة المجموعات
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center justify-between">
                <span>المجموعات</span>
                <Button 
                  onClick={() => setIsCreatingCollection(true)} 
                  size="sm" 
                  className="bg-primary-custom hover:bg-primary-custom/90"
                >
                  <FolderPlus size={16} className="ml-1" />
                  مجموعة جديدة
                </Button>
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Search className="text-gray-400" size={20} />
              <Input 
                placeholder="البحث في المجموعات..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            
            {isLoadingCollections ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary-custom" />
                <span className="text-lg">جاري التحميل...</span>
              </div>
            ) : collections.length === 0 ? (
              <div className="py-8 text-center">
                <Folder className="mx-auto mb-2 text-gray-400" size={48} />
                <p className="text-gray-500">لا توجد مجموعات</p>
                <p className="text-gray-500 text-sm">أنشئ مجموعات لتنظيم الإشارات المرجعية والآيات المفضلة</p>
              </div>
            ) : (
              <ScrollArea className="flex-1 pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCollections.map((collection) => (
                    <Card 
                      key={collection.id} 
                      className={`relative hover:shadow-md transition ${collection.color ? `border-r-4 border-r-${collection.color}-500` : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold flex items-center justify-between">
                          <span className="flex items-center">
                            <span className={`p-1 rounded-full mr-2 ${collection.color ? getColorClass(collection.color) : ""}`}>
                              {getIconComponent(collection.icon)}
                            </span>
                            {collection.name}
                          </span>
                          <div className="flex space-x-1 space-x-reverse">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => setEditingCollection(collection)}
                              className="h-8 w-8 text-gray-500 hover:text-primary-custom"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteCollection(collection.id!)}
                              className="h-8 w-8 text-gray-500 hover:text-red-500"
                              disabled={deleteCollectionMutation.isPending}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </CardTitle>
                        {collection.description && (
                          <CardDescription className="text-sm text-gray-500">
                            {collection.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardFooter className="pt-0 pb-3 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewCollection(collection)}
                        >
                          <Folder className="ml-2 h-4 w-4" />
                          عرض المحتوى
                        </Button>
                        
                        {(currentBookmarkId || currentFavoriteVerseId) && (
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAddCurrentItemToCollection(collection.id!)}
                            className="text-primary-custom hover:text-primary-custom/90"
                          >
                            <PlusCircle size={16} className="ml-1" />
                            إضافة
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </>
        )}
        
        {/* مربع حوار إنشاء مجموعة جديدة */}
        {isCreatingCollection && (
          <Dialog open={isCreatingCollection} onOpenChange={setIsCreatingCollection}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إنشاء مجموعة جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">اسم المجموعة *</Label>
                  <Input 
                    placeholder="أدخل اسم المجموعة..."
                    value={newCollection.name}
                    onChange={(e) => setNewCollection({...newCollection, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">وصف المجموعة (اختياري)</Label>
                  <Textarea 
                    placeholder="أدخل وصفاً للمجموعة..."
                    value={newCollection.description}
                    onChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">الأيقونة</Label>
                    <Select
                      value={newCollection.icon}
                      onValueChange={(value) => setNewCollection({...newCollection, icon: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر أيقونة" />
                      </SelectTrigger>
                      <SelectContent>
                        {icons.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value}>
                            <div className="flex items-center">
                              {icon.icon}
                              <span className="mr-2">{icon.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">اللون</Label>
                    <Select
                      value={newCollection.color}
                      onValueChange={(value) => setNewCollection({...newCollection, color: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر لوناً" />
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
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreatingCollection(false)}
                    disabled={createCollectionMutation.isPending}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={handleCreateCollection}
                    className="bg-primary-custom hover:bg-primary-custom/90"
                    disabled={createCollectionMutation.isPending}
                  >
                    {createCollectionMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الإنشاء...
                      </>
                    ) : "إنشاء المجموعة"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        
        {/* مربع حوار تعديل مجموعة */}
        {editingCollection && (
          <Dialog open={!!editingCollection} onOpenChange={(open) => !open && setEditingCollection(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>تعديل المجموعة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">اسم المجموعة *</Label>
                  <Input 
                    placeholder="أدخل اسم المجموعة..."
                    value={editingCollection.name}
                    onChange={(e) => setEditingCollection({...editingCollection, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">وصف المجموعة (اختياري)</Label>
                  <Textarea 
                    placeholder="أدخل وصفاً للمجموعة..."
                    value={editingCollection.description || ""}
                    onChange={(e) => setEditingCollection({...editingCollection, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">الأيقونة</Label>
                    <Select
                      value={editingCollection.icon}
                      onValueChange={(value) => setEditingCollection({...editingCollection, icon: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر أيقونة" />
                      </SelectTrigger>
                      <SelectContent>
                        {icons.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value}>
                            <div className="flex items-center">
                              {icon.icon}
                              <span className="mr-2">{icon.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">اللون</Label>
                    <Select
                      value={editingCollection.color}
                      onValueChange={(value) => setEditingCollection({...editingCollection, color: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر لوناً" />
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
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingCollection(null)}
                    disabled={updateCollectionMutation.isPending}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={handleUpdateCollection}
                    className="bg-primary-custom hover:bg-primary-custom/90"
                    disabled={updateCollectionMutation.isPending}
                  >
                    {updateCollectionMutation.isPending ? (
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
        
        {/* مربع حوار إضافة عنصر للمجموعة */}
        {isAddingToCollection && (
          <Dialog open={isAddingToCollection} onOpenChange={setIsAddingToCollection}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة عنصر للمجموعة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Tabs defaultValue="bookmarks">
                  <TabsList className="mx-auto mb-4">
                    <TabsTrigger value="bookmarks" className="px-6">الإشارات المرجعية</TabsTrigger>
                    <TabsTrigger value="favorites" className="px-6">المفضلة</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="bookmarks">
                    {bookmarks.length === 0 ? (
                      <div className="py-4 text-center">
                        <p className="text-gray-500">لا توجد إشارات مرجعية</p>
                      </div>
                    ) : (
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-2">
                          {bookmarks.map((bookmark) => (
                            <Card key={bookmark.id} className="p-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">{bookmark.surahName} - الآية {bookmark.ayahNumber}</p>
                                  <p className="text-sm text-gray-500 truncate">{bookmark.ayahText}</p>
                                </div>
                                <Button 
                                  size="sm"
                                  onClick={() => {
                                    if (selectedCollectionId) {
                                      addItemMutation.mutate({
                                        collectionId: selectedCollectionId,
                                        item: {
                                          itemType: 'bookmark',
                                          itemId: bookmark.id,
                                          timestamp: Date.now()
                                        }
                                      });
                                    }
                                  }}
                                  disabled={addItemMutation.isPending}
                                >
                                  إضافة
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="favorites">
                    {favoriteVerses.length === 0 ? (
                      <div className="py-4 text-center">
                        <p className="text-gray-500">لا توجد آيات مفضلة</p>
                      </div>
                    ) : (
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-2">
                          {favoriteVerses.map((verse) => (
                            <Card key={verse.id} className="p-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">{verse.surahName} - الآية {verse.ayahNumber}</p>
                                  <p className="text-sm text-gray-500 truncate">{verse.ayahText}</p>
                                </div>
                                <Button 
                                  size="sm"
                                  onClick={() => {
                                    if (selectedCollectionId) {
                                      addItemMutation.mutate({
                                        collectionId: selectedCollectionId,
                                        item: {
                                          itemType: 'verse',
                                          itemId: verse.id,
                                          timestamp: Date.now()
                                        }
                                      });
                                    }
                                  }}
                                  disabled={addItemMutation.isPending}
                                >
                                  إضافة
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end space-x-2 space-x-reverse mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingToCollection(false)}
                  >
                    إغلاق
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