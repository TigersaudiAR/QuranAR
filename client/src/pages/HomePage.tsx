import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import LastReadSection from "@/components/home/LastReadSection";
import FeatureCard from "@/components/home/FeatureCard";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Moon, 
  BookText,
  Compass, 
  MapPin,
  Video,
  ArrowRight,
  Heart
} from "lucide-react";

// تعريف بيانات القوائم الرئيسية مع أيقونات Lucide
const FEATURES = [
  {
    title: "القرآن الكريم",
    description: "قراءة وتلاوة القرآن الكريم بخط واضح",
    icon: <BookOpen className="h-5 w-5" />,
    href: "/quran",
    count: "١١٤ سورة",
    colorScheme: "secondary" as const,
  },
  {
    title: "الأذكار والأدعية",
    description: "أذكار وأدعية من الكتاب والسنة",
    icon: <Moon className="h-5 w-5" />,
    href: "/azkar",
    count: "أذكار اليوم",
    colorScheme: "accent" as const,
  },
  {
    title: "التعلم",
    description: "دروس في العلوم الشرعية واللغة العربية",
    icon: <BookText className="h-5 w-5" />,
    href: "/learn",
    count: "دروس متنوعة",
    colorScheme: "primary" as const,
  },
  {
    title: "التفسير والأحلام",
    description: "تفسير القرآن الكريم والأحلام",
    icon: <Compass className="h-5 w-5" />,
    href: "/tafseer",
    count: "تفسير الأحلام",
    colorScheme: "primary" as const,
  },
  {
    title: "الحج والعمرة",
    description: "دليل مناسك الحج والعمرة وأدعية الزيارة",
    icon: <MapPin className="h-5 w-5" />,
    href: "/hajj-umrah",
    count: "مناسك وأدعية",
    colorScheme: "secondary" as const,
  },
  {
    title: "المحاضرات المباشرة",
    description: "محاضرات وخطب مباشرة من العلماء والدعاة",
    icon: <Video className="h-5 w-5" />,
    href: "/live",
    count: "مباشر",
    colorScheme: "accent" as const,
  },
];

const HomePage = () => {
  // الآية من سورة الإسراء
  const quranVerse = "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ";
  
  return (
    <div className="min-h-screen pb-20">
      <Header />

      <main>
        {/* قسم الترحيب - Hero Section */}
        <div className="bg-gradient-to-b from-primary/5 to-transparent py-10 mb-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">القرآن الكريم</h1>
              <p className="text-xl mb-6 font-arabic text-gray-700 max-w-2xl">
                {quranVerse}
              </p>
              <p className="text-sm text-muted-foreground mb-8">سورة الإسراء: ٨٢</p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <a href="/quran">
                    <BookOpen className="h-5 w-5" />
                    <span>بدء القراءة</span>
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="/learn">
                    <BookText className="h-5 w-5" />
                    <span>تعلم القراءة</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Last Read Section */}
          <div className="mb-10">
            <LastReadSection />
          </div>

          {/* شريط مميز */}
          <div className="bg-primary/5 rounded-xl p-4 mb-10 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Heart className="h-8 w-8 text-primary mr-3" />
              <div>
                <h3 className="font-bold">مع القرآن في رمضان</h3>
                <p className="text-sm text-muted-foreground">شارك في ختمة القرآن الجماعية</p>
              </div>
            </div>
            <Button size="sm" className="gap-2" asChild>
              <a href="#">
                <span>الانضمام</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Main Grid Layout - نظام العرض الشبكي المحسن */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">الخدمات الإسلامية</h2>
              <Button variant="ghost" size="sm" className="text-primary gap-2" asChild>
                <a href="#">
                  <span>عرض المزيد</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            {/* القسم الأول - الخدمات الرئيسية */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-primary">المصحف والأذكار</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {FEATURES.slice(0, 2).map((feature, index) => (
                  <FeatureCard
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    href={feature.href}
                    count={feature.count}
                    colorScheme={feature.colorScheme}
                  />
                ))}
              </div>
            </div>
            
            {/* القسم الثاني - الخدمات التعليمية */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-primary">التعلم والتفسير</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {FEATURES.slice(2, 4).map((feature, index) => (
                  <FeatureCard
                    key={index + 2}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    href={feature.href}
                    count={feature.count}
                    colorScheme={feature.colorScheme}
                  />
                ))}
              </div>
            </div>
            
            {/* القسم الثالث - الخدمات الإضافية */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">خدمات إضافية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {FEATURES.slice(4, 6).map((feature, index) => (
                  <FeatureCard
                    key={index + 4}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    href={feature.href}
                    count={feature.count}
                    colorScheme={feature.colorScheme}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;