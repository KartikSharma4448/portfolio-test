# Kartik Sharma Portfolio Website

## Overview

This is a full-stack portfolio website for Kartik Sharma, a BCA student and aspiring software developer. The application showcases projects, certifications, skills, services, and provides contact functionality. It features a modern, professional design with dark/light theme support, built using React for the frontend and Express for the backend, with PostgreSQL as the database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool:**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)

**UI Component System:**
- Shadcn/ui component library (New York style variant)
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for styling with custom design tokens
- Class Variance Authority (CVA) for component variants

**State Management:**
- TanStack Query (React Query) v5 for server state management
- React Hook Form with Zod validation for form handling
- Local React state for UI-specific state

**Design System:**
- Custom color palette with dark/light mode support
- Professional blue primary color (HSL: 217 91% 60%)
- Success green accent color (HSL: 142 71% 45%)
- Theme system using CSS custom properties
- Design inspired by Linear, Stripe, and Notion aesthetics

**Key Features:**
- Responsive navigation with mobile menu
- Theme toggle (dark/light mode persisted to localStorage)
- Google Analytics integration for page tracking
- Toast notifications for user feedback
- Reusable UI components (buttons, cards, dialogs, forms, etc.)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- ES Modules (type: "module")
- Custom middleware for request logging and JSON parsing

**API Design:**
- RESTful API endpoints under `/api` prefix
- CRUD operations for: projects, certificates, skills, services, social links, contact messages
- Request validation using Zod schemas
- Consistent error handling with appropriate HTTP status codes

**Development Setup:**
- Vite middleware integration for HMR in development
- Static file serving in production
- Separate build processes for client and server
- TSX for TypeScript execution in development

### Data Layer

**Database:**
- PostgreSQL via Neon serverless database
- Drizzle ORM for type-safe database queries
- Database schema defined in `shared/schema.ts`

**Schema Design:**
- **Projects**: title, description, technologies (array), URLs, images, featured flag, ordering
- **Certificates**: title, issuer, issue date, credential info, skills (array)
- **Skills**: name, category (technical/soft/tools/other), proficiency level
- **Services**: title, description, icon name for display
- **Social Links**: platform, URL, icon, handle, ordering
- **Contact Messages**: name, email, message, timestamp

**Data Validation:**
- Drizzle-Zod for generating Zod schemas from database schema
- Type inference for Insert and Select operations
- Shared schemas between client and server for consistency

**Storage Abstraction:**
- IStorage interface defines all data operations
- Supports future implementation of actual database storage
- Currently structured for in-memory or database-backed storage

### External Dependencies

**Third-Party Services:**
- **Neon Database**: Serverless PostgreSQL hosting
- **Google Analytics**: Website analytics and page tracking
- **Google Fonts**: Inter and JetBrains Mono font families

**Key NPM Packages:**
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Neon database client
- **zod**: Runtime type validation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Zod integration for form validation
- **wouter**: Lightweight routing library
- **class-variance-authority**: Type-safe component variants
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **date-fns**: Date manipulation utilities
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality

**Development Tools:**
- **TypeScript**: Static type checking
- **Vite**: Fast build tool and dev server
- **ESBuild**: Fast JavaScript bundler for production
- **Drizzle Kit**: Database migration and schema management
- **TSX**: TypeScript execution for development
- **Replit plugins**: Runtime error overlay, cartographer, dev banner

**UI Component Libraries:**
- **Radix UI**: Comprehensive set of accessible component primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip)
- All components customized with Tailwind CSS and theme variables

**Build & Deployment:**
- Client builds to `dist/public`
- Server bundles to `dist/index.js`
- Environment variables for database connection and analytics
- Production mode uses bundled server with static file serving