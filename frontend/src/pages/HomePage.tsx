import { Link } from 'react-router-dom';
import { User } from '../utils/api';
import DhikrCounter from '../components/DhikrCounter';
import adhkarData from '../data/adhkar.json';

interface HomePageProps {
  user: User | null;
  onLogout: () => void;
}

const HomePage = ({ user, onLogout }: HomePageProps) => {
  const morningAdhkar = adhkarData.filter(d => d.category === 'morning');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">QuranAR</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                    Login
                  </Link>
                  <Link to="/register" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to QuranAR
            </h2>
            <p className="text-xl text-gray-600">
              Your comprehensive Islamic learning platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link
              to="/mushaf"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mushaf Viewer</h3>
              <p className="text-gray-600">Read the Quran with beautiful page-by-page display</p>
            </Link>

            <Link
              to="/memorization"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Memorization</h3>
              <p className="text-gray-600">Track your Quran memorization progress</p>
            </Link>

            <Link
              to="/halaqat"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Halaqat</h3>
              <p className="text-gray-600">Join study circles and track assignments</p>
            </Link>

            <Link
              to="/lessons"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lessons</h3>
              <p className="text-gray-600">Learn Tajweed, Arabic, and Islamic knowledge</p>
            </Link>

            {user?.role === 'ADMIN' && (
              <Link
                to="/admin"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Dashboard</h3>
                <p className="text-gray-600">Manage users, lessons, and content</p>
              </Link>
            )}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Morning Adhkar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {morningAdhkar.slice(0, 3).map((dhikr) => (
                <DhikrCounter
                  key={dhikr.id}
                  title={dhikr.title}
                  arabicText={dhikr.arabicText}
                  transliteration={dhikr.transliteration}
                  translation={dhikr.translation}
                  targetCount={dhikr.repetitions}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
