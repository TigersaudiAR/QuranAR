import { Link, useLocation } from "wouter";

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
          <a className={`flex flex-col items-center py-2 px-4 ${isActive("/") ? "text-primary-custom border-t-2 border-primary-custom" : "text-gray-500 hover:text-primary-custom"}`}>
            <span className="material-icons">home</span>
            <span className="text-xs mt-1">الرئيسية</span>
          </a>
        </Link>
        <Link href="/quran">
          <a className={`flex flex-col items-center py-2 px-4 ${isActive("/quran") ? "text-primary-custom border-t-2 border-primary-custom" : "text-gray-500 hover:text-primary-custom"}`}>
            <span className="material-icons">auto_stories</span>
            <span className="text-xs mt-1">القرآن</span>
          </a>
        </Link>
        <Link href="/learn">
          <a className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-primary-custom">
            <span className="material-icons">school</span>
            <span className="text-xs mt-1">تعلم</span>
          </a>
        </Link>
        <Link href="/azkar">
          <a className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-primary-custom">
            <span className="material-icons">favorite</span>
            <span className="text-xs mt-1">الأذكار</span>
          </a>
        </Link>
        <Link href="/more">
          <a className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-primary-custom">
            <span className="material-icons">menu</span>
            <span className="text-xs mt-1">المزيد</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
