import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Certifications() {
  const skills = [
    "Cloud concepts",
    "Azure services",
    "Azure workloads",
    "Security and privacy in Azure",
    "Azure pricing and support"
  ];

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-[hsl(222,47%,11%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-4 dark:text-white">Certifications & Expertise</h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Industry-recognized qualifications that demonstrate my technical proficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Card className="bg-white dark:bg-[hsl(var(--service-card-bg))] rounded-lg shadow-lg overflow-hidden p-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" className="w-full h-auto">
              <rect width="800" height="400" fill="#002050"/>
              <text x="50" y="70" fontFamily="Arial" fontSize="40" fill="white" fontWeight="bold">Microsoft Certified</text>
              <text x="50" y="130" fontFamily="Arial" fontSize="40" fill="white">Azure Fundamentals</text>
              <text x="50" y="200" fontFamily="Arial" fontSize="25" fill="white">ALEX CHRISTIAN DEVLYASHEVSKIY</text>
              <text x="50" y="240" fontFamily="Arial" fontSize="16" fill="white">Has successfully completed the requirements to be recognized as a Microsoft Certified: Azure Fundamentals.</text>
              <text x="50" y="280" fontFamily="Arial" fontSize="16" fill="white">Date of achievement: April 07, 2020</text>
              <circle cx="650" cy="300" r="60" fill="#0078d7" stroke="white" strokeWidth="3"/>
              <text x="650" y="310" fontFamily="Arial" fontSize="20" fill="white" textAnchor="middle">AZ-900</text>
              <rect x="50" y="350" width="32" height="32" fill="#ffb900"/>
              <rect x="90" y="350" width="32" height="32" fill="#0078d7"/>
              <rect x="130" y="350" width="32" height="32" fill="#50bf00"/>
              <rect x="170" y="350" width="32" height="32" fill="#f37323"/>
            </svg>
          </Card>
          
          <div>
            <h3 className="font-inter font-semibold text-2xl mb-6 dark:text-white">Microsoft Azure Fundamentals</h3>
            <p className="text-muted-foreground dark:text-gray-300 mb-6">
              The Microsoft Certified: Azure Fundamentals certification validates my foundational knowledge of cloud services and how those services are provided with Microsoft Azure.
            </p>
            
            <div className="mb-8">
              <h4 className="font-inter font-medium text-lg mb-4 dark:text-white">Skills Validated:</h4>
              <ul className="space-y-3">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-certificate text-primary dark:text-blue-500 mt-1 mr-3"></i>
                    <span className="dark:text-gray-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-muted-foreground dark:text-gray-300">
              For more details about my complete professional background and additional certifications, please visit my LinkedIn profile.
            </p>
            
            <Button 
              asChild
              className="inline-flex items-center mt-6 bg-primary text-white px-6 py-3 hover:bg-accent transition-colors"
            >
              <a 
                href="https://www.linkedin.com/in/alexdevlyashevskiy/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin mr-2"></i>
                View LinkedIn Profile
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
