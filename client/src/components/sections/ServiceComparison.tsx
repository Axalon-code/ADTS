import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import type { MonthlyPackage } from "@shared/schema";

type Category = "azure" | "identity" | "m365" | "automation" | "support";

export default function ServiceComparison() {
  const [activeCategory, setActiveCategory] = useState<Category>("azure");
  const [animating, setAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { data: packages = [], isLoading } = useQuery<MonthlyPackage[]>({
    queryKey: ['/api/monthly-packages']
  });

  const activePlans = packages.filter(pkg => pkg.category === activeCategory);

  const handleCategoryChange = (category: Category) => {
    if (category === activeCategory || animating) return;
    
    setAnimating(true);
    
    const categoryNames = {
      azure: "Azure Cloud",
      identity: "Identity and Access",
      m365: "Microsoft 365",
      automation: "Process Automation",
      support: "Tech Support"
    };
    
    const announcement = document.getElementById('category-change-announcement');
    if (announcement) {
      announcement.textContent = `Loading ${categoryNames[category]} service packages`;
    }
    
    if (sliderRef.current) {
      sliderRef.current.classList.add('translate-x-full', 'opacity-0');
      sliderRef.current.setAttribute('aria-busy', 'true');
    }
    
    setTimeout(() => {
      setActiveCategory(category);
      
      if (sliderRef.current) {
        sliderRef.current.classList.remove('translate-x-full');
      }
      
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.classList.remove('opacity-0');
          sliderRef.current.setAttribute('aria-busy', 'false');
        }
        setAnimating(false);
        
        const announcementComplete = document.getElementById('category-change-announcement');
        if (announcementComplete) {
          announcementComplete.textContent = `Finished loading ${categoryNames[category]} service packages`;
        }
      }, 50);
    }, 300);
  };

  const categoryNames: Record<Category, string> = {
    azure: "Azure Cloud",
    identity: "Identity & Access",
    m365: "Microsoft 365",
    automation: "Process Automation",
    support: "Tech Support"
  };

  const handleChoosePackage = (packageName: string, price: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      // Pre-fill the service field and message after scrolling
      setTimeout(() => {
        const serviceSelect = document.querySelector('[data-testid="select-service"]') as HTMLButtonElement;
        const messageTextarea = document.querySelector('[data-testid="input-message"]') as HTMLTextAreaElement;
        
        if (messageTextarea) {
          messageTextarea.value = `I'm interested in the ${packageName} package (${price}/month). Please contact me to discuss this managed service.`;
          messageTextarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 500);
    }
  };

  return (
    <section id="service-comparison" className="py-16 3xl:py-20 4xl:py-24 bg-transparent dark:bg-transparent">
      <div aria-live="polite" className="sr-only" id="category-change-announcement"></div>
      <div className="container-responsive">
        <div className="text-center mb-12 3xl:mb-16">
          <h2 className="font-bold text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl mb-4 3xl:mb-6">Monthly Service Packages</h2>
          <p className="text-lg 3xl:text-xl 4xl:text-2xl text-muted-foreground max-w-3xl 3xl:max-w-4xl mx-auto">
            Choose a managed service package with predictable monthly costs for ongoing support
          </p>
        </div>

        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[90rem] mx-auto mb-12 3xl:mb-16">
          <div role="tablist" aria-label="Service categories" className="flex flex-wrap justify-center gap-2 mb-8">
            {(["azure", "identity", "m365", "automation", "support"] as Category[]).map((cat) => (
              <Button 
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => handleCategoryChange(cat)}
                className={`${activeCategory === cat ? "bg-primary text-white" : "text-primary hover:bg-primary/10"} px-6 py-3`}
                disabled={animating || isLoading}
                role="tab"
                id={`tab-${cat}`}
                aria-selected={activeCategory === cat}
                aria-controls={`panel-${cat}`}
                data-testid={`tab-${cat}`}
              >
                <span className="sr-only">{activeCategory === cat ? "Currently viewing " : "View "}</span>
                {categoryNames[cat]}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading packages...</span>
            </div>
          ) : (
            <div 
              ref={sliderRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 3xl:gap-10 4xl:gap-12 transition-all duration-300 ease-in-out"
              role="tabpanel"
              id={`panel-${activeCategory}`}
              aria-labelledby={`tab-${activeCategory}`}
              aria-live="polite"
            >
              <div className="sr-only" aria-live="assertive">
                Now displaying {categoryNames[activeCategory]} service packages
              </div>
              {activePlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col ${
                    plan.mostPopular ? 'border-primary shadow-lg' : 'border-gray-200 dark:border-gray-700'
                  }`}
                  data-testid={`card-package-${plan.id}`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="mt-1 min-h-12">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-primary">{plan.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">/{plan.billingPeriod}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-6 flex-grow">
                    <ul className="space-y-3">
                      {plan.features?.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="mt-auto">
                    <Button 
                      className="w-full bg-primary text-white hover:bg-accent"
                      onClick={() => handleChoosePackage(plan.name, plan.price)}
                      data-testid={`button-choose-${plan.id}`}
                    >
                      Choose {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12 space-y-6">
          <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-lg mb-2 text-white">Prefer Flexible Hourly Rates?</h3>
            <p className="text-white mb-4">
              Book ad-hoc consultations at hourly rates for one-off projects or specific technical needs.
            </p>
            <Button
              onClick={() => window.location.href = '/booking'}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-6 py-2"
              data-testid="button-view-hourly"
            >
              View Hourly Consultations
            </Button>
          </div>
          <p className="text-muted-foreground">
            Need a custom solution? Contact me for a personalized package tailored to your specific requirements.
          </p>
          <Button
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-primary text-white px-8 py-3 hover:bg-accent transition-colors"
            data-testid="button-contact-quote"
          >
            Contact for Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
