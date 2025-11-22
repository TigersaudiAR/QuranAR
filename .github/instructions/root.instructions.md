# QuranAR Project Instructions

## Project Overview

QuranAR is an Islamic resources application providing access to the Quran, Azkar (remembrances), Tafseer (interpretation), Qibla direction, and other Islamic features. The application is built with a modern web stack.

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI with Tailwind CSS
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide React and React Icons
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with express-session
- **API**: RESTful endpoints
- **Build Tool**: esbuild

## Code Style and Conventions

### General
- Use TypeScript for all new code
- Follow ESM module syntax (`import/export`)
- Use functional components in React (no class components)
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks and functional expressions

### TypeScript
- Enable strict mode (already configured)
- Always define types/interfaces for function parameters and return values
- Use Zod schemas for runtime validation
- Avoid `any` type - use `unknown` or proper types

### React Components
- Use functional components with hooks
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks
- Use the `@/` alias for client imports
- Use the `@shared/` alias for shared code

### Naming Conventions
- Components: PascalCase (e.g., `HomePage.tsx`, `FeatureCard.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Variables/Functions: camelCase
- Constants: UPPER_SNAKE_CASE for true constants
- Types/Interfaces: PascalCase

### File Organization
- Client code: `/client/src`
  - Components: `/client/src/components`
  - Pages: `/client/src/pages`
  - Hooks: `/client/src/hooks`
  - Utilities: `/client/src/lib`
- Server code: `/server`
  - Routes: `/server/routes.ts`
  - Controllers: `/server/controllers`
  - Services: `/server/services`
- Shared code: `/shared`

## Arabic Language Support

This project includes Arabic (RTL) content. When working with UI:
- Ensure proper RTL layout support
- Use appropriate Arabic typography
- Test RTL rendering for new UI components
- Preserve Arabic text in comments and strings

## Building and Testing

### Development
```bash
npm run dev          # Start development server with hot reload
npm run check        # Run TypeScript type checking
```

### Production Build
```bash
npm run build        # Build both client and server
npm start           # Start production server
```

### Database
```bash
npm run db:push     # Push database schema changes
```

## Important Notes

- Always run `npm run check` to verify TypeScript compilation before committing
- The project uses Vite for development with hot module replacement
- Session management uses memorystore in development
- All API routes should be prefixed with `/api`
- Follow the existing patterns for new features

## Dependencies

- When adding new dependencies, prefer well-maintained packages
- Check for existing similar functionality before adding new packages
- Update package.json only when necessary
- Consider bundle size impact for client dependencies

## Security

- Never commit sensitive data or API keys
- Use environment variables for configuration
- Validate all user inputs with Zod schemas
- Sanitize data before database operations
- Follow security best practices for authentication and session management
