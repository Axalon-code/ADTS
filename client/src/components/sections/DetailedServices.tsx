import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  id: string;
  iconSrc: string;
  title: string;
  items: string[];
}

const ServiceCard = ({ id, iconSrc, title, items }: ServiceCardProps) => (
  <Card id={id} className="bg-[hsl(var(--service-card-bg))] shadow-md">
    <CardContent className="p-8">
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-md mr-4">
          <img src={iconSrc} alt={title} className="w-12 h-12" />
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
      iconSrc: "/service-icons/azure-cloud.svg",
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
      iconSrc: "/service-icons/shield.svg",
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
      iconSrc: "/service-icons/laptop.svg",
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
      iconSrc: "/service-icons/robot.svg",
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
    "EOL non-supported hardware, software, and OS fixes"
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
              iconSrc={service.iconSrc}
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
