
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface QuranPageLayoutProps {
  children: React.ReactNode;
  currentSurahId?: number;
  previousSurahId?: number;
  nextSurahId?: number;
  previousSurahName?: string;
  nextSurahName?: string;
}

const QuranPageLayout = ({
  children,
  currentSurahId,
  previousSurahId,
  nextSurahId,
  previousSurahName,
  nextSurahName
}: QuranPageLayoutProps) => {
  return (
    <div className="quran-page-layout">
      <div className="page-navigation">
        <div className="flex justify-between items-center my-4">
          <div>
            {nextSurahId && (
              <Link href={`/quran/${nextSurahId}`}>
                <Button variant="ghost" className="flex items-center">
                  <ChevronRight className="ml-1" size={20} />
                  <span>التالي: سورة {nextSurahName}</span>
                </Button>
              </Link>
            )}
          </div>
          
          <div className="flex items-center">
            <Link href="/quran">
              <Button variant="outline" className="mx-2">
                فهرس السور
              </Button>
            </Link>
          </div>
          
          <div>
            {previousSurahId && (
              <Link href={`/quran/${previousSurahId}`}>
                <Button variant="ghost" className="flex items-center">
                  <span>السابق: سورة {previousSurahName}</span>
                  <ChevronLeft className="mr-1" size={20} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default QuranPageLayout;
