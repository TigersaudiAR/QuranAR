import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bookmark, Share, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TafseerViewProps {
  surahId: number;
  verseNumber: number;
  verseText: string;
}

const TafseerView = ({ surahId, verseNumber, verseText }: TafseerViewProps) => {
  const [activeSource, setActiveSource] = useState('ibn-kathir');
  const [isLoading, setIsLoading] = useState(true);
  const [tafseerContent, setTafseerContent] = useState<{[key: string]: string}>({
    'ibn-kathir': '',
    'al-qurtubi': '',
    'al-tabari': '',
    'al-saadi': ''
  });
  const { toast } = useToast();
  
  // Fetch tafseer content (mock implementation)
  useEffect(() => {
    const fetchTafseer = async () => {
      setIsLoading(true);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real app, this would fetch from an API
        // For demo purposes, we'll provide some mock content
        const mockTafseer = {
          'ibn-kathir': "هذا تفسير الإمام ابن كثير رحمه الله للآية. في تفسير هذه الآية الكريمة، يبين ابن كثير معانيها ودلالاتها وما ورد فيها من الأحكام والحكم والمواعظ. ويستشهد بالأحاديث النبوية والآثار الواردة عن الصحابة والتابعين، مع التركيز على المعنى الإجمالي للآية وما يستفاد منها من الدروس والعبر.",
          'al-qurtubi': "هذا تفسير الإمام القرطبي رحمه الله للآية. يتميز تفسير القرطبي بالتركيز على الأحكام الفقهية واستنباط الفوائد العملية من الآيات. وفي هذه الآية يناقش القرطبي المسائل الفقهية المتعلقة بها، ويذكر آراء العلماء في المسألة مع الترجيح بينها، ويستدل بالأحاديث والآثار والقواعد الأصولية.",
          'al-tabari': "هذا تفسير الإمام الطبري رحمه الله للآية. يعتبر تفسير الطبري من أقدم وأشمل التفاسير، حيث يهتم بذكر الروايات المأثورة في تفسير الآية، وينقل أقوال الصحابة والتابعين بأسانيدها. وفي هذه الآية يستعرض الطبري مختلف الأقوال الواردة في تفسيرها، ويبين وجوه القراءات المختلفة إن وجدت، ويوضح المعاني اللغوية للألفاظ.",
          'al-saadi': "هذا تفسير الشيخ عبد الرحمن السعدي رحمه الله للآية. يتميز تفسير السعدي بالوضوح والبساطة مع التركيز على المعاني الإيمانية والتربوية. وفي هذه الآية يبين السعدي المعنى الإجمالي لها، ويستخرج منها الفوائد والأحكام والحكم بعبارات سهلة واضحة، مع ربط الآية بمقاصد الشريعة وأصول الإيمان."
        };
        
        setTafseerContent(mockTafseer);
      } catch (error) {
        console.error("Error fetching tafseer:", error);
        toast({
          title: "حدث خطأ",
          description: "تعذر تحميل التفسير، يرجى المحاولة مرة أخرى",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTafseer();
  }, [surahId, verseNumber, toast]);
  
  const handleCopy = () => {
    // Copy both the verse and its tafseer
    const content = `${verseText}\n\n${tafseerContent[activeSource]}\n\nسورة ${getSurahName(surahId)} - الآية ${verseNumber} (تفسير ${getSourceName(activeSource)})`;
    
    navigator.clipboard.writeText(content);
    toast({
      title: "تم النسخ",
      description: "تم نسخ الآية مع التفسير إلى الحافظة",
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      const content = `${verseText}\n\n${tafseerContent[activeSource]}\n\nسورة ${getSurahName(surahId)} - الآية ${verseNumber} (تفسير ${getSourceName(activeSource)})`;
      
      navigator.share({
        title: `تفسير سورة ${getSurahName(surahId)} - الآية ${verseNumber}`,
        text: content,
      }).catch(error => {
        console.error("Error sharing:", error);
      });
    } else {
      // Fallback if Web Share API is not available
      handleCopy();
    }
  };
  
  const handleBookmark = () => {
    // Implementation would connect to a bookmarking system
    toast({
      title: "تم حفظ التفسير",
      description: "تم حفظ التفسير في المفضلة",
    });
  };
  
  // Helper function to get the Arabic name of the surah
  const getSurahName = (id: number): string => {
    // Simplified mapping of surah IDs to names
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
    
    return surahNames[id - 1] || `سورة ${id}`;
  };
  
  // Helper function to get source name in Arabic
  const getSourceName = (source: string): string => {
    switch (source) {
      case 'ibn-kathir':
        return "ابن كثير";
      case 'al-qurtubi':
        return "القرطبي";
      case 'al-tabari':
        return "الطبري";
      case 'al-saadi':
        return "السعدي";
      default:
        return source;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">مصادر التفسير</h3>
        <div className="flex space-x-1 space-x-reverse">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-primary-custom"
            onClick={handleBookmark}
          >
            <Bookmark className="h-4 w-4 ml-1" />
            <span className="text-sm">حفظ</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-primary-custom"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 ml-1" />
            <span className="text-sm">مشاركة</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-primary-custom"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4 ml-1" />
            <span className="text-sm">نسخ</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="ibn-kathir" value={activeSource} onValueChange={setActiveSource}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="ibn-kathir">ابن كثير</TabsTrigger>
          <TabsTrigger value="al-qurtubi">القرطبي</TabsTrigger>
          <TabsTrigger value="al-tabari">الطبري</TabsTrigger>
          <TabsTrigger value="al-saadi">السعدي</TabsTrigger>
        </TabsList>
        
        {Object.keys(tafseerContent).map((source) => (
          <TabsContent key={source} value={source} className="mt-4">
            <Card>
              <CardContent className="p-4">
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[85%]" />
                    <Skeleton className="h-4 w-[70%]" />
                  </div>
                ) : (
                  <ScrollArea className="h-[350px] text-right">
                    <div className="text-gray-700 leading-7">
                      {tafseerContent[source]}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TafseerView;