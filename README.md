# QuranAR - Islamic Learning Platform

A comprehensive web-based platform for Quran study, memorization tracking, and Islamic educational content management.

## Features

### Backend (Port 4000)
- **Authentication**: JWT-based authentication with role-based access control (Admin, Teacher, Student)
- **User Management**: Complete CRUD operations for user accounts
- **Memorization Tracking**: Create and manage memorization sets with progress tracking
- **Halaqat (Study Circles)**: Teachers can create study circles, assign tasks, and track student progress
- **Educational Content**: Manage lessons for Tajweed, Arabic, and Fiqh
- **Dhikr Management**: Database of daily supplications with categories

### Frontend (Port 5173)
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
- **Port**: 4000

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Port**: 5173

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

3. Set up the backend database:
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run seed
cd ..
```

4. Add Quran page images (IMPORTANT):
```bash
# Place Quran page images in frontend/public/quran/
# Images should be named: 001.jpg, 002.jpg, ..., 604.jpg
# Example: frontend/public/quran/001.jpg
```

5. Start the development servers:
```bash
# From the root directory
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

### Default Test Account

After seeding, the following admin account is available:

- **Admin**: 
  - Email: `admin@example.com`
  - Password: `Admin123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)

### Admin (Admin only)
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/lessons` - List all lessons
- `POST /api/admin/lessons` - Create lesson
- `PUT /api/admin/lessons/:id` - Update lesson
- `DELETE /api/admin/lessons/:id` - Delete lesson
- `GET /api/admin/categories` - List lesson categories
- `POST /api/admin/categories` - Create category
- `GET /api/admin/dhikr` - List all adhkar
- `POST /api/admin/dhikr` - Create dhikr
- `PUT /api/admin/dhikr/:id` - Update dhikr
- `DELETE /api/admin/dhikr/:id` - Delete dhikr
- `GET /api/admin/halaqat` - List all halaqat
- `DELETE /api/admin/halaqat/:id` - Delete halaqah

### Memorization (Protected)
- `GET /api/memorization/sets` - Get user's memorization sets
- `GET /api/memorization/sets/:id` - Get specific set
- `POST /api/memorization/sets` - Create new set
- `PUT /api/memorization/sets/:id` - Update set
- `DELETE /api/memorization/sets/:id` - Delete set
- `POST /api/memorization/sets/:setId/items` - Add item to set
- `PUT /api/memorization/items/:itemId` - Update item
- `DELETE /api/memorization/items/:itemId` - Delete item

### Halaqat (Protected)
- `GET /api/halaqat` - Get user's halaqat
- `GET /api/halaqat/:id` - Get specific halaqah
- `POST /api/halaqat` - Create halaqah (Teacher/Admin only)
- `PUT /api/halaqat/:id` - Update halaqah
- `POST /api/halaqat/:id/members` - Add member
- `DELETE /api/halaqat/:id/members/:memberId` - Remove member
- `POST /api/halaqat/:id/assignments` - Create assignment
- `GET /api/halaqat/assignments/me` - Get user's assignments
- `PUT /api/halaqat/assignments/:assignmentId` - Update assignment
- `POST /api/halaqat/:id/session-logs` - Create session log
- `GET /api/halaqat/:id/session-logs` - Get session logs

## Available Scripts

### Root
- `npm run dev` - Start both frontend and backend concurrently
- `npm run build` - Build both frontend and backend
- `npm run start` - Start production backend server

### Backend (in backend/ directory)
- `npm run dev` - Start backend development server
- `npm run build` - Build backend for production
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run seed` - Seed database with initial data

### Frontend (in frontend/ directory)
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

## Project Structure

```
QuranAR/
├── frontend/               # Frontend React application
│   ├── public/
│   │   └── quran/         # Place Quran page images here (001.jpg - 604.jpg)
│   ├── src/
│   │   ├── components/    # Reusable components (ProtectedRoute, DhikrCounter)
│   │   ├── pages/         # Page components
│   │   ├── utils/         # API client and utilities
│   │   ├── data/          # Static JSON data files
│   │   ├── App.tsx        # Main app component with routing
│   │   └── main.tsx       # Application entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.ts     # Vite configuration
├── backend/               # Backend Express application
│   ├── src/
│   │   ├── routes/        # API routes (auth, admin, memorization, halaqat)
│   │   ├── middleware/    # Authentication middleware
│   │   └── index.ts       # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma  # Prisma schema
│   │   ├── seed.ts        # Database seeder
│   │   └── dev.db         # SQLite database (generated)
│   └── package.json       # Backend dependencies
└── package.json           # Root workspace configuration
```

## Adding Quran Images

The application requires Quran page images to display in the Mushaf viewer. Follow these steps:

1. Obtain high-quality Quran page images (604 pages total)
2. Name the images sequentially: `001.jpg`, `002.jpg`, ..., `604.jpg`
3. Place all images in the `frontend/public/quran/` directory
4. Ensure images are in JPG format
5. Recommended resolution: At least 1200px width for good quality

The Mushaf viewer will automatically load these images when navigating through pages.

## License

MIT

## Credits

Developed for Quran study and Islamic education.
