import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-4 dark:text-white">Contact Me</h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Reach out to discuss your IT requirements and how I can help your business succeed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Card className="bg-white dark:bg-[hsl(var(--service-card-bg))] shadow-md">
            <CardContent className="p-8">
              <ContactForm />
            </CardContent>
          </Card>
          
          <div>
            <Card className="bg-white dark:bg-[hsl(var(--service-card-bg))] shadow-md mb-8">
              <CardContent className="p-8">
                <h3 className="font-inter font-semibold text-2xl mb-6 dark:text-white">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 dark:bg-blue-500 dark:bg-opacity-20 p-3 rounded-md mr-4">
                      <i className="fas fa-envelope text-primary dark:text-blue-500"></i>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">Email</p>
                      <a href="mailto:contact@adts.com" className="text-primary dark:text-blue-500 hover:text-accent dark:hover:text-blue-400 transition-colors">
                        contact@adts.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 dark:bg-blue-500 dark:bg-opacity-20 p-3 rounded-md mr-4">
                      <i className="fas fa-phone-alt text-primary dark:text-blue-500"></i>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">Phone</p>
                      <a href="tel:+441234567890" className="text-primary dark:text-blue-500 hover:text-accent dark:hover:text-blue-400 transition-colors">
                        +44 (0) 123 456 7890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 dark:bg-blue-500 dark:bg-opacity-20 p-3 rounded-md mr-4">
                      <i className="fab fa-linkedin-in text-primary dark:text-blue-500"></i>
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/alexdevlyashevskiy/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary dark:text-blue-500 hover:text-accent dark:hover:text-blue-400 transition-colors"
                      >
                        linkedin.com/in/alexdevlyashevskiy
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-[hsl(var(--service-card-bg))] shadow-md">
              <CardContent className="p-8">
                <h3 className="font-inter font-semibold text-2xl mb-6 dark:text-white">Service Areas</h3>
                <p className="mb-6 dark:text-gray-300">
                  As an independent IT consultant, I provide services remotely to clients across the UK and internationally. For clients in the following areas, in-person consultations may be available:
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary dark:text-blue-500 mr-3"></i>
                    <span className="dark:text-gray-300">Greater London</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary dark:text-blue-500 mr-3"></i>
                    <span className="dark:text-gray-300">South East England</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-globe-europe text-primary dark:text-blue-500 mr-3"></i>
                    <span className="dark:text-gray-300">Remote services available worldwide</span>
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
