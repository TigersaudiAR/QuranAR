import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert numbers to Arabic numerals
export function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((digit) => (isNaN(parseInt(digit)) ? digit : arabicNumerals[parseInt(digit)]))
    .join("");
}

// Format timestamp to readable time
export function formatTime(time: string): string {
  if (!time) return "";
  
  try {
    const [hours, minutes] = time.split(":");
    return `${toArabicNumerals(parseInt(hours))}:${toArabicNumerals(parseInt(minutes))}`;
  } catch (e) {
    console.error("Error formatting time:", e);
    return time;
  }
}

// Get current Hijri and Gregorian dates in Arabic format
export function getCurrentDateInArabic(): { hijri: string; gregorian: string } {
  // This is a simple implementation; ideally use a proper Hijri calendar library
  const now = new Date();
  
  // Format Gregorian date
  const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const day = toArabicNumerals(now.getDate());
  const month = months[now.getMonth()];
  const year = toArabicNumerals(now.getFullYear());
  const gregorian = `${day} ${month} ${year}`;
  
  // Simple mock Hijri date for demonstration
  // In a real app, use a proper Hijri calendar library
  const hijri = `١٠ رمضان ١٤٤٥`;
  
  return { hijri, gregorian };
}

// Convert revelationType to Arabic
export function getRevelationTypeInArabic(type: string): string {
  return type === "Meccan" ? "مكية" : "مدنية";
}

// Generate pagination array
export function generatePagination(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = [];
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages - 1, totalPages];
  }
  
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];
}

// Get mock prayer times (in a real app, these would come from a prayer times API)
export function getMockPrayerTimes(): { name: string; time: string }[] {
  return [
    { name: "الفجر", time: "05:12" },
    { name: "الظهر", time: "12:30" },
    { name: "العصر", time: "15:45" },
    { name: "المغرب", time: "18:20" },
    { name: "العشاء", time: "19:50" },
  ];
}
