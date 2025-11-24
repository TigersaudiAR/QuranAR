import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../utils/api';

interface MushafViewerProps {
  user: User | null;
  onLogout: () => void;
}

const MushafViewer = ({ user, onLogout }: MushafViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 604;

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handleNext();
    if (e.key === 'ArrowRight') handlePrevious();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-400">QuranAR</Link>
              <span className="text-gray-300">Mushaf Viewer</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user?.name}</span>
              <button onClick={onLogout} className="px-4 py-2 text-sm text-gray-300 hover:text-white">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-8 px-4">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous (→)
            </button>
            <div className="text-center">
              <p className="text-lg">Page {currentPage} of {totalPages}</p>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) setCurrentPage(page);
                }}
                className="w-24 mt-2 px-3 py-1 bg-gray-700 rounded text-center"
              />
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next (←)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-center min-h-[600px] bg-gray-100 rounded">
            <div className="text-center text-gray-600">
              <p className="text-xl mb-2">Page {currentPage}</p>
              <p className="text-sm">
                Quran page images should be placed in <code>frontend/public/quran/</code>
              </p>
              <p className="text-sm mt-2">
                Expected filename: <code>{String(currentPage).padStart(3, '0')}.jpg</code>
              </p>
              <img
                src={`/quran/${String(currentPage).padStart(3, '0')}.jpg`}
                alt={`Quran Page ${currentPage}`}
                className="mt-4 max-w-full h-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-400 text-sm">
          Use arrow keys: ← (next) | → (previous)
        </div>
      </main>
    </div>
  );
};

export default MushafViewer;
