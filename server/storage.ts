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
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking>;
  
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
}

// Export the database storage instance
export const storage = new DatabaseStorage();
