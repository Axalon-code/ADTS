import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Make sure the component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    // Add a slight delay to match the animation timing
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      // Reset animation state after the transition completes
      setTimeout(() => setIsAnimating(false), 500);
    }, 150);
  };

  // Render nothing until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        aria-live="polite"
        disabled={isAnimating}
        className={`relative w-14 h-14 rounded-md overflow-hidden transition-all duration-500 ${
          theme === "dark" 
            ? "bg-blue-900 border-blue-700 hover:bg-blue-800 shadow-inner shadow-blue-800" 
            : "bg-blue-100 border-blue-200 hover:bg-blue-200"
        }`}
      >
        {/* Hidden text for screen readers */}
        <span className="sr-only">
          {theme === "dark" ? "Currently in dark mode" : "Currently in light mode"}
        </span>
        
        {/* Background circle that scales during transition */}
        <span 
          aria-hidden="true"
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            theme === "dark" 
              ? isAnimating ? "scale-0 bg-blue-200" : "scale-0 bg-blue-200" 
              : isAnimating ? "scale-150 bg-blue-900" : "scale-0 bg-blue-900"
          }`}
        />
        
        {/* Sun icon */}
        <span 
          aria-hidden="true"
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            theme === "dark"
              ? isAnimating ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
              : isAnimating ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        >
          <Sun className="h-7 w-7 text-blue-700" />
        </span>
        
        {/* Moon icon */}
        <span 
          aria-hidden="true"
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            theme === "dark"
              ? isAnimating ? "opacity-0 -rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              : isAnimating ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
        >
          <Moon className="h-7 w-7 text-blue-300" />
        </span>
      </Button>
    </div>
  );
}