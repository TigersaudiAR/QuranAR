import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Download, Clock, Sun, Moon, Coffee, WifiOff, CheckCircle, Heart, Repeat, Download as DownloadIcon, BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

export default function AzkarPage() {
  const [dhikrCount, setDhikrCount] = useState<Record<string, number>>({
    استغفار: 0,
    تسبيح: 0,
    تحميد: 0,
    تكبير: 0,
    حوقلة: 0,
  });
  
  const [dhikrGoals, setDhikrGoals] = useState<Record<string, number>>({
    استغفار: 100,
    تسبيح: 33,
    تحميد: 33,
    تكبير: 34,
    حوقلة: 100,
  });

  const { toast } = useToast();

  const incrementDhikr = (type: string) => {
    const newCount = dhikrCount[type] + 1;
    setDhikrCount({
      ...dhikrCount,
      [type]: newCount,
    });
    
    if (newCount === dhikrGoals[type]) {
      toast({
        title: "أحسنت!",
        description: `أكملت ${dhikrGoals[type]} من ${type}`,
      });
    }
  };

  const resetDhikr = (type: string) => {
    setDhikrCount({
      ...dhikrCount,
      [type]: 0,
    });
  };
  
  const resetAllDhikr = () => {
    setDhikrCount({
      استغفار: 0,
      تسبيح: 0,
      تحميد: 0,
      تكبير: 0,
      حوقلة: 0,
    });
  };

  const handleGoalChange = (type: string, value: string) => {
    const goal = parseInt(value) || 0;
    setDhikrGoals({
      ...dhikrGoals,
      [type]: goal,
    });
  };

  const morningAzkar = [
    {
      id: 1,
      text: "أَصْبَحْنَا وَأَصْبَحَ المُلْكُ للهِ، وَالحَمْدُ للهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ المُلْكُ وَلَهُ الحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      repeat: 1,
      source: "رواه أبو داود",
      translated: "We have reached the morning and at this very time the whole kingdom belongs to Allah. Praise be to Allah. There is no god but Allah, the One having no partner with Him. To Him belongs the kingdom and to Him is all praise due. He is Potent over everything."
    },
    {
      id: 2,
      text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
      repeat: 1,
      source: "رواه البخاري",
      translated: "O Allah! You are my Lord! None has the right to be worshipped but You. You created me and I am Your slave, and I am faithful to my covenant and my promise as much as I can. I seek refuge with You from all the evil I have done. I acknowledge before You all the blessings You have bestowed upon me, and I confess to You all my sins. So I entreat You to forgive my sins, for nobody can forgive sins except You."
    },
    {
      id: 3,
      text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      repeat: 1,
      source: "رواه أبو داود وابن ماجه",
      translated: "O Allah, I ask You for pardon and well-being in this life and the next. O Allah, I ask You for pardon and well-being in my religious and worldly affairs, and my family and my wealth."
    },
    {
      id: 4,
      text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ",
      repeat: 1,
      source: "رواه البخاري",
      translated: "O Allah, I seek refuge in You from worry and grief, from helplessness and laziness, from cowardice and stinginess, and from overwhelming debt and from the oppression of men."
    }
  ];

  const eveningAzkar = [
    {
      id: 1,
      text: "أَمْسَيْنَا وَأَمْسَى المُلْكُ للهِ، وَالحَمْدُ للهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ المُلْكُ وَلَهُ الحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      repeat: 1,
      source: "رواه أبو داود",
      translated: "We have reached the evening and at this very time the whole kingdom belongs to Allah. Praise be to Allah. There is no god but Allah, the One having no partner with Him. To Him belongs the kingdom and to Him is all praise due. He is Potent over everything."
    },
    {
      id: 2,
      text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      repeat: 1,
      source: "رواه أبو داود",
      translated: "O Allah, what blessing I or any of Your creation have received in this evening is from You alone, without partner, so for You is all praise and gratitude."
    },
    {
      id: 3,
      text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لا إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
      repeat: 4,
      source: "رواه أبو داود والترمذي",
      translated: "O Allah, I have reached the evening and call on You, the bearers of Your throne, Your angels, and all of Your creation to witness that You are Allah, none has the right to be worshipped except You, alone, without partner, and that Muhammad is Your slave and Messenger."
    }
  ];

  const azkarBooks = [
    {
      id: 1,
      title: "حصن المسلم",
      author: "سعيد بن علي بن وهف القحطاني",
      size: "2.5 MB",
      format: "PDF",
      url: "/books/hisn-almuslim.pdf"
    },
    {
      id: 2,
      title: "الأذكار",
      author: "الإمام النووي",
      size: "4.2 MB",
      format: "PDF",
      url: "/books/alazkar-nawawi.pdf"
    },
    {
      id: 3,
      title: "الدعاء من الكتاب والسنة",
      author: "سعيد بن علي بن وهف القحطاني",
      size: "3.7 MB",
      format: "PDF",
      url: "/books/dua-quran-sunnah.pdf"
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">الأذكار والأدعية</h1>
      
      <Tabs defaultValue="counter" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="counter">حاسبة الأذكار</TabsTrigger>
          <TabsTrigger value="daily">أذكار اليوم</TabsTrigger>
          <TabsTrigger value="books">كتب وتحميلات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="counter">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3 mb-6">
              <CardHeader>
                <CardTitle>حاسبة الأذكار</CardTitle>
                <CardDescription>
                  سجل أذكارك اليومية وحدد أهدافًا شخصية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button variant="outline" size="sm" onClick={resetAllDhikr}>
                    إعادة ضبط الكل
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {Object.keys(dhikrCount).map((type) => (
              <Card key={type} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{type}</span>
                    <Badge variant="outline">
                      {dhikrCount[type]}/{dhikrGoals[type]}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {type === "استغفار" && "أستغفر الله العظيم"}
                    {type === "تسبيح" && "سبحان الله"}
                    {type === "تحميد" && "الحمد لله"}
                    {type === "تكبير" && "الله أكبر"}
                    {type === "حوقلة" && "لا حول ولا قوة إلا بالله"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={(dhikrCount[type] / dhikrGoals[type]) * 100}
                    className="h-2 mb-6"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex-1 mr-2">
                      <Input 
                        type="number" 
                        min="1"
                        value={dhikrGoals[type]}
                        onChange={(e) => handleGoalChange(type, e.target.value)}
                        className="text-center"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => resetDhikr(type)}
                    >
                      <Repeat className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => incrementDhikr(type)}
                    disabled={dhikrCount[type] >= dhikrGoals[type]}
                  >
                    <CheckCircle className="ml-2 h-4 w-4" /> تسجيل
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="daily">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                    <CardTitle>أذكار الصباح</CardTitle>
                  </div>
                  <Badge>صباحًا</Badge>
                </div>
                <CardDescription>
                  الأذكار المستحبة في الصباح من طلوع الفجر حتى الضحى
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {morningAzkar.map((zikr) => (
                      <div key={zikr.id} className="p-4 border rounded-md">
                        <p className="font-arabic text-xl leading-relaxed mb-3">
                          {zikr.text}
                        </p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                          <span>{zikr.source}</span>
                          <Badge variant="outline">{zikr.repeat} مرات</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="h-5 w-5 mr-2 text-blue-600" />
                    <CardTitle>أذكار المساء</CardTitle>
                  </div>
                  <Badge>مساءً</Badge>
                </div>
                <CardDescription>
                  الأذكار المستحبة في المساء من بعد العصر حتى المغرب
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {eveningAzkar.map((zikr) => (
                      <div key={zikr.id} className="p-4 border rounded-md">
                        <p className="font-arabic text-xl leading-relaxed mb-3">
                          {zikr.text}
                        </p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                          <span>{zikr.source}</span>
                          <Badge variant="outline">{zikr.repeat} مرات</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <Coffee className="h-5 w-5 mr-2 text-amber-600" />
                  <CardTitle>أذكار الطعام</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-arabic text-lg mb-2">
                  «بِسْمِ اللهِ»
                </p>
                <p className="font-arabic text-lg mb-2">
                  «الْحَمْدُ للهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ»
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <WifiOff className="h-5 w-5 mr-2 text-indigo-600" />
                  <CardTitle>أذكار السفر</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-arabic text-lg mb-2">
                  «اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ...»
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-rose-600" />
                  <CardTitle>أدعية مختارة</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-arabic text-lg mb-2">
                  «رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ»
                </p>
                <p className="font-arabic text-lg mb-2">
                  «رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ»
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="books">
          <h2 className="text-2xl font-semibold mb-6">كتب الأذكار المتاحة للتحميل</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {azkarBooks.map((book) => (
              <Card key={book.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    <CardTitle>{book.title}</CardTitle>
                  </div>
                  <CardDescription>
                    {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>الحجم: {book.size}</span>
                    <span>الصيغة: {book.format}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <DownloadIcon className="ml-2 h-4 w-4" /> تحميل
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">تطبيقات الذكر الموصى بها</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>حصن المسلم - تطبيق الجوال</CardTitle>
                  <CardDescription>
                    تطبيق شامل للأذكار والأدعية اليومية مع إمكانية التنبيه
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-4">
                    <Badge variant="outline">Android</Badge>
                    <Badge variant="outline">iOS</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Download className="ml-2 h-4 w-4" /> Android
                  </Button>
                  <Button variant="outline">
                    <Download className="ml-2 h-4 w-4" /> iOS
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>مسبحة إلكترونية</CardTitle>
                  <CardDescription>
                    تطبيق إلكتروني لحساب الذكر مع إمكانية تخصيص الأذكار
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-4">
                    <Badge variant="outline">Android</Badge>
                    <Badge variant="outline">iOS</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Download className="ml-2 h-4 w-4" /> Android
                  </Button>
                  <Button variant="outline">
                    <Download className="ml-2 h-4 w-4" /> iOS
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}