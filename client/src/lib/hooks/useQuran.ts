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
      const response = await apiRequest("POST", "/api/quran/last-read", lastRead);
      return response.json();
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
