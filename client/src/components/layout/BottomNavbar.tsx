import { Link, useLocation } from "wouter";

export default function BottomNavbar() {
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg py-2 z-40">
      <div className="container mx-auto">
        <div className="flex justify-around items-center">
          <Link href="/">
            <a className={`flex flex-col items-center ${isActive("/") ? "text-primary" : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"}`}>
              <i className="fas fa-home text-xl"></i>
              <span className="text-xs mt-1">الرئيسية</span>
            </a>
          </Link>
          <Link href="/surah/1">
            <a className={`flex flex-col items-center ${isActive("/surah/1") || location.startsWith("/surah/") ? "text-primary" : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"}`}>
              <i className="fas fa-book-quran text-xl"></i>
              <span className="text-xs mt-1">القرآن</span>
            </a>
          </Link>
          <Link href="/learn">
            <a className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              <i className="fas fa-graduation-cap text-xl"></i>
              <span className="text-xs mt-1">تعلم</span>
            </a>
          </Link>
          <Link href="/azkar">
            <a className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              <i className="fas fa-pray text-xl"></i>
              <span className="text-xs mt-1">الأذكار</span>
            </a>
          </Link>
          <Link href="/more">
            <a className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              <i className="fas fa-ellipsis-h text-xl"></i>
              <span className="text-xs mt-1">المزيد</span>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
