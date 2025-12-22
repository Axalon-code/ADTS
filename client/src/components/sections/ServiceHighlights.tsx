import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  linkId: string;
}

const ServiceCard = ({ icon, title, description, linkId }: ServiceCardProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="bg-[hsl(var(--service-card-bg))] hover:shadow-lg transition-all duration-200">
      <CardContent className="p-8">
        <div className="mb-4">
          <i className={`${icon} text-5xl gradient-text gradient-text-hover`}></i>
        </div>
        <h3 className="font-inter font-semibold text-xl mb-3 text-[hsl(var(--service-title-color))]">{title}</h3>
        <p className="text-muted-foreground dark:text-gray-300 mb-6">{description}</p>
        <button 
          onClick={() => scrollToSection(linkId)}
          className="text-[hsl(var(--service-link-color))] font-medium hover:text-[hsl(var(--service-link-hover))] transition-colors inline-flex items-center"
        >
          Learn more
          <i className="fas fa-arrow-right ml-2 text-sm gradient-text"></i>
        </button>
      </CardContent>
    </Card>
  );
};

export default function ServiceHighlights() {
  const services = [
    {
      icon: "fas fa-cloud",
      title: "Microsoft Azure Solutions",
      description: "Full cloud and hybrid on-premises Azure tenancy configuration, subscriptions management, and cost optimization.",
      linkId: "azure-services"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Identity & Access Management",
      description: "Entra PIM setups, conditional access policies, 2FA configuration, and comprehensive identity solutions.",
      linkId: "identity-services"
    },
    {
      icon: "fas fa-laptop",
      title: "Microsoft 365 Administration",
      description: "Office 365 configuration, Exchange administration, Intune device management, and licensing optimization.",
      linkId: "m365-services"
    },
    {
      icon: "fas fa-headset",
      title: "Tech Support",
      description: "General IT system administration, desktop and laptop repairs, upgrades, servicing, and vendor communication management.",
      linkId: "support-services"
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-16 3xl:py-20 4xl:py-24 bg-transparent dark:bg-transparent">
      <div className="container-responsive">
        <div className="text-center mb-16 3xl:mb-20">
          <h2 className="font-inter font-bold text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl mb-4 3xl:mb-6">IT Consultancy Services</h2>
          <p className="text-lg 3xl:text-xl 4xl:text-2xl text-muted-foreground max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mx-auto">Comprehensive Microsoft ecosystem solutions to optimize your IT infrastructure and enhance productivity.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 3xl:gap-10 4xl:gap-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
              linkId={service.linkId} 
            />
          ))}
        </div>
        
        <div className="mt-12 text-center flex flex-col md:flex-row justify-center items-center gap-4">
          <Button 
            onClick={() => scrollToSection("services")}
            className="bg-primary text-white px-8 py-3 hover:bg-accent transition-colors inline-flex items-center justify-center"
          >
            View All Services
            <i className="fas fa-chevron-right ml-2 text-sm gradient-text"></i>
          </Button>
          
          <Button 
            onClick={() => window.location.href = "/booking"}
            variant="outline"
            className="px-8 py-3 inline-flex items-center justify-center border-primary text-primary hover:bg-primary/10"
          >
            Book a Consultation
            <i className="fas fa-calendar-check ml-2 text-sm gradient-text"></i>
          </Button>
        </div>
      </div>
    </section>
  );
}
