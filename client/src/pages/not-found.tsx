
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-primary/20">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">الصفحة غير موجودة</h2>

          <p className="text-sm text-gray-600 mb-6">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها أو حذفها.
          </p>
          
          <div className="w-full max-w-xs mx-auto">
            <Link href="/">
              <Button className="w-full gap-2" size="lg">
                <Home className="h-4 w-4" />
                <span>العودة للصفحة الرئيسية</span>
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="justify-center text-xs text-gray-500 pb-6">
          QuranCareem - القرآن الكريم
        </CardFooter>
      </Card>
    </div>
  );
}
