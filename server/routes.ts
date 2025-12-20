import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactSchema, 
  blogPostSchema, 
  serviceSchema, 
  availabilitySlotSchema, 
  bookingSchema, 
  blockedDateSchema,
  services,
  availabilitySlots,
  monthlyPackages
} from "@shared/schema";
import nodemailer from "nodemailer";
import { sanitizeString, sanitizeRichText } from "./sanitize";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import rateLimit from "express-rate-limit";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { allServices, allMonthlyPackages } from "./seed-booking";

// Rate limiters for different endpoints
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 contact form submissions per 15 minutes
  message: { message: "Too many submissions, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 booking attempts per 15 minutes
  message: { message: "Too many booking attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute for general API
  message: { message: "Too many requests, please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper to create email transporter with validation
function createEmailTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP credentials not configured - emails will not be sent");
    return null;
  }
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Helper to escape HTML in email content to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, char => htmlEntities[char]);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply general rate limiting to all API routes
  app.use('/api', apiLimiter);
  // API routes for contact form (with rate limiting)
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      // Validate request body using the schema
      const result = contactSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.format() 
        });
      }
      
      // Sanitize all user input to prevent XSS attacks
      const contactData = {
        ...result.data,
        name: sanitizeString(result.data.name),
        email: sanitizeString(result.data.email),
        phone: result.data.phone ? sanitizeString(result.data.phone) : undefined,
        company: sanitizeString(result.data.company),
        service: sanitizeString(result.data.service),
        message: sanitizeString(result.data.message),
      };
      
      // Store the contact in the database
      const savedContact = await storage.createContact(contactData);
      
      // Set up nodemailer with validated credentials
      const transporter = createEmailTransporter();
      
      // Send email notification if transporter is configured
      if (transporter) {
        const mailOptions = {
          from: process.env.SMTP_USER,
          to: process.env.EMAIL_TO || "AD@adtechservices.co.uk",
          replyTo: contactData.email,
          subject: `New Contact Form Submission: ${escapeHtml(contactData.service)} Inquiry`,
          text: `
            Name: ${contactData.name}
            Email: ${contactData.email}
            Phone: ${contactData.phone || "Not provided"}
            Company: ${contactData.company}
            Service: ${contactData.service}
            
            Message:
            ${contactData.message}
          `,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Service:</strong> ${escapeHtml(contactData.service)}</p>
            <p><strong>Name:</strong> ${escapeHtml(contactData.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(contactData.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(contactData.phone || "Not provided")}</p>
            <p><strong>Company:</strong> ${escapeHtml(contactData.company)}</p>
            <h3>Message:</h3>
            <p>${escapeHtml(contactData.message).replace(/\n/g, "<br>")}</p>
          `,
        };
        
        try {
          await transporter.sendMail(mailOptions);
          console.log("Contact form email sent successfully");
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }
      
      return res.status(201).json({ 
        message: "Contact form submitted successfully",
        id: savedContact.id
      });
      
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // API routes for blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      return res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blog/featured", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const posts = await storage.getFeaturedBlogPosts(limit);
      return res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching featured blog posts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blog/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const posts = await storage.getBlogPostsByCategory(category);
      return res.status(200).json(posts);
    } catch (error) {
      console.error(`Error fetching blog posts by category ${req.params.category}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      return res.status(200).json(post);
    } catch (error) {
      console.error(`Error fetching blog post with slug ${req.params.slug}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin-only endpoint to create a blog post (would need authentication in production)
  app.post("/api/blog", async (req, res) => {
    try {
      // Validate request body using the schema
      const result = blogPostSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.format() 
        });
      }
      
      // Sanitize user input - allow rich text for content and excerpt
      const postData = {
        ...result.data,
        title: sanitizeString(result.data.title),
        slug: sanitizeString(result.data.slug),
        excerpt: sanitizeRichText(result.data.excerpt),
        content: sanitizeRichText(result.data.content),
        category: sanitizeString(result.data.category),
        author: sanitizeString(result.data.author),
        imageUrl: result.data.imageUrl ? sanitizeString(result.data.imageUrl) : undefined,
      };
      
      // Store the blog post in the database
      const savedPost = await storage.createBlogPost(postData);
      
      return res.status(201).json({ 
        message: "Blog post created successfully",
        id: savedPost.id,
        slug: savedPost.slug
      });
    } catch (error) {
      console.error("Error creating blog post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // ===== SERVICE BOOKING SYSTEM API ROUTES =====
  
  // Monthly packages routes
  app.get("/api/monthly-packages", async (req, res) => {
    try {
      const packages = await storage.getMonthlyPackages();
      return res.status(200).json(packages);
    } catch (error) {
      console.error("Error fetching monthly packages:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/monthly-packages/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const packages = await storage.getMonthlyPackagesByCategory(category);
      return res.status(200).json(packages);
    } catch (error) {
      console.error(`Error fetching monthly packages by category ${req.params.category}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Service routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      return res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/services/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const services = await storage.getServicesByCategory(category);
      return res.status(200).json(services);
    } catch (error) {
      console.error(`Error fetching services by category ${req.params.category}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const service = await storage.getServiceById(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      return res.status(200).json(service);
    } catch (error) {
      console.error(`Error fetching service with ID ${req.params.id}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Admin service management endpoints (would need auth in production)
  app.post("/api/services", async (req, res) => {
    try {
      const result = serviceSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.format() 
        });
      }
      
      // Sanitize user input to prevent XSS
      const serviceData = {
        ...result.data,
        name: sanitizeString(result.data.name),
        description: sanitizeRichText(result.data.description),
        category: sanitizeString(result.data.category),
      };
      
      const service = await storage.createService(serviceData);
      return res.status(201).json({ 
        message: "Service created successfully",
        service
      });
    } catch (error) {
      console.error("Error creating service:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.patch("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      // Partial validation of the request body
      const result = serviceSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.format() 
        });
      }
      
      // Sanitize user input to prevent XSS on updates
      const sanitizedData: typeof result.data = {};
      if (result.data.name !== undefined) {
        sanitizedData.name = sanitizeString(result.data.name);
      }
      if (result.data.description !== undefined) {
        sanitizedData.description = sanitizeRichText(result.data.description);
      }
      if (result.data.category !== undefined) {
        sanitizedData.category = sanitizeString(result.data.category);
      }
      // Pass through non-string fields unchanged
      if (result.data.duration !== undefined) {
        sanitizedData.duration = result.data.duration;
      }
      if (result.data.price !== undefined) {
        sanitizedData.price = result.data.price;
      }
      if (result.data.isActive !== undefined) {
        sanitizedData.isActive = result.data.isActive;
      }
      
      const service = await storage.updateService(serviceId, sanitizedData);
      return res.status(200).json({ 
        message: "Service updated successfully",
        service
      });
    } catch (error) {
      console.error(`Error updating service with ID ${req.params.id}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Availability management
  app.get("/api/availability", async (req, res) => {
    try {
      const slots = await storage.getAvailabilitySlots();
      return res.status(200).json(slots);
    } catch (error) {
      console.error("Error fetching availability slots:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/availability", async (req, res) => {
    try {
      const result = availabilitySlotSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.format() 
        });
      }
      
      const slot = await storage.createAvailabilitySlot(result.data);
      return res.status(201).json({ 
        message: "Availability slot created successfully",
        slot
      });
    } catch (error) {
      console.error("Error creating availability slot:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/availability/:id", async (req, res) => {
    try {
      const slotId = parseInt(req.params.id);
      if (isNaN(slotId)) {
        return res.status(400).json({ message: "Invalid slot ID" });
      }
      
      await storage.deleteAvailabilitySlot(slotId);
      return res.status(200).json({ 
        message: "Availability slot deleted successfully"
      });
    } catch (error) {
      console.error(`Error deleting availability slot with ID ${req.params.id}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Blocked dates management
  app.get("/api/blocked-dates", async (req, res) => {
    try {
      const dates = await storage.getBlockedDates();
      return res.status(200).json(dates);
    } catch (error) {
      console.error("Error fetching blocked dates:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/blocked-dates", async (req, res) => {
    try {
      const result = blockedDateSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.format() 
        });
      }
      
      const blockedDate = await storage.createBlockedDate(result.data);
      return res.status(201).json({ 
        message: "Blocked date created successfully",
        blockedDate
      });
    } catch (error) {
      console.error("Error creating blocked date:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/blocked-dates/:id", async (req, res) => {
    try {
      const dateId = parseInt(req.params.id);
      if (isNaN(dateId)) {
        return res.status(400).json({ message: "Invalid blocked date ID" });
      }
      
      await storage.deleteBlockedDate(dateId);
      return res.status(200).json({ 
        message: "Blocked date deleted successfully"
      });
    } catch (error) {
      console.error(`Error deleting blocked date with ID ${req.params.id}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Booking creation and management
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/bookings/date/:date", async (req, res) => {
    try {
      const dateParam = req.params.date;
      // Validate date format (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
      }
      
      const date = new Date(dateParam);
      const bookings = await storage.getBookingsByDate(date);
      return res.status(200).json(bookings);
    } catch (error) {
      console.error(`Error fetching bookings for date ${req.params.date}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      if (isNaN(bookingId)) {
        return res.status(400).json({ message: "Invalid booking ID" });
      }
      
      const booking = await storage.getBookingById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      return res.status(200).json(booking);
    } catch (error) {
      console.error(`Error fetching booking with ID ${req.params.id}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/bookings", async (req, res) => {
    try {
      const result = bookingSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.format() 
        });
      }
      
      // Sanitize user input to prevent XSS
      const bookingData = {
        ...result.data,
        clientName: sanitizeString(result.data.clientName),
        clientEmail: sanitizeString(result.data.clientEmail),
        clientPhone: result.data.clientPhone ? sanitizeString(result.data.clientPhone) : undefined,
        clientCompany: result.data.clientCompany ? sanitizeString(result.data.clientCompany) : undefined,
        notes: result.data.notes ? sanitizeString(result.data.notes) : undefined,
      };
      
      const booking = await storage.createBooking(bookingData);
      
      // In a production app, we would send confirmation emails here
      
      return res.status(201).json({ 
        message: "Booking created successfully",
        booking
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      if (isNaN(bookingId)) {
        return res.status(400).json({ message: "Invalid booking ID" });
      }
      
      const { status } = req.body;
      if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      
      const booking = await storage.updateBookingStatus(bookingId, status);
      
      // In a production app, we would send status update emails here
      
      return res.status(200).json({ 
        message: "Booking status updated successfully",
        booking
      });
    } catch (error) {
      console.error(`Error updating booking status for ID ${req.params.id}:`, error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Availability checking for a specific date and service
  app.get("/api/available-slots", async (req, res) => {
    try {
      const { date, serviceId } = req.query;
      
      if (!date || !serviceId) {
        return res.status(400).json({ message: "Both date and serviceId are required" });
      }
      
      // Validate date format (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date as string)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
      }
      
      const parsedServiceId = parseInt(serviceId as string);
      if (isNaN(parsedServiceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const availableSlots = await storage.getAvailableTimeSlots(new Date(date as string), parsedServiceId);
      return res.status(200).json(availableSlots);
    } catch (error) {
      console.error(`Error fetching available slots:`, error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  });

  // Stripe payment routes
  app.get("/api/stripe/publishable-key", async (req, res) => {
    try {
      const publishableKey = await getStripePublishableKey();
      return res.status(200).json({ publishableKey });
    } catch (error) {
      console.error("Error getting Stripe publishable key:", error);
      return res.status(500).json({ message: "Payment system not available" });
    }
  });

  // Create checkout session for booking payment (with rate limiting)
  app.post("/api/create-checkout-session", bookingLimiter, async (req, res) => {
    try {
      const { bookingData } = req.body;
      
      if (!bookingData || !bookingData.serviceIds || !Array.isArray(bookingData.serviceIds) || bookingData.serviceIds.length === 0) {
        return res.status(400).json({ message: "Missing required booking information" });
      }

      if (!bookingData.clientName || !bookingData.clientEmail || !bookingData.bookingDate || !bookingData.startTime || !bookingData.endTime) {
        return res.status(400).json({ message: "Missing required client or scheduling information" });
      }

      // Validate and calculate price server-side from service IDs
      const services = await storage.getServices();
      const selectedServices = services.filter(s => bookingData.serviceIds.includes(s.id));
      
      if (selectedServices.length !== bookingData.serviceIds.length) {
        return res.status(400).json({ message: "One or more invalid service IDs" });
      }

      // Calculate hourly rate from selected services (in pence)
      const hourlyRate = selectedServices.reduce((sum, service) => sum + (service.price || 0), 0);
      const serviceNames = selectedServices.map(s => s.name).join(', ');
      
      // Calculate number of hours from time slots
      const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      const startMinutes = timeToMinutes(bookingData.startTime);
      const endMinutes = timeToMinutes(bookingData.endTime);
      const durationHours = Math.max(1, Math.ceil((endMinutes - startMinutes) / 60));
      
      // Total price = hourly rate × number of hours
      const totalPrice = hourlyRate * durationHours;

      // Check if slot is available before proceeding (interval overlap detection)
      const bookingDateObj = new Date(bookingData.bookingDate);
      const existingBookings = await storage.getBookingsByDate(bookingDateObj);
      
      const requestedStart = startMinutes;
      const requestedEnd = endMinutes;
      
      // Check for overlapping bookings (start < existingEnd && end > existingStart)
      const slotConflict = existingBookings.some(b => {
        if (b.status === 'cancelled') return false;
        const existingStart = timeToMinutes(b.startTime);
        const existingEnd = timeToMinutes(b.endTime);
        return requestedStart < existingEnd && requestedEnd > existingStart;
      });
      
      if (slotConflict) {
        return res.status(409).json({ 
          message: "This time slot is no longer available. Please select a different time.",
          conflict: true 
        });
      }

      const stripe = await getUncachableStripeClient();
      
      // Get the base URL for redirects
      const baseUrl = `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;
      
      // Sanitize user inputs before storing in metadata
      const sanitizedMetadata = {
        clientName: sanitizeString(bookingData.clientName),
        clientEmail: sanitizeString(bookingData.clientEmail),
        clientPhone: bookingData.clientPhone ? sanitizeString(bookingData.clientPhone) : '',
        clientCompany: bookingData.clientCompany ? sanitizeString(bookingData.clientCompany) : '',
        serviceIds: JSON.stringify(bookingData.serviceIds),
        bookingDate: sanitizeString(bookingData.bookingDate),
        startTime: sanitizeString(bookingData.startTime),
        endTime: sanitizeString(bookingData.endTime),
        notes: bookingData.notes ? sanitizeString(bookingData.notes) : '',
        totalPrice: totalPrice.toString(),
      };

      // Create a checkout session with the booking details
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: `IT Consultation (${durationHours} hour${durationHours > 1 ? 's' : ''})`,
                description: `Services: ${serviceNames} | Date: ${bookingData.bookingDate} | Time: ${bookingData.startTime} - ${bookingData.endTime}`,
              },
              unit_amount: totalPrice, // Total price in pence (hourly rate × hours)
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/booking?cancelled=true`,
        customer_email: sanitizedMetadata.clientEmail,
        metadata: sanitizedMetadata,
      });

      // Create a pending booking intent before redirecting to Stripe
      // This ensures verify-payment only confirms pre-existing bookings
      await storage.createBooking({
        serviceIds: bookingData.serviceIds,
        date: sanitizedMetadata.bookingDate,
        startTime: sanitizedMetadata.startTime,
        endTime: sanitizedMetadata.endTime,
        clientName: sanitizedMetadata.clientName,
        clientEmail: sanitizedMetadata.clientEmail,
        clientPhone: sanitizedMetadata.clientPhone || undefined,
        clientCompany: sanitizedMetadata.clientCompany || undefined,
        notes: sanitizedMetadata.notes || undefined,
        totalPrice,
        stripeSessionId: session.id,
        status: 'pending_payment' as const,
      });

      return res.status(200).json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  // Cleanup expired pending bookings (runs on each verify-payment call for simplicity)
  // In production, this would be a scheduled job
  const runPendingBookingCleanup = async () => {
    try {
      const cleaned = await storage.cleanupExpiredPendingBookings(24); // 24 hours
      if (cleaned > 0) {
        console.log(`Cleaned up ${cleaned} expired pending booking(s)`);
      }
    } catch (error) {
      console.error("Error cleaning up pending bookings:", error);
    }
  };

  // Rate limiter for payment verification (stricter to prevent brute force)
  const verifyPaymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 verification attempts per 15 minutes
    message: { message: "Too many verification attempts, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Verify payment and confirm pending booking after successful checkout
  // This endpoint only confirms pre-existing pending bookings, not create new ones
  app.post("/api/verify-payment", verifyPaymentLimiter, async (req, res) => {
    // Run cleanup opportunistically
    runPendingBookingCleanup();
    try {
      const { sessionId } = req.body;
      
      // Validate session ID format (basic check)
      if (!sessionId || !sessionId.startsWith('cs_')) {
        return res.status(400).json({ message: "Invalid session ID" });
      }

      // Find the pending booking by session ID
      const pendingBooking = await storage.getBookingByStripeSessionId(sessionId);
      
      if (!pendingBooking) {
        // No pending booking found - this session was never created through our system
        return res.status(404).json({ message: "No booking found for this session" });
      }

      // If already confirmed, return the booking (idempotency)
      if (pendingBooking.status === 'confirmed') {
        return res.status(200).json({ 
          message: "Booking already confirmed",
          booking: {
            id: pendingBooking.id,
            clientName: pendingBooking.clientName,
            clientEmail: pendingBooking.clientEmail,
            date: pendingBooking.date,
            startTime: pendingBooking.startTime,
            endTime: pendingBooking.endTime,
          }
        });
      }

      // If not pending_payment, something is wrong
      if (pendingBooking.status !== 'pending_payment') {
        return res.status(400).json({ message: "Invalid booking status" });
      }

      const stripe = await getUncachableStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (session.payment_status !== 'paid') {
        return res.status(400).json({ message: "Payment not completed" });
      }

      // Verify the amount matches what we stored
      if (pendingBooking.totalPrice !== session.amount_total) {
        console.error(`Price mismatch: stored ${pendingBooking.totalPrice}, paid ${session.amount_total}`);
        return res.status(400).json({ message: "Payment amount mismatch" });
      }

      // Confirm the booking
      const confirmedBooking = await storage.updateBookingStatus(pendingBooking.id, 'confirmed');

      // Get service names for the email
      const services = await storage.getServices();
      const bookedServices = services.filter(s => (confirmedBooking.serviceIds || []).includes(s.id));
      const serviceNames = bookedServices.map(s => s.name).join(', ') || 'Consultation';
      const formattedPrice = `£${((confirmedBooking.totalPrice || 0) / 100).toFixed(2)}`;
      const formattedDate = new Date(confirmedBooking.date).toLocaleDateString('en-GB', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      // Calculate duration in hours for itemized billing
      const startParts = confirmedBooking.startTime.split(':').map(Number);
      const endParts = confirmedBooking.endTime.split(':').map(Number);
      const startMinutes = startParts[0] * 60 + startParts[1];
      const endMinutes = endParts[0] * 60 + endParts[1];
      const durationHours = (endMinutes - startMinutes) / 60;

      // Build itemized billing table (price is stored in pence)
      const itemizedRows = bookedServices.map(service => {
        const hourlyRate = (service.price || 0) / 100;
        const lineTotal = hourlyRate * durationHours;
        return `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(service.name)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">£${hourlyRate.toFixed(2)}/hr</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${durationHours}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">£${lineTotal.toFixed(2)}</td>
        </tr>`;
      }).join('');

      const itemizedBillingHtml = `
        <h3>Itemised Billing Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #d1d5db;">Service</th>
              <th style="padding: 8px; text-align: center; border-bottom: 2px solid #d1d5db;">Rate</th>
              <th style="padding: 8px; text-align: center; border-bottom: 2px solid #d1d5db;">Hours</th>
              <th style="padding: 8px; text-align: right; border-bottom: 2px solid #d1d5db;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemizedRows}
          </tbody>
          <tfoot>
            <tr style="font-weight: bold;">
              <td colspan="3" style="padding: 8px; text-align: right; border-top: 2px solid #d1d5db;">Total:</td>
              <td style="padding: 8px; text-align: right; border-top: 2px solid #d1d5db;">${formattedPrice}</td>
            </tr>
          </tfoot>
        </table>
      `;

      // Send email notification for confirmed booking
      const transporter = createEmailTransporter();
      if (transporter) {
        try {
          // Email to admin about new booking (with HTML escaping for safety)
          const adminMailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.EMAIL_TO || "AD@adtechservices.co.uk",
            subject: `New Booking Confirmed: ${escapeHtml(confirmedBooking.clientName)}`,
            html: `
              <h2>New Booking Confirmed</h2>
              <p>A new consultation has been booked and paid for.</p>
              
              <h3>Client Details</h3>
              <p><strong>Name:</strong> ${escapeHtml(confirmedBooking.clientName)}</p>
              <p><strong>Email:</strong> ${escapeHtml(confirmedBooking.clientEmail)}</p>
              <p><strong>Phone:</strong> ${escapeHtml(confirmedBooking.clientPhone || "Not provided")}</p>
              <p><strong>Company:</strong> ${escapeHtml(confirmedBooking.clientCompany || "Not provided")}</p>
              
              <h3>Booking Details</h3>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${confirmedBooking.startTime} - ${confirmedBooking.endTime}</p>
              
              ${itemizedBillingHtml}
              
              ${confirmedBooking.notes ? `<h3>Additional Notes</h3><p>${escapeHtml(confirmedBooking.notes)}</p>` : ''}
            `,
          };

          // Confirmation email to client
          const clientMailOptions = {
            from: process.env.SMTP_USER,
            to: confirmedBooking.clientEmail,
            subject: `Booking Confirmed - ADTS Consultation`,
            html: `
              <h2>Your Booking is Confirmed</h2>
              <p>Dear ${escapeHtml(confirmedBooking.clientName)},</p>
              <p>Thank you for booking a consultation with ADTS. Your booking has been confirmed and payment received.</p>
              
              <h3>Booking Details</h3>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${confirmedBooking.startTime} - ${confirmedBooking.endTime}</p>
              
              ${itemizedBillingHtml}
              
              <p>If you have any questions before your consultation, please don't hesitate to contact me at AD@adtechservices.co.uk or call +44 (0)7492 168197.</p>
              
              <p>Best regards,<br>Alex Devlyashevskiy<br>ADTS - IT Consultancy</p>
            `,
          };

          await transporter.sendMail(adminMailOptions);
          await transporter.sendMail(clientMailOptions);
          console.log("Booking confirmation emails sent successfully");
        } catch (emailError) {
          console.error("Error sending booking confirmation emails:", emailError);
        }
      }

      return res.status(200).json({ 
        message: "Booking confirmed successfully",
        booking: {
          id: confirmedBooking.id,
          clientName: confirmedBooking.clientName,
          clientEmail: confirmedBooking.clientEmail,
          date: confirmedBooking.date,
          startTime: confirmedBooking.startTime,
          endTime: confirmedBooking.endTime,
        }
      });
    } catch (error) {
      console.error("Error verifying payment:", error);
      return res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  // Admin endpoint to sync availability slots (8 AM to 8 PM UK GMT, hourly)
  app.post("/api/admin/sync-availability", async (req, res) => {
    try {
      // Delete existing availability slots
      await db.delete(availabilitySlots);
      
      // Create new slots for Monday-Friday, 8 AM to 8 PM
      const slots = [];
      for (let dayOfWeek = 1; dayOfWeek <= 5; dayOfWeek++) {
        slots.push({
          dayOfWeek,
          startTime: "08:00:00",
          endTime: "20:00:00",
          isRecurring: true
        });
      }
      
      await db.insert(availabilitySlots).values(slots);
      console.log("Admin sync: Updated availability slots to 8 AM - 8 PM");
      
      return res.status(200).json({ 
        message: "Availability slots updated to 8 AM - 8 PM (UK GMT), Monday-Friday",
        slotsCreated: slots.length
      });
    } catch (error) {
      console.error("Error syncing availability slots:", error);
      return res.status(500).json({ message: "Failed to sync availability slots" });
    }
  });

  // Admin endpoint to sync services to the database (for production use after deployment)
  // This will add missing services AND update prices for existing ones
  app.post("/api/admin/sync-services", async (req, res) => {
    try {
      // Get existing services
      const existingServices = await storage.getServices();
      const existingByName = new Map(existingServices.map(s => [s.name, s]));
      
      let added = 0;
      let updated = 0;
      const addedNames: string[] = [];
      const updatedNames: string[] = [];
      
      for (const service of allServices) {
        const existing = existingByName.get(service.name);
        
        if (!existing) {
          // Add new service
          await db.insert(services).values(service);
          added++;
          addedNames.push(service.name);
        } else if (existing.price !== service.price || 
                   existing.duration !== service.duration ||
                   existing.description !== service.description) {
          // Update existing service with new values
          await db.update(services)
            .set({ 
              price: service.price, 
              duration: service.duration,
              description: service.description,
              category: service.category,
              isActive: service.isActive
            })
            .where(eq(services.id, existing.id));
          updated++;
          updatedNames.push(service.name);
        }
      }
      
      console.log(`Admin sync: Added ${added}, updated ${updated} services`);
      return res.status(200).json({ 
        message: `Added ${added} services, updated ${updated} services`,
        added: addedNames,
        updated: updatedNames,
        total: existingServices.length + added
      });
    } catch (error) {
      console.error("Error syncing services:", error);
      return res.status(500).json({ message: "Failed to sync services" });
    }
  });
  
  // Admin endpoint to sync monthly packages to the database (for production use after deployment)
  app.post("/api/admin/sync-packages", async (req, res) => {
    try {
      // Get existing packages
      const existingPackages = await storage.getMonthlyPackages();
      const existingByName = new Map(existingPackages.map(p => [p.name, p]));
      
      let added = 0;
      let updated = 0;
      const addedNames: string[] = [];
      const updatedNames: string[] = [];
      
      for (const pkg of allMonthlyPackages) {
        const existing = existingByName.get(pkg.name);
        
        if (!existing) {
          // Add new package
          await db.insert(monthlyPackages).values(pkg);
          added++;
          addedNames.push(pkg.name);
        } else if (existing.price !== pkg.price || 
                   existing.description !== pkg.description ||
                   JSON.stringify(existing.features) !== JSON.stringify(pkg.features)) {
          // Update existing package with new values
          await db.update(monthlyPackages)
            .set({ 
              price: pkg.price, 
              description: pkg.description,
              billingPeriod: pkg.billingPeriod,
              features: pkg.features,
              category: pkg.category,
              mostPopular: pkg.mostPopular,
              tier: pkg.tier,
              isActive: pkg.isActive
            })
            .where(eq(monthlyPackages.id, existing.id));
          updated++;
          updatedNames.push(pkg.name);
        }
      }
      
      console.log(`Admin sync: Added ${added}, updated ${updated} monthly packages`);
      return res.status(200).json({ 
        message: `Added ${added} packages, updated ${updated} packages`,
        added: addedNames,
        updated: updatedNames,
        total: existingPackages.length + added
      });
    } catch (error) {
      console.error("Error syncing monthly packages:", error);
      return res.status(500).json({ message: "Failed to sync monthly packages" });
    }
  });

  // Test endpoint to send sample booking confirmation email (for testing only)
  app.post("/api/test-booking-email", async (req, res) => {
    try {
      const transporter = createEmailTransporter();
      if (!transporter) {
        return res.status(500).json({ message: "Email not configured" });
      }

      // Get some real services for the test
      const services = await storage.getServices();
      const testServices = services.filter(s => s.isActive).slice(0, 2);
      
      // Sample booking data
      const testBooking = {
        clientName: "Test Client",
        clientEmail: process.env.SMTP_USER || "AD@adtechservices.co.uk",
        clientPhone: "+44 7492 168197",
        clientCompany: "Test Company Ltd",
        date: new Date(),
        startTime: "10:00",
        endTime: "12:00",
        notes: "This is a test booking to verify the itemised billing email format.",
      };

      const formattedDate = testBooking.date.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      // Calculate duration
      const durationHours = 2;

      // Build itemized billing table
      let totalInPence = 0;
      const itemizedRows = testServices.map(service => {
        const hourlyRate = (service.price || 0) / 100;
        const lineTotal = hourlyRate * durationHours;
        totalInPence += (service.price || 0) * durationHours;
        return `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(service.name)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">£${hourlyRate.toFixed(2)}/hr</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${durationHours}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">£${lineTotal.toFixed(2)}</td>
        </tr>`;
      }).join('');

      const formattedPrice = `£${(totalInPence / 100).toFixed(2)}`;

      const itemizedBillingHtml = `
        <h3>Itemised Billing Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #d1d5db;">Service</th>
              <th style="padding: 8px; text-align: center; border-bottom: 2px solid #d1d5db;">Rate</th>
              <th style="padding: 8px; text-align: center; border-bottom: 2px solid #d1d5db;">Hours</th>
              <th style="padding: 8px; text-align: right; border-bottom: 2px solid #d1d5db;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemizedRows}
          </tbody>
          <tfoot>
            <tr style="font-weight: bold;">
              <td colspan="3" style="padding: 8px; text-align: right; border-top: 2px solid #d1d5db;">Total:</td>
              <td style="padding: 8px; text-align: right; border-top: 2px solid #d1d5db;">${formattedPrice}</td>
            </tr>
          </tfoot>
        </table>
      `;

      const testMailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER || "AD@adtechservices.co.uk",
        subject: `[TEST] Booking Confirmed - ADTS Consultation`,
        html: `
          <h2>Your Booking is Confirmed</h2>
          <p><em>This is a TEST email to preview the itemised billing format.</em></p>
          <p>Dear ${escapeHtml(testBooking.clientName)},</p>
          <p>Thank you for booking a consultation with ADTS. Your booking has been confirmed and payment received.</p>
          
          <h3>Booking Details</h3>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${testBooking.startTime} - ${testBooking.endTime}</p>
          
          ${itemizedBillingHtml}
          
          <h3>Additional Notes</h3>
          <p>${escapeHtml(testBooking.notes)}</p>
          
          <p>If you have any questions before your consultation, please don't hesitate to contact me at AD@adtechservices.co.uk or call +44 (0)7492 168197.</p>
          
          <p>Best regards,<br>Alex Devlyashevskiy<br>ADTS - IT Consultancy</p>
        `,
      };

      await transporter.sendMail(testMailOptions);
      console.log("Test booking email sent successfully");
      
      return res.status(200).json({ 
        message: "Test booking confirmation email sent",
        sentTo: testMailOptions.to,
        services: testServices.map(s => s.name),
        total: formattedPrice
      });
    } catch (error) {
      console.error("Error sending test email:", error);
      return res.status(500).json({ message: "Failed to send test email" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
