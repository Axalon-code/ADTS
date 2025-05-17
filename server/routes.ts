import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, blogPostSchema } from "@shared/schema";
import nodemailer from "nodemailer";

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
      
      const contactData = result.data;
      
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
      
      const postData = result.data;
      
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

  const httpServer = createServer(app);
  return httpServer;
}
