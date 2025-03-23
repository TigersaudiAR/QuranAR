import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/layout/PageContainer";
import {
  CheckCircle,
  RefreshCcw,
  Moon,
  Sun,
  Edit3
} from "lucide-react";

type ZikrItem = {
  id: number;
  text: string;
  repeat: number;
  source: string;
  translated: string;
};

type DhikrCountType = Record<string, number>;
type DhikrGoalsType = Record<string, number>;

const morningAzkar = [
  {
    id: 1,
    text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَـهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    count: 1,
    translated: "We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent."
  },
  {
    id: 2,
    text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    count: 1,
    translated: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection."
  },
  {
    id: 3,
    text: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لا يَغْفِرُ الذُّنُوبَ إِلا أَنْتَ",
    count: 1,
    translated: "O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide to Your covenant and promise as best I can, I take refuge in You from the evil of which I committed. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You."
  }
];

const eveningAzkar = [
  {
    id: 1,
    text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَـهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    count: 1,
    translated: "We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent."
  },
  {
    id: 2,
    text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    count: 1,
    translated: "O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning, by Your leave we live and die and unto You is our return."
  },
  {
    id: 3,
    text: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لا يَغْفِرُ الذُّنُوبَ إِلا أَنْتَ",
    count: 1,
    translated: "O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide to Your covenant and promise as best I can, I take refuge in You from the evil of which I committed. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You."
  }
];

export default function AzkarPage() {
  const [activeTab, setActiveTab] = useState("morning");

  return (
    <PageContainer title="الأذكار والتسبيح">
      <p className="text-muted-foreground text-center mb-6">الأذكار اليومية وعداد التسبيح</p>

      <Tabs defaultValue="morning" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="counter">عداد الذكر</TabsTrigger>
          <TabsTrigger value="daily">أذكار اليوم</TabsTrigger>
          <TabsTrigger value="custom">أذكار مخصصة</TabsTrigger>
        </TabsList>

        <TabsContent value="counter">
          <h2 className="text-2xl font-semibold mb-6">عداد الذكر</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Counter content remains here */}
          </div>
        </TabsContent>

        <TabsContent value="daily">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 mr-2 text-amber-400" />
                    <CardTitle>أذكار الصباح</CardTitle>
                  </div>
                  <Badge variant="outline">ص</Badge>
                </div>
                <CardDescription>
                  الأذكار المستحبة في الصباح بعد صلاة الفجر إلى طلوع الشمس
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[450px] pr-4">
                  <div className="space-y-6">
                    {morningAzkar.map((zikr) => (
                      <div key={zikr.id} className="p-4 border rounded-lg bg-card">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="secondary" className="mb-2">{zikr.count}×</Badge>
                          <span className="text-sm text-muted-foreground">#{zikr.id}</span>
                        </div>
                        <p className="text-xl leading-relaxed mb-3 font-uthmani">{zikr.text}</p>
                        <p className="text-sm text-muted-foreground">{zikr.translated}</p>
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
                  <Badge variant="outline">م</Badge>
                </div>
                <CardDescription>
                  الأذكار المستحبة في المساء بعد صلاة العصر إلى غروب الشمس
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[450px] pr-4">
                  <div className="space-y-6">
                    {eveningAzkar.map((zikr) => (
                      <div key={zikr.id} className="p-4 border rounded-lg bg-card">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="secondary" className="mb-2">{zikr.count}×</Badge>
                          <span className="text-sm text-muted-foreground">#{zikr.id}</span>
                        </div>
                        <p className="text-xl leading-relaxed mb-3 font-uthmani">{zikr.text}</p>
                        <p className="text-sm text-muted-foreground">{zikr.translated}</p>
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
    </PageContainer>
  );
}