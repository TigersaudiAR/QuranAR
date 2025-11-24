import { useParams, Link } from 'react-router-dom';
import { User } from '../utils/api';
import lessonsData from '../data/tajweed-lessons.json';

interface LessonDetailProps {
  user: User | null;
  onLogout: () => void;
}

const LessonDetail = ({ user, onLogout }: LessonDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const lesson = lessonsData.find(l => l.id === parseInt(id || '0'));

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h2>
          <Link to="/lessons" className="text-blue-600 hover:text-blue-800">
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600">QuranAR</Link>
              <Link to="/lessons" className="text-gray-700 hover:text-gray-900">Lessons</Link>
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

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <Link to="/lessons" className="text-blue-600 hover:text-blue-800">
              ← Back to Lessons
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-sm text-blue-600 uppercase mb-2">{lesson.category}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h1>

            {typeof lesson.content === 'object' && 'introduction' in lesson.content && (
              <div className="prose max-w-none">
                <div className="mb-6">
                  <p className="text-lg text-gray-700">{lesson.content.introduction}</p>
                </div>

                {lesson.content.sections && Array.isArray(lesson.content.sections) && lesson.content.sections.map((section: any, index: number) => (
                  <div key={index} className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonDetail;
