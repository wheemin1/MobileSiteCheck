# Mobile Friendly Test Application

## Overview

This is a full-stack web application built with React and Express that analyzes websites for mobile friendliness. The application uses Google Lighthouse to perform comprehensive mobile optimization analysis, providing users with detailed reports on performance, accessibility, best practices, and SEO. It features a modern UI built with shadcn/ui components and Tailwind CSS.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Query (@tanstack/react-query) for server state
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API Design**: RESTful endpoints with JSON responses
- **Development**: Hot module replacement with Vite integration

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Defined in `shared/schema.ts` with Zod validation
- **Tables**: 
  - `users` - User authentication and profiles
  - `analysis_reports` - Website analysis results with detailed metrics
- **Migrations**: Managed through Drizzle Kit

### Analysis Engine
- **LighthouseService**: Integrates with Google Lighthouse CLI for mobile analysis
- **Metrics Tracked**:
  - Overall mobile friendliness score
  - Performance, accessibility, best practices, and SEO scores
  - Core Web Vitals (LCP, CLS, INP)
  - Mobile-specific checks (viewport, touch targets, text size, content width)
- **Caching**: Results cached to avoid redundant analysis

### Report Generation
- **ReportService**: Generates PDF reports and screenshots using Puppeteer
- **Export Options**: PDF downloads and image exports of analysis results
- **Sharing**: Shareable report links and social media integration

## Data Flow

1. **User Input**: User enters website URL through the input form
2. **Validation**: Frontend validates URL format using Zod schema
3. **Analysis Request**: POST request to `/api/analyze` endpoint
4. **Cache Check**: Backend checks for existing analysis results
5. **Lighthouse Analysis**: If no cache, runs Lighthouse analysis with mobile configuration
6. **Data Processing**: Analysis results processed and stored in database
7. **Response**: Structured analysis report returned to frontend
8. **Visualization**: React components render interactive analysis results
9. **Export Options**: Users can download PDF reports or share results

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **zod**: Schema validation and type inference

### Analysis Dependencies
- **lighthouse**: Google Lighthouse CLI (implied for analysis)
- **puppeteer**: Headless browser for PDF/screenshot generation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **@replit/vite-plugin-***: Replit-specific development plugins

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with HMR
- **Environment**: NODE_ENV=development
- **Database**: Environment variable DATABASE_URL for connection
- **Build Process**: TypeScript compilation with Vite

### Production
- **Build Command**: `npm run build` - Builds both frontend and backend
- **Frontend**: Static files served from `dist/public`
- **Backend**: Compiled to `dist/index.js` with esbuild
- **Start Command**: `npm start` - Runs production server
- **Environment**: NODE_ENV=production

### Database Management
- **Schema Push**: `npm run db:push` - Pushes schema changes to database
- **Migrations**: Stored in `./migrations` directory
- **Connection**: Configured through `drizzle.config.ts`

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```