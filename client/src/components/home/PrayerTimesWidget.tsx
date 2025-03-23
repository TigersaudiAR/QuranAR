import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BellRing
} from "lucide-react";

type PrayerTime = {
  name: string;
  time: string;
  icon: React.ReactNode;
  isNext?: boolean;
  remaining?: string;
};

const PrayerTimesWidget = () => {
  const [currentTab, setCurrentTab] = useState("prayers");
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
    <Card className="border-primary/20 overflow-hidden">
      <CardHeader className="bg-primary/5 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-5 w-5 ml-2 text-primary" />
            <CardTitle className="text-lg">مواقيت الصلاة واتجاه القبلة</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            {currentDate.hijri}
          </Badge>
        </div>
      </CardHeader>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prayers">مواقيت الصلاة</TabsTrigger>
            <TabsTrigger value="qibla">اتجاه القبلة</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="prayers" className="m-0">
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {prayerTimes.map((prayer, index) => (
                  <div 
                    key={index} 
                    className={`
                      flex justify-between items-center p-2 rounded-md border
                      ${prayer.isNext ? 'border-primary/30 bg-primary/5' : 'border-gray-200'}
                    `}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full ${prayer.isNext ? 'bg-primary/20' : 'bg-gray-100'} flex items-center justify-center ml-2`}>
                        {prayer.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{prayer.name}</p>
                        <p className="text-xs text-muted-foreground">{prayer.time}</p>
                      </div>
                    </div>
                    {prayer.isNext && (
                      <BellRing className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-secondary/5 rounded-md p-3 border border-secondary/10">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">الصلاة القادمة: العصر</span>
                  <span className="text-muted-foreground text-xs">{prayerTimes[3].remaining}</span>
                </div>
                <Progress value={prayerProgress} className="h-2" />
              </div>
            </div>

            <div className="bg-gray-50 rounded-md p-4 border flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-sm mb-2">موقعك الحالي</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 ml-1 flex-shrink-0" />
                  <span>{currentLocation}</span>
                </div>
                
                <div className="mb-3">
                  <Badge className="bg-primary/10 text-primary border-0 mb-2" variant="outline">الإشعارات</Badge>
                  <div className="flex items-center justify-between text-sm rounded-md bg-white p-2 border">
                    <span>تنبيه قبل الأذان بـ 15 دقيقة</span>
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
                <span>ضبط الإعدادات</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="qibla" className="m-0">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-1">اتجاه القبلة من موقعك الحالي</p>
              <h3 className="text-2xl font-semibold">{qiblaDirection}°</h3>
            </div>
            
            <div className="relative w-48 h-48 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-primary/10 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-primary/20 transform -translate-x-1/2 absolute left-1/2"></div>
                  <div className="w-full h-1 bg-primary/20 transform -translate-y-1/2 absolute top-1/2"></div>
                </div>
                <div className="relative">
                  <div 
                    className="h-32 w-4 bg-gradient-to-t from-primary to-transparent absolute left-1/2 -translate-x-1/2 origin-bottom"
                    style={{ transform: `rotate(${qiblaDirection}deg)` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary absolute -top-2 -left-1 flex items-center justify-center">
                      <Compass className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 text-xs">N</div>
                <div className="absolute right-3 text-xs">E</div>
                <div className="absolute bottom-3 text-xs">S</div>
                <div className="absolute left-3 text-xs">W</div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm mb-4">قم بتوجيه هاتفك باتجاه السهم للوصول لاتجاه القبلة بدقة</p>
              <Button size="sm" variant="outline" className="mx-auto gap-2">
                <Compass className="h-4 w-4" />
                <span>معايرة البوصلة</span>
              </Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>

      <CardFooter className="bg-gray-50 flex justify-between py-2 px-4 text-xs text-muted-foreground">
        <span>آخر تحديث: منذ دقيقة واحدة</span>
        <Button variant="link" className="h-auto p-0 text-xs">تحديث</Button>
      </CardFooter>
    </Card>
  );
};

export default PrayerTimesWidget;