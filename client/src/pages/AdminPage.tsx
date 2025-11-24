import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BookOpen, School, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminDashboard />
    </ProtectedRoute>
  );
}

function AdminDashboard() {
  const [userSearch, setUserSearch] = useState('');
  const [lessonSearch, setLessonSearch] = useState('');
  const [dhikrSearch, setDhikrSearch] = useState('');
  const [openDhikrDialog, setOpenDhikrDialog] = useState(false);
  const [dhikrTitle, setDhikrTitle] = useState('');
  const [dhikrArabicText, setDhikrArabicText] = useState('');
  const [dhikrTransliteration, setDhikrTransliteration] = useState('');
  const [dhikrTranslation, setDhikrTranslation] = useState('');
  const [dhikrCategory, setDhikrCategory] = useState('');
  const [dhikrRepetitions, setDhikrRepetitions] = useState('33');
  const [dhikrReference, setDhikrReference] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: usersData } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const response = await axios.get('/api/admin/users');
      return response.data.users;
    },
  });

  const { data: lessonsData } = useQuery({
    queryKey: ['admin-lessons'],
    queryFn: async () => {
      const response = await axios.get('/api/admin/lessons');
      return response.data.lessons;
    },
  });

  const { data: halaqatData } = useQuery({
    queryKey: ['admin-halaqat'],
    queryFn: async () => {
      const response = await axios.get('/api/admin/halaqat');
      return response.data.halaqat;
    },
  });

  const { data: dhikrData } = useQuery({
    queryKey: ['admin-dhikr'],
    queryFn: async () => {
      const response = await axios.get('/api/admin/dhikr');
      return response.data.adhkar;
    },
  });

  const createDhikrMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post('/api/admin/dhikr', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-dhikr'] });
      toast({
        title: 'Success',
        description: 'Dhikr created successfully',
      });
      setOpenDhikrDialog(false);
      resetDhikrForm();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create dhikr',
        variant: 'destructive',
      });
    },
  });

  const deleteDhikrMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/admin/dhikr/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-dhikr'] });
      toast({
        title: 'Success',
        description: 'Dhikr deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete dhikr',
        variant: 'destructive',
      });
    },
  });

  const resetDhikrForm = () => {
    setDhikrTitle('');
    setDhikrArabicText('');
    setDhikrTransliteration('');
    setDhikrTranslation('');
    setDhikrCategory('');
    setDhikrRepetitions('33');
    setDhikrReference('');
  };

  const handleCreateDhikr = (e: React.FormEvent) => {
    e.preventDefault();
    createDhikrMutation.mutate({
      title: dhikrTitle,
      arabicText: dhikrArabicText,
      transliteration: dhikrTransliteration,
      translation: dhikrTranslation,
      category: dhikrCategory,
      repetitions: parseInt(dhikrRepetitions),
      reference: dhikrReference,
    });
  };

  const users = usersData || [];
  const lessons = lessonsData || [];
  const halaqat = halaqatData || [];
  const adhkar = dhikrData || [];

  const filteredUsers = users.filter((user: any) =>
    user.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredLessons = lessons.filter((lesson: any) =>
    lesson.title?.toLowerCase().includes(lessonSearch.toLowerCase()) ||
    lesson.category?.toLowerCase().includes(lessonSearch.toLowerCase())
  );

  const filteredDhikr = adhkar.filter((dhikr: any) =>
    dhikr.title?.toLowerCase().includes(dhikrSearch.toLowerCase()) ||
    dhikr.category?.toLowerCase().includes(dhikrSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, lessons, and halaqat</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lessons.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Halaqat</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{halaqat.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Dhikr</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adhkar.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="halaqat">Halaqat</TabsTrigger>
            <TabsTrigger value="dhikr">Dhikr</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage platform users</CardDescription>
                <div className="mt-4">
                  <Input
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Role</th>
                        <th className="text-left p-2">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user: any) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-2">{user.name}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {user.role}
                            </span>
                          </td>
                          <td className="p-2 text-sm text-gray-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons">
            <Card>
              <CardHeader>
                <CardTitle>Lessons</CardTitle>
                <CardDescription>Manage educational content</CardDescription>
                <div className="mt-4">
                  <Input
                    placeholder="Search lessons..."
                    value={lessonSearch}
                    onChange={(e) => setLessonSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLessons.map((lesson: any) => (
                    <div key={lesson.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{lesson.title}</h3>
                          <p className="text-sm text-gray-600 capitalize">{lesson.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="halaqat">
            <Card>
              <CardHeader>
                <CardTitle>Halaqat</CardTitle>
                <CardDescription>Manage study circles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {halaqat.map((halaqah: any) => (
                    <div key={halaqah.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{halaqah.name}</h3>
                          <p className="text-sm text-gray-600">
                            Teacher: {halaqah.teacher?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Members: {halaqah._count?.members || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dhikr">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Dhikr</CardTitle>
                    <CardDescription>Manage adhkar and supplications</CardDescription>
                  </div>
                  <Dialog open={openDhikrDialog} onOpenChange={setOpenDhikrDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Dhikr
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Dhikr</DialogTitle>
                        <DialogDescription>
                          Create a new dhikr entry for the platform
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateDhikr}>
                        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                          <div className="space-y-2">
                            <Label htmlFor="dhikr-title">Title</Label>
                            <Input
                              id="dhikr-title"
                              value={dhikrTitle}
                              onChange={(e) => setDhikrTitle(e.target.value)}
                              required
                              placeholder="e.g., Morning Tasbih"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dhikr-arabic">Arabic Text</Label>
                            <Textarea
                              id="dhikr-arabic"
                              value={dhikrArabicText}
                              onChange={(e) => setDhikrArabicText(e.target.value)}
                              required
                              placeholder="سُبْحَانَ اللَّهِ"
                              dir="rtl"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dhikr-transliteration">Transliteration</Label>
                            <Input
                              id="dhikr-transliteration"
                              value={dhikrTransliteration}
                              onChange={(e) => setDhikrTransliteration(e.target.value)}
                              placeholder="Subhan Allah"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dhikr-translation">Translation</Label>
                            <Textarea
                              id="dhikr-translation"
                              value={dhikrTranslation}
                              onChange={(e) => setDhikrTranslation(e.target.value)}
                              placeholder="Glory be to Allah"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dhikr-category">Category</Label>
                            <Input
                              id="dhikr-category"
                              value={dhikrCategory}
                              onChange={(e) => setDhikrCategory(e.target.value)}
                              required
                              placeholder="e.g., morning, evening, general"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dhikr-repetitions">Repetitions</Label>
                            <Input
                              id="dhikr-repetitions"
                              type="number"
                              value={dhikrRepetitions}
                              onChange={(e) => setDhikrRepetitions(e.target.value)}
                              required
                              min="1"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dhikr-reference">Reference</Label>
                            <Input
                              id="dhikr-reference"
                              value={dhikrReference}
                              onChange={(e) => setDhikrReference(e.target.value)}
                              placeholder="e.g., Sahih Muslim"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={createDhikrMutation.isPending}>
                            {createDhikrMutation.isPending ? 'Creating...' : 'Create Dhikr'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-4">
                  <Input
                    placeholder="Search dhikr..."
                    value={dhikrSearch}
                    onChange={(e) => setDhikrSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDhikr.map((dhikr: any) => (
                    <div key={dhikr.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{dhikr.title}</h3>
                          <p className="text-lg text-gray-900 my-2" dir="rtl">{dhikr.arabicText}</p>
                          {dhikr.transliteration && (
                            <p className="text-sm text-gray-600 italic">{dhikr.transliteration}</p>
                          )}
                          {dhikr.translation && (
                            <p className="text-sm text-gray-700 mt-1">{dhikr.translation}</p>
                          )}
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                            <span className="px-2 py-1 bg-gray-100 rounded capitalize">{dhikr.category}</span>
                            <span>Repetitions: {dhikr.repetitions}</span>
                            {dhikr.reference && <span>Ref: {dhikr.reference}</span>}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteDhikrMutation.mutate(dhikr.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
