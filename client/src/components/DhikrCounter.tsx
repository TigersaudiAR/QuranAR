import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface DhikrCounterProps {
  id: number;
  title: string;
  arabicText: string;
  transliteration?: string;
  translation?: string;
  target: number;
  reference?: string;
  onCountChange?: (id: number, count: number) => void;
}

export function DhikrCounter({
  id,
  title,
  arabicText,
  transliteration,
  translation,
  target,
  reference,
  onCountChange,
}: DhikrCounterProps) {
  const [count, setCount] = useState(0);

  const increment = () => {
    const newCount = count < target ? count + 1 : count;
    setCount(newCount);
    onCountChange?.(id, newCount);
  };

  const decrement = () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    onCountChange?.(id, newCount);
  };

  const reset = () => {
    setCount(0);
    onCountChange?.(id, 0);
  };

  const progress = (count / target) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-xl">{title}</CardTitle>
        {reference && (
          <CardDescription className="text-xs">{reference}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <p className="text-3xl font-arabic text-green-900 mb-2 leading-loose" dir="rtl">
            {arabicText}
          </p>
          {transliteration && (
            <p className="text-sm text-gray-600 italic mb-1">{transliteration}</p>
          )}
          {translation && (
            <p className="text-sm text-gray-700">{translation}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>
              {count} / {target}
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
            onClick={decrement}
            disabled={count === 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            className="flex-1 text-2xl font-bold"
            onClick={increment}
            disabled={count >= target}
          >
            {count >= target ? 'Completed ✓' : 'Count'}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={reset}
            disabled={count === 0}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
