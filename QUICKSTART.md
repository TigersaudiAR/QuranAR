# Quick Start Guide

## Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
```bash
# Generate Prisma client
npm run db:generate

# Run migrations to create tables
npm run db:migrate

# Seed database with test data
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:5000**

### 4. Login with Test Accounts

The database is pre-seeded with three test accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@quran.com | admin123 |
| Teacher | teacher@quran.com | teacher123 |
| Student | student@quran.com | student123 |

## Quick Tour

### For All Users

1. **Login** - Visit http://localhost:5000/login
2. **Mushaf Viewer** - Visit http://localhost:5000/mushaf to view Quran pages
3. **Dhikr Counter** - Visit http://localhost:5000/dhikr to track daily adhkar
4. **Educational Content** - Visit http://localhost:5000/educational to browse lessons

### For Students

1. **Memorization** - Visit http://localhost:5000/memorization to track your progress
2. **Halaqat** - Visit http://localhost:5000/halaqat to view your study circles and assignments

### For Teachers

1. **Halaqat** - Visit http://localhost:5000/halaqat to manage your study circles
   - Create new circles
   - Add students
   - Assign tasks
   - Log sessions

### For Admins

1. **Admin Dashboard** - Visit http://localhost:5000/admin to:
   - Manage users
   - Create/edit lessons
   - View all halaqat
   - Monitor platform activity

## Testing the API

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@quran.com","password":"student123"}'
```

### Get Dhikr
```bash
curl http://localhost:5000/api/dhikr
```

### Get Lessons (with category filter)
```bash
curl http://localhost:5000/api/lessons?category=tajweed
```

### Protected Endpoint (requires token)
```bash
# First get a token from login
TOKEN="your-jwt-token-here"

# Then use it in requests
curl http://localhost:5000/api/memorization/sets \
  -H "Authorization: Bearer $TOKEN"
```

## Common Tasks

### Creating a New User (as Admin)
```bash
curl -X POST http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@quran.com",
    "password": "password123",
    "name": "New User",
    "role": "STUDENT"
  }'
```

### Creating a Halaqah (as Teacher)
```bash
curl -X POST http://localhost:5000/api/halaqat \
  -H "Authorization: Bearer $TEACHER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Morning Circle",
    "description": "Daily morning memorization",
    "schedule": "Every day at 6 AM"
  }'
```

### Creating a Memorization Set
```bash
curl -X POST http://localhost:5000/api/memorization/sets \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Juz 30",
    "type": "SURAH"
  }'
```

## Project Structure Overview

```
QuranAR/
├── client/src/          # Frontend React app
│   ├── pages/           # Page components
│   │   ├── LoginPage.tsx
│   │   ├── MushafPage.tsx
│   │   ├── DhikrPage.tsx
│   │   ├── EducationalPage.tsx
│   │   ├── AdminPage.tsx
│   │   ├── HalaqatPage.tsx
│   │   └── MemorizationPage.tsx
│   ├── contexts/        # Auth context
│   └── components/      # Reusable components
│
├── server/              # Backend Express app
│   ├── controllers/     # API controllers
│   │   ├── authController.ts
│   │   ├── adminController.ts
│   │   ├── memorizationController.ts
│   │   ├── halaqatController.ts
│   │   ├── lessonsController.ts
│   │   └── dhikrController.ts
│   ├── middleware/      # Auth middleware
│   └── routes.ts        # API routes
│
└── prisma/              # Database
    ├── schema.prisma    # Database schema
    └── seed.ts          # Seed script
```

## Next Steps

1. **Add Quran Images** - Place Quran page images (001.jpg to 604.jpg) in `public/quran/pages/`
2. **Customize Lessons** - Use the admin panel to add more educational content
3. **Create Halaqat** - Teachers can start creating study circles
4. **Invite Users** - Register new students and teachers

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, you can either:
1. Stop the process using port 5000
2. Change the port in `server/index.ts` (line 62)

### Database Issues
If you encounter database issues:
```bash
# Reset database
rm prisma/dev.db

# Re-run migrations and seed
npm run db:migrate
npm run db:seed
```

### Authentication Issues
Make sure you're including the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

The token is returned when you login or register.

## Support

For more detailed information, see:
- [README.md](README.md) - Full documentation
- [API.md](API.md) - Complete API reference
