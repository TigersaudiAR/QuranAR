import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Compass, 
  MapPin, 
  Sun, 
  Sunrise, 
  Sunset, 
  Moon,
  Navigation,
  ArrowUp
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
      {/* مواقيت الصلاة مع البوصلة في المنتصف */}
      <div className="bg-primary/5 rounded-xl p-4 mb-6 shadow-sm border border-primary/10 relative overflow-hidden">
        {/* عنوان مع التاريخ */}
        <div className="flex justify-between items-center mb-3 relative z-10">
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

        {/* شعار البوصلة في المنتصف */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-5">
          <div className="relative">
            <Compass className="h-40 w-40 text-primary" />
          </div>
        </div>

        {/* قائمة أوقات الصلاة */}
        <div className="grid grid-cols-6 gap-2 mb-3 relative z-10">
          {prayerTimes.map((prayer, index) => (
            <div 
              key={index} 
              className={`
                flex flex-col items-center p-2 rounded-md border text-center
                ${prayer.isNext ? 'border-primary bg-white shadow-sm' : 'border-gray-200 bg-white/80'}
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
        <div className="bg-white rounded-md p-2 border border-primary/10 relative z-10">
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

      {/* بوصلة اتجاه القبلة أسفله */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-4 mb-6 shadow-sm border border-primary/10 relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-primary flex items-center">
            <Compass className="h-5 w-5 ml-2" />
            اتجاه القبلة
          </h3>
          <Badge variant="outline" className="text-xs font-normal bg-white">
            {qiblaDirection}° جنوب شرق
          </Badge>
        </div>
        
        {/* البوصلة بتصميم بسيط */}
        <div className="flex items-center justify-center mb-2 relative">
          <div className="w-24 h-24 relative">
            {/* دائرة البوصلة */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 bg-white/80"></div>
            
            {/* خطوط الاتجاهات الرئيسية */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-0.5 bg-gray-200"></div>
              <div className="w-full h-0.5 bg-gray-200"></div>
            </div>
            
            {/* السهم */}
            <div 
              className="absolute top-1/2 left-1/2 w-1 h-14 bg-primary -mt-7 origin-bottom transform -translate-x-1/2"
              style={{ transform: `translateX(-50%) rotate(${qiblaDirection}deg)` }}
            >
              <div className="absolute -top-2 -left-2 w-5 h-5">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            
            {/* اتجاهات البوصلة */}
            <div className="absolute inset-0">
              <span className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-500">N</span>
              <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-500">E</span>
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-500">S</span>
              <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-500">W</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-xs text-muted-foreground">
            موقعك الحالي: <span className="font-medium">{currentLocation}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesWidget;