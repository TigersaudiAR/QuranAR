import Header from "@/components/layout/Header";
import BottomNavbar from "@/components/layout/BottomNavbar";
import ContinueReading from "@/components/quran/ContinueReading";
import SurahsList from "@/components/quran/SurahsList";
import { useState } from "react";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'list' | 'mushaf' | 'continuous'>('list');
  
  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mx-auto px-4 pb-20">
        <ContinueReading />
        
        {/* View Selection Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-1 inline-flex">
            <button 
              className={`px-4 py-2 ${viewMode === 'list' ? 'text-white bg-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-md`}
              onClick={() => setViewMode('list')}
            >
              قائمة السور
            </button>
            <button 
              className={`px-4 py-2 ${viewMode === 'mushaf' ? 'text-white bg-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-md`}
              onClick={() => setViewMode('mushaf')}
            >
              عرض المصحف
            </button>
            <button 
              className={`px-4 py-2 ${viewMode === 'continuous' ? 'text-white bg-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} rounded-md`}
              onClick={() => setViewMode('continuous')}
            >
              عرض متواصل
            </button>
          </div>
        </div>
        
        {/* View Content */}
        {viewMode === 'list' && <SurahsList />}
        {viewMode === 'mushaf' && (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">عرض المصحف</h2>
            <p className="text-gray-600 dark:text-gray-400">ستتوفر هذه الميزة قريباً إن شاء الله</p>
          </div>
        )}
        {viewMode === 'continuous' && (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">العرض المتواصل</h2>
            <p className="text-gray-600 dark:text-gray-400">ستتوفر هذه الميزة قريباً إن شاء الله</p>
          </div>
        )}
      </main>
      
      <BottomNavbar />
    </div>
  );
}
