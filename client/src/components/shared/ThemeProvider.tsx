import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "dark",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "creative-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey);
      return storedTheme ? (storedTheme as Theme) : defaultTheme;
    } catch (e) {
      console.error("Error reading from localStorage", e);
      return defaultTheme;
    }
  });
  
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  // Function to apply theme
  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    const isDark = 
      newTheme === "dark" || 
      (newTheme === "system" && 
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    // Remove both classes first
    root.classList.remove("light", "dark");
    
    // Add the appropriate class
    if (isDark) {
      root.classList.add("dark");
      setResolvedTheme("dark");
    } else {
      root.classList.add("light");
      setResolvedTheme("light");
    }
  };

  // Update theme when it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Watch for system theme changes
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Theme setter with localStorage persistence
  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      console.error("Error writing to localStorage", e);
    }
    setThemeState(newTheme);
  };

  const contextValue: ThemeProviderState = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeProviderContext.Provider value={contextValue} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Hook to use theme context
function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}

export { useTheme };
