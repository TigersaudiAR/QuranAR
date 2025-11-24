import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { School, Calendar, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function HalaqatPage() {
  return (
    <ProtectedRoute>
      <HalaqatList />
    </ProtectedRoute>
  );
}

function HalaqatList() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: halaqatData } = useQuery({
    queryKey: ['halaqat'],
    queryFn: async () => {
      const response = await axios.get('/api/halaqat');
      return response.data.halaqat;
    },
  });

  const { data: assignmentsData } = useQuery({
    queryKey: ['assignments'],
    queryFn: async () => {
      const response = await axios.get('/api/assignments');
      return response.data.assignments;
    },
  });

  const createHalaqahMutation = useMutation({
    mutationFn: async (data: { name: string; description?: string; schedule?: string }) => {
      const response = await axios.post('/api/halaqat', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['halaqat'] });
      toast({
        title: 'Success',
        description: 'Halaqah created successfully',
      });
      setOpen(false);
      setName('');
      setDescription('');
      setSchedule('');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create halaqah',
        variant: 'destructive',
      });
    },
  });

  const handleCreateHalaqah = (e: React.FormEvent) => {
    e.preventDefault();
    createHalaqahMutation.mutate({ name, description, schedule });
  };

  const halaqat = halaqatData || [];
  const assignments = assignmentsData || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-purple-900 mb-2">My Halaqat</h1>
            <p className="text-gray-600">
              {user?.role === 'TEACHER' ? 'Manage your study circles' : 'Your study circles'}
            </p>
          </div>
          {(user?.role === 'TEACHER' || user?.role === 'ADMIN') && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Halaqah
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Study Circle</DialogTitle>
                  <DialogDescription>
                    Create a new halaqah to teach and track students
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateHalaqah}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Evening Quran Study"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the halaqah"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input
                        id="schedule"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                        placeholder="e.g., Mon, Wed, Fri 7:00 PM"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={createHalaqahMutation.isPending}>
                      {createHalaqahMutation.isPending ? 'Creating...' : 'Create Halaqah'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {user?.role === 'STUDENT' && assignments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Assignments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map((assignment: any) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{assignment.halaqah.name}</CardTitle>
                    <CardDescription>
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Range: {assignment.rangeStart} - {assignment.rangeEnd}
                    </p>
                    <p className="text-sm">
                      Status:{' '}
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          assignment.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : assignment.status === 'IN_PROGRESS'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Study Circles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {halaqat.map((halaqah: any) => (
              <Card key={halaqah.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-purple-50">
                  <div className="flex items-center gap-2 mb-2">
                    <School className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-xl">{halaqah.name}</CardTitle>
                  </div>
                  {halaqah.description && (
                    <CardDescription>{halaqah.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        {halaqah.teacher?.name ||
                          halaqah.members?.find((m: any) => m.role === 'TEACHER')?.user?.name ||
                          'Teacher'}
                      </span>
                    </div>
                    {halaqah.schedule && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{halaqah.schedule}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        {halaqah._count?.members || halaqah.members?.length || 0} members
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {halaqat.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <School className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No halaqat found</p>
                <p className="text-sm mt-2">
                  {user?.role === 'TEACHER'
                    ? 'Create your first study circle to get started'
                    : 'Join a study circle to start learning'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
