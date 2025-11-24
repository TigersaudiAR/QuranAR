
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Calendar, User, Clock, PlayCircle, Users, AlertCircle, Bookmark } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

// المحاضرات القادمة
const upcomingLectures = [
  {
    id: 1,
    title: "شرح رياض الصالحين",
    speaker: "الشيخ د. عبد الله الغنيمان",
    date: "2023-12-15",
    time: "19:30",
    duration: 60,
    description: "شرح أحاديث باب الصبر من كتاب رياض الصالحين للإمام النووي",
    attendees: 245,
    category: "الحديث",
    tags: ["حديث", "أخلاق", "رياض الصالحين"]
  },
  {
    id: 2,
    title: "أحكام الطهارة في الإسلام",
    speaker: "الشيخ د. خالد المصلح",
    date: "2023-12-18",
    time: "20:00",
    duration: 90,
    description: "دروس تفصيلية في أحكام الطهارة وشروطها وفرائضها",
    attendees: 178,
    category: "الفقه",
    tags: ["فقه", "طهارة", "أحكام"]
  },
  {
    id: 3,
    title: "تفسير سورة الكهف",
    speaker: "الشيخ د. محمد العريفي",
    date: "2023-12-20",
    time: "21:15",
    duration: 75,
    description: "تفسير مفصل لسورة الكهف مع استخراج الدروس والعبر",
    attendees: 312,
    category: "التفسير",
    tags: ["تفسير", "سورة الكهف", "قرآن"]
  }
];

// المحاضرات المسجلة
const recordedLectures = [
  {
    id: 1,
    title: "وصايا للشباب المسلم",
    speaker: "الشيخ د. سلمان العودة",
    date: "2023-11-25",
    duration: 55,
    views: 1840,
    description: "نصائح وتوجيهات للشباب المسلم في ظل التحديات المعاصرة",
    category: "التزكية",
    tags: ["شباب", "تربية", "نصائح"]
  },
  {
    id: 2,
    title: "مختصر السيرة النبوية",
    speaker: "الشيخ د. عائض القرني",
    date: "2023-11-18",
    duration: 65,
    views: 2150,
    description: "شرح مختصر للسيرة النبوية من المولد الشريف إلى الوفاة",
    category: "السيرة",
    tags: ["سيرة", "نبوية", "تاريخ"]
  },
  {
    id: 3,
    title: "آداب طلب العلم",
    speaker: "الشيخ د. محمد الدويش",
    date: "2023-11-10",
    duration: 70,
    views: 1230,
    description: "الآداب والأخلاقيات التي ينبغي لطالب العلم التحلي بها",
    category: "آداب",
    tags: ["طلب العلم", "آداب", "أخلاق"]
  },
  {
    id: 4,
    title: "شرح الأربعين النووية",
    speaker: "الشيخ د. صالح الفوزان",
    date: "2023-11-05",
    duration: 120,
    views: 3540,
    description: "شرح تفصيلي للأحاديث العشرة الأولى من الأربعين النووية",
    category: "الحديث",
    tags: ["حديث", "أربعين نووية", "شرح"]
  }
];

// فئات المحاضرات
const lectureCategories = [
  { id: 1, name: "العقيدة", count: 24 },
  { id: 2, name: "الفقه", count: 38 },
  { id: 3, name: "التفسير", count: 45 },
  { id: 4, name: "الحديث", count: 32 },
  { id: 5, name: "السيرة", count: 18 },
  { id: 6, name: "التزكية", count: 27 }
];

// تحويل التاريخ إلى صيغة عربية
function formatArabicDate(dateStr: string) {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('ar-SA', options).format(date);
}

export default function LiveLecturesPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">المحاضرات والدروس</h1>
        <p className="text-muted-foreground text-center mb-8">
          محاضرات ودروس مباشرة ومسجلة من علماء وطلبة علم موثوقين
        </p>

        <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">المحاضرات القادمة</TabsTrigger>
            <TabsTrigger value="recorded">المحاضرات المسجلة</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 gap-6 mb-6">
              {upcomingLectures.map((lecture) => (
                <Card key={lecture.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2" variant="outline">{lecture.category}</Badge>
                        <CardTitle className="text-xl">{lecture.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <User className="h-4 w-4 mr-1" />
                          {lecture.speaker}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{lecture.attendees}</span>
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {lecture.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="bg-primary/10 text-primary text-xs rounded-full py-1 px-3 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatArabicDate(lecture.date)}</span>
                      </div>
                      <div className="bg-primary/10 text-primary text-xs rounded-full py-1 px-3 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{lecture.time}</span>
                      </div>
                      <div className="bg-primary/10 text-primary text-xs rounded-full py-1 px-3 flex items-center">
                        <Video className="h-3 w-3 mr-1" />
                        <span>{lecture.duration} دقيقة</span>
                      </div>
                    </div>

                    <div className="flex gap-1 flex-wrap">
                      {lecture.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 flex justify-between">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>تذكير</span>
                    </Button>
                    <Button className="gap-1">
                      <PlayCircle className="h-4 w-4" />
                      <span>حضور المحاضرة</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Alert className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle>ملاحظة</AlertTitle>
              <AlertDescription className="text-amber-800 dark:text-amber-300">
                جميع المحاضرات المباشرة مجانية، ويمكن الانضمام إليها بالضغط على زر "حضور المحاضرة" قبل موعدها بـ 15 دقيقة.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="recorded">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recordedLectures.map((lecture) => (
                    <Card key={lecture.id} className="overflow-hidden transition-all hover:shadow-md">
                      <CardHeader className="pb-2">
                        <Badge className="mb-1" variant="outline">{lecture.category}</Badge>
                        <CardTitle className="text-base line-clamp-1">{lecture.title}</CardTitle>
                        <CardDescription className="flex items-center text-xs">
                          <User className="h-3 w-3 mr-1" />
                          {lecture.speaker}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {lecture.description}
                        </p>

                        <div className="flex gap-2 mb-2">
                          <div className="bg-primary/10 text-primary text-xs rounded-full py-0.5 px-2 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{formatArabicDate(lecture.date)}</span>
                          </div>
                          <div className="bg-primary/10 text-primary text-xs rounded-full py-0.5 px-2 flex items-center">
                            <Video className="h-3 w-3 mr-1" />
                            <span>{lecture.duration} د</span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="gap-1 w-full">
                          <PlayCircle className="h-4 w-4" />
                          <span>مشاهدة</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">الفئات</CardTitle>
                    <CardDescription>
                      تصفح المحاضرات حسب الفئة
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[250px]">
                      <div className="space-y-2">
                        {lectureCategories.map((category) => (
                          <div 
                            key={category.id} 
                            className="flex justify-between items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                          >
                            <span>{category.name}</span>
                            <Badge variant="secondary">{category.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-1">
                      <Bookmark className="h-4 w-4" />
                      <span>متابعة الفئات المفضلة</span>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">الاشتراك في النشرة</CardTitle>
                    <CardDescription>
                      احصل على إشعارات بالمحاضرات الجديدة
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">الاشتراك</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
