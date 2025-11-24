import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Surah } from "@/lib/types";
import { PlayCircle, Info } from "lucide-react";

interface SurahHeaderProps {
  surah: Surah;
  reciter: string;
}

const SurahHeader = ({ surah, reciter }: SurahHeaderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (!audio) {
      // In a real app, we would use the reciter ID to get the audio URL
      const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surah.id}.mp3`;
      const newAudio = new Audio(audioUrl);
      newAudio.addEventListener('ended', () => setIsPlaying(false));
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="islamic-pattern py-6 rounded-lg mb-6 text-center">
      <div className="relative w-3/4 mx-auto">
        <div className="absolute top-0 right-0 w-10 h-10 rounded-full bg-accent-light flex items-center justify-center -mt-8 -mr-4">
          <span className="material-icons text-accent-custom">star</span>
        </div>
        <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-accent-light flex items-center justify-center -mt-8 -ml-4">
          <span className="material-icons text-accent-custom">star</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">سورة {surah.name}</h3>
        <p className="text-gray-600">{surah.revelationType === "meccan" ? "مكية" : "مدنية"} - {surah.versesCount} آيات</p>
        <div className="mt-4">
          <Button 
            className="px-4 py-2 text-white bg-primary-custom hover:bg-primary-custom/90 mx-2"
            onClick={handlePlayAudio}
          >
            <PlayCircle className="ml-1" size={20} />
            {isPlaying ? "إيقاف" : "استماع"}
          </Button>
          <Button className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 mx-2">
            <Info className="ml-1" size={20} />
            تفسير
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurahHeader;
