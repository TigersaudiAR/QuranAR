import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Map, Compass, Tent } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HajjUmrahPage() {
  const [activeTab, setActiveTab] = useState("hajj");

  const hajjSteps = [
    {
      title: "الإحرام",
      description: "نية الدخول في مناسك الحج والتلبية والالتزام بمحظورات الإحرام",
      details: [
        "الاغتسال والتطيب قبل الإحرام (للرجال والنساء)",
        "لبس ملابس الإحرام للرجال (إزار ورداء أبيضين)",
        "نية الدخول في النسك (إفراد أو قران أو تمتع)",
        "التلبية: لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك"
      ]
    },
    {
      title: "الوقوف بعرفة",
      description: "الركن الأعظم للحج، ويكون في اليوم التاسع من ذي الحجة",
      details: [
        "الوقوف في أي مكان بعرفة من زوال شمس يوم التاسع إلى فجر يوم العاشر",
        "الإكثار من الدعاء والذكر والاستغفار",
        "الجمع بين صلاتي الظهر والعصر قصراً",
        "التوجه إلى القبلة عند الدعاء ورفع اليدين"
      ]
    },
    {
      title: "المبيت بمزدلفة",
      description: "بعد الوقوف بعرفة ينتقل الحجاج إلى مزدلفة للمبيت ليلة العاشر",
      details: [
        "الجمع بين صلاتي المغرب والعشاء عند الوصول إلى مزدلفة",
        "المبيت حتى الفجر (يجوز للضعفة الدفع بعد منتصف الليل)",
        "التقاط الجمرات (الحصى) للرمي",
        "صلاة الفجر في أول وقتها والوقوف عند المشعر الحرام للدعاء"
      ]
    },
    {
      title: "رمي جمرة العقبة",
      description: "في يوم العيد (اليوم العاشر) يرمي الحاج جمرة العقبة الكبرى",
      details: [
        "رمي سبع حصيات متعاقبات مع التكبير مع كل حصاة",
        "حجم الحصى كحبة الفول أو البندق تقريباً",
        "يُستحب أن يكون الرمي ضحى يوم العيد",
        "يقف الرامي بحيث تكون منى عن يمينه ومكة عن يساره"
      ]
    },
    {
      title: "الذبح (الهدي)",
      description: "واجب على المتمتع والقارن، بعد رمي جمرة العقبة",
      details: [
        "الذبح في منى أو مكة في أيام التشريق",
        "يجوز التوكيل في الذبح",
        "يُستحب أكل الحاج من هديه والتصدق ببعضه",
        "يمكن شراء قسائم الهدي من الجهات المعتمدة"
      ]
    },
    {
      title: "الحلق أو التقصير",
      description: "بعد الرمي (والذبح للمتمتع والقارن) يحلق الرجل رأسه أو يقصر الشعر",
      details: [
        "الحلق أفضل للرجال",
        "التقصير للنساء فقط (تقص من كل ضفيرة قدر أنملة)",
        "بعد الحلق أو التقصير يحل التحلل الأول",
        "يحل به كل شيء إلا الجماع"
      ]
    },
    {
      title: "طواف الإفاضة",
      description: "ركن من أركان الحج، يُؤدى بعد رمي جمرة العقبة والحلق/التقصير",
      details: [
        "الطواف سبعة أشواط حول الكعبة مبتدئاً من الحجر الأسود",
        "يتبعه سعي بين الصفا والمروة (للمتمتع وللقارن والمفرد إذا لم يسعَ مع طواف القدوم)",
        "بعد الطواف والسعي يحصل التحلل الثاني الكامل",
        "يمكن تأخيره إلى آخر أيام التشريق"
      ]
    },
    {
      title: "المبيت بمنى",
      description: "واجب من واجبات الحج، في ليالي أيام التشريق (11، 12، 13)",
      details: [
        "المبيت معظم الليل في منى",
        "رمي الجمرات الثلاث بعد الزوال في كل يوم من أيام التشريق",
        "يبدأ الرمي بالجمرة الصغرى ثم الوسطى ثم الكبرى",
        "يجوز التعجل بيومين (11 و12) لمن أراد، بشرط الخروج من منى قبل غروب شمس اليوم الثاني عشر"
      ]
    },
    {
      title: "طواف الوداع",
      description: "واجب على من أراد الخروج من مكة بعد أداء مناسك الحج",
      details: [
        "الطواف سبعة أشواط حول الكعبة",
        "يكون آخر عهد الحاج بالبيت",
        "يُعفى منه الحائض والنفساء",
        "يخرج الحاج من مكة بعده مباشرة"
      ]
    }
  ];

  const umrahSteps = [
    {
      title: "الإحرام",
      description: "نية الدخول في مناسك العمرة والتلبية والالتزام بمحظورات الإحرام",
      details: [
        "الاغتسال والتطيب قبل الإحرام (للرجال والنساء)",
        "لبس ملابس الإحرام للرجال (إزار ورداء أبيضين)",
        "نية الدخول في العمرة",
        "التلبية: لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك"
      ]
    },
    {
      title: "الطواف",
      description: "الطواف حول الكعبة سبعة أشواط مبتدئاً من الحجر الأسود",
      details: [
        "كشف الكتف الأيمن (الاضطباع) للرجال",
        "الرمل (الإسراع) في الأشواط الثلاثة الأولى للرجال",
        "استلام الحجر الأسود في بداية كل شوط (إن تيسر)",
        "الدعاء والذكر أثناء الطواف"
      ]
    },
    {
      title: "صلاة ركعتين خلف مقام إبراهيم",
      description: "بعد الانتهاء من الطواف يصلي ركعتين خلف مقام إبراهيم أو في أي مكان من المسجد",
      details: [
        "يقرأ في الركعة الأولى الفاتحة وسورة الكافرون",
        "يقرأ في الركعة الثانية الفاتحة وسورة الإخلاص",
        "يستحب أن تكون الصلاة خلف المقام إن تيسر",
        "ثم يشرب من ماء زمزم ويدعو بما تيسر"
      ]
    },
    {
      title: "السعي بين الصفا والمروة",
      description: "السعي سبعة أشواط بين الصفا والمروة",
      details: [
        "البدء من الصفا والانتهاء بالمروة",
        "الدعاء على الصفا والمروة مستقبل القبلة",
        "الإسراع (الهرولة) بين العلمين الأخضرين للرجال",
        "الذكر والدعاء أثناء السعي"
      ]
    },
    {
      title: "الحلق أو التقصير",
      description: "بعد السعي يحلق الرجل رأسه أو يقصر الشعر، والمرأة تقصر فقط",
      details: [
        "الحلق أفضل للرجال إذا كانت العمرة مستقلة",
        "التقصير أفضل لمن يعتمر قبل الحج بفترة قصيرة",
        "المرأة تقص من كل ضفيرة قدر أنملة",
        "بالحلق أو التقصير تنتهي العمرة وتحل جميع محظورات الإحرام"
      ]
    }
  ];

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">مناسك الحج والعمرة</h1>
        <p className="text-muted-foreground text-center mb-8">
          دليل مختصر لأداء مناسك الحج والعمرة بالخطوات التفصيلية
        </p>

        <Tabs defaultValue="hajj" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="hajj">الحج</TabsTrigger>
            <TabsTrigger value="umrah">العمرة</TabsTrigger>
          </TabsList>

          <TabsContent value="hajj">
            <div className="grid grid-cols-1 gap-4">
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center">
                    <Landmark className="h-5 w-5 mr-2 text-primary" />
                    <CardTitle>خطوات أداء الحج</CardTitle>
                  </div>
                  <CardDescription>
                    شرح مفصل لمناسك وأركان الحج بالترتيب
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[550px] pr-4">
                    <div className="space-y-8">
                      {hajjSteps.map((step, idx) => (
                        <div key={idx} className="border rounded-lg p-4 bg-card">
                          <h3 className="text-lg font-bold mb-2 text-primary">{step.title}</h3>
                          <p className="text-muted-foreground mb-4">{step.description}</p>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold mb-2">تفاصيل إضافية:</h4>
                            <ul className="space-y-2">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                                  </div>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="umrah">
            <div className="grid grid-cols-1 gap-4">
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center">
                    <Tent className="h-5 w-5 mr-2 text-primary" />
                    <CardTitle>خطوات أداء العمرة</CardTitle>
                  </div>
                  <CardDescription>
                    شرح مفصل لمناسك وأركان العمرة بالترتيب
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    {umrahSteps.map((step, idx) => (
                      <div key={idx} className="border rounded-lg p-4 bg-card">
                        <h3 className="text-lg font-bold mb-2 text-primary">{step.title}</h3>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold mb-2">تفاصيل إضافية:</h4>
                          <ul className="space-y-2">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="bg-primary/10 p-1 rounded-full mt-1 ml-2">
                                  <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                                </div>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}