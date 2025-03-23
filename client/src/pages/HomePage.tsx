import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import LastReadSection from "@/components/home/LastReadSection";
import FeatureCard from "@/components/home/FeatureCard";

const features = [
  {
    title: "القرآن الكريم",
    description: "قراءة وتلاوة القرآن الكريم بعدة روايات",
    icon: "auto_stories",
    href: "/quran",
    count: "١١٤ سورة",
    colorScheme: "primary" as const,
  },
  {
    title: "تعلم القراءة",
    description: "دروس تفاعلية لتعلم قراءة القرآن الكريم",
    icon: "school",
    href: "/learn",
    count: "٤ مراحل",
    colorScheme: "secondary" as const,
  },
  {
    title: "المواد التعليمية",
    description: "فيديوهات وكتب تعليمية في العلوم الإسلامية",
    icon: "library_books",
    href: "/education",
    count: "٥ أقسام",
    colorScheme: "accent" as const,
  },
  {
    title: "الحج والعمرة",
    description: "دليل مصور لمناسك الحج والعمرة",
    icon: "mosque",
    href: "/hajj",
    count: "خطوات متكاملة",
    colorScheme: "primary" as const,
  },
  {
    title: "حلقات التحفيظ",
    description: "حلقات افتراضية لتحفيظ القرآن الكريم",
    icon: "groups",
    href: "/halaqat",
    count: "البث المباشر",
    colorScheme: "secondary" as const,
  },
  {
    title: "الفصول الافتراضية",
    description: "دروس مباشرة في العلوم الإسلامية",
    icon: "class",
    href: "/classes",
    count: "جدول الدروس",
    colorScheme: "accent" as const,
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
];

const HomePage = () => {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Last Read Section */}
        <LastReadSection />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
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
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
