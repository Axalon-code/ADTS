import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  id: string;
  iconType: "azure" | "identity" | "m365" | "automation";
  title: string;
  items: string[];
}

const ServiceIcon = ({ iconType }: { iconType: ServiceCardProps["iconType"] }) => {
  // Will use our gradient class instead of a single color
  switch (iconType) {
    case "azure":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
          <path d="M32,12c-6.6,0-12,5.4-12,12c0,0.3,0,0.7,0.1,1h-0.1c-3.5,0-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4H44c5.3,0,9.6-4.3,9.6-9.6
          s-4.3-9.6-9.6-9.6c-0.3,0-0.7,0-1,0.1V18C43,14.2,38,12,32,12z" fill="currentColor"/>
        </svg>
      );
    case "identity":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
          <path d="M32 12 L52 24 L52 40 C52 48 32 56 32 56 C32 56 12 48 12 40 L12 24 Z" fill="currentColor"/>
          <path d="M32 16 L46.4 25.6 L46.4 38.4 C46.4 44 32 50.4 32 50.4 C32 50.4 17.6 44 17.6 38.4 L17.6 25.6 Z" fill="var(--service-card-bg)"/>
          <path d="M32 20 L42.4 27.2 L42.4 36.8 C42.4 40.8 32 45.6 32 45.6 C32 45.6 21.6 40.8 21.6 36.8 L21.6 27.2 Z" fill="currentColor"/>
        </svg>
      );
    case "m365":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
          <rect x="16" y="16" width="32" height="20" rx="2" fill="currentColor"/>
          <rect x="19" y="19" width="26" height="14" rx="1" fill="var(--service-card-bg)"/>
          <path d="M12 40 L52 40 L52 44 C52 46 50 48 48 48 L16 48 C14 48 12 46 12 44 Z" fill="currentColor"/>
        </svg>
      );
    case "automation":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
          <rect x="20" y="20" width="24" height="28" rx="3" fill="currentColor"/>
          <rect x="23" y="24" width="18" height="16" rx="2" fill="var(--service-card-bg)"/>
          <circle cx="28" cy="32" r="3" fill="currentColor"/>
          <circle cx="36" cy="32" r="3" fill="currentColor"/>
          <rect x="27" y="42" width="10" height="2" rx="1" fill="var(--service-card-bg)"/>
          <rect x="31" y="12" width="2" height="8" fill="currentColor"/>
          <circle cx="32" cy="10" r="3" fill="currentColor"/>
          <rect x="12" y="28" width="8" height="3" rx="1.5" fill="currentColor"/>
          <rect x="44" y="28" width="8" height="3" rx="1.5" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
};

const ServiceCard = ({ id, iconType, title, items }: ServiceCardProps) => (
  <Card id={id} className="bg-[hsl(var(--service-card-bg))] shadow-md">
    <CardContent className="p-8">
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-md mr-4 text-[hsl(var(--service-icon-color))]">
          <ServiceIcon iconType={iconType} />
        </div>
        <h3 className="font-inter font-semibold text-2xl text-[hsl(var(--service-title-color))]">{title}</h3>
      </div>
      
      <ul className="space-y-4 mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <i className="fas fa-check text-[hsl(var(--service-icon-color))] mt-1 mr-3"></i>
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function DetailedServices() {
  const services = [
    {
      id: "azure-services",
      iconType: "azure",
      title: "Microsoft Azure Solutions",
      items: [
        "Full cloud and hybrid on-premises Azure tenancy configuration",
        "Azure subscription management and organization",
        "Azure billing optimization and cost budgeting",
        "Business continuity and disaster recovery planning",
        "Azure resource deployment and management"
      ]
    },
    {
      id: "identity-services",
      iconType: "identity",
      title: "Identity & Access Management",
      items: [
        "Microsoft Entra ID (Azure AD) implementation and management",
        "Privileged Identity Management (PIM) setups",
        "Conditional access policies and security defaults",
        "Multi-factor authentication (2FA) configuration",
        "On-premises Active Directory domain controller setups",
        "Hybrid identity solutions and Azure AD Connect"
      ]
    },
    {
      id: "m365-services",
      iconType: "m365",
      title: "Microsoft 365 Administration",
      items: [
        "Office 365 administration and configuration",
        "Exchange Online configuration and management",
        "Microsoft Intune device compliance and management policies",
        "Microsoft 365 licensing optimization",
        "SharePoint Online and OneDrive configuration",
        "Teams setup and governance"
      ]
    },
    {
      id: "automation-services",
      iconType: "automation",
      title: "IT Automation & Support",
      items: [
        "Robotic Process Automation (RPA) development",
        "Business process automation consulting",
        "General IT system administration and troubleshooting",
        "Desktop and laptop repairs, upgrades, and servicing",
        "Vendor and supplier communication management",
        "Stakeholder communication and technical guidance"
      ]
    }
  ];

  const servicesNotOffered = [
    "Building SQL databases from scratch",
    "Restoring failed databases",
    "Palo Alto and Checkpoint firewall configuration",
    "Cisco or Juniper routers and switches",
    "Recovery from compromised ransomware attacks",
    "EOL Hardware, Software and Operating Systems"
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-4">Comprehensive IT Services</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Tailored technology solutions to meet your business requirements.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              id={service.id}
              iconType={service.iconType}
              title={service.title}
              items={service.items}
            />
          ))}
        </div>
        
        <div className="mt-16">
          <Card className="bg-[hsl(var(--service-card-bg))] shadow-md">
            <CardContent className="p-8">
              <h3 className="font-inter font-semibold text-2xl mb-6 text-[hsl(var(--service-title-color))]">Services Not Offered</h3>
              <p className="text-muted-foreground mb-6">
                To ensure I deliver the highest quality service, I focus on my core expertise. The following services are outside my current consultation offerings:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  {servicesNotOffered.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-times-circle text-red-500 mt-1 mr-3"></i>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <ul className="space-y-3">
                  {servicesNotOffered.slice(3).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-times-circle text-red-500 mt-1 mr-3"></i>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
