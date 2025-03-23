import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PageContainer from "@/components/layout/PageContainer";
import { 
  Book, 
  Moon, 
  Loader2,
  ExternalLink,
  Info
} from "lucide-react";

export default function TafseerDreamsPage() {
  const [activeTab, setActiveTab] = useState("dreams");
  const [dreamText, setDreamText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dreamInterpretation, setDreamInterpretation] = useState("");

  const handleDreamSubmit = () => {
    if (!dreamText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call for dream interpretation
    setTimeout(() => {
      setDreamInterpretation(
        "تشير رؤياك إلى أنك تمر بمرحلة من التحول الإيجابي في حياتك. الماء الصافي في المنام يرمز للصفاء الروحي وراحة البال. " +
        "والطيور في الحلم ترمز إلى الأخبار السارة والبشائر التي ستأتيك قريبًا. أما المشي على الأرض الخضراء فيرمز إلى الخير الوفير والرزق الحلال. " +
        "ننصحك بالاستمرار في طريقك الحالي وأن تستعد للخير القادم إليك بإذن الله."
      );
      setIsSubmitting(false);
    }, 1500);
  };

  const dreamSources = [
    {
      name: "تفسير ابن سيرين",
      description: "من أشهر كتب تفسير الأحلام والرؤى في التراث الإسلامي"
    },
    {
      name: "تفسير النابلسي",
      description: "كتاب تعبير الرؤيا للإمام عبد الغني النابلسي"
    },
    {
      name: "تفسير ابن شاهين",
      description: "كتاب الإشارات في علم العبارات لابن شاهين"
    },
    {
      name: "القرآن الكريم والسنة النبوية",
      description: "المصدر الأساسي للتفسير المعتمد على الآيات والأحاديث"
    }
  ];

  const dreamFaqs = [
    {
      question: "هل كل الأحلام لها تفسير؟",
      answer: "لا، ليست كل الأحلام ذات معنى أو تحتاج تفسيرًا. الأحلام في الإسلام ثلاثة أنواع: رؤيا من الله، وحديث نفس، وتلاعب الشيطان."
    },
    {
      question: "كيف أميز الرؤيا الصادقة؟",
      answer: "الرؤيا الصادقة تكون واضحة وتترك أثرًا في النفس، وغالبًا ما تكون في وقت السحر، وتتحقق في الواقع."
    },
    {
      question: "هل يجب أن أخبر كل الناس برؤياي؟",
      answer: "لا ينبغي أن تقص رؤياك إلا على من تحب أو عالم يفسرها لك. والرؤيا السيئة لا تخبر بها أحدًا."
    }
  ];

  return (
    <PageContainer title="تفسير الأحلام">
      <p className="text-muted-foreground text-center mb-6">تفسير الأحلام والرؤى وفق المنهج الإسلامي</p>
      
      <Tabs defaultValue="dreams" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="dreams">تفسير الأحلام</TabsTrigger>
          <TabsTrigger value="info">معلومات تفسيرية</TabsTrigger>
        </TabsList>

        <TabsContent value="dreams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>وصف الحلم</CardTitle>
                <CardDescription>
                  اكتب وصفًا مفصلًا للمنام الذي رأيته
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="صف رؤياك بتفاصيل واضحة..."
                  className="min-h-[200px]"
                  value={dreamText}
                  onChange={(e) => setDreamText(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleDreamSubmit} 
                  disabled={!dreamText.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري التفسير...
                    </>
                  ) : (
                    <>
                      <Moon className="ml-2 h-4 w-4" />
                      تفسير الحلم
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التفسير</CardTitle>
                <CardDescription>
                  تفسير الحلم وفق المصادر الإسلامية المعتمدة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dreamInterpretation ? (
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="leading-relaxed">{dreamInterpretation}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      ملاحظة: التفسير إرشادي فقط وليس قطعيًا. الله أعلم بحقيقة الأمور.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Moon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>أدخل وصف الحلم للحصول على التفسير</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>مصادر التفسير</CardTitle>
                <CardDescription>
                  المصادر الإسلامية المعتمدة في تفسير الأحلام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dreamSources.map((source, index) => (
                    <div key={index} className="flex items-start">
                      <Book className="h-5 w-5 ml-3 mt-0.5 text-muted-foreground" />
                      <div>
                        <h4 className="text-base font-medium">{source.name}</h4>
                        <p className="text-sm text-muted-foreground">{source.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="ml-2 h-4 w-4" />
                  المزيد من المصادر
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>الرؤى والأحلام في الإسلام</CardTitle>
                <CardDescription>
                  معلومات مهمة عن الرؤى وأقسامها في الشريعة الإسلامية
                </CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>قسّم النبي صلى الله عليه وسلم الرؤى إلى ثلاثة أقسام:</p>
                <ol>
                  <li>
                    <strong>الرؤيا الصالحة:</strong> وهي من الله تعالى، وتكون بشرى للمؤمن، أو إنذارًا له، أو توجيهًا.
                  </li>
                  <li>
                    <strong>حديث النفس:</strong> وهي ما يشغل بال الإنسان في يقظته فيراه في منامه.
                  </li>
                  <li>
                    <strong>تخويف من الشيطان:</strong> وهي الأحلام المزعجة التي تسبب الخوف والقلق للإنسان.
                  </li>
                </ol>
                <p>
                  قال رسول الله صلى الله عليه وسلم: "الرؤيا الصالحة جزء من ستة وأربعين جزءًا من النبوة" (رواه البخاري).
                </p>
                <p>وقال أيضًا: "إذا اقترب الزمان لم تكد رؤيا المؤمن تكذب، وأصدقكم رؤيا أصدقكم حديثًا" (متفق عليه).</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>الأسئلة الشائعة</CardTitle>
                <CardDescription>
                  إجابات لأكثر الأسئلة شيوعًا حول تفسير الأحلام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dreamFaqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start mb-2">
                        <Info className="h-5 w-5 ml-2 mt-0.5 text-primary" />
                        <h4 className="text-base font-medium">{faq.question}</h4>
                      </div>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}