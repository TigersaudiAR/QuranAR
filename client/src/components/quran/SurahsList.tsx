import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Surah } from "@/lib/types";
import SurahCard from "./SurahCard";
import { generatePagination } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export default function SurahsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const perPage = 8;

  const { data: allSurahs = [], isLoading } = useQuery<Surah[]>({
    queryKey: ['/api/quran/surahs'],
  });
  
  // Filter surahs based on search query
  const filteredSurahs = allSurahs.filter(surah => 
    surah.name.includes(searchQuery) || 
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.number.toString().includes(searchQuery)
  );
  
  // Paginate
  const totalPages = Math.ceil(filteredSurahs.length / perPage);
  const displayedSurahs = filteredSurahs.slice((currentPage - 1) * perPage, currentPage * perPage);
  
  // Generate pagination array
  const paginationArray = generatePagination(currentPage, totalPages);
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">سور القرآن الكريم</h2>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <Input 
            type="search" 
            className="block w-full p-4 pr-10 text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-primary focus:border-primary" 
            placeholder="ابحث عن سورة أو آية..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Surahs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Loading skeletons
          Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-r-4 border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-2">
                <Skeleton className="w-8 h-8 rounded-full ml-2" />
                <div>
                  <Skeleton className="h-5 w-24 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </div>
          ))
        ) : (
          displayedSurahs.map((surah) => (
            <SurahCard key={surah.id} surah={surah} />
          ))
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <span className="sr-only">السابق</span>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            {paginationArray.map((page, idx) => (
              typeof page === 'number' ? (
                <button
                  key={idx}
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium ${
                    page === currentPage 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={idx} className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                  ...
                </span>
              )
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <span className="sr-only">التالي</span>
              <i className="fas fa-chevron-right"></i>
            </button>
          </nav>
        </div>
      )}
    </section>
  );
}
