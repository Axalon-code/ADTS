import { pgTable, text, serial, integer, boolean, timestamp, date, time, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define Contact table for contact form submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isRead: boolean("is_read").default(false).notNull(),
});

export const contactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  service: true,
  message: true,
});

export type InsertContact = z.infer<typeof contactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Blog posts for IT tips and resources
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  featured: boolean("featured").default(false),
  author: text("author").default("Alex"),
  imageUrl: text("image_url")
});

export const blogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  category: true,
  tags: true,
  featured: true,
  author: true,
  imageUrl: true
});

export type InsertBlogPost = z.infer<typeof blogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Service Offerings for Booking
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // e.g., "azure", "identity", "m365", "automation"
  duration: integer("duration").notNull(), // Duration in minutes
  price: integer("price"), // Optional price in pence/cents
  isActive: boolean("is_active").default(true).notNull()
});

export const serviceSchema = createInsertSchema(services).pick({
  name: true,
  description: true,
  category: true,
  duration: true,
  price: true,
  isActive: true
});

export type InsertService = z.infer<typeof serviceSchema>;
export type Service = typeof services.$inferSelect;

// Consultant Availability Slots
export const availabilitySlots = pgTable("availability_slots", {
  id: serial("id").primaryKey(),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6 (Sun-Sat)
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isRecurring: boolean("is_recurring").default(true).notNull()
});

export const availabilitySlotSchema = createInsertSchema(availabilitySlots).pick({
  dayOfWeek: true,
  startTime: true,
  endTime: true,
  isRecurring: true
});

export type InsertAvailabilitySlot = z.infer<typeof availabilitySlotSchema>;
export type AvailabilitySlot = typeof availabilitySlots.$inferSelect;

// Bookings
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id"), // Deprecated - kept for backwards compatibility
  serviceIds: integer("service_ids").array(), // Array of service IDs for bundle bookings
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  clientCompany: text("client_company"),
  date: date("date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled
  notes: text("notes"),
  totalPrice: integer("total_price"), // Total hourly rate in pence for the bundle
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
});

export const bookingSchema = createInsertSchema(bookings).pick({
  serviceId: true,
  serviceIds: true,
  clientName: true,
  clientEmail: true,
  clientPhone: true,
  clientCompany: true,
  date: true,
  startTime: true,
  endTime: true,
  status: true,
  notes: true,
  totalPrice: true
});

export type InsertBooking = z.infer<typeof bookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Blocking specific dates/times (holidays, vacations, etc.)
export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const blockedDateSchema = createInsertSchema(blockedDates).pick({
  startDate: true,
  endDate: true,
  reason: true
});

export type InsertBlockedDate = z.infer<typeof blockedDateSchema>;
export type BlockedDate = typeof blockedDates.$inferSelect;
