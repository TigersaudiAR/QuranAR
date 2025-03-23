import { useState } from "react";
import { Link } from "wouter";
import { useAllSurahs } from "@/lib/hooks/useQuran";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";

const SURAHS_PER_PAGE = 24;

const SurahList = () => {
  const { surahs, isLoading } = useAllSurahs();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">فهرس السور</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!surahs || surahs.length === 0) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">فهرس السور</h3>
        <p className="text-center text-gray-600">لا توجد سور متاحة حاليًا</p>
      </div>
    );
  }

  const totalPages = Math.ceil(surahs.length / SURAHS_PER_PAGE);
  const startIdx = (currentPage - 1) * SURAHS_PER_PAGE;
  const visibleSurahs = surahs.slice(startIdx, startIdx + SURAHS_PER_PAGE);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">فهرس السور</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {visibleSurahs.map((surah) => (
          <Link key={surah.id} href={`/quran/${surah.id}`}>
            <a className="block p-4 border rounded-lg text-center hover:bg-primary-light hover:border-primary-custom transition">
              <span className="block text-lg font-bold">{surah.name}</span>
              <span className="block text-gray-600 text-sm">{surah.versesCount} آيات</span>
            </a>
          </Link>
        ))}
      </div>
      
      {/* Page Navigation */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition mx-1"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsRight size={20} />
          </Button>
          <Button 
            variant="outline"
            className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition mx-1"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronRight size={20} />
          </Button>
          <div className="flex items-center mx-4">
            <span className="px-3 py-1 bg-primary-custom text-white rounded-md">{currentPage}</span>
            <span className="px-2 text-gray-600">من</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md">{totalPages}</span>
          </div>
          <Button 
            variant="outline"
            className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition mx-1"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronLeft size={20} />
          </Button>
          <Button 
            variant="outline"
            className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition mx-1"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsLeft size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SurahList;
