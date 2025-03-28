import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import CustomCursor from "./components/shared/CustomCursor";
import Preloader from "./components/shared/Preloader";
import ScrollToTop from "./components/shared/ScrollToTop";
import AmbientBackground from "@/components/shared/AmbientBackground";
import TransitionProvider from "@/components/shared/TransitionProvider";
import { ScrollProgress } from "@/components/shared/ScrollAnimator";

function Router() {
  return (
    <TransitionProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </TransitionProvider>
  );
}

function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollToTop />
      <AmbientBackground />
      <ScrollProgress />
      <Router />
      <Toaster />
    </>
  );
}

export default App;
