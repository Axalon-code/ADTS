import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";

// SVG Icons Component
const ContactIcon = ({ type }: { type: "email" | "phone" | "linkedin" | "location" | "globe" }) => {
  const iconColor = "currentColor";
  
  switch (type) {
    case "email":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "phone":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill={iconColor}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "location":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "globe":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-transparent dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-4">Contact Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Reach out to discuss your IT requirements and how I can help your business succeed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Card className="bg-[hsl(var(--card-bg))] shadow-md">
            <CardContent className="p-8">
              <ContactForm />
            </CardContent>
          </Card>
          
          <div>
            <Card className="bg-[hsl(var(--card-bg))] shadow-md mb-8">
              <CardContent className="p-8">
                <h3 className="font-inter font-semibold text-2xl mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[hsl(var(--contact-icon-bg))] p-3 rounded-md mr-4 text-[hsl(var(--contact-icon-color))]">
                      <ContactIcon type="email" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:contact@adts.com" className="text-[hsl(var(--contact-link-color))] hover:text-[hsl(var(--contact-link-hover-color))] transition-colors">
                        contact@adts.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[hsl(var(--contact-icon-bg))] p-3 rounded-md mr-4 text-[hsl(var(--contact-icon-color))]">
                      <ContactIcon type="phone" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+441234567890" className="text-[hsl(var(--contact-link-color))] hover:text-[hsl(var(--contact-link-hover-color))] transition-colors">
                        +44 (0) 123 456 7890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[hsl(var(--contact-icon-bg))] p-3 rounded-md mr-4 text-[hsl(var(--contact-icon-color))]">
                      <ContactIcon type="linkedin" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/alexdevlyashevskiy/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--contact-link-color))] hover:text-[hsl(var(--contact-link-hover-color))] transition-colors"
                      >
                        linkedin.com/in/alexdevlyashevskiy
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[hsl(var(--card-bg))] shadow-md">
              <CardContent className="p-8">
                <h3 className="font-inter font-semibold text-2xl mb-6">Service Areas</h3>
                <p className="mb-6">
                  As an independent IT consultant, I provide services remotely to clients across the UK and internationally. For clients in the following areas, in-person consultations may be available:
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-[hsl(var(--contact-icon-color))] mr-3">
                      <ContactIcon type="location" />
                    </span>
                    <span>Greater London</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[hsl(var(--contact-icon-color))] mr-3">
                      <ContactIcon type="location" />
                    </span>
                    <span>South East England</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[hsl(var(--contact-icon-color))] mr-3">
                      <ContactIcon type="globe" />
                    </span>
                    <span>Remote services available worldwide</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
