import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import LastReadSection from "@/components/home/LastReadSection";
import FeatureCard from "@/components/home/FeatureCard";
import { 
  BookOpen, 
  Moon, 
  BookText,
  Compass, 
  MapPin,
  Video,
  Clock,
  MessageSquare
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
  return (
    <div className="min-h-screen pb-20">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Last Read Section */}
        <LastReadSection />

        {/* Main Grid Layout - نظام العرض الشبكي */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">الخدمات الإسلامية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, index) => (
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
      </main>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;