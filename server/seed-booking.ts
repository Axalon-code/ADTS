import { services, availabilitySlots, monthlyPackages } from "@shared/schema";
import { db } from "./db";
import { pool } from "./db";
import { log } from "./vite";
import { eq } from "drizzle-orm";

/**
 * Ensure the monthly_packages table exists (for production database sync)
 */
async function ensureMonthlyPackagesTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS monthly_packages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price TEXT NOT NULL,
        billing_period TEXT NOT NULL DEFAULT 'per month',
        features TEXT[] NOT NULL,
        category TEXT NOT NULL,
        most_popular BOOLEAN NOT NULL DEFAULT false,
        tier TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true
      )
    `);
  } catch (error) {
    console.error("Error ensuring monthly_packages table exists:", error);
  }
}

/**
 * All services offered by ADTS (exported for use in admin sync endpoint)
 */
export const allServices = [
  // Azure Services
  {
    name: "Microsoft Azure Consultation",
    description: "Comprehensive consultation on Azure cloud services, infrastructure planning, and implementation strategy.",
    category: "azure",
    duration: 60,
    price: 4000, // £40/hr
    isActive: true
  },
  {
    name: "Azure Migration Assessment",
    description: "Detailed assessment of your current infrastructure and recommendations for migrating to Azure cloud.",
    category: "azure",
    duration: 120,
    price: 6000, // £60/hr
    isActive: true
  },
  {
    name: "Azure Cost Optimization",
    description: "Review and optimization of your Azure spending with recommendations for cost savings.",
    category: "azure",
    duration: 90,
    price: 7000, // £70/hr
    isActive: true
  },
  {
    name: "Azure Security Review",
    description: "Comprehensive security review of your Azure environment with actionable recommendations.",
    category: "azure",
    duration: 120,
    price: 8000, // £80/hr
    isActive: true
  },
  // Identity & Access Management
  {
    name: "Identity & Access Management Review",
    description: "Review of your current IAM setup with recommendations for security enhancements using Microsoft Entra ID.",
    category: "identity",
    duration: 90,
    price: 8000, // £80/hr
    isActive: true
  },
  {
    name: "Privileged Identity Management Setup",
    description: "Implementation of Microsoft Entra Privileged Identity Management for secure just-in-time access.",
    category: "identity",
    duration: 120,
    price: 6000, // £60/hr
    isActive: true
  },
  {
    name: "Conditional Access Setup",
    description: "Design and implementation of Conditional Access policies for secure access to your resources.",
    category: "identity",
    duration: 90,
    price: 7000, // £70/hr
    isActive: true
  },
  {
    name: "Single Sign-On Configuration",
    description: "Configure Single Sign-On (SSO) for your applications using Microsoft Entra ID.",
    category: "identity",
    duration: 60,
    price: 6000, // £60/hr
    isActive: true
  },
  // Microsoft 365
  {
    name: "Microsoft 365 Admin Training",
    description: "Hands-on training for your IT staff on Microsoft 365 administration best practices.",
    category: "m365",
    duration: 180,
    price: 8000, // £80/hr
    isActive: true
  },
  {
    name: "Microsoft 365 Security Assessment",
    description: "Comprehensive assessment of your Microsoft 365 tenant's security posture with actionable recommendations.",
    category: "m365",
    duration: 90,
    price: 9000, // £90/hr
    isActive: true
  },
  {
    name: "SharePoint & Teams Setup",
    description: "Design and implementation of SharePoint sites and Microsoft Teams for your organization.",
    category: "m365",
    duration: 120,
    price: 6000, // £60/hr
    isActive: true
  },
  {
    name: "Microsoft Intune Setup",
    description: "Mobile device management and endpoint protection using Microsoft Intune.",
    category: "m365",
    duration: 90,
    price: 7000, // £70/hr
    isActive: true
  },
  // Exchange
  {
    name: "Microsoft Exchange Administration",
    description: "Expert administration and troubleshooting of Microsoft Exchange Online or on-premises.",
    category: "exchange",
    duration: 60,
    price: 5000, // £50/hr
    isActive: true
  },
  {
    name: "Exchange Migration Planning",
    description: "Planning and execution strategy for migrating to Exchange Online.",
    category: "exchange",
    duration: 120,
    price: 6000, // £60/hr
    isActive: true
  },
  {
    name: "Exchange Security & Compliance",
    description: "Security hardening and compliance configuration for Exchange environments.",
    category: "exchange",
    duration: 90,
    price: 7000, // £70/hr
    isActive: true
  },
  // Licensing
  {
    name: "Microsoft 365 Licensing Review",
    description: "Review your current Microsoft 365 licensing to ensure optimal value and compliance.",
    category: "licensing",
    duration: 60,
    price: 4000, // £40/hr
    isActive: true
  },
  {
    name: "License Optimization Strategy",
    description: "Strategic planning to optimize your Microsoft licensing costs and coverage.",
    category: "licensing",
    duration: 90,
    price: 6000, // £60/hr
    isActive: true
  },
  {
    name: "Enterprise Agreement Consultation",
    description: "Expert guidance on Microsoft Enterprise Agreements and volume licensing.",
    category: "licensing",
    duration: 120,
    price: 8000, // £80/hr
    isActive: true
  },
  // Rewst Automation
  {
    name: "Rewst Consultation",
    description: "Initial consultation on Rewst automation platform capabilities and potential use cases for your MSP.",
    category: "automation",
    duration: 60,
    price: 5000, // £50/hr
    isActive: true
  },
  {
    name: "Rewst Implementation Planning",
    description: "Strategic planning for Rewst implementation including workflow design and integration mapping.",
    category: "automation",
    duration: 120,
    price: 7500, // £75/hr
    isActive: true
  },
  {
    name: "Rewst Standard Integration Setup",
    description: "Setup and configuration of standard Rewst integrations with your PSA, RMM, and other tools.",
    category: "automation",
    duration: 60,
    price: 10000, // £100/hr
    isActive: true
  },
  {
    name: "Rewst Backend Workflow Development",
    description: "Custom backend workflow development in Rewst for your specific automation needs.",
    category: "automation",
    duration: 60,
    price: 8000, // £80/hr
    isActive: true
  },
  {
    name: "Rewst UI/UX Form Development",
    description: "Design and development of custom Rewst forms with modern UI/UX for end-user interaction.",
    category: "automation",
    duration: 60,
    price: 8000, // £80/hr
    isActive: true
  },
  {
    name: "Rewst Custom Integration Development",
    description: "Development of custom integrations between Rewst and third-party applications or APIs.",
    category: "automation",
    duration: 60,
    price: 15000, // £150/hr
    isActive: true
  }
];

/**
 * All monthly service packages offered by ADTS (exported for use in admin sync endpoint)
 */
export const allMonthlyPackages = [
  // Azure Plans
  {
    name: "Azure Essentials",
    description: "Core Azure migration and management services for small businesses",
    price: "£500",
    billingPeriod: "per month",
    features: [
      "Initial Azure environment setup",
      "Basic workload migration (up to 5 VMs)",
      "Standard security configuration",
      "Monthly performance reports",
      "Email support with 24-hour response time"
    ],
    category: "azure",
    mostPopular: false,
    tier: "essential",
    isActive: true
  },
  {
    name: "Azure Business",
    description: "Comprehensive Azure solutions for growing organizations",
    price: "£1,250",
    billingPeriod: "per month",
    features: [
      "Complete Azure environment design and setup",
      "Advanced workload migration (up to 20 VMs)",
      "Enhanced security with threat monitoring",
      "Disaster recovery planning",
      "Weekly performance optimization",
      "Dedicated support with 8-hour response time"
    ],
    category: "azure",
    mostPopular: true,
    tier: "business",
    isActive: true
  },
  {
    name: "Azure Enterprise",
    description: "Advanced Azure cloud solutions with full management",
    price: "£2,500+",
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
    category: "azure",
    mostPopular: false,
    tier: "enterprise",
    isActive: true
  },
  // Identity Plans
  {
    name: "Identity Essentials",
    description: "Basic identity and access management for small teams",
    price: "£300",
    billingPeriod: "per month",
    features: [
      "Microsoft Entra ID setup and configuration",
      "Basic authentication policies",
      "Multi-factor authentication setup",
      "Standard access reviews",
      "Email support with 24-hour response time"
    ],
    category: "identity",
    mostPopular: false,
    tier: "essential",
    isActive: true
  },
  {
    name: "Identity Business",
    description: "Comprehensive identity management for mid-sized organizations",
    price: "£700",
    billingPeriod: "per month",
    features: [
      "Advanced Entra ID implementation",
      "Conditional access policies",
      "Privileged identity management",
      "Identity Protection configuration",
      "Quarterly security assessments",
      "Dedicated support with 8-hour response time"
    ],
    category: "identity",
    mostPopular: true,
    tier: "business",
    isActive: true
  },
  {
    name: "Identity Enterprise",
    description: "Enterprise-grade identity security and governance",
    price: "£1,500+",
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
    category: "identity",
    mostPopular: false,
    tier: "enterprise",
    isActive: true
  },
  // Microsoft 365 Plans
  {
    name: "M365 Essentials",
    description: "Basic Microsoft 365 setup and management",
    price: "£300",
    billingPeriod: "per month",
    features: [
      "Microsoft 365 tenant setup",
      "Email migration and configuration",
      "Basic security policies",
      "Standard Teams setup",
      "Email support with 24-hour response time"
    ],
    category: "m365",
    mostPopular: false,
    tier: "essential",
    isActive: true
  },
  {
    name: "M365 Business",
    description: "Comprehensive M365 management for business productivity",
    price: "£600",
    billingPeriod: "per month",
    features: [
      "Advanced M365 implementation",
      "Full data migration",
      "SharePoint and Teams optimization",
      "Enhanced security configuration",
      "Monthly admin training",
      "Dedicated support with 8-hour response time"
    ],
    category: "m365",
    mostPopular: true,
    tier: "business",
    isActive: true
  },
  {
    name: "M365 Enterprise",
    description: "Enterprise-grade Microsoft 365 solutions and governance",
    price: "£1,300+",
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
    category: "m365",
    mostPopular: false,
    tier: "enterprise",
    isActive: true
  },
  // Automation Plans
  {
    name: "Automation Essentials",
    description: "Basic process automation for small teams",
    price: "£400",
    billingPeriod: "per month",
    features: [
      "Process assessment and documentation",
      "Basic Power Automate flows",
      "Simple form automation",
      "Standard notification systems",
      "Email support with 24-hour response time"
    ],
    category: "automation",
    mostPopular: false,
    tier: "essential",
    isActive: true
  },
  {
    name: "Automation Business",
    description: "Comprehensive automation solutions for business efficiency",
    price: "£800",
    billingPeriod: "per month",
    features: [
      "Detailed workflow analysis",
      "Advanced Power Automate implementation",
      "Custom Power Apps development",
      "Process optimization",
      "Monthly usage reports",
      "Dedicated support with 8-hour response time"
    ],
    category: "automation",
    mostPopular: true,
    tier: "business",
    isActive: true
  },
  {
    name: "Automation Enterprise",
    description: "Enterprise-grade automation with custom development",
    price: "£1,600+",
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
    category: "automation",
    mostPopular: false,
    tier: "enterprise",
    isActive: true
  },
  // Tech Support Plans
  {
    name: "Support Essentials",
    description: "Remote IT support for small businesses",
    price: "£300",
    billingPeriod: "per month",
    features: [
      "Remote helpdesk support",
      "Email and phone support",
      "Basic troubleshooting",
      "Software installation assistance",
      "Response within 24 hours",
      "Price adjusts based on user count"
    ],
    category: "support",
    mostPopular: false,
    tier: "essential",
    isActive: true
  },
  {
    name: "Support Business",
    description: "Comprehensive IT support with proactive monitoring",
    price: "£600",
    billingPeriod: "per month",
    features: [
      "Unlimited remote support",
      "Proactive system monitoring",
      "Patch management",
      "Antivirus and security management",
      "Monthly health reports",
      "Response within 4 hours",
      "Price adjusts based on user count"
    ],
    category: "support",
    mostPopular: true,
    tier: "business",
    isActive: true
  },
  {
    name: "Support Enterprise",
    description: "Premium IT support with dedicated account management",
    price: "£1,200+",
    billingPeriod: "per month",
    features: [
      "24/7 priority support",
      "Dedicated account manager",
      "On-site support visits",
      "Advanced security monitoring",
      "Disaster recovery planning",
      "Quarterly strategy reviews",
      "Response within 1 hour",
      "Price adjusts based on user count"
    ],
    category: "support",
    mostPopular: false,
    tier: "enterprise",
    isActive: true
  }
];

/**
 * Seed initial services and availability slots
 * This function now ensures all services exist, adding any missing ones
 */
export async function seedBookingData() {
  try {
    log("Starting booking data seeding...");
    
    // Get existing services
    const existingServices = await db.select().from(services);
    const existingNames = new Set(existingServices.map(s => s.name));
    
    // Find services that need to be added
    const servicesToAdd = allServices.filter(s => !existingNames.has(s.name));
    
    if (servicesToAdd.length > 0) {
      await db.insert(services).values(servicesToAdd);
      log(`Added ${servicesToAdd.length} new services`);
    } else {
      log("All services already exist, skipping seed");
    }
    
    // Ensure monthly_packages table exists (for production database sync)
    await ensureMonthlyPackagesTable();
    
    // Seed monthly packages
    const existingPackages = await db.select().from(monthlyPackages);
    const existingPackageNames = new Set(existingPackages.map(p => p.name));
    
    const packagesToAdd = allMonthlyPackages.filter(p => !existingPackageNames.has(p.name));
    
    if (packagesToAdd.length > 0) {
      await db.insert(monthlyPackages).values(packagesToAdd);
      log(`Added ${packagesToAdd.length} new monthly packages`);
    } else {
      log("All monthly packages already exist, skipping seed");
    }
    
    // Check if we already have availability slots
    const existingSlots = await db.select().from(availabilitySlots);
    
    if (existingSlots.length === 0) {
      // Seed availability slots (Monday-Friday, 8 AM to 8 PM UK GMT)
      const slots = [];
      
      // For each weekday (1 = Monday, 5 = Friday)
      for (let dayOfWeek = 1; dayOfWeek <= 5; dayOfWeek++) {
        slots.push({
          dayOfWeek,
          startTime: "08:00:00",
          endTime: "20:00:00",
          isRecurring: true
        });
      }
      
      await db.insert(availabilitySlots).values(slots);
      log("Availability slots seeded successfully");
    } else {
      log("Availability slots already exist, skipping seed");
    }
    
    log("Booking data seeding completed");
  } catch (error) {
    console.error("Error seeding booking data:", error);
  }
}
