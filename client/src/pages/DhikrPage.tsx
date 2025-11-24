import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DhikrCounter } from '@/components/DhikrCounter';

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
          {filteredAdhkar.map((dhikr) => (
            <DhikrCounter
              key={dhikr.id}
              id={dhikr.id}
              title={dhikr.title}
              arabicText={dhikr.arabicText}
              transliteration={dhikr.transliteration}
              translation={dhikr.translation}
              target={dhikr.repetitions}
              reference={dhikr.reference}
            />
          ))}
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
