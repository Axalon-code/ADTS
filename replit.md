# ADTS - IT Consultancy Website

## Overview

ADTS is a professional IT consultancy website specializing in Microsoft technologies. The application serves as a business presence for IT consulting services, featuring service showcases, a blog for IT resources, a booking system for consultations, and a contact form. The platform focuses on Microsoft 365, Azure, and Enterprise Identity Management solutions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Theme System**: next-themes for dark/light mode support

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Layout components in `client/src/components/layout/`
- Section components for the homepage in `client/src/components/sections/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **API Design**: RESTful JSON API with `/api` prefix

The server handles:
- Contact form submissions with email notifications (nodemailer)
- Blog post retrieval and management
- Service booking with availability slots
- Input sanitization using XSS library for security

### Data Storage
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Schema Location**: `shared/schema.ts` (shared between client and server)

Key database tables:
- `users` - User authentication
- `contacts` - Contact form submissions
- `blogPosts` - Blog content with categories and tags
- `services` - Bookable consultation services
- `availabilitySlots` - Available time slots for bookings
- `bookings` - Customer appointment bookings
- `blockedDates` - Dates unavailable for booking

### Build and Development
- Development: `npm run dev` - Runs Vite dev server with HMR
- Production build: `npm run build` - Builds frontend with Vite, bundles server with esbuild
- Database migrations: `npm run db:push` - Pushes schema changes via Drizzle Kit

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL (`@neondatabase/serverless`)
- Connection via `DATABASE_URL` environment variable

### Email Service
- **Nodemailer**: For sending contact form notifications
- Requires SMTP configuration via environment variables:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
  - `SMTP_USER`, `SMTP_PASS`

### Third-Party UI Libraries
- Radix UI primitives for accessible components
- Embla Carousel for carousel functionality
- Lucide React for icons
- Font Awesome (CDN) for additional icons
- Google Fonts (Inter, Roboto)

### Development Tools
- Replit-specific plugins for development environment
- React Helmet for document head management

## Security Measures

### XSS Protection
- **Sanitization Library**: `xss` package for server-side input sanitization
- **Utility Module**: `server/sanitize.ts` provides sanitization functions:
  - `sanitizeString()` - Strips all HTML tags from user input
  - `sanitizeRichText()` - Allows safe formatting tags (p, br, strong, em, etc.) while blocking scripts
  - `sanitizeObject()` - Sanitizes all string properties of an object

### Protected Endpoints
All user input is sanitized before database storage:
- **Contact form** (`POST /api/contact`) - name, email, phone, company, service, message
- **Blog posts** (`POST /api/blog`) - title, slug, excerpt, content, category, author
- **Services** (`POST/PATCH /api/services`) - name, description, category
- **Bookings** (`POST /api/bookings`) - clientName, clientEmail, clientPhone, clientCompany, notes

### SQL Injection Protection
- **Drizzle ORM**: Uses parameterized queries exclusively - no string interpolation
- All database operations go through the ORM, preventing SQL injection attacks