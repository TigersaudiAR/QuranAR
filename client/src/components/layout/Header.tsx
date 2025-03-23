import { useEffect, useState } from "react";
import { Menu, X, BookOpen, Compass, Moon, Video, BookText, MapPin, Info } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DateInfo = {
  hijri: string;
  gregorian: string;
  nextPrayer: string;
  nextPrayerTime: string;
};

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  
  const [dateInfo, setDateInfo] = useState<DateInfo>({
    hijri: "١٢ رمضان ١٤٤٥",
    gregorian: "٢٣ مارس ٢٠٢٥",
    nextPrayer: "العصر",
    nextPrayerTime: "٣:٤٥",
  });

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // This is just for display purposes
  }, []);
  
  const navItems: NavItem[] = [
    { title: "القرآن الكريم", href: "/quran", icon: <BookOpen className="h-5 w-5" /> },
    { title: "التعلم", href: "/learn", icon: <BookText className="h-5 w-5" /> },
    { title: "التفسير والأحلام", href: "/tafseer", icon: <Compass className="h-5 w-5" /> },
    { title: "الأذكار والأدعية", href: "/azkar", icon: <Moon className="h-5 w-5" /> },
    { title: "الحج والعمرة", href: "/hajj-umrah", icon: <MapPin className="h-5 w-5" /> },
    { title: "المحاضرات المباشرة", href: "/live", icon: <Video className="h-5 w-5" /> },
    { title: "حقوق الملكية", href: "/credits", icon: <Info className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {/* Logo and App Name */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="text-primary w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="mr-3">
                <h1 className="text-xl font-bold">QuranCareem</h1>
                <p className="text-xs text-gray-500">القرآن الكريم</p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant={location === item.href ? "default" : "ghost"} 
                  size="sm"
                  className="flex items-center"
                >
                  {item.icon}
                  <span className="mr-1">{item.title}</span>
                </Button>
              </Link>
            ))}
          </nav>
          
          {/* Date and Prayer Times */}
          <div className="hidden md:flex lg:hidden items-center space-x-4 space-x-reverse">
            <div className="text-center">
              <p className="text-xs text-gray-500">التاريخ الهجري</p>
              <p className="text-sm font-semibold">{dateInfo.hijri}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">التاريخ الميلادي</p>
              <p className="text-sm font-semibold">{dateInfo.gregorian}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">الصلاة القادمة</p>
              <p className="text-sm font-semibold">
                {dateInfo.nextPrayer}{" "}
                <span className="text-primary">{dateInfo.nextPrayerTime}</span>
              </p>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-3/4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">القائمة</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button 
                        variant={location === item.href ? "default" : "ghost"} 
                        className="w-full justify-start"
                      >
                        {item.icon}
                        <span className="mr-2">{item.title}</span>
                      </Button>
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-md">
                      <p className="text-xs text-gray-500">التاريخ الهجري</p>
                      <p className="text-sm font-semibold">{dateInfo.hijri}</p>
                    </div>
                    <div className="text-center p-3 border rounded-md">
                      <p className="text-xs text-gray-500">التاريخ الميلادي</p>
                      <p className="text-sm font-semibold">{dateInfo.gregorian}</p>
                    </div>
                  </div>
                  <div className="text-center p-3 border rounded-md mt-4">
                    <p className="text-xs text-gray-500">الصلاة القادمة</p>
                    <p className="text-sm font-semibold">
                      {dateInfo.nextPrayer}{" "}
                      <span className="text-primary">{dateInfo.nextPrayerTime}</span>
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
