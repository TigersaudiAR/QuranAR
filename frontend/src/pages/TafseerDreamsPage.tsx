
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, BookOpen, Info, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const dreamSymbols = [
  {
    category: "الأنبياء والصالحين",
    symbols: [
      {
        symbol: "النبي محمد صلى الله عليه وسلم",
        interpretation: "رؤية النبي صلى الله عليه وسلم بشرى وخير وبركة، وإذا كانت الرؤيا كما وصف في الأحاديث فهي رؤيا حقيقية. من رآه على صفة حسنة فهو بشارة بالخير والصلاح. وقيل: إن رؤيته صلى الله عليه وسلم في المنام إنذار بزوال هم أو ضيق."
      },
      {
        symbol: "إبراهيم عليه السلام",
        interpretation: "رؤية سيدنا إبراهيم عليه السلام تدل على الحنيفية والتوحيد، وربما كان الرائي يدعو الناس إلى الهدى والصلاح. ورؤيته من قبل صاحب هم تدل على زوال همه وبشارة بنجاة من الشدائد."
      },
      {
        symbol: "موسى عليه السلام",
        interpretation: "رؤية سيدنا موسى عليه السلام في المنام تدل على النصر على الأعداء وإبطال السحر، وقد تشير إلى الخلاص من الظلم. وربما دلت على الكلام الطيب والحق."
      },
      {
        symbol: "عيسى عليه السلام",
        interpretation: "من رأى سيدنا عيسى عليه السلام في المنام فإنه يدل على العلم والحكمة والشفاء من الأسقام، ويدل على الزهد في الدنيا والعمل للآخرة. وقد يشير إلى بركة وخير متوقع."
      }
    ]
  },
  {
    category: "الطبيعة والظواهر الكونية",
    symbols: [
      {
        symbol: "السماء",
        interpretation: "ترمز إلى السمو والعلو والرفعة، وربما دلت على الرزق من الله تعالى. والسماء الصافية تدل على الخير والبركة، والملبدة بالغيوم قد تشير إلى الهموم أو الرزق القادم."
      },
      {
        symbol: "الشمس",
        interpretation: "ترمز إلى السلطان أو الرئيس أو الأب، وقد تدل على العلم والهداية والوضوح. ظهور الشمس بعد غياب يدل على التيسير بعد العسر، وغروبها إشارة إلى انتهاء أمر ما."
      },
      {
        symbol: "القمر",
        interpretation: "يرمز إلى الزوجة أو الأم أو الولد، وقد يشير إلى وزير الملك. القمر المنير دليل على الهداية والرزق، والقمر المظلم دليل على قلة العلم أو الكرب."
      },
      {
        symbol: "المطر",
        interpretation: "يرمز إلى الرحمة والخير والرزق، وقد يدل على العدل بين الناس. المطر الغزير إن بلل الثياب قد يشير إلى الهموم، وإن كان معتدلاً فهو خير ونماء."
      }
    ]
  },
  {
    category: "الحيوانات",
    symbols: [
      {
        symbol: "الأسد",
        interpretation: "يرمز إلى القوة والسلطان والملك، وقد يدل على رجل شجاع ذو سلطة. مواجهة الأسد في المنام تدل على مواجهة عدو قوي، وإذا رأى الإنسان نفسه يركب أسداً فقد ينال سلطة."
      },
      {
        symbol: "الثعبان",
        interpretation: "قد يرمز إلى العدو المتخفي، أو قد يدل على كنز مدفون. قتل الثعبان ينبئ بالنصر على العدو، والثعبان الأبيض قد يدل على صديق مخلص."
      },
      {
        symbol: "الخيل",
        interpretation: "ترمز إلى العز والرفعة، والخيل الأصيلة تدل على مجد وسمعة طيبة. ركوب الفرس وتعثره قد يشير إلى عدم تحقق أمر، وقد يدل الخيل على السفر."
      },
      {
        symbol: "الطيور",
        interpretation: "ترمز عموماً إلى الأخبار والرسائل، والطيور الملونة الجميلة تشير إلى بشائر سارة. صيد الطيور قد يدل على الرزق، وهروبها قد يشير إلى ضياع فرصة."
      }
    ]
  },
  {
    category: "أفعال وحالات",
    symbols: [
      {
        symbol: "السباحة",
        interpretation: "ترمز إلى الخوض في الحياة أو المشاكل، والسباحة في ماء صاف دليل على حياة طيبة وسعادة. أما السباحة في ماء عكر فقد تدل على صعوبات ومشاكل."
      },
      {
        symbol: "الطيران",
        interpretation: "يرمز إلى العلو والترقي والنجاح، والطيران المستقر يدل على تحقيق الأماني. الطيران المضطرب قد يشير إلى أحلام بعيدة عن الواقع."
      },
      {
        symbol: "البكاء",
        interpretation: "قد يشير إلى الفرح وزوال الهم، والبكاء الشديد مع الألم قد يدل على شدة قادمة. البكاء في المنام عموماً خلاف البكاء في الواقع."
      },
      {
        symbol: "الضحك",
        interpretation: "قد يدل على الحزن أو الندم، والضحك المعتدل يشير إلى السرور والفرح. الضحك الكثير حتى البكاء قد يدل على مصيبة أو أمر مؤسف."
      }
    ]
  }
];

const tafseerCategories = [
  {
    name: "التفسير الميسر",
    description: "ملخص مبسط لتفسير القرآن الكريم",
    source: "مجمع الملك فهد لطباعة المصحف الشريف",
    link: "#"
  },
  {
    name: "تفسير ابن كثير",
    description: "تفسير القرآن العظيم للإمام ابن كثير",
    source: "إسماعيل بن عمر بن كثير القرشي الدمشقي",
    link: "#"
  },
  {
    name: "تفسير السعدي",
    description: "تيسير الكريم الرحمن في تفسير كلام المنان",
    source: "عبد الرحمن بن ناصر السعدي",
    link: "#"
  },
  {
    name: "تفسير الطبري",
    description: "جامع البيان عن تأويل آي القرآن",
    source: "محمد بن جرير الطبري",
    link: "#"
  }
];

export default function TafseerDreamsPage() {
  const [activeTab, setActiveTab] = useState("tafseer");

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">التفسير وتعبير الرؤى</h1>
        <p className="text-muted-foreground text-center mb-8">
          موسوعة التفاسير الشرعية وتعبير الأحلام بحسب الضوابط الشرعية
        </p>

        <Tabs defaultValue="tafseer" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="tafseer">التفسير</TabsTrigger>
            <TabsTrigger value="dreams">تعبير الرؤى</TabsTrigger>
          </TabsList>

          <TabsContent value="tafseer">
            <div className="grid grid-cols-1 gap-4">
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    <CardTitle>تفسير القرآن الكريم</CardTitle>
                  </div>
                  <CardDescription>
                    مجموعة من التفاسير المعتمدة للقرآن الكريم
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Alert className="mb-6">
                    <Info className="h-4 w-4" />
                    <AlertTitle>يمكنك البحث في التفاسير المختلفة</AlertTitle>
                    <AlertDescription>
                      اختر التفسير المناسب واكتب رقم السورة والآية للاطلاع على التفسير
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {tafseerCategories.map((category, idx) => (
                      <Card key={idx} className="border-primary/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {category.source}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {category.description}
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            تصفح التفسير
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/30">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Info className="h-4 w-4 ml-2 text-primary" />
                      قيد التطوير
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      نعمل حالياً على توفير جميع التفاسير بشكل كامل مع إمكانية البحث والمقارنة بين التفاسير المختلفة.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dreams">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <Moon className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>تعبير الرؤى والأحلام</CardTitle>
                </div>
                <CardDescription>
                  معاني الرموز في الأحلام حسب التفسير الإسلامي
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Alert className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle>تنبيه هام</AlertTitle>
                  <AlertDescription className="text-amber-800 dark:text-amber-300">
                    تعبير الرؤى علم ظني وليس قطعياً، ويختلف باختلاف أحوال الرائي وزمانه ومكانه. يُنصح بعرض الرؤيا على مختص في التعبير.
                  </AlertDescription>
                </Alert>

                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-8">
                    {dreamSymbols.map((category, idx) => (
                      <div key={idx} className="border-t pt-6 first:border-t-0 first:pt-0">
                        <h3 className="text-lg font-bold mb-4 text-primary">{category.category}</h3>
                        <div className="space-y-4">
                          {category.symbols.map((symbol, symbolIdx) => (
                            <div key={symbolIdx} className="border rounded-lg p-4 bg-card">
                              <h4 className="font-semibold mb-2">{symbol.symbol}</h4>
                              <p className="text-sm text-muted-foreground">{symbol.interpretation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
