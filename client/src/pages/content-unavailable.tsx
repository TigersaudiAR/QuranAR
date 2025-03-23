import { 
  Home, 
  Clock, 
  BookOpen, 
  Bookmark, 
  Calendar, 
  BellRing, 
  Heart, 
  BookText, 
  Users, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  BookMarked,
  LayoutGrid,
  ArrowUpRight,
  Moon,
  Compass,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageContainer from "@/components/layout/PageContainer";
import { useState, useEffect } from "react";

export default function ContentUnavailable() {
  const [progressValue, setProgressValue] = useState(0);
  const [activeTab, setActiveTab] = useState("upcoming");
  
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(65), 500);
    return () => clearTimeout(timer);
  }, []);

  // تفاصيل المحتوى القادم قريباً
  const upcomingContent = [
    {
      title: "دروس في التفسير",
      description: "شرح وتفسير آيات من القرآن الكريم بأسلوب ميسر مع أمثلة توضيحية ومعاني مفردات",
      date: "١٧ رمضان ١٤٤٥",
      progress: 80,
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      tag: "تفسير"
    },
    {
      title: "أحاديث نبوية مختارة",
      description: "مجموعة من الأحاديث النبوية الشريفة مع شرح مبسط وفوائد فقهية وأحكام مستنبطة",
      date: "٢٣ رمضان ١٤٤٥",
      progress: 65,
      icon: <BookMarked className="h-5 w-5 text-secondary" />,
      tag: "حديث"
    },
    {
      title: "محاضرات دينية",
      description: "محاضرات في العقيدة والفقه والسيرة النبوية مع دروس مستفادة وتطبيقات عملية",
      date: "بعد العيد",
      progress: 40,
      icon: <Users className="h-5 w-5 text-accent" />,
      tag: "دروس"
    },
    {
      title: "تلاوات قرآنية خاشعة",
      description: "مجموعة من التلاوات المميزة لمشاهير القراء مع إمكانية الاستماع والتحميل",
      date: "قريباً",
      progress: 30,
      icon: <BookText className="h-5 w-5 text-indigo-500" />,
      tag: "تلاوات"
    },
    {
      title: "أذكار وأدعية مصورة",
      description: "أذكار الصباح والمساء والنوم وأدعية مأثورة مع تصاميم جميلة قابلة للمشاركة",
      date: "قريباً",
      progress: 55,
      icon: <Heart className="h-5 w-5 text-red-500" />,
      tag: "أذكار"
    },
    {
      title: "مسابقات قرآنية تفاعلية",
      description: "مسابقات في حفظ القرآن الكريم وتفسيره مع جوائز قيمة للفائزين",
      date: "شوال ١٤٤٥",
      progress: 25,
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
      tag: "مسابقات"
    }
  ];
  
  // اقتراحات محتوى بديل
  const alternativeContent = [
    {
      title: "قراءة القرآن الكريم",
      description: "يمكنك قراءة القرآن الكريم كاملاً مع التفسير المبسط والتلاوة",
      icon: <BookOpen className="h-5 w-5" />,
      link: "/quran"
    },
    {
      title: "الأذكار والأدعية",
      description: "مجموعة من الأذكار والأدعية اليومية مع العدّاد التفاعلي",
      icon: <Moon className="h-5 w-5" />,
      link: "/azkar"
    },
    {
      title: "مواقيت الصلاة",
      description: "تعرف على مواقيت الصلاة حسب موقعك مع إمكانية ضبط التنبيهات",
      icon: <BellRing className="h-5 w-5" />,
      link: "/"
    },
    {
      title: "اتجاه القبلة",
      description: "تحديد اتجاه القبلة بدقة عالية باستخدام البوصلة الرقمية",
      icon: <Compass className="h-5 w-5" />,
      link: "/"
    }
  ];
  
  // رسائل تحفيزية
  const motivationalQuotes = [
    { text: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ", source: "سورة الإسراء - الآية 82" },
    { text: "إِنَّ هَذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ", source: "سورة الإسراء - الآية 9" },
    { text: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا", source: "سورة المزمل - الآية 4" }
  ];
  
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <PageContainer title="المحتوى غير متاح حالياً" showBackButton>
      <div className="container mx-auto px-4 py-8">
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-700">المحتوى غير متاح حالياً</AlertTitle>
          <AlertDescription className="text-amber-600">
            نعتذر، المحتوى الذي تبحث عنه قيد التطوير. نعمل بجد لإضافة محتوى جديد وقيّم.
          </AlertDescription>
        </Alert>
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex p-3 mb-6 rounded-xl bg-primary/10">
            <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-primary">نعمل على تطوير محتوى جديد</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            المحتوى الذي تبحث عنه قيد التطوير والإعداد. فريقنا يعمل بجد لإثراء التطبيق بمحتوى متميز
            يليق بكتاب الله تعالى ويساعدك على التقرب منه وفهمه بشكل أفضل.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Home className="h-4 w-4" />
                <span>العودة للرئيسية</span>
              </Button>
            </Link>
            <Link href="/quran">
              <Button variant="outline" size="lg" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span>تصفح القرآن الكريم</span>
              </Button>
            </Link>
          </div>
          
          <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/10 text-center mt-8">
            <div className="text-secondary font-bold mb-2">اكتمال المحتوى الإجمالي</div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>قيد التطوير</span>
              <span>{progressValue}%</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        </div>

        <Separator className="my-10" />
        
        <div className="mb-10">
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">استكشف المزيد</h2>
              <TabsList>
                <TabsTrigger value="upcoming">قادم قريباً</TabsTrigger>
                <TabsTrigger value="alternative">محتوى بديل</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="upcoming" className="pt-2">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingContent.map((item, index) => (
                  <Card key={index} className="transition-all hover:shadow-md overflow-hidden border-t-4" style={{borderTopColor: `var(--${index % 2 === 0 ? 'primary' : 'secondary'})`}}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                            {item.icon}
                          </div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className="text-xs font-normal">
                          {item.tag}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <CardDescription className="text-sm leading-relaxed">{item.description}</CardDescription>
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>نسبة الإنجاز</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-1" />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 ml-1" />
                        متوقع: {item.date}
                      </p>
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2 rounded-full">
                        <Bell className="h-3 w-3 ml-1" />
                        تنبيه عند التوفر
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="link" className="text-primary gap-1 text-sm">
                  <span>عرض كل المحتوى القادم</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="alternative">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {alternativeContent.map((item, index) => (
                  <Link key={index} href={item.link}>
                    <Card className="transition-all hover:border-primary h-full cursor-pointer hover:bg-primary/5">
                      <CardHeader>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {item.icon}
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm">{item.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="text-xs text-primary p-0 h-auto">
                          اكتشف المزيد
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="my-10" />
        
        <div className="mt-8 text-center rounded-lg p-10 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="inline-flex p-3 mb-6 rounded-full bg-white/80 shadow-sm">
            <BookMarked className="h-6 w-6 text-primary" />
          </div>
          <blockquote className="font-arabic text-xl font-medium mb-4 max-w-2xl mx-auto leading-relaxed">
            "{randomQuote.text}"
          </blockquote>
          <p className="text-sm text-muted-foreground">{randomQuote.source}</p>
          
          <div className="mt-10 max-w-lg mx-auto">
            <h3 className="font-bold mb-4">نريد سماع رأيك!</h3>
            <p className="text-sm text-muted-foreground mb-4">ساعدنا في تحسين التطبيق من خلال اقتراحاتك</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="ما هو المحتوى الذي تفضل إضافته؟"
                className="flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} القرآن الكريم - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
import { 
  Home, 
  Clock, 
  BookOpen, 
  Bookmark, 
  Calendar, 
  BellRing, 
  Heart, 
  BookText, 
  Users, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  BookMarked,
  LayoutGrid,
  ArrowUpRight,
  Moon,
  Compass,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageContainer from "@/components/layout/PageContainer";
import { useState, useEffect } from "react";

export default function ContentUnavailable() {
  const [progressValue, setProgressValue] = useState(0);
  const [activeTab, setActiveTab] = useState("upcoming");
  
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(65), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // ميزات قادمة
  const upcomingFeatures = [
    {
      title: "ترجمة القرآن الكريم",
      description: "إضافة ترجمات للقرآن الكريم بلغات متعددة",
      progress: 75,
      eta: "قريباً"
    },
    {
      title: "تلاوات صوتية",
      description: "الاستماع للقرآن الكريم بأصوات قراء مختلفين",
      progress: 60,
      eta: "خلال أسبوعين"
    },
    {
      title: "تفسير الآيات",
      description: "تفسير مفصل للآيات من كتب التفسير المعتمدة",
      progress: 40,
      eta: "خلال شهر"
    },
    {
      title: "مواقيت الصلاة",
      description: "عرض مواقيت الصلاة حسب الموقع الجغرافي",
      progress: 30,
      eta: "قيد التطوير"
    },
  ];
  
  // ميزات بديلة
  const alternativeFeatures = [
    {
      title: "قراءة القرآن الكريم",
      description: "قراءة القرآن الكريم مع إمكانية العلامات المرجعية",
      icon: <BookOpen className="h-5 w-5" />,
      link: "/quran"
    },
    {
      title: "أذكار الصباح والمساء",
      description: "مجموعة من الأذكار المأثورة للصباح والمساء",
      icon: <Moon className="h-5 w-5" />,
      link: "/azkar"
    },
    {
      title: "حفظ الآيات المفضلة",
      description: "حفظ الآيات المفضلة للرجوع إليها لاحقاً",
      icon: <Heart className="h-5 w-5" />,
      link: "/quran"
    },
    {
      title: "تفسير الأحلام",
      description: "البحث في قاموس تفسير الأحلام",
      icon: <BookText className="h-5 w-5" />,
      link: "/tafseer-dreams"
    },
    {
      title: "إمكانية ضبط التنبيهات",
      icon: <BellRing className="h-5 w-5" />,
      link: "/"
    },
    {
      title: "اتجاه القبلة",
      description: "تحديد اتجاه القبلة بدقة عالية باستخدام البوصلة الرقمية",
      icon: <Compass className="h-5 w-5" />,
      link: "/"
    }
  ];
  
  // رسائل تحفيزية
  const motivationalQuotes = [
    { text: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ", source: "سورة الإسراء - الآية 82" },
    { text: "إِنَّ هَذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ", source: "سورة الإسراء - الآية 9" },
    { text: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا", source: "سورة المزمل - الآية 4" }
  ];
  
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <PageContainer title="المحتوى غير متاح حالياً" showBackButton>
      <div className="container mx-auto px-4 py-8">
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-700">المحتوى غير متاح حالياً</AlertTitle>
          <AlertDescription className="text-amber-600">
            نعتذر، المحتوى الذي تبحث عنه غير متاح حالياً. يتم العمل على إضافة هذه الميزة قريباً.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="upcoming" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="upcoming">ميزات قادمة</TabsTrigger>
            <TabsTrigger value="alternatives">بدائل متاحة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="ml-2 h-5 w-5 text-primary-custom" />
                  ميزات قيد التطوير
                </CardTitle>
                <CardDescription>
                  نعمل بجد على إضافة هذه الميزات في أقرب وقت ممكن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingFeatures.map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{feature.title}</h3>
                        <Badge variant="outline">{feature.eta}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>التقدم</span>
                          <span>{feature.progress}%</span>
                        </div>
                        <Progress value={feature.progress} className="h-2" />
                      </div>
                      {index < upcomingFeatures.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  اقتراح ميزة جديدة
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="alternatives" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LayoutGrid className="ml-2 h-5 w-5 text-primary-custom" />
                  ميزات بديلة متاحة
                </CardTitle>
                <CardDescription>
                  يمكنك الاستفادة من هذه الميزات المتاحة حالياً
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alternativeFeatures.map((feature, index) => (
                    <Link key={index} href={feature.link}>
                      <Card className="h-full cursor-pointer hover:bg-gray-50 transition-colors">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <div className="p-2 rounded-full bg-primary-light mr-2 text-primary-custom">
                              {feature.icon}
                            </div>
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        {feature.description && (
                          <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </CardContent>
                        )}
                        <CardFooter className="pt-0">
                          <Button variant="ghost" size="sm" className="text-primary-custom p-0 h-auto">
                            <span>استخدام الآن</span>
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="bg-primary-light/30 border-primary-light">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookMarked className="ml-2 h-5 w-5 text-primary-custom" />
              آية اليوم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-r-4 border-primary-custom pr-4 py-2 italic">
              <p className="text-lg font-uthmani">{randomQuote.text}</p>
              <footer className="text-sm text-muted-foreground mt-2">— {randomQuote.source}</footer>
            </blockquote>
          </CardContent>
          <CardFooter>
            <Link href="/quran">
              <Button className="w-full bg-primary-custom hover:bg-primary-custom/90">
                قراءة القرآن الكريم
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
}
