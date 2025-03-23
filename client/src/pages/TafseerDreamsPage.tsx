import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchIcon, BookOpen, Send, Moon, ArrowRight, BookOpenCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const dreamFormSchema = z.object({
  dreamDescription: z.string().min(5, {
    message: "يجب أن يحتوي الحلم على الأقل 5 أحرف.",
  }),
});

type DreamFormValues = z.infer<typeof dreamFormSchema>;

export default function TafseerDreamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [dreamInterpretation, setDreamInterpretation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<DreamFormValues>({
    resolver: zodResolver(dreamFormSchema),
    defaultValues: {
      dreamDescription: "",
    },
  });

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    // في تطبيق حقيقي، هذا سيستدعي API للبحث في التفسير
    setSearchResults([
      {
        id: 1,
        title: "تفسير سورة الفاتحة",
        excerpt: "تفسير سورة الفاتحة - أم الكتاب والسبع المثاني...",
        source: "تفسير ابن كثير"
      },
      {
        id: 2,
        title: "تفسير آية الكرسي",
        excerpt: "تفسير آية الكرسي من سورة البقرة...",
        source: "تفسير الطبري"
      },
      {
        id: 3,
        title: "تفسير سورة الإخلاص",
        excerpt: "تفسير سورة الإخلاص وفضلها...",
        source: "تفسير السعدي"
      }
    ]);
  };

  const onDreamSubmit = (data: DreamFormValues) => {
    setIsLoading(true);
    
    // في التطبيق الحقيقي، هنا سنستخدم API ذكاء اصطناعي لتفسير الحلم
    setTimeout(() => {
      setDreamInterpretation(
        "بناءً على مصادر من السنة النبوية والتفسيرات الإسلامية المعتمدة، هذا الحلم قد يشير إلى [تفسير الحلم بناء على الوصف المقدم]. وقد ورد في السنة أن الرؤيا الصالحة من الله، والحلم من الشيطان. والله أعلم."
      );
      setIsLoading(false);
      
      toast({
        title: "تم تفسير الحلم",
        description: "تم تفسير الحلم بنجاح وفقًا للمصادر الإسلامية",
      });
    }, 2000);
  };

  const tafseerSources = [
    {
      id: 1,
      name: "تفسير ابن كثير",
      description: "تفسير القرآن العظيم للإمام ابن كثير (ت: 774هـ)",
      count: "114 سورة"
    },
    {
      id: 2,
      name: "تفسير السعدي",
      description: "تيسير الكريم الرحمن في تفسير كلام المنان للشيخ السعدي (ت: 1376هـ)",
      count: "114 سورة"
    },
    {
      id: 3,
      name: "تفسير الطبري",
      description: "جامع البيان عن تأويل آي القرآن للإمام الطبري (ت: 310هـ)",
      count: "114 سورة"
    },
    {
      id: 4,
      name: "تفسير القرطبي",
      description: "الجامع لأحكام القرآن للإمام القرطبي (ت: 671هـ)",
      count: "114 سورة"
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">التفسير وتعبير الأحلام</h1>
      
      <Tabs defaultValue="tafseer" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="tafseer">تفسير القرآن الكريم</TabsTrigger>
          <TabsTrigger value="dreams">تفسير الأحلام</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tafseer">
          <div className="mb-8">
            <div className="relative">
              <SearchIcon className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ابحث في التفسير (آية، سورة، كلمة)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Button 
                className="absolute left-2 top-1.5" 
                size="sm"
                onClick={handleSearch}
              >
                بحث
              </Button>
            </div>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">نتائج البحث</h2>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <CardTitle>{result.title}</CardTitle>
                      <CardDescription>{result.source}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{result.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost">
                        قراءة المزيد <ArrowRight className="mr-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tafseerSources.map((source) => (
                <Card key={source.id} className="shadow-sm">
                  <CardHeader>
                    <div className="flex items-center">
                      <BookOpenCheck className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle>{source.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{source.description}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">{source.count}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      استعرض التفسير <BookOpen className="mr-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="dreams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="md:row-span-2">
              <CardHeader>
                <div className="flex items-center">
                  <Moon className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>تفسير الأحلام وفق السنة النبوية</CardTitle>
                </div>
                <CardDescription>
                  أدخل وصف الحلم وسنقوم بتفسيره وفق المصادر الإسلامية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onDreamSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="dreamDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف الحلم</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="اكتب وصفًا تفصيليًا للحلم..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            اكتب وصفًا دقيقًا للحلم ليتم تفسيره وفق المصادر الإسلامية.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <span>جاري التفسير...</span>
                      ) : (
                        <>
                          <Send className="ml-2 h-4 w-4" /> تفسير الحلم
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
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
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 ml-2 text-primary" />
                    <span>صحيح البخاري ومسلم</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 ml-2 text-primary" />
                    <span>كتاب تعطير الأنام في تفسير الأحلام لابن سيرين</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 ml-2 text-primary" />
                    <span>منتخب الكلام في تفسير الأحلام للنابلسي</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 ml-2 text-primary" />
                    <span>أحاديث نبوية متعلقة بالرؤى والأحلام</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <BookOpen className="ml-2 h-4 w-4" /> قراءة المزيد عن تفسير الأحلام
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}