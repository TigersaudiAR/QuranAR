import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface Dhikr {
  id: number;
  title: string;
  arabicText: string;
  transliteration?: string;
  translation?: string;
  category: string;
  repetitions: number;
  reference?: string;
}

export default function DhikrPage() {
  const [counters, setCounters] = useState<{ [key: number]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: adhkarData } = useQuery({
    queryKey: ['dhikr'],
    queryFn: async () => {
      const response = await axios.get('/api/dhikr');
      return response.data.adhkar as Dhikr[];
    },
  });

  const adhkar = adhkarData || [];
  const categories = ['all', ...Array.from(new Set(adhkar.map((d) => d.category)))];

  const filteredAdhkar =
    selectedCategory === 'all'
      ? adhkar
      : adhkar.filter((d) => d.category === selectedCategory);

  const getCounter = (id: number) => counters[id] || 0;

  const increment = (id: number, target: number) => {
    setCounters((prev) => {
      const newCount = (prev[id] || 0) + 1;
      return { ...prev, [id]: newCount > target ? target : newCount };
    });
  };

  const decrement = (id: number) => {
    setCounters((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  };

  const reset = (id: number) => {
    setCounters((prev) => ({ ...prev, [id]: 0 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-900 mb-2">Adhkar Counter</h1>
          <p className="text-gray-600">Remember Allah with these daily supplications</p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-6">
          {filteredAdhkar.map((dhikr) => {
            const count = getCounter(dhikr.id);
            const progress = (count / dhikr.repetitions) * 100;

            return (
              <Card key={dhikr.id} className="overflow-hidden">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-xl">{dhikr.title}</CardTitle>
                  {dhikr.reference && (
                    <CardDescription className="text-xs">{dhikr.reference}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-arabic text-green-900 mb-2 leading-loose" dir="rtl">
                      {dhikr.arabicText}
                    </p>
                    {dhikr.transliteration && (
                      <p className="text-sm text-gray-600 italic mb-1">{dhikr.transliteration}</p>
                    )}
                    {dhikr.translation && (
                      <p className="text-sm text-gray-700">{dhikr.translation}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>
                        {count} / {dhikr.repetitions}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrement(dhikr.id)}
                      disabled={count === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 text-2xl font-bold"
                      onClick={() => increment(dhikr.id, dhikr.repetitions)}
                      disabled={count >= dhikr.repetitions}
                    >
                      {count >= dhikr.repetitions ? 'Completed ✓' : 'Count'}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => reset(dhikr.id)}
                      disabled={count === 0}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAdhkar.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No adhkar found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
