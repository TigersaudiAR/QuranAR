import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AlertCircle, Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

export default function NotFound() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const suggestedLinks = [
    { name: "القرآن الكريم", href: "/quran" },
    { name: "الأذكار", href: "/azkar" },
    { name: "تفسير الأحلام", href: "/tafseer" }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-0">
          <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <AlertCircle className="h-12 w-12 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="pt-4 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-xl font-semibold mb-4">الصفحة غير موجودة</h2>

          <p className="text-muted-foreground mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها أو حذفها.
          </p>
          
          {searchActive ? (
            <div className="mb-6 max-w-sm mx-auto">
              <div className="flex gap-2 mb-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSearchActive(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="ابحث عن محتوى..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              {searchQuery.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  لا توجد نتائج لـ "{searchQuery}"
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-medium">روابط مقترحة</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button variant="outline" size="sm">
                      {link.name}
                    </Button>
                  </Link>
                ))}
              </div>
              <Button 
                variant="link" 
                className="text-primary"
                onClick={() => setSearchActive(true)}
              >
                <Search className="h-4 w-4 mr-2" />
                بحث في الموقع
              </Button>
            </div>
          )}
          
          <div className="w-full max-w-xs mx-auto pt-4">
            <Link href="/">
              <Button className="w-full gap-2" size="lg">
                <Home className="h-4 w-4" />
                <span>العودة للصفحة الرئيسية</span>
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="justify-center text-xs text-muted-foreground pb-6">
          القرآن كريم © {new Date().getFullYear()} | جميع الحقوق محفوظة
        </CardFooter>
      </Card>
    </div>
  );
}
