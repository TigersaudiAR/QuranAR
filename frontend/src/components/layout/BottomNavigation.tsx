import { Link, useLocation } from "wouter";
import { 
  Home, 
  BookOpen, 
  BookText, 
  Moon, 
  Compass, 
  MapPin, 
  Video 
} from "lucide-react";

const BottomNavigation = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "الرئيسية", href: "/" },
    { icon: <BookOpen className="h-5 w-5" />, label: "القرآن", href: "/quran" },
    { icon: <BookText className="h-5 w-5" />, label: "التعلم", href: "/learn" },
    { icon: <Moon className="h-5 w-5" />, label: "الأذكار", href: "/azkar" },
    { icon: <Compass className="h-5 w-5" />, label: "التفسير", href: "/tafseer" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-40 md:hidden">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div 
              className={`flex flex-col items-center py-2 px-2 cursor-pointer ${
                isActive(item.href) 
                  ? "text-primary border-t-2 border-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
