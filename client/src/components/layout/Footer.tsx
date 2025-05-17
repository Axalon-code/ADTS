import { Link } from "wouter";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="font-bold text-3xl md:text-4xl mb-2">
              <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-emerald-400 text-transparent bg-clip-text dark:bg-gradient-to-r dark:from-blue-500 dark:via-blue-400 dark:to-emerald-300">ADTS</span>
              <div className="text-sm md:text-base font-normal mt-1 text-gray-200">Tailoring Your IT Requirements</div>
            </div>
            <p className="mb-6">Independent IT consultancy specializing in Microsoft technologies, providing tailored solutions for your business needs.</p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/alexdevlyashevskiy/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
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
                <button onClick={() => scrollToSection("certifications")} className="hover:text-accent transition-colors">
                  Certifications
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
            <Link href="/privacy">
              <a className="text-sm hover:text-accent transition-colors">Privacy Policy</a>
            </Link>
            <Link href="/terms">
              <a className="text-sm hover:text-accent transition-colors">Terms of Service</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
