import { useState } from "react";
import { useTheme } from "@/components/ui/theme-provider";
import { getCurrentDateInArabic, formatTime } from "@/lib/utils";
import { PrayerTime, DateInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [dates, setDates] = useState<DateInfo>(getCurrentDateInArabic());
  
  // Fetch prayer times - in a real app, this would use geolocation and a real API
  const { data: prayerTimes = [] } = useQuery<PrayerTime[]>({
    queryKey: ['/api/prayer-times'],
    initialData: [
      { name: "الفجر", time: "05:12" },
      { name: "الظهر", time: "12:30" },
      { name: "العصر", time: "15:45" },
      { name: "المغرب", time: "18:20" },
      { name: "العشاء", time: "19:50" },
    ]
  });
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo and App Name */}
          <div className="flex items-center">
            <div className="text-primary text-3xl ml-2">
              <i className="fas fa-book-quran"></i>
            </div>
            <h1 className="text-xl font-bold text-primary">QuranCareem</h1>
          </div>
          
          {/* Date and Prayer Times */}
          <div className="hidden md:flex space-x-6 items-center">
            {/* Hijri Date */}
            <div className="text-sm text-textDark dark:text-gray-300">
              <span className="text-secondary font-bold">{dates.hijri}</span>
              <span className="mx-1">|</span>
              <span>{dates.gregorian}</span>
            </div>
            
            {/* Prayer Times */}
            <div className="flex space-x-4 text-sm">
              {prayerTimes.map((prayer) => (
                <div key={prayer.name} className="flex flex-col items-center">
                  <span className="text-secondary font-bold">{prayer.name}</span>
                  <span>{formatTime(prayer.time)}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tools */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-gray-600 dark:text-gray-300`}></i>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <i className="fas fa-compass text-gray-600 dark:text-gray-300"></i>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <i className="fas fa-cog text-gray-600 dark:text-gray-300"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
