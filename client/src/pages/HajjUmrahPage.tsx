import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Navigation, 
  FileText, 
  Video, 
  Clock, 
  Heart, 
  CircleCheck, 
  ArrowRight,
  RotateCw,
  BookOpen,
  Calendar
} from "lucide-react";

export default function HajjUmrahPage() {
  const [tawafCount, setTawafCount] = useState(0);
  const [sayiCount, setSayiCount] = useState(0);

  const incrementTawaf = () => {
    if (tawafCount < 7) {
      setTawafCount(tawafCount + 1);
    }
  };

  const resetTawaf = () => {
    setTawafCount(0);
  };

  const incrementSayi = () => {
    if (sayiCount < 7) {
      setSayiCount(sayiCount + 1);
    }
  };

  const resetSayi = () => {
    setSayiCount(0);
  };

  const hajjSteps = [
    {
      id: 1,
      title: "الإحرام",
      description: "نية الدخول في النسك ولبس ملابس الإحرام",
      icon: <FileText className="h-5 w-5" />,
      location: "الميقات",
      durationHours: "1-2"
    },
    {
      id: 2,
      title: "الطواف",
      description: "طواف القدوم حول الكعبة 7 أشواط",
      icon: <RotateCw className="h-5 w-5" />,
      location: "المسجد الحرام",
      durationHours: "1-2"
    },
    {
      id: 3,
      title: "السعي",
      description: "السعي بين الصفا والمروة 7 أشواط",
      icon: <Navigation className="h-5 w-5" />,
      location: "المسعى",
      durationHours: "1-2"
    },
    {
      id: 4,
      title: "الوقوف بعرفة",
      description: "ركن الحج الأعظم، الوقوف بعرفة من ظهر يوم 9 إلى فجر يوم 10 من ذي الحجة",
      icon: <MapPin className="h-5 w-5" />,
      location: "جبل عرفة",
      durationHours: "12-18"
    },
    {
      id: 5,
      title: "المبيت بمزدلفة",
      description: "المبيت بمزدلفة ليلة العاشر من ذي الحجة",
      icon: <Clock className="h-5 w-5" />,
      location: "مزدلفة",
      durationHours: "6-8"
    },
    {
      id: 6,
      title: "رمي الجمرات",
      description: "رمي جمرة العقبة الكبرى يوم النحر ثم رمي الجمرات الثلاث في أيام التشريق",
      icon: <ArrowRight className="h-5 w-5" />,
      location: "منى",
      durationHours: "1-2 (يوميًا)"
    },
    {
      id: 7,
      title: "الحلق أو التقصير",
      description: "حلق الشعر أو تقصيره بعد رمي جمرة العقبة",
      icon: <CircleCheck className="h-5 w-5" />,
      location: "منى",
      durationHours: "0.5"
    },
    {
      id: 8,
      title: "طواف الإفاضة",
      description: "الطواف الركن في الحج",
      icon: <RotateCw className="h-5 w-5" />,
      location: "المسجد الحرام",
      durationHours: "1-2"
    },
    {
      id: 9,
      title: "المبيت بمنى",
      description: "المبيت بمنى ليالي أيام التشريق",
      icon: <Calendar className="h-5 w-5" />,
      location: "منى",
      durationHours: "8-10 (لكل ليلة)"
    },
    {
      id: 10,
      title: "طواف الوداع",
      description: "الطواف الأخير قبل مغادرة مكة",
      icon: <Heart className="h-5 w-5" />,
      location: "المسجد الحرام",
      durationHours: "1-2"
    }
  ];

  const umrahSteps = [
    {
      id: 1,
      title: "الإحرام",
      description: "نية الدخول في العمرة ولبس ملابس الإحرام",
      icon: <FileText className="h-5 w-5" />,
      location: "الميقات",
      durationHours: "1"
    },
    {
      id: 2,
      title: "الطواف",
      description: "طواف العمرة حول الكعبة 7 أشواط",
      icon: <RotateCw className="h-5 w-5" />,
      location: "المسجد الحرام",
      durationHours: "1-2"
    },
    {
      id: 3,
      title: "السعي",
      description: "السعي بين الصفا والمروة 7 أشواط",
      icon: <Navigation className="h-5 w-5" />,
      location: "المسعى",
      durationHours: "1-2"
    },
    {
      id: 4,
      title: "الحلق أو التقصير",
      description: "حلق الشعر أو تقصيره لإتمام العمرة",
      icon: <CircleCheck className="h-5 w-5" />,
      location: "المسجد الحرام",
      durationHours: "0.5"
    }
  ];

  const supplications = [
    {
      id: 1,
      title: "دعاء الإحرام",
      text: "لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك",
      occasion: "عند نية الإحرام"
    },
    {
      id: 2,
      title: "دعاء الطواف",
      text: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار",
      occasion: "أثناء الطواف"
    },
    {
      id: 3,
      title: "دعاء السعي",
      text: "ربي اغفر وارحم وتجاوز عما تعلم، إنك أنت الأعز الأكرم",
      occasion: "أثناء السعي"
    },
    {
      id: 4,
      title: "دعاء عرفة",
      text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
      occasion: "في يوم عرفة"
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">دليل الحج والعمرة</h1>
      
      <Tabs defaultValue="hajj" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="hajj">مناسك الحج</TabsTrigger>
          <TabsTrigger value="umrah">مناسك العمرة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hajj">
          <h2 className="text-2xl font-semibold mb-6">خطوات أداء مناسك الحج</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {hajjSteps.map((step) => (
              <Card key={step.id} className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-lg mr-3">
                        {step.icon}
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                    <Badge variant="outline">خطوة {step.id}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-2">{step.description}</CardDescription>
                  <div className="flex items-center text-sm mt-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-muted-foreground">المكان: {step.location}</span>
                  </div>
                  <div className="flex items-center text-sm mt-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-muted-foreground">المدة التقريبية: {step.durationHours} ساعة</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Video className="h-4 w-4 ml-2" /> شاهد الشرح
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="umrah">
          <h2 className="text-2xl font-semibold mb-6">خطوات أداء مناسك العمرة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {umrahSteps.map((step) => (
              <Card key={step.id} className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-lg mr-3">
                        {step.icon}
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                    <Badge variant="outline">خطوة {step.id}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-2">{step.description}</CardDescription>
                  <div className="flex items-center text-sm mt-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-muted-foreground">المكان: {step.location}</span>
                  </div>
                  <div className="flex items-center text-sm mt-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-muted-foreground">المدة التقريبية: {step.durationHours} ساعة</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Video className="h-4 w-4 ml-2" /> شاهد الشرح
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">حاسبة الأشواط</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>عدّاد أشواط الطواف</CardTitle>
              <CardDescription>تتبع عدد أشواط الطواف حول الكعبة (7 أشواط)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mb-4">{tawafCount} / 7</div>
                <Progress value={(tawafCount / 7) * 100} className="w-full mb-6" />
                <div className="flex gap-4">
                  <Button onClick={incrementTawaf} disabled={tawafCount >= 7}>
                    شوط جديد
                  </Button>
                  <Button variant="outline" onClick={resetTawaf}>
                    إعادة ضبط
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>عدّاد أشواط السعي</CardTitle>
              <CardDescription>تتبع عدد أشواط السعي بين الصفا والمروة (7 أشواط)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mb-4">{sayiCount} / 7</div>
                <Progress value={(sayiCount / 7) * 100} className="w-full mb-6" />
                <div className="flex gap-4">
                  <Button onClick={incrementSayi} disabled={sayiCount >= 7}>
                    شوط جديد
                  </Button>
                  <Button variant="outline" onClick={resetSayi}>
                    إعادة ضبط
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">أدعية مستحبة</h2>
        <div className="grid grid-cols-1 gap-4">
          {supplications.map((supplication) => (
            <Card key={supplication.id}>
              <CardHeader>
                <CardTitle>{supplication.title}</CardTitle>
                <CardDescription>{supplication.occasion}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-arabic leading-relaxed">{supplication.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">مواد تعليمية إضافية</h2>
        <p className="text-muted-foreground mb-6">تحميل كتب وأدلة مفصلة عن الحج والعمرة</p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="mb-4">
            <BookOpen className="h-5 w-5 ml-2" /> دليل الحج المصور
          </Button>
          <Button size="lg" variant="outline" className="mb-4">
            <BookOpen className="h-5 w-5 ml-2" /> دليل العمرة خطوة بخطوة
          </Button>
        </div>
      </div>
    </div>
  );
}