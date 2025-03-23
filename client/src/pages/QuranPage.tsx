import { useEffect } from "react";
import { useParams } from "wouter";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import QuranViewer from "@/components/quran/QuranViewer";
import SurahList from "@/components/quran/SurahList";

const QuranPage = () => {
  const params = useParams<{ surahId: string }>();
  const showSurahList = !params.surahId;

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [params.surahId]);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {params.surahId ? (
          <QuranViewer />
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">القرآن الكريم</h2>
              <p className="text-gray-600">
                القرآن الكريم هو كلام الله المنزل على نبيه محمد صلى الله عليه وسلم، المتعبد بتلاوته، المنقول إلينا بالتواتر، المكتوب في المصاحف، المبدوء بسورة الفاتحة، المختوم بسورة الناس.
              </p>
            </div>
            <SurahList />
          </>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default QuranPage;
