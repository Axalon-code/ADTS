import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "@/components/ModeToggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if we're at the top of the page
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileMenuOpen && !target.closest("#mobile-menu") && !target.closest("#mobile-menu-button")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle smooth scrolling for hash links
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  const NavLink = ({ to, label }: { to: string; label: string }) => {
    const isHash = to.startsWith("#");
    const currentPath = location === "/" ? "#home" : location;
    const isActive = isHash ? currentPath === to : location === to;

    if (isHash) {
      return (
        <button 
          onClick={() => scrollToSection(to.substring(1))} 
          className={`nav-link ${isActive ? "active" : ""}`}
        >
          {label}
        </button>
      );
    }

    return (
      <Link href={to}>
        <a className={`nav-link ${isActive ? "active" : ""}`}>{label}</a>
      </Link>
    );
  };

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-[hsl(var(--header-bg))] ${isScrolled ? 'shadow-md' : ''} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center">
              <div className="w-48 md:w-64">
                <div className="text-primary dark:text-blue-500 font-bold text-3xl md:text-4xl">
                  ADTS
                  <div className="text-sm md:text-base font-normal mt-1">Tailoring Your IT Requirements</div>
                </div>
              </div>
            </a>
          </Link>
          
          {/* Mobile menu button */}
          <div className="block md:hidden">
            <Button 
              id="mobile-menu-button" 
              variant="ghost" 
              size="sm" 
              onClick={toggleMobileMenu} 
              className="text-primary dark:text-blue-500 hover:text-primary/80 dark:hover:text-blue-400"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </Button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="#home" label="Home" />
            <NavLink to="#services" label="Services" />
            <NavLink to="#about" label="About Me" />
            <NavLink to="#certifications" label="Certifications" />
            <Link href="/blog">
              <a className="nav-link">Resources</a>
            </Link>
            <Button onClick={() => scrollToSection("contact")} className="bg-primary text-white hover:bg-accent transition-colors">
              Contact
            </Button>
            <ModeToggle />
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && (
          <nav 
            id="mobile-menu" 
            className={`${mobileMenuOpen ? 'flex' : 'hidden'} flex-col mt-4 border-t dark:border-gray-700 pt-4 md:hidden`}
          >
            <NavLink to="#home" label="Home" />
            <div className="py-2"><NavLink to="#services" label="Services" /></div>
            <div className="py-2"><NavLink to="#about" label="About Me" /></div>
            <div className="py-2"><NavLink to="#certifications" label="Certifications" /></div>
            <div className="py-2">
              <Link href="/blog">
                <a className="nav-link">Resources</a>
              </Link>
            </div>
            <Button 
              onClick={() => scrollToSection("contact")} 
              className="mt-2 bg-primary text-white hover:bg-accent transition-colors"
            >
              Contact
            </Button>
            <div className="mt-4 flex items-center">
              <span className="mr-2 text-sm dark:text-gray-300">Toggle Theme</span>
              <ModeToggle />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
