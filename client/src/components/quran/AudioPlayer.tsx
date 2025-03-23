import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ReciterType } from "@/lib/types";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  verseId?: number;
  surahId: number;
  verseNumber?: number;
  reciter: ReciterType;
  onComplete?: () => void;
  autoPlay?: boolean;
  isFullSurah?: boolean;
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const AudioPlayer = ({
  verseId,
  surahId,
  verseNumber,
  reciter,
  onComplete,
  autoPlay = false,
  isFullSurah = false
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Build audio URL based on reciter, surah, and verse
  const getAudioUrl = () => {
    if (isFullSurah) {
      // URLs for full surah recitation
      return `https://everyayah.com/data/${reciter}/zip/${surahId.toString().padStart(3, '0')}.mp3`;
    } else if (verseNumber) {
      // URLs for individual verse recitation
      // Format: https://everyayah.com/data/reciter/surahNumber_verseNumber.mp3
      return `https://everyayah.com/data/${reciter}/${surahId.toString().padStart(3, '0')}${verseNumber.toString().padStart(3, '0')}.mp3`;
    }
    return '';
  };
  
  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(getAudioUrl());
    audioRef.current = audio;
    
    // Set initial volume
    audio.volume = volume;
    
    // Set up event listeners
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      setIsLoading(false);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onComplete) onComplete();
    });
    
    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setError('حدث خطأ أثناء تحميل الملف الصوتي');
      setIsLoading(false);
    });
    
    // Play audio if autoPlay is true
    if (autoPlay) {
      audio.play().catch(err => {
        console.error('Autoplay failed:', err);
        setIsPlaying(false);
      });
    }
    
    // Clean up event listeners
    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
      audio.removeEventListener('error', () => {});
    };
  }, [surahId, verseNumber, reciter, autoPlay, onComplete, isFullSurah]);
  
  // Handle play/pause button click
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Play failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle seeking
  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
    setVolume(newVolume);
  };
  
  // Handle mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-500 text-center">
        {error}
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 rounded-md p-3 border">
      {isLoading ? (
        <div className="text-center py-2">
          <span className="inline-block h-4 w-4 rounded-full border-2 border-t-primary-custom border-r-transparent border-b-transparent border-l-transparent animate-spin"></span>
          <span className="text-sm text-gray-500 mr-2">جاري تحميل الملف الصوتي...</span>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-primary-custom"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center">
              <span className="text-xs text-gray-500">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              
              <div className="flex items-center ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <div className="w-[80px]">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 1}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
          
          <div className="text-center text-xs text-gray-500">
            {isFullSurah ? `سورة كاملة` : `الآية ${verseNumber}`} | {reciter === 'mishari_rashid_alafasy' ? 'مشاري راشد العفاسي' :
            reciter === 'abdul_basit' ? 'عبد الباسط عبد الصمد' :
            reciter === 'mahmoud_khalil_al-husary' ? 'محمود خليل الحصري' :
            'محمد صديق المنشاوي'}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;