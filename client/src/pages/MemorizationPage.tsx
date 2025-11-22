import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { BookOpen, TrendingUp } from 'lucide-react';

export default function MemorizationPage() {
  return (
    <ProtectedRoute>
      <MemorizationDashboard />
    </ProtectedRoute>
  );
}

function MemorizationDashboard() {
  const { data: setsData } = useQuery({
    queryKey: ['memorization-sets'],
    queryFn: async () => {
      const response = await axios.get('/api/memorization/sets');
      return response.data.sets;
    },
  });

  const sets = setsData || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">My Memorization</h1>
          <p className="text-gray-600">Track your Quran memorization progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sets.map((set: any) => {
            const totalItems = set.items?.length || 0;
            const masteredItems =
              set.items?.filter((item: any) => item.status === 'MASTERED').length || 0;
            const inProgressItems =
              set.items?.filter((item: any) => item.status === 'IN_PROGRESS').length || 0;
            const progress = totalItems > 0 ? (masteredItems / totalItems) * 100 : 0;

            return (
              <Card key={set.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-amber-50">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-amber-600" />
                    <CardTitle className="text-xl">{set.title}</CardTitle>
                  </div>
                  <CardDescription className="capitalize">{set.type}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-amber-600 h-2.5 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <div className="font-semibold text-green-600">{masteredItems}</div>
                        <div className="text-xs text-gray-500">Mastered</div>
                      </div>
                      <div>
                        <div className="font-semibold text-yellow-600">{inProgressItems}</div>
                        <div className="text-xs text-gray-500">In Progress</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-600">{totalItems}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {sets.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No memorization sets found</p>
              <p className="text-sm mt-2">Create your first set to start tracking your progress</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
