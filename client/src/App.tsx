import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import ContentUnavailable from "@/pages/content-unavailable";
import HomePage from "@/pages/HomePage";
import QuranPage from "@/pages/QuranPage";
import LearnPage from "@/pages/LearnPage";
import HajjUmrahPage from "@/pages/HajjUmrahPage";
import TafseerDreamsPage from "@/pages/TafseerDreamsPage";
import AzkarPage from "@/pages/AzkarPage";
import LiveLecturesPage from "@/pages/LiveLecturesPage";
import CreditsPage from "@/pages/CreditsPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import MushafPage from "@/pages/MushafPage";
import DhikrPage from "@/pages/DhikrPage";
import EducationalPage from "@/pages/EducationalPage";
import AdminPage from "@/pages/AdminPage";
import HalaqatPage from "@/pages/HalaqatPage";
import MemorizationPage from "@/pages/MemorizationPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/quran" component={QuranPage} />
      <Route path="/quran/:surahId" component={QuranPage} />
      <Route path="/mushaf" component={MushafPage} />
      <Route path="/memorization" component={MemorizationPage} />
      <Route path="/halaqat" component={HalaqatPage} />
      <Route path="/learn" component={LearnPage} />
      <Route path="/educational" component={EducationalPage} />
      <Route path="/dhikr" component={DhikrPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/hajj-umrah" component={HajjUmrahPage} />
      <Route path="/tafseer" component={TafseerDreamsPage} />
      <Route path="/azkar" component={AzkarPage} />
      <Route path="/live" component={LiveLecturesPage} />
      <Route path="/credits" component={CreditsPage} />
      <Route path="/content-unavailable" component={ContentUnavailable} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
