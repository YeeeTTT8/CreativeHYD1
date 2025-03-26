import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to get theme from localStorage
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme && (storedTheme === "dark" || storedTheme === "light" || storedTheme === "system")) {
        return storedTheme as Theme;
      }
    }
    return "system";
  });

  // Effect to apply the theme to the document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove previous themes
    root.classList.remove("light", "dark");

    // Apply current theme 
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.add("light");
    } else {
      // For system theme preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add("dark");
      } else {
        root.classList.add("light");
      }
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  // Listen for system preference changes if theme is set to "system"
  useEffect(() => {
    if (theme !== "system") return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      
      if (mediaQuery.matches) {
        root.classList.add("dark");
      } else {
        root.classList.add("light");
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Initial application
    handleChange();
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  
  return context;
}