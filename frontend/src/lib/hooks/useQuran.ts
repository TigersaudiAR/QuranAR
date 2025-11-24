import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../queryClient";
import { Surah, LastRead } from "../types";

export const useAllSurahs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/quran/surahs"],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    surahs: data as Surah[],
    isLoading,
    error,
  };
};

export const useSurah = (surahId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/quran/surahs/${surahId}`],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    surah: data as Surah,
    isLoading,
    error,
  };
};

// Aliases for compatibility with existing components
export const useQuranSurah = useSurah;
export const useQuranJuz = (juzId: number) => useSurah(juzId); // Simplified - assumes juz maps to surah
export const useQuranPage = (pageId: number) => useSurah(Math.ceil(pageId / 20)); // Simplified mapping

export const useLastRead = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/quran/last-read"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    lastRead: data as LastRead | null,
    isLoading,
    error,
  };
};

export const useSetLastRead = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (lastRead: LastRead) => {
      return await apiRequest("/api/quran/last-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lastRead),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quran/last-read"] });
    },
  });

  return {
    setLastRead: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
