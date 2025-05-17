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
            <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100">
              <g fill="#ffffff">
                <path d="M75 20H100V30H75V20Z"/>
                <path d="M110 20H135V30H110V20Z"/>
                <path d="M75 40H100V50H75V40Z"/>
                <path d="M110 40H135V50H110V40Z"/>
                <path d="M75 60H100V70H75V60Z"/>
                <path d="M110 60H135V70H110V60Z"/>
                <path d="M120 15C120 15 110 15 110 25V50C110 60 100 60 100 60C100 60 90 60 90 50V25C90 15 80 15 80 15C60 15 60 35 60 35V65C60 85 80 85 80 85C80 85 90 85 90 75V50C90 40 100 40 100 40C100 40 110 40 110 50V75C110 85 120 85 120 85C140 85 140 65 140 65V35C140 35 140 15 120 15Z"/>
                <path d="M160 45H180V80H160V45Z"/>
                <path d="M180 45H200V80H180V45Z"/>
                <path d="M210 45H230V80H210V45Z"/>
                <path d="M210 45H250V60H210V45Z"/>
                <path d="M210 60H250V80H210V60Z"/>
                <path d="M260 45H280V80H260V45Z"/>
                <path d="M260 45H300V60H260V45Z"/>
                <path d="M280 60H300V80H280V60Z"/>
              </g>
              <text x="150" y="95" fontSize="12" fontFamily="Arial" fill="#ffffff" textAnchor="middle">Tailoring Your IT Requirements</text>
            </svg>
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
