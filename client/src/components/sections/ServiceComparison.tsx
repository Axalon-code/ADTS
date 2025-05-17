import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface ServiceFeature {
  name: string;
  essential: boolean | string;
  business: boolean | string;
  enterprise: boolean | string;
}

interface ServicePlan {
  id: string;
  name: string;
  description: string;
  price: string;
  billingPeriod: string;
  features: string[];
  mostPopular: boolean;
  category: "azure" | "identity" | "m365" | "automation";
  detailsUrl: string;
}

const servicePlans: ServicePlan[] = [
  // Azure Plans
  {
    id: "azure-essential",
    name: "Azure Essentials",
    description: "Core Azure migration and management services for small businesses",
    price: "£1,500",
    billingPeriod: "per month",
    features: [
      "Initial Azure environment setup",
      "Basic workload migration (up to 5 VMs)",
      "Standard security configuration",
      "Monthly performance reports",
      "Email support with 24-hour response time"
    ],
    mostPopular: false,
    category: "azure",
    detailsUrl: "/services/azure-essentials"
  },
  {
    id: "azure-business",
    name: "Azure Business",
    description: "Comprehensive Azure solutions for growing organizations",
    price: "£3,000",
    billingPeriod: "per month",
    features: [
      "Complete Azure environment design and setup",
      "Advanced workload migration (up to 20 VMs)",
      "Enhanced security with threat monitoring",
      "Disaster recovery planning",
      "Weekly performance optimization",
      "Dedicated support with 8-hour response time"
    ],
    mostPopular: true,
    category: "azure",
    detailsUrl: "/services/azure-business"
  },
  {
    id: "azure-enterprise",
    name: "Azure Enterprise",
    description: "Advanced Azure cloud solutions with full management",
    price: "£6,000+",
    billingPeriod: "per month",
    features: [
      "Enterprise-grade Azure architecture",
      "Unlimited workload migration",
      "Advanced security with 24/7 monitoring",
      "Comprehensive disaster recovery",
      "Continuous cost optimization",
      "Custom compliance frameworks",
      "24/7 priority support with 1-hour response time"
    ],
    mostPopular: false,
    category: "azure",
    detailsUrl: "/services/azure-enterprise"
  },

  // Identity Plans
  {
    id: "identity-essential",
    name: "Identity Essentials",
    description: "Basic identity and access management for small teams",
    price: "£800",
    billingPeriod: "per month",
    features: [
      "Microsoft Entra ID setup and configuration",
      "Basic authentication policies",
      "Multi-factor authentication setup",
      "Standard access reviews",
      "Email support with 24-hour response time"
    ],
    mostPopular: false,
    category: "identity",
    detailsUrl: "/services/identity-essentials"
  },
  {
    id: "identity-business",
    name: "Identity Business",
    description: "Comprehensive identity management for mid-sized organizations",
    price: "£1,800",
    billingPeriod: "per month",
    features: [
      "Advanced Entra ID implementation",
      "Conditional access policies",
      "Privileged identity management",
      "Identity Protection configuration",
      "Quarterly security assessments",
      "Dedicated support with 8-hour response time"
    ],
    mostPopular: true,
    category: "identity",
    detailsUrl: "/services/identity-business"
  },
  {
    id: "identity-enterprise",
    name: "Identity Enterprise",
    description: "Enterprise-grade identity security and governance",
    price: "£3,500+",
    billingPeriod: "per month",
    features: [
      "Zero Trust identity architecture",
      "Custom security policies",
      "Advanced threat protection",
      "Comprehensive access governance",
      "Regular compliance audits",
      "Identity security training",
      "24/7 priority support with 1-hour response time"
    ],
    mostPopular: false,
    category: "identity",
    detailsUrl: "/services/identity-enterprise"
  },

  // Microsoft 365 Plans
  {
    id: "m365-essential",
    name: "M365 Essentials",
    description: "Basic Microsoft 365 setup and management",
    price: "£600",
    billingPeriod: "per month",
    features: [
      "Microsoft 365 tenant setup",
      "Email migration and configuration",
      "Basic security policies",
      "Standard Teams setup",
      "Email support with 24-hour response time"
    ],
    mostPopular: false,
    category: "m365",
    detailsUrl: "/services/m365-essentials"
  },
  {
    id: "m365-business",
    name: "M365 Business",
    description: "Comprehensive M365 management for business productivity",
    price: "£1,500",
    billingPeriod: "per month",
    features: [
      "Advanced M365 implementation",
      "Full data migration",
      "SharePoint and Teams optimization",
      "Enhanced security configuration",
      "Monthly admin training",
      "Dedicated support with 8-hour response time"
    ],
    mostPopular: true,
    category: "m365",
    detailsUrl: "/services/m365-business"
  },
  {
    id: "m365-enterprise",
    name: "M365 Enterprise",
    description: "Enterprise-grade Microsoft 365 solutions and governance",
    price: "£3,000+",
    billingPeriod: "per month",
    features: [
      "Enterprise M365 architecture",
      "Advanced compliance configuration",
      "Custom SharePoint and Teams development",
      "Information governance implementation",
      "End-user training program",
      "Quarterly strategy reviews",
      "24/7 priority support with 1-hour response time"
    ],
    mostPopular: false,
    category: "m365",
    detailsUrl: "/services/m365-enterprise"
  },

  // Automation Plans
  {
    id: "automation-essential",
    name: "Automation Essentials",
    description: "Basic process automation for small teams",
    price: "£900",
    billingPeriod: "per month",
    features: [
      "Process assessment and documentation",
      "Basic Power Automate flows",
      "Simple form automation",
      "Standard notification systems",
      "Email support with 24-hour response time"
    ],
    mostPopular: false,
    category: "automation",
    detailsUrl: "/services/automation-essentials"
  },
  {
    id: "automation-business",
    name: "Automation Business",
    description: "Comprehensive automation solutions for business efficiency",
    price: "£2,200",
    billingPeriod: "per month",
    features: [
      "Detailed workflow analysis",
      "Advanced Power Automate implementation",
      "Custom Power Apps development",
      "Process optimization",
      "Monthly usage reports",
      "Dedicated support with 8-hour response time"
    ],
    mostPopular: true,
    category: "automation",
    detailsUrl: "/services/automation-business"
  },
  {
    id: "automation-enterprise",
    name: "Automation Enterprise",
    description: "Enterprise-grade automation with custom development",
    price: "£4,500+",
    billingPeriod: "per month",
    features: [
      "Enterprise workflow architecture",
      "Advanced custom connectors",
      "Integration with legacy systems",
      "Robotic process automation",
      "Continuous optimization",
      "ROI tracking and reporting",
      "24/7 priority support with 1-hour response time"
    ],
    mostPopular: false,
    category: "automation",
    detailsUrl: "/services/automation-enterprise"
  }
];

export default function ServiceComparison() {
  const [activeCategory, setActiveCategory] = useState<"azure" | "identity" | "m365" | "automation">("azure");
  const [animating, setAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filter plans by active category
  const activePlans = servicePlans.filter(plan => plan.category === activeCategory);

  const handleCategoryChange = (category: "azure" | "identity" | "m365" | "automation") => {
    if (category === activeCategory || animating) return;
    
    setAnimating(true);
    
    // Start animation - slide out
    if (sliderRef.current) {
      sliderRef.current.classList.add('translate-x-full', 'opacity-0');
    }
    
    // Change category after slide out animation
    setTimeout(() => {
      setActiveCategory(category);
      
      // Slide in with new content
      if (sliderRef.current) {
        sliderRef.current.classList.remove('translate-x-full');
      }
      
      // End animation after slide in
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.classList.remove('opacity-0');
        }
        setAnimating(false);
      }, 50);
    }, 300);
  };

  return (
    <section id="service-comparison" className="py-16 bg-slate-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">Service Packages</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the right level of support and service for your business needs
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          {/* Service Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button 
              variant={activeCategory === "azure" ? "default" : "outline"}
              onClick={() => handleCategoryChange("azure")}
              className={`${activeCategory === "azure" ? "bg-primary text-white" : "text-primary hover:bg-primary/10"} px-6 py-3`}
              disabled={animating}
            >
              Azure Cloud
            </Button>
            <Button 
              variant={activeCategory === "identity" ? "default" : "outline"}
              onClick={() => handleCategoryChange("identity")}
              className={`${activeCategory === "identity" ? "bg-primary text-white" : "text-primary hover:bg-primary/10"} px-6 py-3`}
              disabled={animating}
            >
              Identity & Access
            </Button>
            <Button 
              variant={activeCategory === "m365" ? "default" : "outline"}
              onClick={() => handleCategoryChange("m365")}
              className={`${activeCategory === "m365" ? "bg-primary text-white" : "text-primary hover:bg-primary/10"} px-6 py-3`}
              disabled={animating}
            >
              Microsoft 365
            </Button>
            <Button 
              variant={activeCategory === "automation" ? "default" : "outline"}
              onClick={() => handleCategoryChange("automation")}
              className={`${activeCategory === "automation" ? "bg-primary text-white" : "text-primary hover:bg-primary/10"} px-6 py-3`}
              disabled={animating}
            >
              Process Automation
            </Button>
          </div>

          {/* Service Plan Cards */}
          <div 
            ref={sliderRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-300 ease-in-out"
          >
            {activePlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-transform duration-300 hover:scale-105 ${
                  plan.mostPopular ? 'border-primary shadow-lg' : 'border-gray-200 dark:border-gray-700'
                }`}
              >


                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="mt-1 min-h-12">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-lg text-muted-foreground">Contact for pricing</span>
                  </div>
                </CardHeader>

                <CardContent className="pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full bg-primary text-white hover:bg-accent"
                  >
                    Choose {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Need a custom solution? Contact us for a personalized service package tailored to your specific requirements.
          </p>
          <Button
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-primary text-white px-8 py-3 hover:bg-accent transition-colors"
          >
            Contact for Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}