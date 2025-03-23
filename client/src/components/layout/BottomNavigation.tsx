import { Link, useLocation } from "wouter";
import { Home, BookOpen, GraduationCap, Heart, Menu } from "lucide-react";

const BottomNavigation = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-40">
      <div className="flex justify-around">
        <Link href="/">
          <div className={`flex flex-col items-center py-2 px-4 cursor-pointer ${isActive("/") ? "text-primary-custom border-t-2 border-primary-custom" : "text-gray-500 hover:text-primary-custom"}`}>
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">الرئيسية</span>
          </div>
        </Link>
        <Link href="/quran">
          <div className={`flex flex-col items-center py-2 px-4 cursor-pointer ${isActive("/quran") ? "text-primary-custom border-t-2 border-primary-custom" : "text-gray-500 hover:text-primary-custom"}`}>
            <BookOpen className="h-5 w-5" />
            <span className="text-xs mt-1">القرآن</span>
          </div>
        </Link>
        <Link href="/learn">
          <div className="flex flex-col items-center py-2 px-4 cursor-pointer text-gray-500 hover:text-primary-custom">
            <GraduationCap className="h-5 w-5" />
            <span className="text-xs mt-1">تعلم</span>
          </div>
        </Link>
        <Link href="/azkar">
          <div className="flex flex-col items-center py-2 px-4 cursor-pointer text-gray-500 hover:text-primary-custom">
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-1">الأذكار</span>
          </div>
        </Link>
        <Link href="/more">
          <div className="flex flex-col items-center py-2 px-4 cursor-pointer text-gray-500 hover:text-primary-custom">
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">المزيد</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
