import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Play, 
  BookMarked, 
  BarChart3, 
  ArrowUpRight 
} from "lucide-react";
import { useLastRead } from "@/lib/hooks/useQuran";
import { useState, useEffect } from "react";

const LastReadSection = () => {
  const { lastRead, isLoading } = useLastRead();
  const [dateTime, setDateTime] = useState<string>("");
  const [readingProgress, setReadingProgress] = useState(0);

  // تنسيق التاريخ والوقت بالعربية
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    setDateTime(new Intl.DateTimeFormat('ar-SA', options).format(now));
    
    // حساب تقدم القراءة (مثال فقط - سيتم تحديثه حسب البيانات الفعلية)
    if (lastRead) {
      // نسبة تقدم القراءة في السورة الحالية
      const progressPercent = Math.min(
        Math.round((lastRead.ayahNumber / 20) * 100), 
        100
      );
      setReadingProgress(progressPercent);
    }
  }, [lastRead]);

  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="bg-primary/5 rounded-lg p-6 border border-primary/10 animate-pulse h-36">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </section>
    );
  }

  if (!lastRead) {
    return (
      <section className="mb-8">
        <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-lg ml-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold">ابدأ رحلتك مع القرآن الكريم</h2>
            </div>
            <Badge variant="outline" className="text-xs">{dateTime}</Badge>
          </div>
          
          <div className="bg-accent/5 rounded-md p-4 mb-4 border border-accent/10">
            <div className="flex items-center text-accent-foreground mb-2">
              <Clock className="h-4 w-4 ml-2" />
              <p className="text-sm">لم تبدأ القراءة بعد</p>
            </div>
            <p className="text-sm text-muted-foreground">
              ابدأ رحلتك مع القرآن الكريم اليوم. يمكنك قراءة سورة الفاتحة أولاً ثم السور القصيرة في جزء عمّ.
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 space-x-reverse">
              <Link href="/quran">
                <Button className="gap-2">
                  <Play className="h-4 w-4" />
                  ابدأ القراءة
                </Button>
              </Link>
              <Button variant="outline" size="icon" asChild>
                <Link href="/quran">
                  <BookMarked className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <Link href="/quran">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
                <span>عرض السور</span>
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-lg ml-2">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold">تابع القراءة</h2>
          </div>
          <Badge variant="outline" className="text-xs">{dateTime}</Badge>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 bg-accent/5 rounded-md p-4 border border-accent/10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <BookMarked className="h-4 w-4 text-accent-foreground ml-2" />
                <p className="font-semibold">آخر قراءة</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                سورة {lastRead.surahName}
              </Badge>
            </div>
            <p className="text-lg font-arabic mb-2">
              {lastRead.ayahText || `الآية رقم ${lastRead.ayahNumber}`}
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>تقدم القراءة</span>
                <span>{readingProgress}%</span>
              </div>
              <Progress value={readingProgress} className="h-1.5" />
            </div>
          </div>
          
          <div className="flex flex-col justify-between md:w-48 bg-secondary/5 rounded-md p-4 border border-secondary/10">
            <div>
              <p className="text-sm font-semibold mb-1">السورة</p>
              <p className="text-lg">{lastRead.surahName}</p>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <BarChart3 className="h-3 w-3 ml-1" />
                <span>الآية {lastRead.ayahNumber}</span>
              </div>
            </div>
            <Link href={`/quran/${lastRead.surahId}?ayah=${lastRead.ayahNumber}`}>
              <Button className="w-full mt-4 gap-2">
                <Play className="h-4 w-4" />
                استئناف
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 space-x-reverse">
            <Link href="/quran">
              <Button variant="outline" size="sm">عرض كل السور</Button>
            </Link>
          </div>
          <Link href="/quran/bookmark">
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
              <span>العلامات المرجعية</span>
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LastReadSection;
