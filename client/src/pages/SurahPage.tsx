import { useParams, useLocation } from "wouter";
import Header from "@/components/layout/Header";
import BottomNavbar from "@/components/layout/BottomNavbar";
import SurahView from "@/components/quran/SurahView";

export default function SurahPage() {
  const params = useParams<{ id: string }>();
  const [location] = useLocation();
  const surahId = parseInt(params.id, 10);

  // Extract verse ID from URL query parameter if present
  const getVerseId = () => {
    try {
      const url = new URL(location, window.location.origin);
      const verseParam = url.searchParams.get('verse');
      return verseParam ? parseInt(verseParam, 10) : undefined;
    } catch (e) {
      return undefined;
    }
  };

  const verseId = getVerseId();

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return (
      <div className="min-h-screen pb-16">
        <Header />
        <main className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-bold text-red-500">خطأ في رقم السورة</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            الرجاء التأكد من إدخال رقم سورة صحيح (1-114)
          </p>
        </main>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        <SurahView surahId={surahId} initialVerseId={verseId} />
      </main>
      
      <BottomNavbar />
    </div>
  );
}
