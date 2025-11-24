import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, halaqatAPI } from '../utils/api';

interface HalaqatProps {
  user: User | null;
  onLogout: () => void;
}

const Halaqat = ({ user, onLogout }: HalaqatProps) => {
  const [halaqat, setHalaqat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', schedule: '' });

  useEffect(() => {
    loadHalaqat();
  }, []);

  const loadHalaqat = async () => {
    try {
      const response = await halaqatAPI.getHalaqat();
      setHalaqat(response.data.halaqat);
    } catch (error) {
      console.error('Error loading halaqat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await halaqatAPI.createHalaqah(formData);
      setFormData({ name: '', description: '', schedule: '' });
      setShowCreateForm(false);
      loadHalaqat();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error creating halaqah');
    }
  };

  const canCreateHalaqah = user?.role === 'TEACHER' || user?.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600">QuranAR</Link>
              <span className="text-gray-700">Halaqat</span>
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Study Circles (Halaqat)</h2>
            {canCreateHalaqah && (
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {showCreateForm ? 'Cancel' : 'Create Halaqah'}
              </button>
            )}
          </div>

          {showCreateForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Create New Halaqah</h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                  <input
                    type="text"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Every Saturday at 10 AM"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : halaqat.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600">No halaqat available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {halaqat.map((halaqah) => (
                <div key={halaqah.id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{halaqah.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Teacher: {halaqah.teacher?.name}
                  </p>
                  {halaqah.description && (
                    <p className="text-sm text-gray-600 mb-2">{halaqah.description}</p>
                  )}
                  {halaqah.schedule && (
                    <p className="text-sm text-gray-500 mb-2">📅 {halaqah.schedule}</p>
                  )}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Members: {halaqah._count?.members || 0} | Assignments: {halaqah._count?.assignments || 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Halaqat;
