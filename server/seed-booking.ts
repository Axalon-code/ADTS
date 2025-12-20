import { services, availabilitySlots } from "@shared/schema";
import { db } from "./db";
import { log } from "./vite";
import { eq } from "drizzle-orm";

/**
 * All services offered by ADTS
 */
const allServices = [
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
    
    // Check if we already have availability slots
    const existingSlots = await db.select().from(availabilitySlots);
    
    if (existingSlots.length === 0) {
      // Seed availability slots (Monday-Friday, 9 AM to 5 PM)
      const slots = [];
      
      // For each weekday (1 = Monday, 5 = Friday)
      for (let dayOfWeek = 1; dayOfWeek <= 5; dayOfWeek++) {
        slots.push({
          dayOfWeek,
          startTime: "09:00:00",
          endTime: "17:00:00",
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
