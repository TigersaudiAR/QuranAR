import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/quran" component={QuranPage} />
      <Route path="/quran/:surahId" component={QuranPage} />
      <Route path="/learn" component={LearnPage} />
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
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
