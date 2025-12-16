import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactSchema, 
  blogPostSchema, 
  serviceSchema, 
  availabilitySlotSchema, 
  bookingSchema, 
  blockedDateSchema 
} from "@shared/schema";
import nodemailer from "nodemailer";
import { sanitizeString, sanitizeRichText } from "./sanitize";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form
  app.post("/api/contact", async (req, res) => {
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
      
      // Set up nodemailer with environment variables
      // This is a simulation - in production, use actual SMTP credentials
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.example.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER || "user@example.com",
          pass: process.env.SMTP_PASS || "password",
        },
      });
      
      // Compose email with contact form data
      const mailOptions = {
        from: process.env.EMAIL_FROM || "no-reply@adts.com",
        to: process.env.EMAIL_TO || "contact@adts.com",
        subject: `New Contact Form Submission: ${contactData.service} Inquiry`,
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
          <p><strong>Service:</strong> ${contactData.service}</p>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || "Not provided"}</p>
          <p><strong>Company:</strong> ${contactData.company}</p>
          <h3>Message:</h3>
          <p>${contactData.message.replace(/\n/g, "<br>")}</p>
        `,
      };
      
      // In development mode, just log the email instead of sending it
      if (process.env.NODE_ENV === "development") {
        console.log("Email would be sent in production:", mailOptions);
      } else {
        // In production, attempt to send the email
        try {
          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.error("Error sending email:", error);
          // Still return success since we've stored the contact
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

  const httpServer = createServer(app);
  return httpServer;
}
