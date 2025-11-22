import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Languages, Gavel } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  category: string;
  content: string;
  orderIndex: number;
}

export default function EducationalPage() {
  const { data: lessonsData } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      const response = await axios.get('/api/lessons');
      return response.data.lessons as Lesson[];
    },
  });

  const lessons = lessonsData || [];

  const renderLessonContent = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      return (
        <div className="space-y-4">
          {parsed.introduction && (
            <p className="text-lg text-gray-700 mb-4">{parsed.introduction}</p>
          )}
          {parsed.sections &&
            parsed.sections.map((section: any, index: number) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
              </div>
            ))}
        </div>
      );
    } catch {
      return <p className="text-gray-700 whitespace-pre-line">{content}</p>;
    }
  };

  const getLessonsByCategory = (category: string) =>
    lessons.filter((l) => l.category === category).sort((a, b) => a.orderIndex - b.orderIndex);

  const tajweedLessons = getLessonsByCategory('tajweed');
  const arabicLessons = getLessonsByCategory('arabic');
  const fiqhLessons = getLessonsByCategory('fiqh');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Educational Content</h1>
          <p className="text-gray-600">Learn about Tajweed, Arabic, and Islamic Jurisprudence</p>
        </div>

        <Tabs defaultValue="tajweed" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tajweed" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Tajweed</span>
            </TabsTrigger>
            <TabsTrigger value="arabic" className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <span>Arabic</span>
            </TabsTrigger>
            <TabsTrigger value="fiqh" className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              <span>Fiqh</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tajweed">
            <div className="space-y-6">
              {tajweedLessons.length > 0 ? (
                tajweedLessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-2xl text-blue-900">{lesson.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {renderLessonContent(lesson.content)}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    <p>No Tajweed lessons available yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="arabic">
            <div className="space-y-6">
              {arabicLessons.length > 0 ? (
                arabicLessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader className="bg-green-50">
                      <CardTitle className="text-2xl text-green-900">{lesson.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {renderLessonContent(lesson.content)}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    <p>No Arabic lessons available yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="fiqh">
            <div className="space-y-6">
              {fiqhLessons.length > 0 ? (
                fiqhLessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="text-2xl text-purple-900">{lesson.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {renderLessonContent(lesson.content)}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    <p>No Fiqh lessons available yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
