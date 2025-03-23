import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import LastReadSection from "@/components/home/LastReadSection";
import FeatureCard from "@/components/home/FeatureCard";

// تعريف بيانات القوائم الرئيسية
const FEATURES = [
  {
    title: "القرآن الكريم",
    description: "قراءة وتلاوة القرآن الكريم بخط واضح",
    icon: "menu_book",
    href: "/quran",
    count: "١١٤ سورة",
    colorScheme: "secondary" as const,
  },
  {
    title: "الأذكار والأدعية",
    description: "أذكار وأدعية من الكتاب والسنة",
    icon: "favorite",
    href: "/azkar",
    count: "أذكار اليوم",
    colorScheme: "accent" as const,
  },
  {
    title: "الأحاديث النبوية",
    description: "مجموعة من الأحاديث النبوية الصحيحة",
    icon: "history_edu",
    href: "/hadith",
    count: "حسب التصنيف",
    colorScheme: "primary" as const,
  },
  {
    title: "تفسير الأحلام",
    description: "تفسير الأحلام وفق الكتاب والسنة",
    icon: "bedtime",
    href: "/dreams",
    count: "استشارة",
    colorScheme: "primary" as const,
  },
  {
    title: "تواصل مع العلماء",
    description: "استشارات دينية مع نخبة من العلماء",
    icon: "question_answer",
    href: "/ask",
    count: "اسأل سؤالك",
    colorScheme: "secondary" as const,
  },
  {
    title: "أوقات الصلاة",
    description: "مواقيت الصلاة حسب موقعك",
    icon: "schedule",
    href: "/prayer-times",
    count: "التنبيهات",
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
          <div className="grid grid-cols-2 gap-4">
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