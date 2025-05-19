import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  id: string;
  iconType: "azure" | "identity" | "m365" | "automation" | "support";
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
          s-4.3-9.6-9.6-9.6c-0.3,0-0.7,0-1,0.1V18C43,14.2,38,12,32,12z" fill="url(#blue-green-gradient)"/>
        </svg>
      );
    case "identity":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
          <path d="M32 12 L52 24 L52 40 C52 48 32 56 32 56 C32 56 12 48 12 40 L12 24 Z" fill="url(#blue-green-gradient)"/>
          <path d="M32 16 L46.4 25.6 L46.4 38.4 C46.4 44 32 50.4 32 50.4 C32 50.4 17.6 44 17.6 38.4 L17.6 25.6 Z" fill="var(--service-card-bg)"/>
          <path d="M32 20 L42.4 27.2 L42.4 36.8 C42.4 40.8 32 45.6 32 45.6 C32 45.6 21.6 40.8 21.6 36.8 L21.6 27.2 Z" fill="url(#blue-green-gradient)"/>
        </svg>
      );
    case "m365":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
          <rect x="16" y="16" width="32" height="20" rx="2" fill="url(#blue-green-gradient)"/>
          <rect x="19" y="19" width="26" height="14" rx="1" fill="var(--service-card-bg)"/>
          <path d="M12 40 L52 40 L52 44 C52 46 50 48 48 48 L16 48 C14 48 12 46 12 44 Z" fill="url(#blue-green-gradient)"/>
        </svg>
      );
    case "automation":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
          <rect x="20" y="20" width="24" height="28" rx="3" fill="url(#blue-green-gradient)"/>
          <rect x="23" y="24" width="18" height="16" rx="2" fill="var(--service-card-bg)"/>
          <circle cx="28" cy="32" r="3" fill="url(#blue-green-gradient)"/>
          <circle cx="36" cy="32" r="3" fill="url(#blue-green-gradient)"/>
          <rect x="27" y="42" width="10" height="2" rx="1" fill="var(--service-card-bg)"/>
          <rect x="31" y="12" width="2" height="8" fill="url(#blue-green-gradient)"/>
          <circle cx="32" cy="10" r="3" fill="url(#blue-green-gradient)"/>
          <rect x="12" y="28" width="8" height="3" rx="1.5" fill="url(#blue-green-gradient)"/>
          <rect x="44" y="28" width="8" height="3" rx="1.5" fill="url(#blue-green-gradient)"/>
        </svg>
      );
    case "support":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
          {/* Headset base */}
          <path d="M32 12 C20 12 10 22 10 34 L10 46 C10 48 12 50 14 50 L20 50 C22 50 24 48 24 46 L24 34 C24 32 22 30 20 30 L16 30 C16 24 23 16 32 16 C41 16 48 24 48 30 L44 30 C42 30 40 32 40 34 L40 46 C40 48 42 50 44 50 L50 50 C52 50 54 48 54 46 L54 34 C54 22 44 12 32 12 Z" fill="url(#blue-green-gradient)"/>
          {/* Headset ear cups */}
          <circle cx="16" cy="38" r="4" fill="var(--service-card-bg)"/>
          <circle cx="48" cy="38" r="4" fill="var(--service-card-bg)"/>
          {/* Microphone */}
          <path d="M40 46 C40 46 42 48 42 52 L45 52 C45 52 44 46 40 46 Z" fill="url(#blue-green-gradient)"/>
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
        <div className="p-2 rounded-md mr-4 gradient-text gradient-text-hover">
          <ServiceIcon iconType={iconType} />
        </div>
        <h3 className="font-inter font-semibold text-2xl text-[hsl(var(--service-title-color))]">{title}</h3>
      </div>
      
      <ul className="space-y-4 mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <i className="fas fa-check gradient-text mt-1 mr-3"></i>
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

// Define an SVG gradient that will be used by all service icons
const SvgGradientDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="blue-green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0000BD" />
        <stop offset="50%" stopColor="#00C3B9" />
        <stop offset="100%" stopColor="#00FF86" />
      </linearGradient>
    </defs>
  </svg>
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
      title: "IT Automation",
      items: [
        "Robotic Process Automation (RPA) development",
        "Business process automation consulting",
        "Stakeholder communication and technical guidance"
      ]
    },
    {
      id: "support-services",
      iconType: "support",
      title: "IT Support",
      items: [
        "General IT system administration and troubleshooting",
        "Desktop and laptop repairs, upgrades, and servicing",
        "Vendor and supplier communication management"
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
    <section id="services" className="py-20 bg-transparent dark:bg-transparent">
      {/* Include the SVG gradient definitions that will be used by all SVG icons */}
      <SvgGradientDefs />
      
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
