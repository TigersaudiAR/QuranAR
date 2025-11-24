import { useState } from 'react';
import { cn } from '../utils/cn';

interface DhikrCounterProps {
  title: string;
  arabicText: string;
  transliteration?: string;
  translation?: string;
  targetCount: number;
}

const DhikrCounter = ({ title, arabicText, transliteration, translation, targetCount }: DhikrCounterProps) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < targetCount) {
      setCount(count + 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  const progress = (count / targetCount) * 100;
  const isComplete = count >= targetCount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-2xl font-arabic text-right mt-4 mb-2 leading-loose">{arabicText}</p>
        {transliteration && (
          <p className="text-sm text-gray-600 italic">{transliteration}</p>
        )}
        {translation && (
          <p className="text-sm text-gray-500 mt-1">{translation}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{count} / {targetCount}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              isComplete ? "bg-green-500" : "bg-blue-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={increment}
          disabled={isComplete}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg font-medium transition-colors",
            isComplete
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-700"
          )}
        >
          {isComplete ? "Complete! ✓" : "Count"}
        </button>
        <button
          onClick={reset}
          className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DhikrCounter;
