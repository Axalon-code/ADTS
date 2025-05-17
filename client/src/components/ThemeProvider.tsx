import * as React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
};

export function ThemeProvider({ 
  children, 
  defaultTheme = "system", 
  storageKey = "vite-ui-theme",
  attribute = "class",
  enableSystem = true,
  ...props 
}: ThemeProviderProps) {
  // Add a state to track whether we should show the theme transition
  const [themeTransitionEnabled, setThemeTransitionEnabled] = useState(false);

  // Enable theme transitions after the component mounts to prevent initial flash
  useEffect(() => {
    // Wait a small delay to avoid transition during initial page load
    const timeout = setTimeout(() => setThemeTransitionEnabled(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}