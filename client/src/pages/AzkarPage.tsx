import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  RefreshCcw, 
  Moon, 
  Sun, 
  Edit3
} from "lucide-react";

export default function AzkarPage() {
  const [activeTab, setActiveTab] = useState("counter");

  // State for dhikr counter
  const [dhikrCount, setDhikrCount] = useState(() => {
    const saved = localStorage.getItem("dhikrCount");
    return saved ? JSON.parse(saved) : {
      "استغفار": 0,
      "تسبيح": 0,
      "تحميد": 0,
      "تكبير": 0,
      "حوقلة": 0
    };
  });

  const [dhikrGoals, setDhikrGoals] = useState(() => {
    const saved = localStorage.getItem("dhikrGoals");
    return saved ? JSON.parse(saved) : {
      "استغفار": 100,
      "تسبيح": 33,
      "تحميد": 33,
      "تكبير": 34,
      "حوقلة": 50
    };
  });

  // Save to localStorage when dhikr state changes
  useEffect(() => {
    localStorage.setItem("dhikrCount", JSON.stringify(dhikrCount));
    localStorage.setItem("dhikrGoals", JSON.stringify(dhikrGoals));
  }, [dhikrCount, dhikrGoals]);

  const incrementDhikr = (type) => {
    if (dhikrCount[type] < dhikrGoals[type]) {
      setDhikrCount(prev => ({
        ...prev,
        [type]: prev[type] + 1
      }));
    }
  };

  const resetDhikr = (type) => {
    setDhikrCount(prev => ({
      ...prev,
      [type]: 0
    }));
  };

  const handleGoalChange = (type, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setDhikrGoals(prev => ({
        ...prev,
        [type]: numValue
      }));
    }
  };

  // Azkar data
  const morningAzkar = [
    {
      id: 1,
      text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ: اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      repeat: 1,
      source: "البقرة: 255",
      translated: "Allah! There is no god but He - the Living, The Self-subsisting, Eternal. No slumber can seize Him nor sleep."
    },
    {
      id: 2,
      text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      repeat: 3,
      source: "سورة الإخلاص",
      translated: "Say: He is Allah, the One; Allah, the Eternal, Absolute; He begetteth not, nor is He begotten; And there is none like unto Him."
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
      translated: "We have entered the evening and the kingdom has entered the evening belonging to Allah. Praise is to Allah. None has the right to be worshipped except Allah, alone, without partner. To Him belongs the dominion and to Him belongs all praise and He is over all things Omnipotent."
    },
    {
      id: 2,
      text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
      repeat: 1,
      source: "رواه الترمذي",
      translated: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return."
    },
    {
      id: 3,
      text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      repeat: 3,
      source: "رواه مسلم",
      translated: "I seek refuge in the Perfect Words of Allah from the evil of what He has created."
    },
    {
      id: 4,
      text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
      repeat: 1,
      source: "رواه أبو داود",
      translated: "O Allah, I have entered the evening and call upon You, and upon the bearers of Your Throne, upon Your angels and all of Your creation to bear witness that surely You are Allah, there is no deity worthy of worship except You alone, without any partners, and that Muhammad is Your servant and Messenger."
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">الأذكار والتسبيح</h1>
        <p className="text-muted-foreground">الأذكار اليومية وعداد التسبيح</p>
      </div>

      <Tabs defaultValue="counter" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="counter">عداد الذكر</TabsTrigger>
          <TabsTrigger value="daily">أذكار اليوم</TabsTrigger>
          <TabsTrigger value="custom">أذكار مخصصة</TabsTrigger>
        </TabsList>

        <TabsContent value="counter">
          <h2 className="text-2xl font-semibold mb-6">عداد الذكر</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <RefreshCcw className="h-4 w-4" />
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
                      <div key={zikr.id} className="p-4 border rounded-lg">
                        <p className="text-lg font-arabic leading-relaxed mb-3">{zikr.text}</p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>التكرار: {zikr.repeat}</span>
                          <span>المصدر: {zikr.source}</span>
                        </div>
                        <Separator className="my-3" />
                        <p className="text-xs text-muted-foreground">{zikr.translated}</p>
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
                    <Moon className="h-5 w-5 mr-2 text-indigo-400" />
                    <CardTitle>أذكار المساء</CardTitle>
                  </div>
                  <Badge variant="outline">مساءً</Badge>
                </div>
                <CardDescription>
                  الأذكار المستحبة في المساء من بعد العصر حتى المغرب
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {eveningAzkar.map((zikr) => (
                      <div key={zikr.id} className="p-4 border rounded-lg">
                        <p className="text-lg font-arabic leading-relaxed mb-3">{zikr.text}</p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>التكرار: {zikr.repeat}</span>
                          <span>المصدر: {zikr.source}</span>
                        </div>
                        <Separator className="my-3" />
                        <p className="text-xs text-muted-foreground">{zikr.translated}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <div className="text-center py-12">
            <Edit3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-medium mb-2">أذكار مخصصة</h3>
            <p className="text-muted-foreground mb-6">
              يمكنك إضافة أذكار مخصصة وحفظها للرجوع إليها لاحقًا
            </p>
            <Button>
              <Edit3 className="ml-2 h-4 w-4" />
              إضافة ذكر جديد
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}