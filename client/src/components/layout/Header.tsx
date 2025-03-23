import { useEffect, useState } from "react";
import { 
  Menu, 
  X, 
  BookOpen, 
  Compass, 
  Moon, 
  Video, 
  BookText, 
  MapPin, 
  Info, 
  Bell, 
  Sun, 
  Settings, 
  Search, 
  User,
  Clock
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [dateInfo, setDateInfo] = useState<DateInfo>({
    hijri: "١٢ رمضان ١٤٤٥",
    gregorian: "٢٣ مارس ٢٠٢٥",
    nextPrayer: "العصر",
    nextPrayerTime: "٣:٤٥",
  });

  // تحديث التاريخ والوقت
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      
      // تنسيق التاريخ الهجري (تقريبي - في التطبيق الحقيقي سنستخدم API)
      const hijriOptions: Intl.DateTimeFormatOptions = { 
        calendar: 'islamic-umalqura',
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
      };
      
      // تنسيق التاريخ الميلادي
      const gregorianOptions: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
      };
      
      try {
        const hijri = new Intl.DateTimeFormat('ar-SA', hijriOptions).format(now);
        const gregorian = new Intl.DateTimeFormat('ar-SA', gregorianOptions).format(now);
        
        // تحديث الصلاة التالية (في التطبيق الحقيقي سنستخدم API مواقيت الصلاة)
        setDateInfo({
          hijri,
          gregorian,
          nextPrayer: "العصر",
          nextPrayerTime: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`,
        });
      } catch (error) {
        console.error("Error formatting date:", error);
      }
    };
    
    updateDate();
    const interval = setInterval(updateDate, 60000); // تحديث كل دقيقة
    
    return () => clearInterval(interval);
  }, []);
  
  // تغيير مظهر الرأس عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-sm shadow-md py-1" 
        : "bg-white shadow py-2"
    )}>
      {/* شريط التواريخ العلوي */}
      <div className="hidden lg:block bg-primary/5 py-1 border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 ml-1" />
              <span>التاريخ الهجري: {dateInfo.hijri}</span>
              <span className="mx-2">|</span>
              <span>التاريخ الميلادي: {dateInfo.gregorian}</span>
            </div>
            
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="ml-2 bg-secondary/5 border-secondary/20 text-secondary-foreground">
                الصلاة القادمة: {dateInfo.nextPrayer} {dateInfo.nextPrayerTime}
              </Badge>
              <Link href="/azkar">
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  <Moon className="h-3 w-3 ml-1" />
                  <span>أذكار الصباح والمساء</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* القائمة الرئيسية */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {/* Logo and App Name */}
          <Link href="/">
            <div className="flex items-center cursor-pointer group">
              <div className="text-primary w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="mr-3">
                <h1 className="text-xl font-bold group-hover:text-primary transition-colors">QuranCareem</h1>
                <p className="text-xs text-muted-foreground">القرآن الكريم</p>
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
                  className={cn(
                    "flex items-center transition-all",
                    location === item.href 
                      ? "text-primary-foreground bg-primary" 
                      : "hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {item.icon}
                  <span className="mr-1">{item.title}</span>
                </Button>
              </Link>
            ))}
          </nav>
          
          {/* Desktop Quick Actions */}
          <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                    <Search className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>بحث</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                    <Bell className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>الإشعارات</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>الإعدادات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Sun className="h-4 w-4 ml-2" />
                  <span>المظهر</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="h-4 w-4 ml-2" />
                  <span>الملف الشخصي</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Tablet Date and Prayer Times */}
          <div className="hidden md:flex lg:hidden items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="text-xs text-muted-foreground">التاريخ الهجري</p>
              <p className="text-sm font-semibold">{dateInfo.hijri}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">الصلاة القادمة</p>
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
              <div className="p-6 h-full flex flex-col">
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
                
                {/* Mobile Quick Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="بحث..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
                  {navItems.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button 
                        variant={location === item.href ? "default" : "ghost"} 
                        className={cn(
                          "w-full justify-start",
                          location === item.href 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-primary/10"
                        )}
                      >
                        {item.icon}
                        <span className="mr-2">{item.title}</span>
                      </Button>
                    </Link>
                  ))}
                </nav>
                
                {/* Mobile Date/Time Footer */}
                <div className="mt-auto pt-6 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-md bg-accent/5">
                      <p className="text-xs text-muted-foreground">التاريخ الهجري</p>
                      <p className="text-sm font-semibold">{dateInfo.hijri}</p>
                    </div>
                    <div className="text-center p-3 border rounded-md bg-accent/5">
                      <p className="text-xs text-muted-foreground">التاريخ الميلادي</p>
                      <p className="text-sm font-semibold">{dateInfo.gregorian}</p>
                    </div>
                  </div>
                  <div className="text-center p-3 border rounded-md mt-4 bg-secondary/5">
                    <p className="text-xs text-muted-foreground">الصلاة القادمة</p>
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
