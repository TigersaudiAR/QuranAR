import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ContentUnavailable() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">المحتوى غير متاح حالياً</h1>
        <p className="text-gray-600 mb-6">
          المحتوى الذي تبحث عنه غير متوفر حالياً. يرجى المحاولة لاحقاً.
        </p>
        <Link href="/">
          <Button className="mx-auto">
            <Home className="h-4 w-4 mr-2" />
            العودة للصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}