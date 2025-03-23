
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageContainer from "@/components/layout/PageContainer";
import { 
  Tent, 
  Map, 
  Calendar, 
  Book, 
  Heart, 
  Landmark, 
  MapPin, 
  Video
} from "lucide-react";

export default function HajjUmrahPage() {
  const [activeTab, setActiveTab] = useState("hajj");
  
  const hajjSteps = [
    {
      id: 1,
      title: "الإحرام",
      description: "نية الدخول في النسك، ولبس ملابس الإحرام، والتلبية",
      details: "الإحرام هو نية الدخول في النسك، وهو ركن من أركان الحج. يبدأ الحاج بالاغتسال والتطيب ثم لبس ملابس الإحرام للرجال (إزار ورداء أبيضين) بينما ترتدي النساء ثيابًا ساترة. ثم ينوي الحج ويلبي قائلًا: لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك.",
      icon: <Tent className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 2,
      title: "الوقوف بعرفة",
      description: "الوقوف بعرفة يوم 9 ذي الحجة من زوال الشمس إلى غروبها",
      details: "الوقوف بعرفة هو الركن الأعظم في الحج، ويكون في اليوم التاسع من ذي الحجة. يقف الحجاج في عرفة من زوال الشمس إلى غروبها، ويكثرون من الدعاء والاستغفار والتضرع إلى الله. قال النبي صلى الله عليه وسلم: 'الحج عرفة'.",
      icon: <Map className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 3,
      title: "المبيت بمزدلفة",
      description: "النزول بمزدلفة ليلة 10 ذي الحجة، والمبيت بها حتى الفجر",
      details: "بعد غروب شمس يوم عرفة، يتوجه الحجاج إلى مزدلفة للمبيت فيها. ويصلون المغرب والعشاء جمعًا وقصرًا، ويلتقطون الحصى لرمي الجمرات. ثم يبيتون فيها إلى الفجر، ويصلون الفجر ثم يتوجهون إلى منى.",
      icon: <Calendar className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 4,
      title: "رمي جمرة العقبة",
      description: "رمي جمرة العقبة الكبرى يوم النحر بسبع حصيات",
      details: "في يوم النحر (10 ذي الحجة)، يرمي الحاج جمرة العقبة الكبرى بسبع حصيات متعاقبات مع التكبير مع كل حصاة. وهذا من واجبات الحج.",
      icon: <MapPin className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 5,
      title: "النحر أو الحلق",
      description: "ذبح الهدي ثم الحلق أو التقصير يوم النحر",
      details: "بعد رمي جمرة العقبة، يذبح الحاج الهدي إن كان متمتعًا أو قارنًا، ثم يحلق رأسه أو يقصر شعره، والحلق أفضل للرجال. قال صلى الله عليه وسلم: 'اللهم ارحم المحلقين'. قالوا: والمقصرين يا رسول الله؟ قال: 'اللهم ارحم المحلقين'. قالوا: والمقصرين يا رسول الله؟ قال: 'والمقصرين'.",
      icon: <Heart className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 6,
      title: "طواف الإفاضة",
      description: "الطواف حول الكعبة سبعة أشواط",
      details: "من أركان الحج طواف الإفاضة، وهو أن يطوف الحاج حول الكعبة سبعة أشواط، ثم يصلي ركعتين خلف مقام إبراهيم إن تيسر ذلك، أو في أي مكان من المسجد الحرام.",
      icon: <Landmark className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 7,
      title: "السعي بين الصفا والمروة",
      description: "السعي بين الصفا والمروة سبعة أشواط",
      details: "من أركان الحج السعي بين الصفا والمروة سبعة أشواط، يبدأ من الصفا وينتهي بالمروة. ويسن الإسراع في المشي بين العلمين الأخضرين في كل شوط.",
      icon: <Book className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 8,
      title: "المبيت بمنى",
      description: "المبيت بمنى ليالي أيام التشريق",
      details: "من واجبات الحج المبيت بمنى ليالي أيام التشريق (11, 12, 13 من ذي الحجة)، ويرمي الحاج الجمرات الثلاث في كل يوم من أيام التشريق بعد الزوال.",
      icon: <Tent className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    }
  ];
  
  const umrahSteps = [
    {
      id: 1,
      title: "الإحرام",
      description: "نية الدخول في نسك العمرة ولبس ملابس الإحرام والتلبية",
      details: "الإحرام هو نية الدخول في النسك، وهو ركن من أركان العمرة. يبدأ المعتمر بالاغتسال والتطيب ثم لبس ملابس الإحرام للرجال (إزار ورداء أبيضين) بينما ترتدي النساء ثيابًا ساترة. ثم ينوي العمرة ويلبي قائلًا: لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك.",
      icon: <Tent className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 2,
      title: "الطواف",
      description: "الطواف حول الكعبة سبعة أشواط",
      details: "عند الوصول إلى المسجد الحرام، يبدأ المعتمر بالطواف حول الكعبة سبعة أشواط، بدءًا من الحجر الأسود ومنتهيًا به. ويستلم الحجر الأسود أو يشير إليه عند كل شوط، ويرمل (يسرع في المشي) في الأشواط الثلاثة الأولى للرجال فقط، ويضطبع (يكشف كتفه الأيمن) طوال الطواف. وعند الانتهاء من الطواف يصلي ركعتين خلف مقام إبراهيم أو في أي مكان من المسجد الحرام.",
      icon: <Landmark className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 3,
      title: "السعي",
      description: "السعي بين الصفا والمروة سبعة أشواط",
      details: "بعد الانتهاء من الطواف، يتوجه المعتمر إلى المسعى للسعي بين الصفا والمروة. يبدأ من الصفا ويختم بالمروة، والشوط الواحد من الصفا إلى المروة أو من المروة إلى الصفا. ويسن الإسراع في المشي بين العلمين الأخضرين في كل شوط.",
      icon: <Map className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    },
    {
      id: 4,
      title: "الحلق أو التقصير",
      description: "حلق الشعر أو تقصيره للتحلل من العمرة",
      details: "بعد الانتهاء من السعي، يحلق المعتمر شعر رأسه أو يقصره. والحلق أفضل للرجال، أما النساء فيكتفين بقص قدر أنملة من شعرهن. وبهذا تنتهي العمرة ويتحلل المعتمر من إحرامه.",
      icon: <Heart className="h-5 w-5 text-primary" />,
      videoUrl: "#"
    }
  ];
  
  const hajjPreparations = [
    {
      title: "الاستعداد الروحي",
      points: [
        "التوبة النصوح وردّ المظالم",
        "تعلم أحكام الحج والعمرة",
        "الإكثار من الأعمال الصالحة",
        "الدعاء بالتوفيق وقبول النسك"
      ]
    },
    {
      title: "الاستعداد البدني",
      points: [
        "التدريب على المشي لمسافات طويلة",
        "الفحص الطبي الشامل قبل السفر",
        "أخذ اللقاحات الضرورية",
        "الاستعداد للإجهاد وتغير المناخ"
      ]
    },
    {
      title: "الاستعداد المادي",
      points: [
        "التسجيل المبكر لرحلة الحج",
        "تجهيز الملابس المناسبة (الإحرام، ملابس قطنية، حذاء مريح)",
        "تجهيز الأدوية والمستلزمات الشخصية",
        "الإنفاق من المال الحلال"
      ]
    }
  ];
  
  const hajjDuaas = [
    {
      title: "دعاء التلبية",
      arabic: "لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك",
      translation: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner."
    },
    {
      title: "دعاء عند رؤية الكعبة",
      arabic: "اللهم زد هذا البيت تشريفاً وتعظيماً وتكريماً ومهابةً، وزد من شرّفه وعظّمه ممن حجه أو اعتمره تشريفاً وتكريماً وتعظيماً وبراً",
      translation: "O Allah, increase this House in honor, dignity, reverence and awe, and increase those who honor and revere it among those who perform Hajj or Umrah in honor, dignity, reverence and righteousness."
    },
    {
      title: "دعاء يوم عرفة",
      arabic: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
      translation: "There is no god but Allah alone, with no partner or associate. His is the Dominion, all praise is due to Him, and He is able to do all things."
    },
    {
      title: "دعاء عند رمي الجمرات",
      arabic: "بسم الله والله أكبر، اللهم اجعله حجاً مبروراً وسعياً مشكوراً وذنباً مغفوراً",
      translation: "In the name of Allah, Allah is the Greatest. O Allah, make my Hajj accepted, my efforts appreciated, and my sins forgiven."
    }
  ];

  return (
    <PageContainer title="مناسك الحج والعمرة">
      <p className="text-muted-foreground text-center mb-6">دليل شامل لأداء مناسك الحج والعمرة وفق الكتاب والسنة</p>
      
      <Tabs defaultValue="hajj" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="hajj">الحج</TabsTrigger>
          <TabsTrigger value="umrah">العمرة</TabsTrigger>
          <TabsTrigger value="preparation">الاستعداد</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hajj">
          <h2 className="text-2xl font-semibold mb-6">خطوات أداء مناسك الحج</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {hajjSteps.map((step) => (
              <Card key={step.id} className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-lg ml-3">
                        {step.icon}
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                    <Badge>{step.id}</Badge>
                  </div>
                  <CardDescription>
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{step.details}</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">
                    <Video className="h-4 w-4 ml-2" /> شاهد الشرح
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold mb-4">أدعية الحج المأثورة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hajjDuaas.map((dua, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <CardTitle>{dua.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-lg font-arabic">{dua.arabic}</p>
                  <p className="text-xs text-muted-foreground">{dua.translation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="umrah">
          <h2 className="text-2xl font-semibold mb-6">خطوات أداء مناسك العمرة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {umrahSteps.map((step) => (
              <Card key={step.id} className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-lg ml-3">
                        {step.icon}
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                    <Badge>{step.id}</Badge>
                  </div>
                  <CardDescription>
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{step.details}</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">
                    <Video className="h-4 w-4 ml-2" /> شاهد الشرح
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>فضل العمرة</CardTitle>
              <CardDescription>الأحاديث الواردة في فضل أداء العمرة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="mb-2 font-arabic text-base">قال رسول الله صلى الله عليه وسلم: "العمرة إلى العمرة كفارة لما بينهما، والحج المبرور ليس له جزاء إلا الجنة"</p>
                <p className="text-xs text-muted-foreground">رواه البخاري ومسلم</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="mb-2 font-arabic text-base">وقال صلى الله عليه وسلم: "تابعوا بين الحج والعمرة فإنهما ينفيان الفقر والذنوب كما ينفي الكير خبث الحديد"</p>
                <p className="text-xs text-muted-foreground">رواه الترمذي والنسائي</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preparation">
          <h2 className="text-2xl font-semibold mb-6">الاستعداد للحج والعمرة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {hajjPreparations.map((prep, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <CardTitle>{prep.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prep.points.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>نصائح صحية للحجاج والمعتمرين</CardTitle>
              <CardDescription>إرشادات طبية هامة قبل وأثناء أداء المناسك</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">قبل السفر</h4>
                <ul className="space-y-1 text-sm">
                  <li>• إجراء فحص طبي شامل</li>
                  <li>• أخذ اللقاحات الموصى بها</li>
                  <li>• تجهيز الأدوية الضرورية بكميات كافية</li>
                  <li>• التأكد من صلاحية التأمين الصحي</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">أثناء المناسك</h4>
                <ul className="space-y-1 text-sm">
                  <li>• شرب كميات كافية من الماء</li>
                  <li>• تجنب التعرض المباشر لأشعة الشمس</li>
                  <li>• استخدام المظلات والكمامات</li>
                  <li>• أخذ قسط كاف من الراحة</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Book className="ml-2 h-4 w-4" />
                المزيد من النصائح الصحية
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>الأمتعة المقترحة</CardTitle>
              <CardDescription>قائمة بالأغراض التي يُنصح باصطحابها للحج والعمرة</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">الملابس</h4>
                <ul className="space-y-1 text-sm">
                  <li>• ملابس الإحرام للرجال</li>
                  <li>• ملابس قطنية خفيفة</li>
                  <li>• أحذية مريحة للمشي</li>
                  <li>• حزام للنقود</li>
                  <li>• مظلة للشمس</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">الأدوية والصحة</h4>
                <ul className="space-y-1 text-sm">
                  <li>• الأدوية الشخصية</li>
                  <li>• مسكنات للألم</li>
                  <li>• أدوية للإسهال والإمساك</li>
                  <li>• مراهم للجروح والالتهابات</li>
                  <li>• معقم لليدين</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">أمور أخرى</h4>
                <ul className="space-y-1 text-sm">
                  <li>• سجادة صلاة خفيفة</li>
                  <li>• مصحف صغير أو تطبيق قرآن</li>
                  <li>• كتاب أدعية الحج والعمرة</li>
                  <li>• شريحة اتصال محلية</li>
                  <li>• حقيبة صغيرة للطواف والسعي</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
