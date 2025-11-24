import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, memorizationAPI } from '../utils/api';

interface MemorizationProps {
  user: User | null;
  onLogout: () => void;
}

const Memorization = ({ user, onLogout }: MemorizationProps) => {
  const [sets, setSets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSetTitle, setNewSetTitle] = useState('');
  const [newSetType, setNewSetType] = useState<'SURAH' | 'PAGE'>('SURAH');

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = async () => {
    try {
      const response = await memorizationAPI.getSets();
      setSets(response.data.sets);
    } catch (error) {
      console.error('Error loading sets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await memorizationAPI.createSet({ title: newSetTitle, type: newSetType });
      setNewSetTitle('');
      setShowCreateForm(false);
      loadSets();
    } catch (error) {
      console.error('Error creating set:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600">QuranAR</Link>
              <span className="text-gray-700">Memorization</span>
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
            <h2 className="text-3xl font-bold text-gray-900">My Memorization Sets</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {showCreateForm ? 'Cancel' : 'New Set'}
            </button>
          </div>

          {showCreateForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Create New Set</h3>
              <form onSubmit={handleCreateSet} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Set Title
                  </label>
                  <input
                    type="text"
                    value={newSetTitle}
                    onChange={(e) => setNewSetTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newSetType}
                    onChange={(e) => setNewSetType(e.target.value as 'SURAH' | 'PAGE')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="SURAH">Surah</option>
                    <option value="PAGE">Page</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Set
                </button>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : sets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600">No memorization sets yet. Create your first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sets.map((set) => (
                <div key={set.id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{set.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Type: {set.type} | Items: {set.items?.length || 0}
                  </p>
                  <div className="space-y-2">
                    {set.items?.map((item: any) => (
                      <div key={item.id} className="text-sm p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.status}</span>
                        {item.surahNumber && ` - Surah ${item.surahNumber}`}
                        {item.pageNumber && ` - Page ${item.pageNumber}`}
                        {item.verseRange && ` (${item.verseRange})`}
                      </div>
                    ))}
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

export default Memorization;
