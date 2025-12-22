import { Link } from "wouter";
import FooterAnimatedLogo from "@/components/FooterAnimatedLogo";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-12 3xl:py-16 4xl:py-20">
      <div className="container-responsive">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 3xl:gap-10 4xl:gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-2">
              <FooterAnimatedLogo size="large" />
            </div>
            <p className="mb-6">Independent IT consultancy specializing in Microsoft technologies, providing tailored solutions for your business needs.</p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/alexdevlyashevskiy/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="https://github.com/Axalon-code" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-inter font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection("home")} className="hover:text-accent transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="hover:text-accent transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-accent transition-colors">
                  About Me
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="hover:text-accent transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-inter font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection("azure-services")} className="hover:text-accent transition-colors">
                  Microsoft Azure
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("identity-services")} className="hover:text-accent transition-colors">
                  Identity Management
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("m365-services")} className="hover:text-accent transition-colors">
                  Microsoft 365
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("automation-services")} className="hover:text-accent transition-colors">
                  IT Automation
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} ADTS. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="text-sm hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
