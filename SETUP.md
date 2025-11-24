# Quran Platform - Detailed Setup Guide

This guide provides detailed instructions for setting up and running the Quran Platform monorepo.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **Git**: For cloning the repository

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd QuranAR
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies for both the frontend and backend.

### 3. Initialize the Database

The project uses SQLite with Prisma ORM. Initialize the database:

```bash
# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed initial data (creates test users, lessons, and dhikr)
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5000`

## Project Structure

```
QuranAR/
├── frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities and types
│   │   └── data/          # Static JSON data files
│   ├── public/            # Static assets
│   │   └── quran/pages/  # Quran page images (add manually)
│   └── index.html
├── backend/               # Express + TypeScript
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Auth and other middleware
│   ├── services/          # Business logic
│   └── routes.ts          # API routes
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Migration history
│   └── seed.ts          # Database seeder
└── shared/               # Shared types between frontend/backend
```

## Configuration Files

### package.json

Contains scripts and dependencies. Key scripts:
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run check` - TypeScript type checking
- `npm run db:*` - Database commands

### tsconfig.json

TypeScript configuration. Paths are configured for:
- `@/*` - Maps to `frontend/src/*`
- `@shared/*` - Maps to `shared/*`

### vite.config.ts

Vite bundler configuration for the frontend.

### tailwind.config.ts

Tailwind CSS configuration with custom theme and RTL support.

## Database

### Schema

The database includes the following models:
- **User** - Admin, Teacher, Student roles
- **MemorizationSet** - Personal memorization tracking
- **MemorizationItem** - Individual memorization items
- **Halaqah** - Study circles
- **HalaqahMember** - Circle memberships
- **Assignment** - Tasks assigned to students
- **SessionLog** - Session attendance and progress
- **Lesson** - Educational content (Tajweed, Arabic, Fiqh)
- **Dhikr** - Daily supplications

### Migrations

To create a new migration after changing the schema:

```bash
npx prisma migrate dev --name your_migration_name
```

### Reset Database

To reset the database (WARNING: deletes all data):

```bash
npx prisma migrate reset
```

## Authentication

The application uses JWT-based authentication:

### Test Accounts

After running `npm run db:seed`:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@quran.com | admin123 |
| Teacher | teacher@quran.com | teacher123 |
| Student | student@quran.com | student123 |

### API Authentication

Protected routes require an `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

## Frontend Development

### Component Structure

- **UI Components**: Located in `frontend/src/components/ui/` (shadcn/ui)
- **Feature Components**: Located in `frontend/src/components/`
- **Pages**: Located in `frontend/src/pages/`

### Routing

Uses Wouter for routing. Routes are defined in `frontend/src/App.tsx`.

### State Management

- **TanStack Query (React Query)** - Server state
- **React Context** - Auth state
- **Local State** - Component state with hooks

### Styling

- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Pre-built accessible components
- **RTL Support** - Configured in `frontend/index.html` with `dir="rtl"`

## Backend Development

### API Structure

All API routes are prefixed with `/api`:
- `/api/auth/*` - Authentication
- `/api/admin/*` - Admin operations (Admin only)
- `/api/memorization/*` - Memorization tracking (Protected)
- `/api/halaqat/*` - Study circles (Protected)
- `/api/lessons` - Educational content (Public read)
- `/api/dhikr` - Daily supplications (Public read)

### Adding a New Route

1. Create controller in `backend/controllers/`
2. Add route in `backend/routes.ts`
3. Add middleware if needed

Example:
```typescript
// backend/controllers/myController.ts
export const myController = {
  async getData(req: Request, res: Response) {
    // Implementation
  }
};

// backend/routes.ts
import { myController } from "./controllers/myController";
app.get("/api/my-route", myController.getData);
```

## Adding Quran Page Images

The Mushaf viewer expects Quran page images:

1. Obtain high-quality Quran page images (recommended sources in `frontend/public/quran/pages/README.md`)
2. Name them `001.jpg` through `604.jpg`
3. Place in `frontend/public/quran/pages/`

The Mushaf viewer automatically handles navigation and localStorage for progress.

## Building for Production

### Build

```bash
npm run build
```

This creates:
- `dist/public/` - Frontend static files
- `dist/index.js` - Backend server bundle

### Run Production Build

```bash
npm run start
```

## Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
NODE_ENV=development
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secret-key-here"
PORT=5000
```

## Testing

### Type Checking

```bash
npm run check
```

### Manual Testing

1. Start the dev server: `npm run dev`
2. Open `http://localhost:5000`
3. Login with test accounts
4. Test features:
   - Mushaf viewer (`/mushaf`)
   - Admin dashboard (`/admin`)
   - Memorization tracking (`/memorization`)
   - Halaqat management (`/halaqat`)
   - Educational content (`/learn`)
   - Dhikr counter (`/dhikr`)

## Troubleshooting

### Port Already in Use

If port 5000 is in use, you can either:
1. Stop the process using port 5000
2. Modify `backend/index.ts` to use a different port

### Database Lock

If you get a database lock error:
1. Stop all running instances
2. Delete `prisma/dev.db-journal` if it exists
3. Restart the server

### Build Errors

If you encounter build errors:
1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install` again
3. Run `npm run db:generate` to regenerate Prisma client

### TypeScript Errors

If you get TypeScript errors:
1. Ensure all dependencies are installed
2. Run `npm run db:generate`
3. Check that paths in `tsconfig.json` are correct
4. Restart your IDE's TypeScript server

## Development Tips

### Hot Module Replacement

Vite provides HMR for the frontend. Changes to frontend code will reflect immediately.

### Backend Changes

Backend changes require a server restart. Consider using `nodemon` for auto-restart during development.

### Database Changes

After modifying `prisma/schema.prisma`:
1. Run `npm run db:migrate` to create a migration
2. Run `npm run db:generate` to update the Prisma client

### Code Style

- Use TypeScript for type safety
- Follow existing patterns in the codebase
- Use functional React components
- Prefer `const` over `let`
- Use Tailwind classes for styling

## Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Check the README.md
4. Review the problem statement requirements

## License

MIT
