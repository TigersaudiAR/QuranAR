# Quran Platform - Full-Stack Monorepo

A comprehensive platform for Quran study, memorization tracking, and educational content management.

## Features

### Backend
- **Authentication**: JWT-based authentication with role-based access control (Admin, Teacher, Student)
- **User Management**: Complete CRUD operations for user accounts
- **Memorization Tracking**: Create and manage memorization sets with progress tracking
- **Halaqat (Study Circles)**: Teachers can create study circles, assign tasks, and track student progress
- **Educational Content**: Manage lessons for Tajweed, Arabic, and Fiqh
- **Dhikr Management**: Database of daily supplications with categories

### Frontend
- **Mushaf Viewer**: Full-screen Quran page viewer with keyboard navigation
- **Admin Dashboard**: Comprehensive admin panel for managing users, lessons, and halaqat
- **Memorization Dashboard**: Track personal memorization progress
- **Halaqat Section**: Teacher and student views for study circles
- **Educational Pages**: Browse Tajweed, Arabic, and Fiqh lessons
- **Dhikr Counter**: Interactive counter for daily adhkar with progress tracking

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT (jsonwebtoken) + bcryptjs

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (RTL support)
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)

## Database Schema

- **User**: id, email, password, name, role (admin/teacher/student)
- **MemorizationSet**: title, type (surah/page), userId
- **MemorizationItem**: status, masteryLevel, nextReviewDate
- **Halaqah**: name, teacherId, description, schedule
- **HalaqahMember**: halaqahId, userId, role
- **Assignment**: halaqahId, userId, range, dueDate, status
- **SessionLog**: halaqahId, date, studentLogs (JSON)
- **Lesson**: title, category, content (JSON)
- **Dhikr**: title, arabicText, transliteration, translation, category

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd QuranAR
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed initial data (includes admin user and sample content)
npm run db:seed
```

4. Add Quran page images (optional):
```bash
# Create directory for Quran page images
mkdir -p client/public/quran

# Place Quran page images (001.jpg to 604.jpg) in client/public/quran/
# Images should be named as 001.jpg, 002.jpg, ..., 604.jpg
# If images are not added, placeholder will be shown
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Default Test Accounts

After seeding, the following test accounts are available:

- **Admin**: 
  - Email: `admin@quran.com`
  - Password: `admin123`

- **Teacher**: 
  - Email: `teacher@quran.com`
  - Password: `teacher123`

- **Student**: 
  - Email: `student@quran.com`
  - Password: `student123`

## Project Structure

```
QuranAR/
├── client/                 # Frontend React application
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── contexts/       # React contexts (Auth)
│       ├── pages/          # Page components
│       ├── hooks/          # Custom React hooks
│       └── lib/            # Utilities
├── server/                 # Backend Express application
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── db.ts              # Prisma client instance
│   ├── constants.ts       # Type definitions
│   └── routes.ts          # API routes
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Prisma schema
│   ├── migrations/        # Database migrations
│   └── seed.ts            # Database seeder
└── package.json           # Dependencies and scripts
```

## Features Not Implemented

For a complete implementation, you may want to add:
- **Quran page images**: The application expects 604 Quran page images (001.jpg to 604.jpg) in `client/public/quran/pages/` directory. These images are not included in the repository due to licensing and file size. You can:
  - Use images from open-source Quran projects (check licensing)
  - Generate images from Quran text using Arabic fonts
  - Use images from https://quran.com or similar sources (with permission)
  - Place fallback placeholder images if actual Quran images are unavailable
- More comprehensive admin CRUD interfaces
- Real-time updates for halaqat sessions
- File upload for profile pictures
- Email notifications
- Advanced search and filtering
- Detailed analytics and reports

## License

MIT

## Credits

Developed for Quran study and Islamic education.
