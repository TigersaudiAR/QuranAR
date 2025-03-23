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

// تعريف بيانات القوائم الرئيسية
const mainFeatures = [
  {
    id: 'quran',
    title: 'القرآن الكريم',
    icon: <BookOpen className="h-8 w-8" />,
    description: 'قراءة القرآن الكريم مع التفسير والترجمة',
    path: '/quran',
    color: 'bg-emerald-50 text-emerald-700',
    iconColor: 'text-emerald-600'
  },
  {
    id: 'azkar',
    title: 'الأذكار',
    icon: <Moon className="h-8 w-8" />,
    description: 'أذكار الصباح والمساء وأذكار متنوعة',
    path: '/azkar',
    color: 'bg-indigo-50 text-indigo-700',
    iconColor: 'text-indigo-600'
  },
  {
    id: 'tafseer',
    title: 'تفسير الأحلام',
    icon: <BookText className="h-8 w-8" />,
    description: 'البحث في تفسير الأحلام بسهولة',
    path: '/tafseer-dreams',
    color: 'bg-purple-50 text-purple-700',
    iconColor: 'text-purple-600'
  },
  {
    id: 'qibla',
    title: 'اتجاه القبلة',
    icon: <Compass className="h-8 w-8" />,
    description: 'تحديد اتجاه القبلة بدقة',
    path: '/qibla',
    color: 'bg-blue-50 text-blue-700',
    iconColor: 'text-blue-600'
  },
  {
    id: 'hajj',
    title: 'الحج والعمرة',
    icon: <MapPin className="h-8 w-8" />,
    description: 'دليل مناسك الحج والعمرة',
    path: '/hajj-umrah',
    color: 'bg-amber-50 text-amber-700',
    iconColor: 'text-amber-600'
  },
  {
    id: 'lectures',
    title: 'دروس مباشرة',
    icon: <Video className="h-8 w-8" />,
    description: 'دروس دينية مباشرة من علماء الأمة',
    path: '/live-lectures',
    color: 'bg-red-50 text-red-700',
    iconColor: 'text-red-600'
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 pb-16">
        <div className="container mx-auto px-4 py-6">
          {/* قسم آخر قراءة */}
          <LastReadSection />

          {/* قسم القوائم الرئيسية */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">القوائم الرئيسية</h2>
              <Button variant="link" size="sm" className="text-primary-custom">
                عرض الكل <ArrowRight className="h-4 w-4 mr-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mainFeatures.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  icon={feature.icon}
                  description={feature.description}
                  path={feature.path}
                  color={feature.color}
                  iconColor={feature.iconColor}
                />
              ))}
            </div>
          </section>

          {/* قسم المفضلة والأذكار */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">اختصارات مفيدة</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-50 flex items-center">
                <div className="p-3 rounded-full bg-white mr-3">
                  <Heart className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-bold text-rose-700">الآيات المفضلة</h3>
                  <p className="text-sm text-rose-600">الآيات التي قمت بتفضيلها</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 flex items-center">
                <div className="p-3 rounded-full bg-white mr-3">
                  <Moon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-700">أذكار الصباح</h3>
                  <p className="text-sm text-blue-600">أذكار بداية اليوم</p>
                </div>
              </div>
            </div>
          </section>

          {/* قسم نصائح وإرشادات */}
          <section className="mt-8">
            <div className="bg-gradient-to-br from-primary-light to-primary-custom/70 rounded-xl p-5 text-white">
              <h3 className="text-xl font-bold mb-2">نصيحة اليوم</h3>
              <p className="mb-3">
                "اقرأ وردك اليومي من القرآن الكريم وحافظ على استمرارية القراءة للحصول على الأجر والثواب"
              </p>
              <Button variant="secondary" size="sm" className="bg-white text-primary-custom hover:bg-gray-100">
                اقرأ المزيد من النصائح
              </Button>
            </div>
          </section>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}