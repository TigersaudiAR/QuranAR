import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Video, 
  Users, 
  CalendarDays, 
  Clock, 
  User,
  Search,
  BookOpen, 
  MessageSquare,
  Calendar as CalendarIcon,
  Bell
} from "lucide-react";
import { ar } from "date-fns/locale";

export default function LiveLecturesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  const upcomingLectures = [
    {
      id: 1,
      title: "أساسيات حفظ القرآن الكريم",
      instructor: "الشيخ عبدالله الخالدي",
      date: "2025-03-25",
      time: "19:00",
      duration: "60 دقيقة",
      attendees: 145,
      category: "تحفيظ",
      level: "مبتدئ",
      thumbnail: "/images/lectures/quran-memorization.jpg"
    },
    {
      id: 2,
      title: "أحكام التجويد المتقدمة",
      instructor: "الأستاذ محمد العوضي",
      date: "2025-03-26",
      time: "20:30",
      duration: "90 دقيقة",
      attendees: 92,
      category: "تجويد",
      level: "متقدم",
      thumbnail: "/images/lectures/tajweed-advanced.jpg"
    },
    {
      id: 3,
      title: "مناقشة تفسير سورة الكهف",
      instructor: "د. عبدالرحمن السديس",
      date: "2025-03-27",
      time: "18:00",
      duration: "120 دقيقة",
      attendees: 203,
      category: "تفسير",
      level: "متوسط",
      thumbnail: "/images/lectures/tafseer-kahf.jpg"
    },
    {
      id: 4,
      title: "دروس من الهدي النبوي في شهر رمضان",
      instructor: "الشيخ محمد العريفي",
      date: "2025-03-28",
      time: "21:00",
      duration: "75 دقيقة",
      attendees: 178,
      category: "حديث",
      level: "عام",
      thumbnail: "/images/lectures/hadith-ramadan.jpg"
    }
  ];

  const recordedLectures = [
    {
      id: 1,
      title: "تعلم أصول اللغة العربية للمبتدئين",
      instructor: "د. أحمد السيد",
      date: "2025-03-10",
      duration: "65 دقيقة",
      views: 1245,
      category: "لغة عربية",
      level: "مبتدئ",
      thumbnail: "/images/lectures/arabic-basics.jpg"
    },
    {
      id: 2,
      title: "شرح متن الآجرومية في النحو",
      instructor: "د. يوسف الشهري",
      date: "2025-03-05",
      duration: "110 دقيقة",
      views: 872,
      category: "لغة عربية",
      level: "متوسط",
      thumbnail: "/images/lectures/arabic-grammar.jpg"
    },
    {
      id: 3,
      title: "تفسير سورة البقرة - الجزء الأول",
      instructor: "الشيخ عبدالرحمن السديس",
      date: "2025-02-28",
      duration: "130 دقيقة",
      views: 2105,
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
      title: "حلقة إجازة بالقراءات العشر",
      instructor: "الشيخ أيمن رشدي",
      schedule: "الثلاثاء والخميس",
      time: "20:00",
      duration: "120 دقيقة",
      members: 12,
      level: "متقدم",
      status: "مغلقة للانضمام"
    },
    {
      id: 3,
      title: "حلقة تدارس صحيح البخاري",
      instructor: "د. محمد الفوزان",
      schedule: "السبت والأربعاء",
      time: "18:00",
      duration: "90 دقيقة",
      members: 30,
      level: "متوسط",
      status: "متاحة للانضمام"
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">المحاضرات المباشرة وحلقات التحفيظ</h1>
      
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="ابحث عن محاضرات أو حلقات (عنوان، مدرس، موضوع)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">المحاضرات القادمة</TabsTrigger>
          <TabsTrigger value="recorded">المحاضرات المسجلة</TabsTrigger>
          <TabsTrigger value="circles">حلقات التحفيظ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">المحاضرات المباشرة القادمة</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingLectures.map((lecture) => (
                  <Card key={lecture.id} className="shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between">
                        <Badge variant="outline" className="mb-2">{lecture.category}</Badge>
                        <Badge variant="secondary">{lecture.level}</Badge>
                      </div>
                      <CardTitle className="text-xl">{lecture.title}</CardTitle>
                      <div className="flex items-center mt-2">
                        <User className="h-4 w-4 ml-1 text-muted-foreground" />
                        <CardDescription>
                          {lecture.instructor}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 ml-2 text-muted-foreground" />
                          <span>{lecture.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                          <span>{lecture.time} - {lecture.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-2 text-muted-foreground" />
                          <span>{lecture.attendees} مشترك</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Bell className="ml-2 h-4 w-4" /> تذكير
                      </Button>
                      <Button size="sm">
                        <Video className="ml-2 h-4 w-4" /> انضم للبث
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">التقويم</h2>
              <Card>
                <CardHeader>
                  <CardTitle>مارس 2025</CardTitle>
                  <CardDescription>اضغط على التاريخ لعرض المحاضرات</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={ar}
                    className="rounded-md border"
                  />
                </CardContent>
                <CardFooter>
                  <div className="w-full text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      محاضرات يوم {date?.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {date?.getDate() === 25 ? (
                      <div className="p-2 border rounded-md">
                        <p className="font-medium">أساسيات حفظ القرآن الكريم</p>
                        <p className="text-sm text-muted-foreground">19:00 - 60 دقيقة</p>
                      </div>
                    ) : date?.getDate() === 26 ? (
                      <div className="p-2 border rounded-md">
                        <p className="font-medium">أحكام التجويد المتقدمة</p>
                        <p className="text-sm text-muted-foreground">20:30 - 90 دقيقة</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">لا توجد محاضرات لهذا اليوم</p>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recorded">
          <h2 className="text-2xl font-semibold mb-6">المحاضرات المسجلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recordedLectures.map((lecture) => (
              <Card key={lecture.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex justify-between">
                    <Badge variant="outline" className="mb-2">{lecture.category}</Badge>
                    <Badge variant="secondary">{lecture.level}</Badge>
                  </div>
                  <CardTitle>{lecture.title}</CardTitle>
                  <div className="flex items-center mt-2">
                    <User className="h-4 w-4 ml-1 text-muted-foreground" />
                    <CardDescription>
                      {lecture.instructor}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 ml-2 text-muted-foreground" />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <Button variant="outline">
                    <MessageSquare className="ml-2 h-4 w-4" /> تواصل مع المشرف
                  </Button>
                  <Button disabled={circle.status === "مغلقة للانضمام"}>
                    انضم للحلقة
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>إنشاء حلقة جديدة</CardTitle>
                <CardDescription>
                  قم بإنشاء حلقة تحفيظ أو دراسة خاصة بك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  إذا كنت ترغب في إنشاء حلقة خاصة بك للتحفيظ أو لدراسة موضوع معين، يمكنك التقدم بطلب إنشاء حلقة جديدة. سيتم مراجعة طلبك وتوفير المنصة المناسبة لإدارة الحلقة.
                </p>
              </CardContent>
              <CardFooter>
                <Button>
                  إنشاء حلقة جديدة
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}