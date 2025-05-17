import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const expertiseList = [
    "Microsoft 365 & Azure administration and configuration",
    "Enterprise identity and access management solutions",
    "Business continuity, disaster recovery, and backup planning",
    "Robotic Process Automation (RPA) development",
    "IT infrastructure optimization and troubleshooting"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-inter font-bold text-3xl md:text-4xl mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm an independent IT consultant specializing in Microsoft technologies with extensive experience in designing, implementing, and optimizing cloud and hybrid solutions.
            </p>
            
            <Card className="mb-8 border-0 shadow-none">
              <CardContent className="p-0">
                <h3 className="font-inter font-semibold text-xl mb-4">My Expertise</h3>
                <ul className="space-y-3">
                  {expertiseList.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <a 
              href="https://www.linkedin.com/in/alexdevlyashevskiy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors"
            >
              <i className="fab fa-linkedin mr-2"></i>
              Connect on LinkedIn
            </a>
          </div>
          
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="IT professional working on technology solutions" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
