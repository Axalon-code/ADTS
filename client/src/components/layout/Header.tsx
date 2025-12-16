import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Check if we're at the top of the page
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen && 
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Handle smooth scrolling for hash links
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const NavLink = ({ to, label }: { to: string; label: string }) => {
    const isHash = to.startsWith("#");
    const currentPath = location === "/" ? "#home" : location;
    const isActive = isHash ? currentPath === to : location === to;

    if (isHash) {
      return (
        <button 
          onClick={() => scrollToSection(to.substring(1))} 
          className={`nav-link border-b-2 text-base font-medium ${isActive ? "border-primary dark:border-blue-500 font-medium" : "border-transparent hover:border-primary/50 dark:hover:border-blue-500/50"} transition-all w-full text-left`}
          role="menuitem"
          aria-current={isActive ? "page" : undefined}
        >
          {label}
        </button>
      );
    }

    return (
      <Link href={to}>
        <a 
          className={`nav-link border-b-2 text-base font-medium ${isActive ? "border-primary dark:border-blue-500 font-medium" : "border-transparent hover:border-primary/50 dark:hover:border-blue-500/50"} transition-all w-full text-left`}
          role="menuitem"
          aria-current={isActive ? "page" : undefined}
        >
          {label}
        </a>
      </Link>
    );
  };

  return (
    <>
      {/* Skip to main content link for screen readers and keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:p-4 focus:bg-white dark:focus:bg-gray-900 focus:text-primary dark:focus:text-[#0066FF] focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#0066FF]"
      >
        Skip to main content
      </a>
      <header className={`sticky top-0 z-50 bg-white dark:bg-[hsl(var(--header-bg))] ${isScrolled ? 'shadow-md' : ''} transition-colors duration-200 border-t-4 border-b-4 border-primary dark:border-[#0066FF]`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="flex items-center">
                <div className="w-56 md:w-72">
                  <AnimatedLogo size="large" />
                </div>
              </a>
            </Link>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle - Always visible */}
              <div className="flex items-center border-r-2 border-primary/30 dark:border-[#0066FF]/30 pr-4">
                <ModeToggle />
              </div>
              
              {/* Hamburger menu button */}
              <Button 
                ref={buttonRef}
                variant="ghost" 
                size="sm" 
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu" 
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="bg-[hsl(var(--mobile-menu-bg))] text-[hsl(var(--mobile-menu-color))] hover:bg-[hsl(var(--mobile-menu-bg-hover))] hover:text-[hsl(var(--mobile-menu-hover-color))] border-2 border-primary dark:border-[#0066FF] rounded-md p-3 w-14 h-14"
              >
                <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
                {menuOpen ? (
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </Button>
            </div>
          </div>
          
          {/* Dropdown Navigation Menu - Only visible when menuOpen is true */}
          {menuOpen && (
            <div 
              id="mobile-menu"
              ref={menuRef}
              className="absolute right-4 mt-2 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-md border-2 border-primary dark:border-[#0066FF] py-3 px-4 z-50"
              role="menu"
              aria-labelledby="menu-button"
            >
              <nav className="flex flex-col space-y-3">
                <Button
                  onClick={() => {
                    scrollToSection("home");
                    setMenuOpen(false);
                  }}
                  className="bg-primary text-white hover:bg-accent transition-colors w-full text-left px-4 py-2"
                  role="menuitem"
                >
                  Home
                </Button>
                
                <Button
                  onClick={() => {
                    scrollToSection("services");
                    setMenuOpen(false);
                  }}
                  className="bg-primary text-white hover:bg-accent transition-colors w-full text-left px-4 py-2"
                  role="menuitem"
                >
                  Services
                </Button>
                
                <Button
                  onClick={() => {
                    scrollToSection("about");
                    setMenuOpen(false);
                  }}
                  className="bg-primary text-white hover:bg-accent transition-colors w-full text-left px-4 py-2"
                  role="menuitem"
                >
                  About Me
                </Button>
                
                <Button 
                  onClick={() => {
                    window.location.href = "/blog";
                  }}
                  className="bg-primary text-white hover:bg-accent transition-colors w-full text-left px-4 py-2"
                  role="menuitem"
                >
                  Resources
                </Button>
                
                <Button 
                  onClick={() => {
                    window.location.href = "/glossary";
                  }}
                  className="bg-primary text-white hover:bg-accent transition-colors w-full text-left px-4 py-2"
                  role="menuitem"
                >
                  IT Glossary
                </Button>
                
                <Button
                  onClick={() => {
                    window.location.href = "/booking";
                  }}
                  className="bg-primary text-white hover:bg-accent transition-colors w-full text-left px-4 py-2"
                  role="menuitem"
                >
                  Book Now
                </Button>
                
                <Button 
                  onClick={() => {
                    scrollToSection("contact");
                    setMenuOpen(false);
                  }} 
                  className="bg-primary text-white hover:bg-accent transition-colors w-full text-left px-4 py-2"
                  role="menuitem"
                >
                  Contact
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}