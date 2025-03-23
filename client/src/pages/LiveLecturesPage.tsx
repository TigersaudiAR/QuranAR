import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  Users, 
  Clock, 
  Calendar, 
  BookOpen, 
  User, 
  MessageSquare, 
  CalendarDays
} from "lucide-react";

export default function LiveLecturesPage() {
  const [activeTab, setActiveTab] = useState("lectures");

  const lectures = [
    {
      id: 1,
      title: "أساسيات التجويد للمبتدئين",
      instructor: "الشيخ أحمد المنصور",
      date: "2024-06-15",
      duration: "45 دقيقة",
      views: 2354,
      category: "تجويد",
      level: "مبتدئ",
      thumbnail: "/images/lectures/tajweed-basics.jpg"
    },
    {
      id: 2,
      title: "شرح حديث الأربعين النووية",
      instructor: "د. محمد الشنقيطي",
      date: "2024-06-10",
      duration: "60 دقيقة",
      views: 1820,
      category: "حديث",
      level: "متوسط",
      thumbnail: "/images/lectures/nawawi-forty.jpg"
    },
    {
      id: 3,
      title: "تفسير سورة البقرة - الجزء الأول",
      instructor: "د. عبدالرحمن السديس",
      date: "2024-06-05",
      duration: "75 دقيقة",
      views: 3210,
      category: "تفسير",
      level: "عام",
      thumbnail: "/images/lectures/tafseer-baqarah.jpg"
    },
    {
      id: 4,
      title: "أحكام الصيام في رمضان",
      instructor: "د. محمد العثيمين",
      date: "2025-02-20",
      duration: "85 دقيقة",
      views: 1587,
      category: "فقه",
      level: "عام",
      thumbnail: "/images/lectures/fiqh-ramadan.jpg"
    }
  ];

  const studyCircles = [
    {
      id: 1,
      title: "حلقة تحفيظ القرآن الكريم",
      instructor: "الشيخ عبدالله المصري",
      schedule: "الإثنين والأربعاء والجمعة",
      time: "19:30",
      duration: "90 دقيقة",
      members: 25,
      level: "متنوع",
      status: "مستمرة"
    },
    {
      id: 2,
      title: "دورة أصول الفقه",
      instructor: "د. أحمد الريان",
      schedule: "الثلاثاء والخميس",
      time: "20:00",
      duration: "60 دقيقة",
      members: 18,
      level: "متقدم",
      status: "متاحة للانضمام"
    },
    {
      id: 3,
      title: "دروس في السيرة النبوية",
      instructor: "د. محمد الصاوي",
      schedule: "السبت",
      time: "18:00",
      duration: "75 دقيقة",
      members: 32,
      level: "مبتدئ",
      status: "مكتملة"
    },
    {
      id: 4,
      title: "شرح رياض الصالحين",
      instructor: "الشيخ خالد الجهني",
      schedule: "الأحد والأربعاء",
      time: "21:00",
      duration: "60 دقيقة",
      members: 15,
      level: "متوسط",
      status: "متاحة للانضمام"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">المحاضرات المباشرة وحلقات الدراسة</h1>
        <p className="text-muted-foreground">تعلم على يد نخبة من العلماء والمشايخ في مختلف العلوم الشرعية</p>
      </div>

      <Tabs defaultValue="lectures" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="lectures">المحاضرات</TabsTrigger>
          <TabsTrigger value="circles">حلقات الدراسة</TabsTrigger>
        </TabsList>

        <TabsContent value="lectures">
          <h2 className="text-2xl font-semibold mb-6">المحاضرات المسجلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lectures.map((lecture) => (
              <Card key={lecture.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{lecture.title}</CardTitle>
                    <Badge>{lecture.category}</Badge>
                  </div>
                  <div className="flex items-center mt-2">
                    <User className="h-4 w-4 ml-1 text-muted-foreground" />
                    <CardDescription>
                      {lecture.instructor}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>{lecture.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>{lecture.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>{lecture.views} مشاهدة</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Video className="ml-2 h-4 w-4" /> مشاهدة المحاضرة
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="circles">
          <h2 className="text-2xl font-semibold mb-6">حلقات التحفيظ والدراسة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyCircles.map((circle) => (
              <Card key={circle.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{circle.title}</CardTitle>
                    <Badge 
                      variant={circle.status === "متاحة للانضمام" ? "default" : 
                               circle.status === "مستمرة" ? "secondary" : "outline"}
                    >
                      {circle.status}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-2">
                    <User className="h-4 w-4 ml-1 text-muted-foreground" />
                    <CardDescription>
                      {circle.instructor}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>{circle.schedule}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>{circle.time} - {circle.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>{circle.members} عضو</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>المستوى: {circle.level}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex-1 ml-2">
                    <MessageSquare className="ml-2 h-4 w-4" /> معلومات
                  </Button>
                  <Button className="flex-1">
                    <Users className="ml-2 h-4 w-4" /> انضمام
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}