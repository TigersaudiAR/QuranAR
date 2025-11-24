import { Link } from 'react-router-dom';
import { User } from '../utils/api';
import lessonsData from '../data/tajweed-lessons.json';

interface LessonsProps {
  user: User | null;
  onLogout: () => void;
}

const Lessons = ({ user, onLogout }: LessonsProps) => {
  const categories = ['all', 'tajweed', 'arabic', 'fiqh'];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredLessons = selectedCategory === 'all'
    ? lessonsData
    : lessonsData.filter(l => l.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600">QuranAR</Link>
              <span className="text-gray-700">Lessons</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">{user.name}</span>
                  <button onClick={onLogout} className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Educational Lessons</h2>

          <div className="mb-6 flex space-x-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md capitalize ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-sm text-blue-600 uppercase mb-2">{lesson.category}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                <p className="text-gray-600">{lesson.description}</p>
              </Link>
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600">No lessons found in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

import { useState } from 'react';

export default Lessons;
