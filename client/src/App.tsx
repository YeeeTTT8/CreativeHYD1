import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import CustomCursor from "./components/shared/CustomCursor";
import Preloader from "./components/shared/Preloader";
import ScrollToTop from "./components/shared/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollToTop />
      <Router />
      <Toaster />
    </>
  );
}

export default App;
