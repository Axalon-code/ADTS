import React from 'react';
import { processTextWithTooltips } from '@/utils/tooltipHelper';
import TerminologyTooltip from '@/components/TerminologyTooltip';

export default function TooltipExample() {
  // Sample text with IT terminology for demonstration
  const sampleText = `
    Microsoft Azure offers Infrastructure as a Service (IaaS) and Platform as a Service (PaaS) solutions 
    that can be secured with proper identity management. Multi-Factor Authentication (MFA) is a critical 
    component of a Zero Trust security model. Privileged Identity Management (PIM) helps organizations 
    control access to important resources.
    
    Microsoft 365 includes services like SharePoint, Exchange Online, and Microsoft Teams to enhance 
    productivity. OneDrive for Business provides cloud storage solutions while Intune helps manage 
    devices securely.
    
    IT automation can be achieved through tools like PowerShell and Azure Automation, which significantly 
    reduces manual work. The Microsoft Graph API enables interaction with various Microsoft services 
    programmatically.
  `;

  // Another sample focusing on general IT terms
  const generalITText = `
    Organizations face risks when using systems that have reached End of Life (EOL). Setting up a 
    Virtual Private Network (VPN) can enhance security for remote workers. Proper SSL/TLS 
    implementation is important for securing web communications. Understanding Application 
    Programming Interfaces (APIs) is essential for modern IT integration.
  `;

  return (
    <section id="tooltip-example" className="py-16 bg-gradient-to-tr from-[#0000BD]/90 to-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Interactive IT Terminology System
          </h2>
          
          <p className="text-center mb-12 text-gray-600 dark:text-gray-400">
            Hover over or tap any highlighted technical term to see a simple explanation. 
            This feature makes complex IT concepts more accessible to everyone.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary dark:text-[#0066FF]">
              Microsoft Cloud Services
            </h3>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4 leading-relaxed">
                {processTextWithTooltips(sampleText, { maxOccurrences: 1 })}
              </p>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Hover over or tap the underlined terms to see explanations
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary dark:text-[#0066FF]">
              General IT Security Concepts
            </h3>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4 leading-relaxed">
                {processTextWithTooltips(generalITText, { 
                  maxOccurrences: 1,
                  onlyCategories: ['general'] 
                })}
              </p>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Example Individual Terms:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <TerminologyTooltip 
                    term="2FA" 
                    explanation="Two-Factor Authentication - a security method that requires two forms of identification before granting access to resources or accounts, typically something you know (password) and something you have (mobile device)."
                  >
                    Two-Factor Authentication (2FA)
                  </TerminologyTooltip>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <TerminologyTooltip 
                    term="Azure Resource Group" 
                    explanation="A container that holds related resources for an Azure solution, organizing resources like virtual machines, storage accounts, and networks."
                  >
                    Azure Resource Group
                  </TerminologyTooltip>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <TerminologyTooltip 
                    term="Logic Apps" 
                    explanation="A cloud service that helps you schedule, automate, and orchestrate tasks, business processes, and workflows when you need to integrate apps, data, systems, and services."
                  >
                    Logic Apps
                  </TerminologyTooltip>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <TerminologyTooltip 
                    term="IP Address" 
                    explanation="Internet Protocol Address - a unique string of numbers separated by periods that identifies each computer using the Internet Protocol to communicate over a network."
                  >
                    IP Address
                  </TerminologyTooltip>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 text-center">
              <a href="/glossary" className="inline-flex items-center text-primary dark:text-[#0066FF] hover:underline font-medium">
                View Complete IT Terminology Glossary
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}