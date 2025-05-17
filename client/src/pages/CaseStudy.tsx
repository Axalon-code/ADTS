import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  fullDescription?: string;
  duration?: string;
  year?: number;
  outcome?: string;
}

// This would typically come from an API or database
// Using static data for demonstration
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
    technologies: ["Azure Virtual Machines", "Azure Storage", "Azure SQL", "Azure Active Directory", "Azure Virtual Desktop", "Azure Backup", "Azure Site Recovery", "Azure Security Center"],
    testimonial: {
      quote: "The Azure migration completely transformed how we operate. Our team can now work efficiently from anywhere, and we've significantly reduced our IT overhead costs.",
      author: "Robert Smith",
      position: "Managing Partner, Smith & Associates"
    },
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    fullDescription: "Smith & Associates, a regional accounting firm serving clients across multiple industries, approached us with the challenge of modernizing their aging IT infrastructure. Their existing on-premises servers were becoming increasingly unreliable, especially during tax season when system demands peaked. They were experiencing downtime that affected client service and staff productivity, along with rising maintenance costs for their hardware.\n\nAfter conducting a thorough assessment of their existing infrastructure, workflow needs, and compliance requirements, we proposed a comprehensive Azure cloud migration strategy. The solution involved a phased approach to minimize disruption to their operations.\n\nPhase 1 focused on migrating their file storage and non-critical applications to Azure, establishing a hybrid connectivity model, and implementing basic security controls. Phase 2 involved migrating their critical accounting applications, setting up Azure SQL with appropriate data protection measures, and establishing a client portal hosted in Azure App Service. The final phase included implementing Azure Virtual Desktop for their staff, setting up comprehensive disaster recovery, and fine-tuning security policies.\n\nThe results exceeded expectations. Not only did they achieve significant cost savings by eliminating hardware refresh cycles and reducing maintenance costs, but they also gained operational flexibility that proved invaluable during the pandemic. The cloud infrastructure scaled seamlessly during tax season, eliminating the performance bottlenecks they had previously experienced. Most importantly, their data security posture improved substantially with features like Microsoft Defender for Cloud, multi-factor authentication, and automated backup policies.",
    duration: "4 months",
    year: 2022,
    outcome: "Smith & Associates now operates with significantly reduced IT overhead, enhanced security, and the ability to scale resources as needed. Their staff can work securely from any location, and they've eliminated seasonal performance issues that previously impacted client service during busy periods."
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
    technologies: ["Microsoft Entra ID", "Privileged Identity Management", "Conditional Access", "Multi-Factor Authentication", "Security Monitoring", "Identity Protection", "Azure AD B2C", "Microsoft Sentinel"],
    testimonial: {
      quote: "After experiencing a security incident, we needed to strengthen our systems without disrupting attorney workflows. The identity management solution implemented perfectly balanced security with usability.",
      author: "Jennifer Richards",
      position: "IT Director, Westlake Legal Group"
    },
    imageUrl: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    fullDescription: "Westlake Legal Group approached us following a security incident where unauthorized access to their systems had potentially exposed confidential client information. Their existing identity management system lacked modern security features, but they were concerned that implementing stricter controls would impede attorney workflows, particularly for those working remotely or at client sites.\n\nWe began with a comprehensive security assessment that identified several vulnerabilities: excessive standing privileges for IT staff, inconsistent access control policies, weak authentication practices, and limited visibility into suspicious access attempts. Based on this assessment, we designed a multi-faceted approach centered around Microsoft Entra ID's security capabilities.\n\nThe solution included implementing conditional access policies that evaluated risk factors before granting access, deploying multi-factor authentication with appropriate exceptions for low-risk scenarios, and implementing Privileged Identity Management for just-in-time administrative access. We also set up comprehensive monitoring with Microsoft Sentinel to detect potential identity-based threats.\n\nA critical aspect of the project was change management. We conducted tailored security awareness workshops for different stakeholder groups and created documentation that explained security measures in non-technical terms. We also worked closely with their IT team to develop custom policies aligned with legal industry compliance requirements.\n\nThe result was a robust identity security framework that significantly reduced risk while maintaining productivity. The conditional access policies effectively blocked unauthorized access attempts while allowing legitimate users to work efficiently. Just-in-time privileged access eliminated the security risks of standing admin accounts. Perhaps most importantly, the solution improved rather than hindered user experience through features like single sign-on across applications.",
    duration: "3 months",
    year: 2023,
    outcome: "Westlake Legal Group now operates with significantly enhanced security posture and full compliance with legal industry standards. Their attorneys can access systems securely from anywhere while the IT team maintains comprehensive visibility and control over identity-related risks."
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
    technologies: ["Microsoft 365", "Exchange Online", "SharePoint", "Teams", "OneDrive", "Intune for Education", "School Data Sync", "Microsoft Forms", "Class Notebooks"],
    testimonial: {
      quote: "Microsoft 365 transformed our school operations. Teachers and students now collaborate effortlessly, and our IT team can manage everything from one dashboard. The implementation was smooth and well-planned.",
      author: "Dr. Michael Chen",
      position: "Principal, Riverdale Academy"
    },
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    fullDescription: "Riverdale Academy approached us with a challenge common to many educational institutions: they had accumulated multiple separate systems over the years for different functions. They were using a third-party email provider, network file shares for document storage, a separate learning management system, and various uncoordinated communication tools. This fragmentation created numerous issues: users needed to remember multiple credentials, information was siloed, collaboration was difficult, and the IT team struggled to maintain security and compliance across disparate systems.\n\nAfter analyzing their requirements and workflows, we proposed consolidating these functions into a comprehensive Microsoft 365 Education environment. We developed a phased migration plan that minimized disruption to the academic calendar and included appropriate training for different user groups.\n\nThe implementation began with core infrastructure setup and pilot deployments with select staff. We then migrated email to Exchange Online, followed by transitioning document storage to SharePoint and OneDrive with carefully designed permission structures appropriate for an educational environment. Teams was configured with class teams and staff collaboration spaces, with appropriate policies to ensure safe student usage. We also implemented School Data Sync to automate class team creation and maintenance based on the school's student information system.\n\nA crucial aspect of the project was security configuration. We implemented age-appropriate policies, safely enabled external collaboration where needed, and established appropriate data loss prevention measures. We also provided extensive training tailored to different user groups, from IT administrators to teachers and students.\n\nThe impact was transformative. With a unified platform, collaboration between teachers and students became seamless. IT management was simplified with centralized administration and security policies. When COVID-19 restrictions suddenly required remote learning, the school was already well-positioned with Teams as their virtual classroom environment.",
    duration: "5 months",
    year: 2021,
    outcome: "Riverdale Academy now operates with a modern, integrated digital learning environment that supports both in-person and remote education. Teachers and students have embraced the collaborative capabilities, while the IT team has achieved greater security and efficiency through centralized management."
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
    technologies: ["Microsoft Power Automate", "Power Apps", "SharePoint", "Microsoft Forms", "Azure Logic Apps", "Microsoft Dataverse", "Power BI", "Microsoft Teams"],
    testimonial: {
      quote: "The automation solutions have transformed our practice. Our staff now focuses on patient care instead of paperwork, and our operations run more efficiently than ever before.",
      author: "Dr. Sarah Williams",
      position: "Medical Director, Northside Medical Center"
    },
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    fullDescription: "Northside Medical Center, a growing healthcare practice with multiple providers, was struggling with administrative inefficiencies that impacted both staff workload and patient experience. Their staff was spending hours each day on repetitive manual tasks: confirming appointments via phone, manually verifying insurance coverage, sending follow-up instructions, and managing prescription renewal requests. These manual processes were not only time-consuming but also prone to human error and occasional oversights.\n\nAfter analyzing their workflows and identifying automation opportunities, we proposed a comprehensive solution built around the Microsoft Power Platform. The solution focused on automating routine administrative tasks while ensuring compliance with healthcare regulations including HIPAA.\n\nWe implemented several key automation flows: appointment reminders via text and email, automated insurance verification processes that integrated with their practice management system, digital patient intake forms with secure data capture, structured prescription renewal request handling, and automated follow-up communication based on visit type. These automations were carefully designed to maintain the human touch where appropriate while eliminating repetitive manual work.\n\nA centralized Power App was created for staff to monitor automation processes and handle exceptions when needed. This gave them visibility into all automated workflows while focusing their attention only on cases requiring human intervention. We also implemented Power BI dashboards to track operational metrics and identify further optimization opportunities.\n\nThe results were remarkable. Administrative staff time was freed up for more meaningful patient interactions. No-show rates decreased significantly with the reliable reminder system. Insurance verification became much more efficient. Perhaps most importantly, the practice saw measurable improvements in patient satisfaction scores, particularly related to administrative interactions.",
    duration: "3 months",
    year: 2023,
    outcome: "Northside Medical Center now operates with significantly greater administrative efficiency, allowing their staff to focus on patient care rather than paperwork. The automation solution has scaled smoothly as the practice has grown, and they continue to identify new automation opportunities to further improve operations."
  }
];

export default function CaseStudyDetail() {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real application, this would fetch from an API
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const study = caseStudies.find(study => study.id === id) || null;
      setCaseStudy(study);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded w-full mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
        <p className="text-muted-foreground mb-8">The case study you're looking for doesn't exist or has been removed.</p>
        <Link href="/case-studies">
          <a className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-accent transition-colors">
            View All Case Studies
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <Link href="/case-studies">
          <a className="text-primary hover:underline inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Case Studies
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{caseStudy.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">{caseStudy.industry}</Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">{caseStudy.category === 'azure' ? 'Azure Cloud' : 
              caseStudy.category === 'identity' ? 'Identity & Access' : 
              caseStudy.category === 'm365' ? 'Microsoft 365' : 'Process Automation'}</Badge>
            {caseStudy.year && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">{caseStudy.year}</Badge>
            )}
          </div>
          
          <div className="mb-8">
            <img 
              src={caseStudy.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'} 
              alt={caseStudy.title} 
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-3 text-primary">The Challenge</h2>
              <p className="text-muted-foreground">{caseStudy.challenge}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3 text-primary">Our Solution</h2>
              <p className="text-muted-foreground">{caseStudy.solution}</p>
            </div>
            
            {caseStudy.fullDescription && (
              <div>
                <h2 className="text-xl font-bold mb-3 text-primary">Detailed Approach</h2>
                <p className="text-muted-foreground whitespace-pre-line">{caseStudy.fullDescription}</p>
              </div>
            )}
            
            <div>
              <h2 className="text-xl font-bold mb-3 text-primary">Results & Impact</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {caseStudy.results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </div>

            {caseStudy.outcome && (
              <div>
                <h2 className="text-xl font-bold mb-3 text-primary">Long-term Outcome</h2>
                <p className="text-muted-foreground">{caseStudy.outcome}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">Project Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium">{caseStudy.client}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p className="font-medium">{caseStudy.industry}</p>
                </div>
                
                {caseStudy.duration && (
                  <div>
                    <p className="text-sm text-muted-foreground">Project Duration</p>
                    <p className="font-medium">{caseStudy.duration}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-muted-foreground">Technologies Used</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {caseStudy.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {caseStudy.testimonial && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="relative">
                      <svg 
                        className="absolute -top-4 -left-2 h-8 w-8 text-primary/20" 
                        fill="currentColor" 
                        viewBox="0 0 32 32"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="pl-6 italic text-muted-foreground">"{caseStudy.testimonial.quote}"</p>
                      <p className="pl-6 mt-2 font-medium">{caseStudy.testimonial.author}</p>
                      <p className="pl-6 text-sm text-muted-foreground">{caseStudy.testimonial.position}</p>
                    </div>
                  </div>
                )}
                
                <Separator className="my-6" />
                
                <div>
                  <Button className="w-full bg-primary text-white hover:bg-accent transition-colors">
                    Discuss Your Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Ready to Transform Your Business?</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's discuss how our IT consultancy solutions can address your specific challenges and drive your business forward.
        </p>
        <div className="flex justify-center">
          <Button 
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }} 
            className="bg-primary text-white px-8 py-6 text-lg hover:bg-accent transition-colors"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}