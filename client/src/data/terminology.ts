interface Terminology {
  term: string;
  explanation: string;
  category: "azure" | "identity" | "m365" | "automation" | "general";
}

export const terminologyData: Terminology[] = [
  // Azure related terms
  {
    term: "Azure Active Directory",
    explanation: "Microsoft's cloud-based identity and access management service, which helps users sign in and access resources in external and internal applications.",
    category: "azure"
  },
  {
    term: "IaaS",
    explanation: "Infrastructure as a Service - a cloud computing offering that provides virtualized computing resources over the internet, such as virtual machines, storage, and networking.",
    category: "azure"
  },
  {
    term: "PaaS",
    explanation: "Platform as a Service - a cloud computing offering that provides a platform allowing customers to develop, run, and manage applications without the complexity of building and maintaining the infrastructure.",
    category: "azure"
  },
  {
    term: "SaaS",
    explanation: "Software as a Service - a software licensing and delivery model in which software is licensed on a subscription basis and is centrally hosted by the provider.",
    category: "azure"
  },
  {
    term: "Azure Resource Group",
    explanation: "A container that holds related resources for an Azure solution, organizing resources like virtual machines, storage accounts, and networks.",
    category: "azure"
  },
  
  // Identity Management terms
  {
    term: "PIM",
    explanation: "Privileged Identity Management - a service in Microsoft Entra ID that enables you to manage, control, and monitor access to important resources in your organization.",
    category: "identity"
  },
  {
    term: "2FA",
    explanation: "Two-Factor Authentication - a security method that requires two forms of identification before granting access to resources or accounts, typically something you know (password) and something you have (mobile device).",
    category: "identity"
  },
  {
    term: "MFA",
    explanation: "Multi-Factor Authentication - a security system that requires more than one method of authentication from independent categories of credentials to verify the user's identity for a login or other transaction.",
    category: "identity"
  },
  {
    term: "Zero Trust",
    explanation: "A security concept based on the principle of 'never trust, always verify', requiring strict identity verification for every person and device trying to access resources, regardless of whether they're inside or outside the network perimeter.",
    category: "identity"
  },
  {
    term: "Conditional Access",
    explanation: "A capability of Azure AD that enables you to enforce controls on access to applications in your environment based on specific conditions like user, device, location, and more.",
    category: "identity"
  },
  
  // Microsoft 365 terms
  {
    term: "SharePoint",
    explanation: "A collaboration platform that integrates with Microsoft Office, used for document management, storage, and collaboration.",
    category: "m365"
  },
  {
    term: "Exchange Online",
    explanation: "Microsoft's hosted email solution that provides businesses with access to Exchange Server features without maintaining the server infrastructure.",
    category: "m365"
  },
  {
    term: "Microsoft Teams",
    explanation: "A collaboration app that helps your team stay organized and have conversations all in one place, with features for chat, video meetings, and file collaboration.",
    category: "m365"
  },
  {
    term: "OneDrive for Business",
    explanation: "Microsoft's cloud storage service for businesses, allowing staff to store, sync, and share work files.",
    category: "m365"
  },
  {
    term: "Intune",
    explanation: "A cloud-based service for mobile device management (MDM) and mobile application management (MAM), helping organizations manage access to corporate data.",
    category: "m365"
  },
  
  // IT Automation terms
  {
    term: "PowerShell",
    explanation: "A cross-platform task automation and configuration management framework from Microsoft, consisting of a command-line shell and scripting language.",
    category: "automation"
  },
  {
    term: "Microsoft Graph API",
    explanation: "A RESTful web API that enables you to access Microsoft Cloud service resources like user data, files, messages, and more.",
    category: "automation"
  },
  {
    term: "Azure Automation",
    explanation: "A cloud service that allows you to automate frequent, time-consuming, and error-prone cloud management tasks.",
    category: "automation"
  },
  {
    term: "Logic Apps",
    explanation: "A cloud service that helps you schedule, automate, and orchestrate tasks, business processes, and workflows when you need to integrate apps, data, systems, and services.",
    category: "automation"
  },
  {
    term: "Power Automate",
    explanation: "A service that helps you create automated workflows between your favorite apps and services to synchronize files, get notifications, collect data, and more.",
    category: "automation"
  },
  
  // General IT terms
  {
    term: "EOL",
    explanation: "End of Life - a term used to indicate that a product or service has reached the end of its useful life and is no longer supported by the vendor.",
    category: "general"
  },
  {
    term: "VPN",
    explanation: "Virtual Private Network - a service that encrypts your internet connection and disguises your online identity, allowing you to use public Wi-Fi hotspots safely.",
    category: "general"
  },
  {
    term: "SSL/TLS",
    explanation: "Secure Sockets Layer/Transport Layer Security - encryption protocols designed to secure communications between web servers and browsers.",
    category: "general"
  },
  {
    term: "API",
    explanation: "Application Programming Interface - a set of definitions and protocols for building and integrating application software, allowing different applications to communicate with each other.",
    category: "general"
  },
  {
    term: "IP Address",
    explanation: "Internet Protocol Address - a unique string of numbers separated by periods that identifies each computer using the Internet Protocol to communicate over a network.",
    category: "general"
  }
];

export function getTermByName(termName: string): Terminology | undefined {
  return terminologyData.find(term => 
    term.term.toLowerCase() === termName.toLowerCase()
  );
}

export function getTermsByCategory(category: Terminology["category"]): Terminology[] {
  return terminologyData.filter(term => term.category === category);
}

export function getAllTerms(): Terminology[] {
  return terminologyData;
}