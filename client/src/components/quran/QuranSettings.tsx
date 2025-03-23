import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Moon, Sun, Palette, BookOpen, Type, Volume2 } from "lucide-react";
import { QuranSettings, ThemeType, ViewType, ReciterType } from "@/lib/types";

interface QuranSettingsDialogProps {
  settings: QuranSettings;
  onSettingsChange: (settings: QuranSettings) => void;
}

const DEFAULT_SETTINGS: QuranSettings = {
  fontSize: 22,
  fontFamily: "Uthmani",
  theme: "light",
  showTranslation: false,
  translationLanguage: "english",
  showTafseer: false,
  tafseerSource: "ibn-kathir",
  reciter: "mishari_rashid_alafasy",
  viewType: "surah"
};

export const QuranSettingsDialog = ({ settings, onSettingsChange }: QuranSettingsDialogProps) => {
  const [localSettings, setLocalSettings] = useState<QuranSettings>(settings || DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState("appearance");

  const handleSettingChange = <K extends keyof QuranSettings>(key: K, value: QuranSettings[K]) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleFontSizeChange = (value: number[]) => {
    handleSettingChange("fontSize", value[0]);
  };

  const fonts = [
    { value: "Uthmani", label: "عثماني" },
    { value: "Scheherazade", label: "شهرزاد" },
    { value: "Amiri", label: "أميري" },
    { value: "Naskh", label: "نسخ" }
  ];

  const translationLanguages = [
    { value: "english", label: "الإنجليزية" },
    { value: "french", label: "الفرنسية" },
    { value: "spanish", label: "الإسبانية" },
    { value: "turkish", label: "التركية" },
    { value: "urdu", label: "الأردية" },
    { value: "indonesian", label: "الإندونيسية" }
  ];

  const tafseerSources = [
    { value: "ibn-kathir", label: "تفسير ابن كثير" },
    { value: "al-qurtubi", label: "تفسير القرطبي" },
    { value: "al-tabari", label: "تفسير الطبري" },
    { value: "al-saadi", label: "تفسير السعدي" }
  ];

  const reciters = [
    { value: "mishari_rashid_alafasy", label: "مشاري راشد العفاسي" },
    { value: "abdul_basit", label: "عبد الباسط عبد الصمد" },
    { value: "mahmoud_khalil_al-husary", label: "محمود خليل الحصري" },
    { value: "mohamed_siddiq_al-minshawi", label: "محمد صديق المنشاوي" }
  ];

  const themes: { value: ThemeType; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "فاتح", icon: <Sun className="h-4 w-4" /> },
    { value: "dark", label: "داكن", icon: <Moon className="h-4 w-4" /> },
    { value: "sepia", label: "سيبيا", icon: <Palette className="h-4 w-4" /> },
    { value: "gold", label: "ذهبي", icon: <Palette className="h-4 w-4 text-yellow-500" /> }
  ];

  const viewTypes: { value: ViewType; label: string }[] = [
    { value: "page", label: "صفحة" },
    { value: "surah", label: "سورة" },
    { value: "juz", label: "جزء" },
    { value: "continuous", label: "متواصل" }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 text-gray-600 hover:text-primary-custom rounded-full bg-gray-100 hover:bg-primary-light transition">
          <Settings size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">إعدادات القرآن الكريم</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
            <TabsTrigger value="reading">القراءة</TabsTrigger>
            <TabsTrigger value="audio">الصوت</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base">السمة</Label>
              <RadioGroup 
                value={localSettings.theme} 
                onValueChange={(value) => handleSettingChange("theme", value as ThemeType)}
                className="grid grid-cols-4 gap-2"
              >
                {themes.map((theme) => (
                  <div key={theme.value} className="flex flex-col items-center">
                    <RadioGroupItem 
                      value={theme.value} 
                      id={`theme-${theme.value}`} 
                      className="sr-only" 
                    />
                    <Label
                      htmlFor={`theme-${theme.value}`}
                      className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer transition-all hover:bg-accent ${
                        localSettings.theme === theme.value ? "border-primary bg-primary/10" : "border-muted"
                      }`}
                    >
                      {theme.icon}
                      <span className="mt-2">{theme.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-base">حجم الخط</Label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Type size={16} />
                <Slider 
                  value={[localSettings.fontSize]} 
                  min={16} 
                  max={32} 
                  step={1} 
                  onValueChange={handleFontSizeChange} 
                  className="w-full" 
                />
                <Type size={24} />
              </div>
              <div className="text-center">{localSettings.fontSize}px</div>
            </div>

            <div className="space-y-2">
              <Label className="text-base">نوع الخط</Label>
              <Select 
                value={localSettings.fontFamily}
                onValueChange={(value) => handleSettingChange("fontFamily", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الخط" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base">طريقة العرض</Label>
              <RadioGroup 
                value={localSettings.viewType}
                onValueChange={(value) => handleSettingChange("viewType", value as ViewType)}
                className="grid grid-cols-4 gap-2"
              >
                {viewTypes.map((view) => (
                  <div key={view.value} className="flex flex-col items-center">
                    <RadioGroupItem 
                      value={view.value} 
                      id={`view-${view.value}`} 
                      className="sr-only" 
                    />
                    <Label
                      htmlFor={`view-${view.value}`}
                      className={`flex items-center justify-center rounded-md border-2 p-3 cursor-pointer transition-all w-full hover:bg-accent ${
                        localSettings.viewType === view.value ? "border-primary bg-primary/10" : "border-muted"
                      }`}
                    >
                      <span>{view.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="reading" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">عرض الترجمة</Label>
              <Switch 
                checked={localSettings.showTranslation}
                onCheckedChange={(checked) => handleSettingChange("showTranslation", checked)}
              />
            </div>

            {localSettings.showTranslation && (
              <div className="space-y-2">
                <Label className="text-base">لغة الترجمة</Label>
                <Select 
                  value={localSettings.translationLanguage}
                  onValueChange={(value) => handleSettingChange("translationLanguage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر لغة الترجمة" />
                  </SelectTrigger>
                  <SelectContent>
                    {translationLanguages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label className="text-base">عرض التفسير</Label>
              <Switch 
                checked={localSettings.showTafseer}
                onCheckedChange={(checked) => handleSettingChange("showTafseer", checked)}
              />
            </div>

            {localSettings.showTafseer && (
              <div className="space-y-2">
                <Label className="text-base">مصدر التفسير</Label>
                <Select 
                  value={localSettings.tafseerSource}
                  onValueChange={(value) => handleSettingChange("tafseerSource", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مصدر التفسير" />
                  </SelectTrigger>
                  <SelectContent>
                    {tafseerSources.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base">القارئ</Label>
              <Select 
                value={localSettings.reciter}
                onValueChange={(value) => handleSettingChange("reciter", value as ReciterType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر القارئ" />
                </SelectTrigger>
                <SelectContent>
                  {reciters.map((reciter) => (
                    <SelectItem key={reciter.value} value={reciter.value}>
                      {reciter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuranSettingsDialog;