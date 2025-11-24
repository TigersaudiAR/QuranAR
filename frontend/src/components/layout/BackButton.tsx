import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface BackButtonProps {
  to?: string;
  className?: string;
}

/**
 * زر العودة للرجوع للصفحة السابقة أو للصفحة المحددة
 */
const BackButton = ({ to, className = "" }: BackButtonProps) => {
  const [, navigate] = useLocation();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      // إذا كان المتصفح لديه أي صفحات في التاريخ، ارجع للخلف
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // إذا لم يكن هناك تاريخ، انتقل للصفحة الرئيسية
        navigate("/");
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center hover:bg-gray-100 p-2 h-9 w-9 rounded-full ${className}`}
      onClick={handleBack}
      aria-label="العودة"
    >
      <ArrowRight className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;