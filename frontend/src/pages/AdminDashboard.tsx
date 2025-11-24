import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, adminAPI } from '../utils/api';

interface AdminDashboardProps {
  user: User | null;
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'users' | 'lessons' | 'categories' | 'dhikr' | 'halaqat'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [dhikr, setDhikr] = useState<any[]>([]);
  const [halaqat, setHalaqat] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const response = await adminAPI.getUsers();
        setUsers(response.data.users);
      } else if (activeTab === 'lessons') {
        const response = await adminAPI.getLessons();
        setLessons(response.data.lessons);
      } else if (activeTab === 'categories') {
        const response = await adminAPI.getCategories();
        setCategories(response.data.categories);
      } else if (activeTab === 'dhikr') {
        const response = await adminAPI.getDhikr();
        setDhikr(response.data.adhkar);
      } else if (activeTab === 'halaqat') {
        const response = await adminAPI.getHalaqat();
        setHalaqat(response.data.halaqat);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600">QuranAR</Link>
              <span className="text-gray-700">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.name}</span>
              <button onClick={onLogout} className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {(['users', 'lessons', 'categories', 'dhikr', 'halaqat'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {activeTab === 'users' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Users</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((u) => (
                          <tr key={u.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'lessons' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Lessons</h3>
                  <div className="space-y-4">
                    {lessons.map((lesson) => (
                      <div key={lesson.id} className="p-4 border border-gray-200 rounded">
                        <h4 className="font-semibold">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">Category: {lesson.category?.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Lesson Categories</h3>
                  <div className="space-y-4">
                    {categories.map((cat) => (
                      <div key={cat.id} className="p-4 border border-gray-200 rounded">
                        <h4 className="font-semibold">{cat.name}</h4>
                        <p className="text-sm text-gray-600">Lessons: {cat._count?.lessons || 0}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'dhikr' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Adhkar</h3>
                  <div className="space-y-4">
                    {dhikr.map((d) => (
                      <div key={d.id} className="p-4 border border-gray-200 rounded">
                        <h4 className="font-semibold">{d.title}</h4>
                        <p className="text-sm text-gray-600">Category: {d.category} | Reps: {d.repetitions}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'halaqat' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Halaqat</h3>
                  <div className="space-y-4">
                    {halaqat.map((h) => (
                      <div key={h.id} className="p-4 border border-gray-200 rounded">
                        <h4 className="font-semibold">{h.name}</h4>
                        <p className="text-sm text-gray-600">
                          Teacher: {h.teacher?.name} | Members: {h._count?.members || 0}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
