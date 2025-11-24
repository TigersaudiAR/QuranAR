import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { BookOpen, TrendingUp, Plus, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

export default function MemorizationPage() {
  return (
    <ProtectedRoute>
      <MemorizationDashboard />
    </ProtectedRoute>
  );
}

function MemorizationDashboard() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'SURAH' | 'PAGE'>('SURAH');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: setsData } = useQuery({
    queryKey: ['memorization-sets'],
    queryFn: async () => {
      const response = await axios.get('/api/memorization/sets');
      return response.data.sets;
    },
  });

  const createSetMutation = useMutation({
    mutationFn: async (data: { title: string; type: string }) => {
      const response = await axios.post('/api/memorization/sets', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memorization-sets'] });
      toast({
        title: 'Success',
        description: 'Memorization set created successfully',
      });
      setOpen(false);
      setTitle('');
      setType('SURAH');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create set',
        variant: 'destructive',
      });
    },
  });

  const handleCreateSet = (e: React.FormEvent) => {
    e.preventDefault();
    createSetMutation.mutate({ title, type });
  };

  const sets = setsData || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-amber-900 mb-2">My Memorization</h1>
            <p className="text-gray-600">Track your Quran memorization progress</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Set
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Memorization Set</DialogTitle>
                <DialogDescription>
                  Create a new set to track your Quran memorization
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSet}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Juz 30, Surah Al-Baqarah"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={type} onValueChange={(value: any) => setType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SURAH">Surah</SelectItem>
                        <SelectItem value="PAGE">Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createSetMutation.isPending}>
                    {createSetMutation.isPending ? 'Creating...' : 'Create Set'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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

                    <Button 
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      onClick={() => setLocation(`/mushaf?setId=${set.id}`)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Review
                    </Button>
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
