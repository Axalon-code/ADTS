import { 
  users, contacts, blogPosts, services, availabilitySlots, bookings, blockedDates,
  type User, type InsertUser, 
  type Contact, type InsertContact,
  type BlogPost, type InsertBlogPost,
  type Service, type InsertService,
  type AvailabilitySlot, type InsertAvailabilitySlot,
  type Booking, type InsertBooking,
  type BlockedDate, type InsertBlockedDate
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getFeaturedBlogPosts(limit?: number): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Service booking methods
  getServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  
  // Availability methods
  getAvailabilitySlots(): Promise<AvailabilitySlot[]>;
  createAvailabilitySlot(slot: InsertAvailabilitySlot): Promise<AvailabilitySlot>;
  deleteAvailabilitySlot(id: number): Promise<void>;
  
  // Booking methods
  getBookings(): Promise<Booking[]>;
  getBookingsByDate(date: Date): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  getBookingByStripeSessionId(sessionId: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking>;
  cleanupExpiredPendingBookings(hoursOld: number): Promise<number>;
  
  // Blocked dates methods
  getBlockedDates(): Promise<BlockedDate[]>;
  createBlockedDate(blockedDate: InsertBlockedDate): Promise<BlockedDate>;
  deleteBlockedDate(id: number): Promise<void>;
  
  // Availability checking
  getAvailableTimeSlots(date: Date, serviceId: number): Promise<{ startTime: string, endTime: string }[]>;
}

// DatabaseStorage implementation using PostgreSQL
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  async createContact(contactData: InsertContact): Promise<Contact> {
    // Handle null phone number if not provided
    const data = {
      ...contactData,
      phone: contactData.phone || null,
    };
    
    const result = await db.insert(contacts).values(data).returning();
    return result[0];
  }

  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(blogPosts.publishedAt);
  }

  async getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.featured, true))
      .orderBy(blogPosts.publishedAt)
      .limit(limit);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return result.length > 0 ? result[0] : undefined;
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.category, category))
      .orderBy(blogPosts.publishedAt);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return result[0];
  }

  // Service booking methods
  async getServices(): Promise<Service[]> {
    return db.select().from(services).where(eq(services.isActive, true));
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return db.select().from(services).where(
      and(
        eq(services.isActive, true),
        eq(services.category, category)
      )
    );
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db
      .insert(services)
      .values(service)
      .returning();
    return result[0];
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const result = await db
      .update(services)
      .set(service)
      .where(eq(services.id, id))
      .returning();
    return result[0];
  }

  // Availability methods
  async getAvailabilitySlots(): Promise<AvailabilitySlot[]> {
    return db.select().from(availabilitySlots);
  }

  async createAvailabilitySlot(slot: InsertAvailabilitySlot): Promise<AvailabilitySlot> {
    const result = await db
      .insert(availabilitySlots)
      .values(slot)
      .returning();
    return result[0];
  }

  async deleteAvailabilitySlot(id: number): Promise<void> {
    await db
      .delete(availabilitySlots)
      .where(eq(availabilitySlots.id, id));
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return db.select().from(bookings);
  }

  async getBookingsByDate(date: Date): Promise<Booking[]> {
    const dateStr = date.toISOString().split('T')[0];
    return db.select().from(bookings).where(eq(bookings.date, dateStr));
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    const result = await db.select().from(bookings).where(eq(bookings.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getBookingByStripeSessionId(sessionId: string): Promise<Booking | undefined> {
    const result = await db.select().from(bookings).where(eq(bookings.stripeSessionId, sessionId));
    return result.length > 0 ? result[0] : undefined;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const result = await db
      .insert(bookings)
      .values(booking)
      .returning();
    return result[0];
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking> {
    const result = await db
      .update(bookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return result[0];
  }

  async cleanupExpiredPendingBookings(hoursOld: number): Promise<number> {
    const cutoffTime = new Date(Date.now() - hoursOld * 60 * 60 * 1000);
    const result = await db
      .delete(bookings)
      .where(
        and(
          eq(bookings.status, 'pending_payment'),
          lte(bookings.createdAt, cutoffTime)
        )
      )
      .returning();
    return result.length;
  }

  // Blocked dates methods
  async getBlockedDates(): Promise<BlockedDate[]> {
    return db.select().from(blockedDates);
  }

  async createBlockedDate(blockedDate: InsertBlockedDate): Promise<BlockedDate> {
    const result = await db
      .insert(blockedDates)
      .values(blockedDate)
      .returning();
    return result[0];
  }

  async deleteBlockedDate(id: number): Promise<void> {
    await db
      .delete(blockedDates)
      .where(eq(blockedDates.id, id));
  }

  // Availability checking
  async getAvailableTimeSlots(date: Date, serviceId: number): Promise<{ startTime: string, endTime: string }[]> {
    // Get the requested service to determine duration
    const service = await this.getServiceById(serviceId);
    if (!service) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }

    const serviceDuration = service.duration; // in minutes
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay(); // 0-6, Sunday-Saturday

    // Get availability slots for this day of the week
    const availSlots = await db.select().from(availabilitySlots).where(eq(availabilitySlots.dayOfWeek, dayOfWeek));
    
    // Get existing bookings for this date
    const existingBookings = await this.getBookingsByDate(date);
    
    // Get blocked dates that include this date
    const blockedDatesForDay = await db.select().from(blockedDates).where(
      and(
        lte(blockedDates.startDate, dateStr),
        gte(blockedDates.endDate, dateStr)
      )
    );

    // If the date is fully blocked, return no available slots
    if (blockedDatesForDay.length > 0) {
      return [];
    }

    // Calculate available time slots
    let availableTimeSlots: { startTime: string, endTime: string }[] = [];

    for (const slot of availSlots) {
      // Convert slot times to minutes since midnight for easier calculation
      const slotStartMinutes = convertTimeToMinutes(slot.startTime);
      const slotEndMinutes = convertTimeToMinutes(slot.endTime);
      
      // Create possible slots in the availability window
      let currentStartMinutes = slotStartMinutes;
      
      while (currentStartMinutes + serviceDuration <= slotEndMinutes) {
        const currentEndMinutes = currentStartMinutes + serviceDuration;
        
        // Check if this potential slot overlaps with existing bookings
        const isOverlapping = existingBookings.some(booking => {
          const bookingStartMinutes = convertTimeToMinutes(booking.startTime);
          const bookingEndMinutes = convertTimeToMinutes(booking.endTime);
          
          return (
            (currentStartMinutes < bookingEndMinutes && currentEndMinutes > bookingStartMinutes) ||
            (bookingStartMinutes < currentEndMinutes && bookingEndMinutes > currentStartMinutes)
          );
        });
        
        if (!isOverlapping) {
          availableTimeSlots.push({
            startTime: convertMinutesToTime(currentStartMinutes),
            endTime: convertMinutesToTime(currentEndMinutes)
          });
        }
        
        // Move to the next possible slot (60-minute/hourly increments)
        currentStartMinutes += 60;
      }
    }
    
    return availableTimeSlots;
  }
}

// Helper functions for time calculations
function convertTimeToMinutes(time: string | Date): number {
  let hours, minutes;
  
  if (time instanceof Date) {
    hours = time.getHours();
    minutes = time.getMinutes();
  } else {
    // Handle PostgreSQL time format "HH:MM:SS"
    const parts = time.split(':');
    hours = parseInt(parts[0], 10);
    minutes = parseInt(parts[1], 10);
  }
  
  return hours * 60 + minutes;
}

function convertMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`;
}

// Export the database storage instance
export const storage = new DatabaseStorage();
