import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
