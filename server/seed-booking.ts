import { services, availabilitySlots } from "@shared/schema";
import { db } from "./db";
import { log } from "./vite";

/**
 * Seed initial services and availability slots
 */
export async function seedBookingData() {
  try {
    log("Starting booking data seeding...");
    
    // Check if we already have services data
    const existingServices = await db.select().from(services);
    
    if (existingServices.length === 0) {
      // Seed service offerings
      await db.insert(services).values([
        {
          name: "Microsoft Azure Consultation",
          description: "Comprehensive consultation on Azure cloud services, infrastructure planning, and implementation strategy.",
          category: "azure",
          duration: 60, // 60 minutes
          price: 15000, // £150.00
          isActive: true
        },
        {
          name: "Azure Migration Assessment",
          description: "Detailed assessment of your current infrastructure and recommendations for migrating to Azure cloud.",
          category: "azure",
          duration: 120, // 2 hours
          price: 25000, // £250.00
          isActive: true
        },
        {
          name: "Identity & Access Management Review",
          description: "Review of your current IAM setup with recommendations for security enhancements using Microsoft Entra ID.",
          category: "identity",
          duration: 90, // 90 minutes
          price: 20000, // £200.00
          isActive: true
        },
        {
          name: "Privileged Identity Management Setup",
          description: "Implementation of Microsoft Entra Privileged Identity Management for secure just-in-time access.",
          category: "identity",
          duration: 120, // 2 hours
          price: 30000, // £300.00
          isActive: true
        },
        {
          name: "Microsoft 365 Admin Training",
          description: "Hands-on training for your IT staff on Microsoft 365 administration best practices.",
          category: "m365",
          duration: 180, // 3 hours
          price: 35000, // £350.00
          isActive: true
        },
        {
          name: "Microsoft 365 Security Assessment",
          description: "Comprehensive assessment of your Microsoft 365 tenant's security posture with actionable recommendations.",
          category: "m365",
          duration: 90, // 90 minutes
          price: 22500, // £225.00
          isActive: true
        },
        {
          name: "Process Automation Consultation",
          description: "Consultation on automating business processes using Microsoft Power Platform and other automation tools.",
          category: "automation",
          duration: 60, // 60 minutes
          price: 15000, // £150.00
          isActive: true
        },
        {
          name: "RPA Implementation Planning",
          description: "Strategic planning for implementing Robotic Process Automation in your business workflows.",
          category: "automation",
          duration: 120, // 2 hours
          price: 30000, // £300.00
          isActive: true
        }
      ]);
      
      log("Services data seeded successfully");
    } else {
      log("Services data already exists, skipping seed");
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
          startTime: "09:00:00", // 9 AM
          endTime: "17:00:00",   // 5 PM
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