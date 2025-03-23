import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "wouter";

type DateInfo = {
  hijri: string;
  gregorian: string;
  nextPrayer: string;
  nextPrayerTime: string;
};

const Header = () => {
  const [dateInfo, setDateInfo] = useState<DateInfo>({
    hijri: "١٢ رمضان ١٤٤٥",
    gregorian: "٢٢ مارس ٢٠٢٤",
    nextPrayer: "العصر",
    nextPrayerTime: "٣:٤٥",
  });

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // This is just for display purposes
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {/* Logo and App Name */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="text-primary w-12 h-12 flex items-center justify-center rounded-full bg-primary-light">
                <span className="material-icons text-3xl text-primary-custom">menu_book</span>
              </div>
              <div className="mr-3">
                <h1 className="text-xl font-bold">QuranCareem</h1>
                <p className="text-xs text-gray-500">القرآن الكريم</p>
              </div>
            </div>
          </Link>
          
          {/* Date and Prayer Times */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
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
                <span className="text-primary-custom">{dateInfo.nextPrayerTime}</span>
              </p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-light">
              <span className="material-icons text-primary-custom">explore</span>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 focus:outline-none">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
