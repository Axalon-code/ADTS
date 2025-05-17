import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  imageUrl?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "cs-1",
    title: "Azure Cloud Migration for Regional Accounting Firm",
    client: "Smith & Associates",
    industry: "Accounting & Finance",
    category: "azure",
    challenge: "A growing accounting firm with 50+ employees faced increasing IT infrastructure costs and reliability issues with their aging on-premises servers. They needed a scalable solution that would accommodate seasonal workload spikes during tax season while ensuring data security and compliance.",
    solution: "Designed and implemented a complete Azure cloud migration strategy, transitioning their file storage, accounting applications, and client portal to a secure hybrid-cloud architecture. Set up Azure Virtual Desktop for remote staff and implemented robust disaster recovery protocols.",
    results: [
      "Reduced IT infrastructure costs by 35%",
      "Improved system uptime from 97% to 99.9%",
      "Enabled seamless remote work during COVID-19",
      "Strengthened data security with Azure's advanced protection features",
      "Eliminated seasonal performance issues during tax season"
    ],
    technologies: ["Azure Virtual Machines", "Azure Storage", "Azure SQL", "Azure Active Directory", "Azure Virtual Desktop"],
    testimonial: {
      quote: "The Azure migration completely transformed how we operate. Our team can now work efficiently from anywhere, and we've significantly reduced our IT overhead costs.",
      author: "Robert Smith",
      position: "Managing Partner, Smith & Associates"
    },
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "cs-2",
    title: "Identity Security Overhaul for Legal Services Provider",
    client: "Westlake Legal Group",
    industry: "Legal Services",
    category: "identity",
    challenge: "A mid-sized law firm handling sensitive client data experienced a security incident that exposed vulnerabilities in their identity management system. They needed to strengthen access controls while maintaining ease of use for attorneys accessing case files remotely.",
    solution: "Implemented a comprehensive Microsoft Entra ID solution with conditional access policies, multi-factor authentication, and Privileged Identity Management (PIM). Conducted security workshops and developed custom security policies tailored to legal industry compliance requirements.",
    results: [
      "Eliminated unauthorized access attempts with conditional access policies",
      "Reduced privileged account exposure by 90% using just-in-time access",
      "Streamlined client onboarding process with secure identity verification",
      "Achieved compliance with legal industry security standards",
      "Improved user experience with single sign-on across applications"
    ],
    technologies: ["Microsoft Entra ID", "Privileged Identity Management", "Conditional Access", "Multi-Factor Authentication", "Security Monitoring"],
    testimonial: {
      quote: "After experiencing a security incident, we needed to strengthen our systems without disrupting attorney workflows. The identity management solution implemented perfectly balanced security with usability.",
      author: "Jennifer Richards",
      position: "IT Director, Westlake Legal Group"
    },
    imageUrl: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "cs-3",
    title: "Microsoft 365 Deployment for Educational Institution",
    client: "Riverdale Academy",
    industry: "Education",
    category: "m365",
    challenge: "A private K-12 school with 800 students and 100 staff members was using disparate systems for email, document storage, and collaboration. This fragmented approach created confusion, reduced productivity, and posed challenges for IT management and security.",
    solution: "Planned and executed a comprehensive Microsoft 365 Education deployment, including Exchange Online, SharePoint, Teams, and OneDrive. Developed a custom security framework appropriate for educational settings with different permission levels for staff and students.",
    results: [
      "Consolidated 5 separate systems into one unified Microsoft 365 environment",
      "Reduced IT support tickets by 65% through streamlined administration",
      "Enabled seamless remote learning during pandemic restrictions",
      "Improved collaboration between teachers, students, and parents",
      "Enhanced data protection with centralized security policies"
    ],
    technologies: ["Microsoft 365", "Exchange Online", "SharePoint", "Teams", "Intune for Education"],
    testimonial: {
      quote: "Microsoft 365 transformed our school operations. Teachers and students now collaborate effortlessly, and our IT team can manage everything from one dashboard. The implementation was smooth and well-planned.",
      author: "Dr. Michael Chen",
      position: "Principal, Riverdale Academy"
    },
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "cs-4",
    title: "Process Automation for Healthcare Provider",
    client: "Northside Medical Center",
    industry: "Healthcare",
    category: "automation",
    challenge: "A busy medical practice was spending excessive staff time on manual tasks like appointment confirmations, insurance verification, and patient follow-ups. These administrative burdens were taking time away from patient care and resulting in occasional errors.",
    solution: "Designed and implemented a comprehensive process automation solution using Microsoft Power Platform. Created custom Power Automate flows for appointment reminders, prescription renewals, and insurance verification. Implemented Power Apps for streamlined patient intake and follow-up management.",
    results: [
      "Reduced administrative workload by 25 hours per week",
      "Decreased no-show appointments by 35% with automated reminders",
      "Improved patient satisfaction scores by 28%",
      "Eliminated manual data entry errors in patient records",
      "Accelerated insurance verification process from 2 days to 4 hours"
    ],
    technologies: ["Microsoft Power Automate", "Power Apps", "SharePoint", "Microsoft Forms", "Azure Logic Apps"],
    testimonial: {
      quote: "The automation solutions have transformed our practice. Our staff now focuses on patient care instead of paperwork, and our operations run more efficiently than ever before.",
      author: "Dr. Sarah Williams",
      position: "Medical Director, Northside Medical Center"
    },
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
  }
];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredCaseStudies = activeTab === "all" 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category === activeTab);

  return (
    <section id="case-studies" className="py-16 bg-slate-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">Client Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real-world examples of how our IT consultancy solutions have transformed businesses and organizations.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto mb-10">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                All Studies
              </TabsTrigger>
              <TabsTrigger value="azure" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Azure Cloud
              </TabsTrigger>
              <TabsTrigger value="identity" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Identity & Access
              </TabsTrigger>
              <TabsTrigger value="m365" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Microsoft 365
              </TabsTrigger>
              <TabsTrigger value="automation" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Automation
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredCaseStudies.map((study) => (
            <Card key={study.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                {study.imageUrl ? (
                  <img 
                    src={study.imageUrl} 
                    alt={study.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-primary/10">
                    <span className="text-primary font-medium">Case Study</span>
                  </div>
                )}
                <div className="absolute top-0 left-0 m-4">
                  <Badge variant="secondary" className="bg-white dark:bg-gray-800 text-primary">
                    {study.industry}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Client: {study.client}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-sm uppercase tracking-wider text-primary mb-1">Challenge</h4>
                  <p className="text-sm">{study.challenge.length > 150 ? `${study.challenge.substring(0, 150)}...` : study.challenge}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {study.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/5 border-primary/20">
                      {tech}
                    </Badge>
                  ))}
                  {study.technologies.length > 3 && (
                    <Badge variant="outline" className="bg-primary/5 border-primary/20">
                      +{study.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Button variant="outline" className="w-full mt-2 border-primary text-primary hover:bg-primary/10">
                  View Case Study
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-primary text-white px-8 py-6 text-lg hover:bg-accent transition-colors">
            Explore More Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
}