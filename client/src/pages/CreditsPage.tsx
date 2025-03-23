
import { 
  Phone, 
  Mail, 
  User, 
  Github, 
  Twitter, 
  Instagram,
  Heart,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function CreditsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <Badge className="mx-auto mb-2">حقوق الملكية</Badge>
            <CardTitle className="text-3xl">تطبيق القرآن الكريم</CardTitle>
            <CardDescription className="text-lg">
              تم تطويره بواسطة
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="mb-4 bg-primary/10 rounded-full p-4">
              <User className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">عبدالرحمن عوض الرشيدي</h2>
            <p className="text-lg text-muted-foreground mb-6">للتطوير والبرمجة</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md mb-6">
              <div className="flex items-center p-3 border rounded-lg">
                <Phone className="h-5 w-5 ml-2 text-primary" />
                <span dir="ltr">+966599900121</span>
              </div>
              <div className="flex items-center p-3 border rounded-lg">
                <Mail className="h-5 w-5 ml-2 text-primary" />
                <span>Tiger3saudi@gmail.com</span>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button variant="outline" size="icon">
                <Twitter className="h-5 w-5 text-primary" />
              </Button>
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5 text-primary" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>الشكر والتقدير</CardTitle>
            <CardDescription>
              نشكر كل من ساهم في إنجاح هذا المشروع
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">الجهات المساهمة</h3>
              <p className="text-muted-foreground">
                نتقدم بالشكر الجزيل للجهات التالية على دعمها ومساهمتها في هذا المشروع:
              </p>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span>مجمع الملك فهد لطباعة المصحف الشريف</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span>وزارة الشؤون الإسلامية والدعوة والإرشاد</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span>المكتبة الشاملة الإلكترونية</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">الأئمة والمشايخ</h3>
              <p className="text-muted-foreground">
                نشكر فضيلة المشايخ الذين ساهموا في مراجعة المحتوى العلمي للتطبيق:
              </p>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span>الشيخ د. صالح الفوزان</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span>الشيخ د. عبدالله السحيم</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span>الشيخ د. محمد المنجد</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>حقوق الملكية والاستخدام</CardTitle>
            <CardDescription>
              معلومات حول الحقوق والتراخيص
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-muted-foreground">
                © جميع الحقوق محفوظة لمطور التطبيق. يسمح باستخدام التطبيق للأغراض الشخصية والتعليمية. لا يسمح بإعادة نشر المحتوى أو استخدامه تجاريًا دون إذن مسبق.
              </p>
              <p className="text-muted-foreground mt-2">
                محتوى القرآن الكريم والتفاسير مأخوذة من مصادر موثوقة، وهي ملك لمالكيها الأصليين.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline" className="mx-2">
                <Heart className="ml-2 h-4 w-4 text-red-500" />
                <span>دعم المشروع</span>
              </Button>
              <Button variant="outline" className="mx-2">
                <ExternalLink className="ml-2 h-4 w-4" />
                <span>الموقع الرسمي</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-xs text-muted-foreground">
            تم التطوير بكل حب وإخلاص لخدمة كتاب الله تعالى وسنة نبيه صلى الله عليه وسلم
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
