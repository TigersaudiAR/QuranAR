import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Bell, 
  Compass, 
  MapPin, 
  Sun, 
  Sunrise, 
  Sunset, 
  Moon,
  ArrowRight,
  BellRing,
  Navigation
} from "lucide-react";

type PrayerTime = {
  name: string;
  time: string;
  icon: React.ReactNode;
  isNext?: boolean;
  remaining?: string;
};

const PrayerTimesWidget = () => {
  const [prayerProgress, setPrayerProgress] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(135); // مثال: اتجاه القبلة 135 درجة
  const [currentLocation, setCurrentLocation] = useState("الرياض، المملكة العربية السعودية");
  const [currentDate, setCurrentDate] = useState({
    hijri: "١٢ رمضان ١٤٤٥",
    gregorian: "٢٣ مارس ٢٠٢٥"
  });

  // محاكاة أوقات الصلاة - في التطبيق الفعلي ستأتي من API
  const prayerTimes: PrayerTime[] = [
    { name: "الفجر", time: "04:30", icon: <Sunrise className="h-4 w-4" /> },
    { name: "الشروق", time: "06:05", icon: <Sun className="h-4 w-4" /> },
    { name: "الظهر", time: "12:15", icon: <Sun className="h-4 w-4" /> },
    { name: "العصر", time: "15:45", icon: <Sun className="h-4 w-4" />, isNext: true, remaining: "١ ساعة ١٥ دقيقة" },
    { name: "المغرب", time: "18:30", icon: <Sunset className="h-4 w-4" /> },
    { name: "العشاء", time: "20:00", icon: <Moon className="h-4 w-4" /> },
  ];

  // محاكاة حساب تقدم الوقت بين الصلوات
  useEffect(() => {
    // حساب نسبة الوقت المتبقي للصلاة التالية
    // في التطبيق الفعلي، سيتم حساب هذا بناءً على الوقت الحالي وأوقات الصلاة الفعلية
    const timer = setTimeout(() => setPrayerProgress(65), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* مواقيت الصلاة - على شكل شريط */}
      <div className="bg-primary/5 rounded-xl p-4 mb-3 shadow-sm border border-primary/10">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Clock className="h-5 w-5 ml-2 text-primary" />
            <h3 className="font-bold text-primary">مواقيت الصلاة</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{currentDate.gregorian}</span>
            <Separator orientation="vertical" className="h-4" />
            <Badge variant="outline" className="text-xs font-normal bg-white">
              {currentDate.hijri}
            </Badge>
          </div>
        </div>

        {/* قائمة أوقات الصلاة */}
        <div className="grid grid-cols-6 gap-2 mb-3">
          {prayerTimes.map((prayer, index) => (
            <div 
              key={index} 
              className={`
                flex flex-col items-center p-2 rounded-md border text-center
                ${prayer.isNext ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200'}
              `}
            >
              <div className={`w-8 h-8 rounded-full ${prayer.isNext ? 'bg-primary/20' : 'bg-gray-100'} flex items-center justify-center mb-1`}>
                {prayer.icon}
              </div>
              <p className="text-xs font-medium">{prayer.name}</p>
              <p className="text-xs text-muted-foreground">{prayer.time}</p>
              {prayer.isNext && (
                <Badge className="mt-1 bg-primary/20 text-primary border-0 text-[10px] h-4 px-1 flex items-center">التالية</Badge>
              )}
            </div>
          ))}
        </div>

        {/* شريط تقدم الوقت */}
        <div className="bg-white rounded-md p-2 border border-primary/10">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-sm">الصلاة القادمة: <span className="text-primary">العصر</span></span>
            <div className="flex items-center">
              <Clock className="h-3 w-3 ml-1 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">{prayerTimes[3].remaining}</span>
            </div>
          </div>
          <Progress value={prayerProgress} className="h-2" />
        </div>
      </div>

      {/* بوصلة اتجاه القبلة - اسفل مواقيت الصلاة */}
      <div className="flex items-center bg-white rounded-xl p-3 border border-primary/10 shadow-sm mb-6">
        <div className="ml-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Compass className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h4 className="font-bold text-sm">اتجاه القبلة</h4>
              <p className="text-xs text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 ml-1" />
                {currentLocation}
              </p>
            </div>
            <div className="text-left">
              <div className="flex items-end gap-1">
                <span className="text-xl font-bold">{qiblaDirection}</span>
                <span className="text-sm mb-1">°</span>
              </div>
              <p className="text-xs text-muted-foreground">جنوب شرق</p>
            </div>
          </div>
          
          <div className="mt-2 flex items-center">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-primary to-amber-500 flex-1 rounded-full"></div>
            <div className="text-xs text-muted-foreground mr-2 whitespace-nowrap">
              اضغط للتفاصيل
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesWidget;