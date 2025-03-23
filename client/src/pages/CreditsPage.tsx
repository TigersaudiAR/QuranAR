
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Heart, BookOpen, Users, Info } from "lucide-react";

export default function CreditsPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">شكر وتقدير</h1>
        <p className="text-muted-foreground text-center mb-8">
          نشكر كل من ساهم في إثراء هذا المشروع وتطويره
        </p>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>المشايخ والعلماء</CardTitle>
              <CardDescription>
                الأساتذة الذين استفدنا من علمهم في تدقيق المحتوى
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
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
                © جميع الحقوق محفوظة لمطور التطبيق. يسمح باستخدام المحتوى لأغراض تعليمية ودعوية غير ربحية مع ذكر المصدر.
              </p>
            </div>
            
            <div className="flex items-center">
              <AlertTriangle className="text-amber-500 h-5 w-5 ml-2" />
              <p className="text-sm text-muted-foreground">
                لا يسمح بإعادة نشر المحتوى أو استخدامه تجارياً دون إذن مسبق.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 mt-4">
          <CardHeader>
            <CardTitle>المصادر والمراجع</CardTitle>
            <CardDescription>
              المراجع العلمية التي تم الاعتماد عليها
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 ml-2 text-primary" />
                  <span>كتب ومراجع</span>
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    </div>
                    <span>تفسير ابن كثير</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    </div>
                    <span>صحيح البخاري</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    </div>
                    <span>صحيح مسلم</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    </div>
                    <span>حصن المسلم - سعيد بن علي القحطاني</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Users className="h-4 w-4 ml-2 text-primary" />
                  <span>فريق العمل</span>
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    </div>
                    <span>أحمد محمد - تطوير البرمجيات</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    </div>
                    <span>سارة علي - تصميم واجهة المستخدم</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    </div>
                    <span>محمد عبدالله - تدقيق المحتوى</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    </div>
                    <span>فاطمة أحمد - إدارة المشروع</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-red-500 ml-2" />
              <p className="text-sm">
                شكراً لجميع المساهمين والداعمين لهذا المشروع
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 mt-4">
          <CardHeader>
            <CardTitle>معلومات إضافية</CardTitle>
            <CardDescription>
              تفاصيل إضافية عن المشروع
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <Info className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h3 className="font-medium mb-2">عن المشروع</h3>
                <p className="text-sm text-muted-foreground">
                  تم تطوير هذا المشروع بهدف تيسير الوصول إلى المعلومات الإسلامية الصحيحة والموثوقة، ومساعدة المسلمين على التعلم والتفقه في أمور دينهم بطريقة سهلة وميسرة. نرحب بملاحظاتكم واقتراحاتكم لتحسين المشروع وتطويره بشكل مستمر.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
