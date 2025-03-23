import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLastRead } from "@/lib/hooks/useQuran";

const LastReadSection = () => {
  const { lastRead, isLoading } = useLastRead();

  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="bg-primary-light rounded-lg p-6 border border-primary-custom border-opacity-20 animate-pulse h-36">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </section>
    );
  }

  if (!lastRead) {
    return (
      <section className="mb-8">
        <div className="bg-primary-light rounded-lg p-6 border border-primary-custom border-opacity-20">
          <h2 className="text-lg font-bold mb-4">ابدأ رحلتك مع القرآن الكريم</h2>
          <Link href="/quran">
            <Button className="bg-primary-custom hover:bg-primary-custom/90">
              <span className="material-icons ml-1">play_arrow</span>
              ابدأ القراءة
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="bg-primary-light rounded-lg p-6 border border-primary-custom border-opacity-20">
        <h2 className="text-lg font-bold mb-2">تابع القراءة</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">آخر قراءة:</p>
            <p className="font-semibold text-xl">
              سورة {lastRead.surahName} - الآية {lastRead.ayahNumber}
            </p>
            {lastRead.ayahText && (
              <p className="text-gray-600 text-sm mt-1">{lastRead.ayahText}</p>
            )}
          </div>
          <Link href={`/quran/${lastRead.surahId}?ayah=${lastRead.ayahNumber}`}>
            <Button className="bg-primary-custom hover:bg-primary-custom/90">
              <span className="material-icons ml-1">play_arrow</span>
              استئناف
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LastReadSection;
