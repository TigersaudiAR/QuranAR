import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MushafPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  const totalPages = 604;

  useEffect(() => {
    const savedPage = localStorage.getItem('mushafPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mushafPage', currentPage.toString());
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const pageNumber = currentPage.toString().padStart(3, '0');

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Header */}
      {showInfo && (
        <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Mushaf Viewer</h1>
            <div className="flex items-center gap-2">
              <label htmlFor="pageInput" className="text-sm">
                Page:
              </label>
              <input
                id="pageInput"
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value))}
                className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white"
              />
              <span className="text-sm text-gray-400">/ {totalPages}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfo(false)}
            className="text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Info Button (when header is hidden) */}
      {!showInfo && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowInfo(true)}
          className="absolute top-4 right-4 z-10 text-white hover:bg-gray-800"
        >
          <Info className="h-5 w-5" />
        </Button>
      )}

      {/* Main Viewer Area */}
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Left Navigation Zone */}
        <button
          onClick={goToPreviousPage}
          className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start pl-4 hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer group"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Image Container */}
        <div className="max-w-4xl mx-auto">
          <img
            src={`/quran/pages/${pageNumber}.jpg`}
            alt={`Quran Page ${currentPage}`}
            className="w-full h-auto shadow-2xl"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-quran-page.jpg';
            }}
          />
        </div>

        {/* Right Navigation Zone */}
        <button
          onClick={goToNextPage}
          className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end pr-4 hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer group"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Footer */}
      {showInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center z-10">
          <p className="text-sm text-gray-300">
            Use arrow keys or click on the sides to navigate • Press{' '}
            <kbd className="px-2 py-1 bg-gray-800 rounded">←</kbd> or{' '}
            <kbd className="px-2 py-1 bg-gray-800 rounded">→</kbd> to navigate
          </p>
        </div>
      )}
    </div>
  );
}
