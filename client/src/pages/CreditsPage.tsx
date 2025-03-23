import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Github, ArrowUpRight, MessageSquare } from "lucide-react";

export default function CreditsPage() {
  return (
    <div className="container mx-auto py-8">
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
            
            <Separator className="my-6" />
            
            <div className="text-right w-full">
              <h3 className="text-xl font-semibold mb-4">عن المطور</h3>
              <p className="mb-4 text-muted-foreground">
                مطور برمجيات متخصص في تطبيقات الويب والتطبيقات الإسلامية، مع خبرة واسعة في تطوير تطبيقات تعليمية للقرآن الكريم والعلوم الإسلامية.
              </p>
              <p className="mb-4 text-muted-foreground">
                يهدف هذا المشروع إلى توفير منصة متكاملة للمسلمين لتعلم القرآن الكريم وعلومه، وتوفير أدوات مساعدة للعبادات والأذكار.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline">
              <Github className="ml-2 h-4 w-4" />
              <span>GitHub</span>
            </Button>
            <Button variant="outline">
              <MessageSquare className="ml-2 h-4 w-4" />
              <span>تواصل معنا</span>
            </Button>
            <Button>
              <ArrowUpRight className="ml-2 h-4 w-4" />
              <span>المزيد من المشاريع</span>
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 تطبيق القرآن الكريم - جميع الحقوق محفوظة لعبدالرحمن عوض الرشيدي</p>
          <p className="mt-1">
            لا يجوز استخدام أي محتوى من هذا التطبيق بدون إذن مسبق من المطور
          </p>
        </div>
      </div>
    </div>
  );
}