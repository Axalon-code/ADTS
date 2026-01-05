interface Terminology {
  term: string;
  explanation: string;
  category: "azure" | "identity" | "m365" | "automation" | "general" | "networking" | "security" | "hardware" | "backup";
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
  {
    term: "Azure Virtual Machine",
    explanation: "An on-demand, scalable computing resource in Azure that provides the flexibility of virtualization without having to buy and maintain physical hardware.",
    category: "azure"
  },
  {
    term: "Azure Blob Storage",
    explanation: "Microsoft's object storage solution for the cloud, optimized for storing massive amounts of unstructured data like text, images, or binary data.",
    category: "azure"
  },
  {
    term: "Azure Functions",
    explanation: "A serverless compute service that allows you to run event-triggered code without having to explicitly provision or manage infrastructure.",
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
  {
    term: "SSO",
    explanation: "Single Sign-On - an authentication scheme that allows a user to log in with a single ID to any of several related, yet independent, software systems.",
    category: "identity"
  },
  {
    term: "RBAC",
    explanation: "Role-Based Access Control - a method of regulating access to computer or network resources based on the roles of individual users within an organization.",
    category: "identity"
  },
  {
    term: "SAML",
    explanation: "Security Assertion Markup Language - an open standard for exchanging authentication and authorization data between parties, commonly used for web-based SSO.",
    category: "identity"
  },
  {
    term: "OAuth",
    explanation: "An open standard for access delegation, commonly used to grant websites or applications limited access to user information without exposing passwords.",
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
  {
    term: "Microsoft Defender",
    explanation: "A comprehensive security solution that provides threat protection across endpoints, email, identities, and cloud applications within the Microsoft 365 ecosystem.",
    category: "m365"
  },
  {
    term: "Power BI",
    explanation: "A business analytics service by Microsoft that provides interactive visualizations and business intelligence capabilities with a simple interface for creating reports and dashboards.",
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
  {
    term: "RPA",
    explanation: "Robotic Process Automation - technology that uses software robots to automate repetitive, rule-based digital tasks such as data entry, form processing, and system integration.",
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
    category: "networking"
  },
  {
    term: "SSL/TLS",
    explanation: "Secure Sockets Layer/Transport Layer Security - encryption protocols designed to secure communications between web servers and browsers.",
    category: "networking"
  },
  {
    term: "API",
    explanation: "Application Programming Interface - a set of definitions and protocols for building and integrating application software, allowing different applications to communicate with each other.",
    category: "general"
  },
  {
    term: "IP Address",
    explanation: "Internet Protocol Address - a unique string of numbers separated by periods that identifies each computer using the Internet Protocol to communicate over a network.",
    category: "networking"
  },
  {
    term: "DNS",
    explanation: "Domain Name System - the internet's phonebook that translates human-readable domain names (like www.example.com) into IP addresses that computers use to communicate.",
    category: "networking"
  },
  {
    term: "DHCP",
    explanation: "Dynamic Host Configuration Protocol - a network management protocol that automatically assigns IP addresses and other network configuration parameters to devices on a network.",
    category: "networking"
  },
  {
    term: "SLA",
    explanation: "Service Level Agreement - a contract between a service provider and a customer that defines the level of service expected, including uptime guarantees and response times.",
    category: "general"
  },
  {
    term: "Patch Management",
    explanation: "The process of identifying, acquiring, installing, and verifying software updates (patches) to fix vulnerabilities, bugs, or improve functionality in operating systems and applications.",
    category: "general"
  },
  {
    term: "ITIL",
    explanation: "IT Infrastructure Library - a set of best practices for delivering IT services, providing a framework for IT service management (ITSM) that focuses on aligning IT with business needs.",
    category: "general"
  },
  {
    term: "ITSM",
    explanation: "IT Service Management - how IT teams manage the end-to-end delivery of IT services through people, processes, and technology, encompassing design, creation, delivery, and support.",
    category: "general"
  },
  {
    term: "Service Desk",
    explanation: "A single point of contact between IT and users that handles incidents, service requests, and communication. More strategic than a help desk, following ITIL principles.",
    category: "general"
  },
  {
    term: "Help Desk",
    explanation: "A first point of contact for end users needing technical support, focused primarily on break-fix troubleshooting and resolving immediate technical issues.",
    category: "general"
  },
  {
    term: "Incident",
    explanation: "An unplanned interruption to an IT service or reduction in service quality that requires immediate attention to restore normal operations.",
    category: "general"
  },
  {
    term: "Incident Management",
    explanation: "The process of managing the lifecycle of all incidents to restore normal service operation as quickly as possible while minimizing business impact.",
    category: "general"
  },
  {
    term: "Problem Management",
    explanation: "The process of identifying root causes of recurring incidents and implementing permanent solutions to prevent future occurrences.",
    category: "general"
  },
  {
    term: "Change Management",
    explanation: "A systematic approach to managing all changes to IT infrastructure and services, controlling risk and minimizing disruptions to business operations.",
    category: "general"
  },
  {
    term: "Service Request",
    explanation: "A formal request from a user for something to be provided, such as access to a service, information, advice, or a standard change like a password reset.",
    category: "general"
  },
  {
    term: "Escalation",
    explanation: "The process of transferring an issue to a higher level of support or management when it cannot be resolved at the current level or requires specialist expertise.",
    category: "general"
  },
  {
    term: "First Line Support",
    explanation: "The initial point of contact for IT issues, handling basic inquiries, troubleshooting, and logging tickets before escalating complex issues to higher tiers.",
    category: "general"
  },
  {
    term: "Second Line Support",
    explanation: "Specialized technical support that handles more complex issues escalated from first line, with deeper expertise in specific systems or applications.",
    category: "general"
  },
  {
    term: "Third Line Support",
    explanation: "Expert-level support for the most complex technical problems, often involving vendor specialists, developers, or architects with deep system knowledge.",
    category: "general"
  },
  {
    term: "Ticket",
    explanation: "A record of a reported issue, service request, or task in a service desk system, tracking its status from creation to resolution.",
    category: "general"
  },
  {
    term: "Ticketing System",
    explanation: "Software used to record, track, and manage user requests and incidents, ensuring proper follow-up, prioritization, and resolution.",
    category: "general"
  },
  {
    term: "Knowledge Base",
    explanation: "A centralized repository of information containing FAQs, how-to guides, troubleshooting steps, and documentation to help users and support staff resolve issues.",
    category: "general"
  },
  {
    term: "Self-Service Portal",
    explanation: "A website or application enabling users to perform common tasks independently, such as password resets, ticket submission, and accessing knowledge articles.",
    category: "general"
  },
  {
    term: "Service Catalog",
    explanation: "A structured list of all IT services available to users, describing each service, its features, and how to request it.",
    category: "general"
  },
  {
    term: "Configuration Item (CI)",
    explanation: "Any component that needs to be managed to deliver an IT service, including hardware, software, documentation, and people.",
    category: "general"
  },
  {
    term: "CMDB",
    explanation: "Configuration Management Database - a repository that stores information about all configuration items and their relationships within an IT environment.",
    category: "general"
  },
  {
    term: "Asset Management",
    explanation: "The process of tracking and managing IT assets throughout their lifecycle, from procurement to disposal, including hardware, software, and licenses.",
    category: "general"
  },
  {
    term: "KPI",
    explanation: "Key Performance Indicator - a measurable value that demonstrates how effectively an IT service or team is achieving its objectives.",
    category: "general"
  },
  {
    term: "MTTR",
    explanation: "Mean Time To Repair - the average time taken to repair a failed component or restore a service, a key metric for measuring support effectiveness.",
    category: "general"
  },
  {
    term: "MTBF",
    explanation: "Mean Time Between Failures - the average time between system failures, used to measure reliability and predict maintenance needs.",
    category: "general"
  },
  {
    term: "Priority",
    explanation: "A classification that determines the order in which incidents or requests are addressed, typically based on a combination of impact and urgency.",
    category: "general"
  },
  {
    term: "Urgency",
    explanation: "A measure of how quickly an issue needs to be resolved based on the time available before it significantly impacts business operations.",
    category: "general"
  },
  {
    term: "Impact",
    explanation: "A measure of the effect an incident has on business operations, typically categorized by the number of users or critical systems affected.",
    category: "general"
  },
  {
    term: "Workaround",
    explanation: "A temporary solution that reduces or eliminates the impact of an incident or problem until a permanent fix can be implemented.",
    category: "general"
  },
  {
    term: "Known Error",
    explanation: "A problem that has been analysed and has a documented root cause or workaround, recorded in a known error database for future reference.",
    category: "general"
  },
  {
    term: "Root Cause Analysis",
    explanation: "A systematic process for identifying the underlying causes of incidents or problems to prevent recurrence and improve service quality.",
    category: "general"
  },
  {
    term: "Remote Support",
    explanation: "The ability to access and troubleshoot a user's computer or device from a different location using remote desktop tools and screen sharing.",
    category: "general"
  },
  {
    term: "Onboarding",
    explanation: "The process of setting up new employees with the IT equipment, accounts, access rights, and training they need to perform their role.",
    category: "general"
  },
  {
    term: "Offboarding",
    explanation: "The IT process of removing access, recovering equipment, and securing data when an employee leaves an organisation.",
    category: "general"
  },

  // CompTIA A+ Hardware Terms
  {
    term: "BIOS",
    explanation: "Basic Input/Output System - firmware that performs hardware initialization during the booting process and provides runtime services for operating systems and programs.",
    category: "hardware"
  },
  {
    term: "UEFI",
    explanation: "Unified Extensible Firmware Interface - a modern replacement for BIOS that provides a standard interface between operating systems and platform firmware, supporting larger hard drives and faster boot times.",
    category: "hardware"
  },
  {
    term: "POST",
    explanation: "Power-On Self-Test - a diagnostic testing sequence run by a computer's BIOS when the machine is powered on, checking hardware components before loading the operating system.",
    category: "hardware"
  },
  {
    term: "RAM",
    explanation: "Random Access Memory - the main memory in a computer used to store data and programs currently in use, providing fast read and write access but losing data when power is removed.",
    category: "hardware"
  },
  {
    term: "SSD",
    explanation: "Solid State Drive - a storage device that uses flash memory to store data, offering faster read/write speeds, lower power consumption, and greater durability than traditional hard disk drives.",
    category: "hardware"
  },
  {
    term: "HDD",
    explanation: "Hard Disk Drive - a traditional storage device that uses spinning magnetic platters to store data, offering larger capacities at lower costs but slower speeds than SSDs.",
    category: "hardware"
  },
  {
    term: "NVMe",
    explanation: "Non-Volatile Memory Express - a high-performance storage protocol designed specifically for SSDs, providing significantly faster data transfer speeds than older SATA connections.",
    category: "hardware"
  },
  {
    term: "CPU",
    explanation: "Central Processing Unit - the primary component of a computer that performs most of the processing, executing instructions from programs and performing calculations.",
    category: "hardware"
  },
  {
    term: "GPU",
    explanation: "Graphics Processing Unit - a specialized processor designed to accelerate graphics rendering, also used for parallel processing tasks like machine learning and video encoding.",
    category: "hardware"
  },
  {
    term: "Motherboard",
    explanation: "The main circuit board of a computer that connects all components including the CPU, RAM, storage devices, and expansion cards, providing power and communication pathways.",
    category: "hardware"
  },
  {
    term: "PSU",
    explanation: "Power Supply Unit - a hardware component that converts AC electricity from the wall outlet to DC power for the internal components of a computer.",
    category: "hardware"
  },
  {
    term: "TPM",
    explanation: "Trusted Platform Module - a specialized chip on a device that stores security keys and performs cryptographic operations, used for disk encryption and secure boot processes.",
    category: "hardware"
  },
  {
    term: "ACPI",
    explanation: "Advanced Configuration and Power Interface - an open standard that operating systems can use to discover and configure computer hardware, and to manage power states.",
    category: "hardware"
  },
  {
    term: "USB",
    explanation: "Universal Serial Bus - a standard for connecting devices to computers, supporting data transfer and power delivery for peripherals like keyboards, mice, and storage devices.",
    category: "hardware"
  },
  {
    term: "HDMI",
    explanation: "High-Definition Multimedia Interface - a standard for transmitting uncompressed video and audio data from a source device to a display, commonly used for monitors and TVs.",
    category: "hardware"
  },
  {
    term: "DisplayPort",
    explanation: "A digital display interface developed to replace VGA and DVI, supporting high-resolution displays and multiple monitors through daisy-chaining.",
    category: "hardware"
  },

  // CompTIA Network+ Terms
  {
    term: "OSI Model",
    explanation: "Open Systems Interconnection Model - a conceptual framework that describes seven layers of network communication: Physical, Data Link, Network, Transport, Session, Presentation, and Application.",
    category: "networking"
  },
  {
    term: "TCP/IP",
    explanation: "Transmission Control Protocol/Internet Protocol - the fundamental communication protocols of the internet that define how data is packaged, addressed, transmitted, and received.",
    category: "networking"
  },
  {
    term: "Router",
    explanation: "A network device that forwards data packets between computer networks, operating at OSI Layer 3 and making routing decisions based on IP addresses.",
    category: "networking"
  },
  {
    term: "Switch",
    explanation: "A network device that connects devices within a local network, operating at OSI Layer 2 and forwarding traffic based on MAC addresses using dedicated hardware (ASIC).",
    category: "networking"
  },
  {
    term: "Firewall",
    explanation: "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules, creating a barrier between trusted and untrusted networks.",
    category: "networking"
  },
  {
    term: "LAN",
    explanation: "Local Area Network - a computer network that interconnects computers within a limited area such as a home, school, or office building, typically offering high-speed connections.",
    category: "networking"
  },
  {
    term: "WAN",
    explanation: "Wide Area Network - a telecommunications network that extends over a large geographical area, connecting multiple LANs together, often using leased lines or internet connections.",
    category: "networking"
  },
  {
    term: "VLAN",
    explanation: "Virtual Local Area Network - a logical grouping of network devices that appear to be on the same LAN regardless of their physical location, improving security and network management.",
    category: "networking"
  },
  {
    term: "Subnet",
    explanation: "A logical subdivision of an IP network that divides a larger network into smaller, more manageable segments, improving performance and security.",
    category: "networking"
  },
  {
    term: "NAT",
    explanation: "Network Address Translation - a method of remapping IP addresses by modifying packet headers, commonly used to allow multiple devices on a private network to share a single public IP address.",
    category: "networking"
  },
  {
    term: "MAC Address",
    explanation: "Media Access Control Address - a unique hardware identifier assigned to network interface cards, used for communication within a network segment at the data link layer.",
    category: "networking"
  },
  {
    term: "Access Point",
    explanation: "A networking device that creates a wireless local area network (WLAN), acting as a bridge between wired and wireless networks to extend network coverage.",
    category: "networking"
  },
  {
    term: "PoE",
    explanation: "Power over Ethernet - a technology that allows electrical power to be carried over data cables along with network data, eliminating the need for separate power supplies for devices like IP cameras and access points.",
    category: "networking"
  },
  {
    term: "MTU",
    explanation: "Maximum Transmission Unit - the largest size packet or frame that can be sent in a single network layer transaction, typically 1500 bytes for Ethernet networks.",
    category: "networking"
  },
  {
    term: "Latency",
    explanation: "The time delay between a request being sent and a response being received, often measured in milliseconds. Lower latency means faster, more responsive network communication.",
    category: "networking"
  },
  {
    term: "Bandwidth",
    explanation: "The maximum rate of data transfer across a network path, typically measured in bits per second (bps), megabits (Mbps), or gigabits (Gbps).",
    category: "networking"
  },
  {
    term: "QoS",
    explanation: "Quality of Service - a set of technologies that manage network traffic to reduce latency, packet loss, and jitter, prioritizing critical applications like voice and video.",
    category: "networking"
  },
  {
    term: "Load Balancer",
    explanation: "A device or software that distributes network traffic across multiple servers to ensure no single server bears too much load, improving reliability and performance.",
    category: "networking"
  },

  // CompTIA Security+ Terms
  {
    term: "CIA Triad",
    explanation: "Confidentiality, Integrity, Availability - the three fundamental principles of information security that guide policies and controls to protect data and systems.",
    category: "security"
  },
  {
    term: "Encryption",
    explanation: "The process of converting readable data into an encoded format that can only be read by someone with the decryption key, protecting information from unauthorized access.",
    category: "security"
  },
  {
    term: "Malware",
    explanation: "Malicious software designed to harm, exploit, or otherwise compromise computer systems, including viruses, worms, trojans, ransomware, and spyware.",
    category: "security"
  },
  {
    term: "Ransomware",
    explanation: "A type of malware that encrypts a victim's files and demands payment (ransom) for the decryption key, often spreading through phishing emails or exploited vulnerabilities.",
    category: "security"
  },
  {
    term: "Phishing",
    explanation: "A social engineering attack where attackers send fraudulent messages designed to trick people into revealing sensitive information or installing malware.",
    category: "security"
  },
  {
    term: "Social Engineering",
    explanation: "Psychological manipulation techniques used to trick people into divulging confidential information or performing actions that compromise security.",
    category: "security"
  },
  {
    term: "Penetration Testing",
    explanation: "An authorized simulated cyberattack on a computer system to evaluate its security, identifying vulnerabilities before malicious attackers can exploit them.",
    category: "security"
  },
  {
    term: "Vulnerability",
    explanation: "A weakness in a system, application, or process that could be exploited by a threat actor to gain unauthorized access or cause damage.",
    category: "security"
  },
  {
    term: "Patch",
    explanation: "A software update released to fix security vulnerabilities, bugs, or improve functionality in operating systems and applications.",
    category: "security"
  },
  {
    term: "IDS/IPS",
    explanation: "Intrusion Detection System / Intrusion Prevention System - security tools that monitor network traffic for suspicious activity, with IPS having the ability to block detected threats.",
    category: "security"
  },
  {
    term: "SIEM",
    explanation: "Security Information and Event Management - software that collects and analyzes security data from across an organization's systems to detect threats and support incident response.",
    category: "security"
  },
  {
    term: "Endpoint Protection",
    explanation: "Security solutions that protect individual devices (endpoints) like computers and mobile devices from threats, including antivirus, anti-malware, and device encryption.",
    category: "security"
  },
  {
    term: "DDoS",
    explanation: "Distributed Denial of Service - an attack that overwhelms a target system with traffic from multiple sources, making it unavailable to legitimate users.",
    category: "security"
  },
  {
    term: "Man-in-the-Middle",
    explanation: "An attack where the attacker secretly intercepts and potentially alters communication between two parties who believe they are communicating directly with each other.",
    category: "security"
  },
  {
    term: "Hashing",
    explanation: "A cryptographic function that converts data into a fixed-length string of characters, used to verify data integrity and securely store passwords.",
    category: "security"
  },
  {
    term: "Digital Certificate",
    explanation: "An electronic document that uses a digital signature to bind a public key with an identity, used to verify the authenticity of websites and encrypt communications.",
    category: "security"
  },
  {
    term: "PKI",
    explanation: "Public Key Infrastructure - a framework for managing digital certificates and public-key encryption, enabling secure electronic communication and identity verification.",
    category: "security"
  },
  {
    term: "Security Controls",
    explanation: "Safeguards or countermeasures to avoid, detect, or minimize security risks. Types include technical (firewalls), managerial (policies), operational (guards), and physical (locks).",
    category: "security"
  },
  {
    term: "Least Privilege",
    explanation: "A security principle that users and programs should only have the minimum permissions necessary to perform their required tasks, reducing potential damage from compromises.",
    category: "security"
  },
  {
    term: "Defense in Depth",
    explanation: "A security strategy that uses multiple layers of controls throughout an IT system, so if one layer fails, others continue to provide protection.",
    category: "security"
  },

  // Backup & Disaster Recovery Terms
  {
    term: "Backup",
    explanation: "Copies of data, applications, and system configurations stored on alternate media to protect against data loss from hardware failures, accidents, or cyberattacks.",
    category: "backup"
  },
  {
    term: "Full Backup",
    explanation: "A complete copy of all selected data, providing the fastest restore time but requiring the most storage space and longest backup duration.",
    category: "backup"
  },
  {
    term: "Incremental Backup",
    explanation: "A backup that only copies data that has changed since the last backup of any type, requiring less storage but longer restore times as all increments must be applied.",
    category: "backup"
  },
  {
    term: "Differential Backup",
    explanation: "A backup that copies all data changed since the last full backup, requiring more storage than incremental but offering faster restores since only two backup sets are needed.",
    category: "backup"
  },
  {
    term: "RPO",
    explanation: "Recovery Point Objective - the maximum acceptable amount of data loss measured in time, determining how frequently backups must be performed.",
    category: "backup"
  },
  {
    term: "RTO",
    explanation: "Recovery Time Objective - the maximum acceptable time to restore systems and resume operations after a disaster, influencing recovery strategy and infrastructure investments.",
    category: "backup"
  },
  {
    term: "Disaster Recovery",
    explanation: "The policies, tools, and procedures for recovering critical technology infrastructure and systems following a natural or human-induced disaster.",
    category: "backup"
  },
  {
    term: "Business Continuity",
    explanation: "The capability of an organization to continue delivering products or services at acceptable levels following a disruptive incident, encompassing planning and preparation.",
    category: "backup"
  },
  {
    term: "DRP",
    explanation: "Disaster Recovery Plan - a documented, structured approach describing how an organization can quickly resume work after an unplanned incident.",
    category: "backup"
  },
  {
    term: "Hot Site",
    explanation: "A fully operational offsite data center with real-time data replication, ready for immediate failover. Most expensive but provides fastest recovery.",
    category: "backup"
  },
  {
    term: "Warm Site",
    explanation: "A backup facility with hardware and network connectivity in place but requiring data restoration and software configuration before becoming operational.",
    category: "backup"
  },
  {
    term: "Cold Site",
    explanation: "A backup facility with basic infrastructure (power, cooling, network) but no equipment installed, requiring the longest time to become operational but lowest cost.",
    category: "backup"
  },
  {
    term: "Failover",
    explanation: "The automatic or manual switching to a redundant or standby system when the primary system fails, ensuring continuous availability of services.",
    category: "backup"
  },
  {
    term: "Failback",
    explanation: "The process of returning operations from a backup system to the original primary system after it has been repaired or restored.",
    category: "backup"
  },
  {
    term: "Snapshot",
    explanation: "A point-in-time copy of data that captures the state of a system at a specific moment, useful for quick recovery but typically stored short-term.",
    category: "backup"
  },
  {
    term: "Replication",
    explanation: "The process of copying data from one location to another in real-time or near-real-time, ensuring data availability at multiple sites.",
    category: "backup"
  },
  {
    term: "Data Mirroring",
    explanation: "The practice of creating an exact copy of data on a separate storage device simultaneously, providing real-time redundancy for critical information.",
    category: "backup"
  },
  {
    term: "RAID",
    explanation: "Redundant Array of Independent Disks - a data storage technology that combines multiple disk drives to provide redundancy and/or improved performance.",
    category: "backup"
  },
  {
    term: "3-2-1 Backup Rule",
    explanation: "A backup best practice recommending keeping 3 copies of data, on 2 different types of storage media, with 1 copy stored offsite.",
    category: "backup"
  },
  {
    term: "DRaaS",
    explanation: "Disaster Recovery as a Service - a cloud-based service that provides backup and recovery of critical systems and data, managed by a third-party provider.",
    category: "backup"
  },
  {
    term: "BIA",
    explanation: "Business Impact Analysis - a process that identifies and evaluates the potential effects of an interruption to critical business operations, helping prioritize recovery efforts.",
    category: "backup"
  },
  {
    term: "High Availability",
    explanation: "A system design approach that ensures a certain level of operational performance and uptime, typically measured as a percentage (e.g., 99.99% uptime).",
    category: "backup"
  },
  {
    term: "Single Point of Failure",
    explanation: "A component in a system whose failure would cause the entire system to fail, a critical consideration in disaster recovery and high availability planning.",
    category: "backup"
  },
  {
    term: "Redundancy",
    explanation: "The duplication of critical components or functions to increase reliability and availability, ensuring continued operation if one component fails.",
    category: "backup"
  },
  {
    term: "Recovery Drill",
    explanation: "A planned exercise to test disaster recovery procedures, verify backup integrity, and train staff on recovery processes before an actual emergency occurs.",
    category: "backup"
  },
  {
    term: "Data Retention",
    explanation: "Policies defining how long backup data is kept before deletion, balancing storage costs, compliance requirements, and recovery needs.",
    category: "backup"
  },
  {
    term: "Air Gap",
    explanation: "A security measure where a computer or network is physically isolated from unsecured networks, protecting backup data from network-based attacks like ransomware.",
    category: "backup"
  },
  {
    term: "Immutable Backup",
    explanation: "Backup data that cannot be modified, encrypted, or deleted for a specified retention period, providing protection against ransomware and accidental deletion.",
    category: "backup"
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
