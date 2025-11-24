import React from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, BookOpen, Download, Book, CheckSquare, Layers, Languages } from "lucide-react";

export default function LearnPage() {
  const learningCategories = [
    {
      id: 1,
      title: "تجويد القرآن",
      description: "تعلم أحكام التجويد الصحيحة لقراءة القرآن الكريم",
      icon: <BookOpen className="h-6 w-6" />,
      lessonsCount: 24,
      color: "primary",
      path: "/learn/tajweed",
      level: "مبتدئ إلى متقدم"
    },
    {
      id: 2,
      title: "حفظ القرآن الكريم",
      description: "منهجية متكاملة لحفظ القرآن الكريم مع المراجعة الدورية",
      icon: <Book className="h-6 w-6" />,
      lessonsCount: 30,
      color: "secondary",
      path: "/learn/memorization",
      level: "جميع المستويات"
    },
    {
      id: 3,
      title: "الفقه الإسلامي",
      description: "دروس في الفقه الإسلامي والأحكام الشرعية",
      icon: <Layers className="h-6 w-6" />,
      lessonsCount: 18,
      color: "accent",
      path: "/learn/fiqh",
      level: "متوسط"
    },
    {
      id: 4,
      title: "التوحيد",
      description: "دروس في العقيدة الإسلامية وأساسيات التوحيد",
      icon: <CheckSquare className="h-6 w-6" />,
      lessonsCount: 15,
      color: "primary",
      path: "/learn/tawhid",
      level: "جميع المستويات"
    },
    {
      id: 5,
      title: "تعلم اللغة العربية",
      description: "دروس في الحروف والقواعد وبناء الجمل العربية",
      icon: <Languages className="h-6 w-6" />,
      lessonsCount: 40,
      color: "secondary",
      path: "/learn/arabic",
      level: "مبتدئ إلى متقدم"
    },
    {
      id: 6,
      title: "اختبارات تفاعلية",
      description: "اختبر مستواك في مختلف المجالات الدينية واللغوية",
      icon: <CheckSquare className="h-6 w-6" />,
      lessonsCount: 50,
      color: "accent",
      path: "/learn/tests",
      level: "متنوع"
    }
  ];

  const educationalMaterials = [
    {
      id: 1,
      title: "كتاب تيسير التجويد",
      description: "شرح مبسط لأحكام التجويد",
      size: "5.2 MB",
      downloadLink: "/materials/tajweed-simplified.pdf"
    },
    {
      id: 2,
      title: "كتاب الفقه الميسر",
      description: "أساسيات الفقه الإسلامي للمبتدئين",
      size: "7.8 MB",
      downloadLink: "/materials/fiqh-simplified.pdf"
    },
    {
      id: 3,
      title: "كتاب قواعد اللغة العربية",
      description: "أساسيات النحو والصرف للمبتدئين",
      size: "6.5 MB",
      downloadLink: "/materials/arabic-grammar.pdf"
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">مركز التعلم الإسلامي</h1>
      
      <h2 className="text-2xl font-semibold mb-6 pr-1">المسارات التعليمية</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {learningCategories.map((category) => (
          <Link key={category.id} href={category.path}>
            <Card className="cursor-pointer h-full hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className={`p-2 rounded-lg bg-${category.color}/10 text-${category.color}`}>
                    {category.icon}
                  </div>
                  <Badge variant="outline">{category.level}</Badge>
                </div>
                <CardTitle className="mt-4 text-xl">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <span className="text-sm text-muted-foreground">{category.lessonsCount} درس</span>
                <Button variant="ghost" size="sm">
                  ابدأ التعلم <ChevronRight className="mr-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-6 pr-1">المواد التعليمية المتاحة للتحميل</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalMaterials.map((material) => (
          <Card key={material.id} className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">{material.title}</CardTitle>
              <CardDescription>{material.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">حجم الملف: {material.size}</span>
              <Button variant="outline" size="sm">
                <Download className="ml-2 h-4 w-4" /> تحميل
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">دروس تفاعلية ومستويات متقدمة</h2>
        <p className="text-muted-foreground mb-6">
          استكشف مستويات متقدمة من الدروس التفاعلية واحصل على شهادات معتمدة
        </p>
        <Button size="lg">
          استكشف جميع الدورات <ChevronRight className="mr-1 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}