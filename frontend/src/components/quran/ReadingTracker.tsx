import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Clock, Target, BarChart } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLastRead } from "@/lib/hooks/useQuran";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ReadingTrackerProps {
  onNavigateToLastRead?: () => void;
}

interface ReadingGoal {
  enabled: boolean;
  pagesPerDay: number;
  versesPerDay: number;
  preferredTime: string;
  reminderEnabled: boolean;
}

interface ReadingSession {
  date: string;
  pages: number;
  verses: number;
  duration: number; // in minutes
  completed: boolean;
}

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const ReadingTracker = ({ onNavigateToLastRead }: ReadingTrackerProps) => {
  const [location, navigate] = useLocation();
  const { lastRead } = useLastRead();
  const [readingGoal, setReadingGoal] = useState<ReadingGoal>(() => {
    const savedGoal = localStorage.getItem("quran-reading-goal");
    if (savedGoal) {
      try {
        return JSON.parse(savedGoal);
      } catch (error) {
        console.error("Error parsing reading goal:", error);
        return {
          enabled: false,
          pagesPerDay: 2,
          versesPerDay: 20,
          preferredTime: "19:00",
          reminderEnabled: false
        };
      }
    }
    return {
      enabled: false,
      pagesPerDay: 2,
      versesPerDay: 20,
      preferredTime: "19:00",
      reminderEnabled: false
    };
  });
  
  const [readingSessions, setReadingSessions] = useState<ReadingSession[]>(() => {
    const savedSessions = localStorage.getItem("quran-reading-sessions");
    if (savedSessions) {
      try {
        return JSON.parse(savedSessions);
      } catch (error) {
        console.error("Error parsing reading sessions:", error);
        return [];
      }
    }
    return [];
  });
  
  const [date, setDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Save reading goal to localStorage when it changes
    localStorage.setItem("quran-reading-goal", JSON.stringify(readingGoal));
  }, [readingGoal]);

  useEffect(() => {
    // Save reading sessions to localStorage when they change
    localStorage.setItem("quran-reading-sessions", JSON.stringify(readingSessions));
  }, [readingSessions]);

  const handleGoalChange = <K extends keyof ReadingGoal>(key: K, value: ReadingGoal[K]) => {
    setReadingGoal(prev => ({ ...prev, [key]: value }));
  };

  const isDateHighlighted = (date: Date) => {
    const dateString = formatDate(date);
    return readingSessions.some(session => session.date === dateString && session.completed);
  };

  const getSessionForDate = (date: Date): ReadingSession | undefined => {
    const dateString = formatDate(date);
    return readingSessions.find(session => session.date === dateString);
  };

  const calculateProgress = () => {
    // Get last 30 days of reading sessions
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    
    const recentSessions = readingSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= thirtyDaysAgo && sessionDate <= now;
    });
    
    // Calculate totals
    const totalPages = recentSessions.reduce((sum, session) => sum + session.pages, 0);
    const totalVerses = recentSessions.reduce((sum, session) => sum + session.verses, 0);
    const totalMinutes = recentSessions.reduce((sum, session) => sum + session.duration, 0);
    
    // Calculate completion rate
    const daysCompleted = new Set(recentSessions.filter(s => s.completed).map(s => s.date)).size;
    const completionRate = Math.round((daysCompleted / 30) * 100);
    
    // Calculate consistency (number of consecutive days with completed sessions)
    let currentStreak = 0;
    const today = formatDate(new Date());
    let checkDate = new Date();
    
    while (true) {
      const dateToCheck = formatDate(checkDate);
      const session = readingSessions.find(s => s.date === dateToCheck && s.completed);
      
      if (!session) break;
      
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
      
      // Don't go back too far
      if (currentStreak > 365) break;
    }
    
    return {
      totalPages,
      totalVerses,
      totalMinutes,
      completionRate,
      currentStreak
    };
  };

  const progress = calculateProgress();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition">
          <BookOpen size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">متابعة القراءة</DialogTitle>
        </DialogHeader>
        
        {lastRead && (
          <div className="mb-4 p-4 border rounded-md bg-primary-custom/5">
            <h3 className="font-semibold mb-2">آخر قراءة</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-primary-custom">{lastRead.surahName}</span> - الآية {lastRead.ayahNumber}
                </p>
                {lastRead.ayahText && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {lastRead.ayahText}
                  </p>
                )}
              </div>
              <Button 
                onClick={onNavigateToLastRead}
                size="sm"
                className="bg-primary-custom hover:bg-primary-custom/90"
              >
                استكمال القراءة
              </Button>
            </div>
          </div>
        )}
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="history">سجل القراءة</TabsTrigger>
            <TabsTrigger value="goals">أهداف القراءة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">الصفحات المقروءة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {progress.totalPages}
                    <span className="text-sm text-gray-500 font-normal mr-2">صفحة</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">الآيات المقروءة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {progress.totalVerses}
                    <span className="text-sm text-gray-500 font-normal mr-2">آية</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">وقت القراءة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {progress.totalMinutes}
                    <span className="text-sm text-gray-500 font-normal mr-2">دقيقة</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">الالتزام بالقراءة</CardTitle>
                <CardDescription>
                  آخر 30 يوم
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">نسبة إكمال القراءة</span>
                    <span className="text-sm font-medium">{progress.completionRate}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-custom" 
                      style={{ width: `${progress.completionRate}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">التتابع الحالي</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <span className="text-lg font-bold">{progress.currentStreak}</span>
                      <span className="text-sm text-gray-500">يوم</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="mb-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border"
                modifiers={{
                  completed: (date) => isDateHighlighted(date)
                }}
                modifiersStyles={{
                  completed: { backgroundColor: 'rgba(0, 172, 193, 0.1)', color: '#00ACC1', fontWeight: 'bold' }
                }}
              />
            </div>
            
            {getSessionForDate(date) ? (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>تفاصيل القراءة ليوم {date.toLocaleDateString('ar-SA')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">الصفحات المقروءة:</span>
                    <span className="font-medium">{getSessionForDate(date)?.pages} صفحة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الآيات المقروءة:</span>
                    <span className="font-medium">{getSessionForDate(date)?.verses} آية</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">وقت القراءة:</span>
                    <span className="font-medium">{getSessionForDate(date)?.duration} دقيقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الحالة:</span>
                    <span className={`font-medium ${getSessionForDate(date)?.completed ? 'text-green-500' : 'text-red-500'}`}>
                      {getSessionForDate(date)?.completed ? 'مكتمل' : 'غير مكتمل'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">لا توجد بيانات قراءة لهذا اليوم</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Switch 
                checked={readingGoal.enabled}
                onCheckedChange={(checked) => handleGoalChange("enabled", checked)}
              />
              <Label className="font-medium">تفعيل هدف القراءة</Label>
            </div>
            
            {readingGoal.enabled && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-500">عدد الصفحات اليومي</Label>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-sm">1</span>
                    <Slider 
                      value={[readingGoal.pagesPerDay]} 
                      min={1} 
                      max={20} 
                      step={1} 
                      onValueChange={(value) => handleGoalChange("pagesPerDay", value[0])} 
                      className="w-full" 
                    />
                    <span className="text-sm">20</span>
                  </div>
                  <div className="text-center text-sm font-medium text-primary-custom">
                    {readingGoal.pagesPerDay} صفحة
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm text-gray-500">عدد الآيات اليومي</Label>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-sm">5</span>
                    <Slider 
                      value={[readingGoal.versesPerDay]} 
                      min={5} 
                      max={100} 
                      step={5} 
                      onValueChange={(value) => handleGoalChange("versesPerDay", value[0])} 
                      className="w-full" 
                    />
                    <span className="text-sm">100</span>
                  </div>
                  <div className="text-center text-sm font-medium text-primary-custom">
                    {readingGoal.versesPerDay} آية
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm text-gray-500">وقت القراءة المفضل</Label>
                  <Input 
                    type="time" 
                    value={readingGoal.preferredTime}
                    onChange={(e) => handleGoalChange("preferredTime", e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch 
                    checked={readingGoal.reminderEnabled}
                    onCheckedChange={(checked) => handleGoalChange("reminderEnabled", checked)}
                  />
                  <Label className="font-medium">تفعيل التذكير</Label>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-md text-sm border">
                  <p className="text-gray-600">
                    بهذا الهدف، ستكمل قراءة القرآن الكريم في حوالي <span className="font-bold text-primary-custom">120</span> يوم
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ReadingTracker;