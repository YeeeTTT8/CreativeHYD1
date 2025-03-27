import { Route, Switch, Router } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import CustomCursor from "./components/shared/CustomCursor";
import Preloader from "./components/shared/Preloader";
import ScrollToTop from "./components/shared/ScrollToTop";

// Enable hash-based routing
const base = window.location.pathname.includes("/CreativeHYD1/")
  ? "/CreativeHYD1"
  : "/";

function AppRouter() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollToTop />
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
