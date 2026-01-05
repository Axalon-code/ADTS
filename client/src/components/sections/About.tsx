import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function About() {
  const expertiseList = [
    "Microsoft 365 & Azure administration and configuration",
    "Enterprise identity and access management solutions",
    "Business continuity, disaster recovery, and backup planning",
    "Robotic Process Automation (RPA) development",
    "IT infrastructure optimization and troubleshooting"
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 3xl:py-24 4xl:py-28 bg-transparent dark:bg-transparent">
      <div className="container-responsive">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-inter font-bold text-2xl xs:text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl mb-4 sm:mb-6 3xl:mb-8 text-white dark:text-white text-center">About Me</h2>
          <p className="text-base sm:text-lg 3xl:text-xl 4xl:text-2xl text-white dark:text-gray-300 mb-4 sm:mb-6 3xl:mb-8 text-center">
            I'm an independent IT consultant specializing in Microsoft technologies with extensive experience in designing, implementing, and optimizing cloud and hybrid solutions.
          </p>
          
          <Card className="mb-8 border-0 shadow-none bg-gradient-to-r from-blue-950 to-cyan-950 dark:bg-transparent">
            <CardContent className="p-6">
              <h3 className="font-inter font-semibold text-xl mb-4 text-white dark:text-white">My Expertise</h3>
              <ul className="space-y-3">
                {expertiseList.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-sky-400 dark:text-blue-500 mt-1 mr-3 h-5 w-5" />
                    <span className="text-white dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <a 
              href="https://www.linkedin.com/in/alexdevlyashevskiy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary dark:text-blue-500 font-medium hover:text-accent dark:hover:text-blue-400 transition-colors"
            >
              <i className="fab fa-linkedin mr-2"></i>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
