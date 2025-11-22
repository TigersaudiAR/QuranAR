# API Documentation

## Base URL
All API endpoints are relative to: `http://localhost:5000/api`

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "role": "STUDENT" // Optional: ADMIN, TEACHER, or STUDENT (default)
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "role": "STUDENT"
  }
}
```

#### POST /auth/login
Login to an existing account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** Same as register

#### GET /auth/me
Get current user information (requires authentication).

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "role": "STUDENT",
    "createdAt": "2025-11-22T03:00:00.000Z"
  }
}
```

---

### Admin Endpoints (Require ADMIN role)

#### GET /admin/users
List all users.

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "User Name",
      "role": "STUDENT",
      "createdAt": "2025-11-22T03:00:00.000Z"
    }
  ]
}
```

#### POST /admin/users
Create a new user.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "role": "STUDENT"
}
```

#### PUT /admin/users/:id
Update a user.

**Request Body:**
```json
{
  "email": "updated@example.com",
  "name": "Updated Name",
  "role": "TEACHER",
  "password": "newpassword" // Optional
}
```

#### DELETE /admin/users/:id
Delete a user.

#### GET /admin/lessons
List all lessons.

**Query Parameters:**
- `category` (optional): Filter by category (tajweed, arabic, fiqh)

#### POST /admin/lessons
Create a new lesson.

**Request Body:**
```json
{
  "title": "Lesson Title",
  "category": "tajweed",
  "content": "{\"introduction\": \"...\", \"sections\": [...]}",
  "orderIndex": 1
}
```

#### PUT /admin/lessons/:id
Update a lesson.

#### DELETE /admin/lessons/:id
Delete a lesson.

#### GET /admin/halaqat
List all halaqat.

#### DELETE /admin/halaqat/:id
Delete a halaqah.

---

### Memorization Endpoints (Require authentication)

#### GET /memorization/sets
Get all memorization sets for the current user.

**Response:**
```json
{
  "sets": [
    {
      "id": 1,
      "title": "Juz 30",
      "type": "SURAH",
      "userId": 1,
      "createdAt": "2025-11-22T03:00:00.000Z",
      "items": [...]
    }
  ]
}
```

#### GET /memorization/sets/:id
Get a specific memorization set.

#### POST /memorization/sets
Create a new memorization set.

**Request Body:**
```json
{
  "title": "My Set",
  "type": "SURAH" // or "PAGE"
}
```

#### PUT /memorization/sets/:id
Update a memorization set.

**Request Body:**
```json
{
  "title": "Updated Title",
  "type": "PAGE"
}
```

#### DELETE /memorization/sets/:id
Delete a memorization set.

#### POST /memorization/sets/:setId/items
Add an item to a memorization set.

**Request Body:**
```json
{
  "surahNumber": 114,
  "pageNumber": null,
  "verseRange": "1-6",
  "status": "NEW",
  "masteryLevel": 0,
  "nextReviewDate": "2025-11-23T00:00:00.000Z"
}
```

#### PUT /memorization/items/:itemId
Update a memorization item.

**Request Body:**
```json
{
  "status": "MASTERED",
  "masteryLevel": 5,
  "nextReviewDate": "2025-11-30T00:00:00.000Z"
}
```

#### DELETE /memorization/items/:itemId
Delete a memorization item.

---

### Halaqat Endpoints (Require authentication)

#### GET /halaqat
Get halaqat for the current user (as teacher or student).

**Response:**
```json
{
  "halaqat": [
    {
      "id": 1,
      "name": "Evening Circle",
      "teacherId": 2,
      "description": "Daily evening study",
      "schedule": "Every day at 8 PM",
      "teacher": {
        "id": 2,
        "name": "Teacher Name",
        "email": "teacher@example.com"
      },
      "members": [...],
      "_count": {
        "members": 10,
        "assignments": 5
      }
    }
  ]
}
```

#### GET /halaqat/:id
Get a specific halaqah.

#### POST /halaqat
Create a new halaqah (Teacher/Admin only).

**Request Body:**
```json
{
  "name": "Morning Circle",
  "description": "Morning memorization circle",
  "schedule": "Daily at 6 AM"
}
```

#### PUT /halaqat/:id
Update a halaqah.

#### POST /halaqat/:id/members
Add a member to a halaqah.

**Request Body:**
```json
{
  "userId": 3,
  "role": "STUDENT"
}
```

#### DELETE /halaqat/:id/members/:memberId
Remove a member from a halaqah.

#### POST /halaqat/:id/assignments
Create an assignment.

**Request Body:**
```json
{
  "userId": 3,
  "rangeStart": "Surah Al-Fatiha",
  "rangeEnd": "Surah Al-Baqarah verse 10",
  "dueDate": "2025-11-30T00:00:00.000Z",
  "notes": "Focus on tajweed"
}
```

#### GET /assignments
Get assignments for the current user.

**Response:**
```json
{
  "assignments": [
    {
      "id": 1,
      "halaqahId": 1,
      "userId": 3,
      "rangeStart": "Surah Al-Fatiha",
      "rangeEnd": "Surah Al-Baqarah verse 10",
      "dueDate": "2025-11-30T00:00:00.000Z",
      "status": "PENDING",
      "notes": "Focus on tajweed",
      "halaqah": {
        "id": 1,
        "name": "Evening Circle",
        "teacher": {...}
      }
    }
  ]
}
```

#### PUT /assignments/:assignmentId
Update an assignment.

**Request Body:**
```json
{
  "status": "COMPLETED",
  "notes": "Completed successfully"
}
```

#### POST /halaqat/:id/session-logs
Create a session log (Teacher only).

**Request Body:**
```json
{
  "date": "2025-11-22T20:00:00.000Z",
  "studentLogs": [
    {
      "studentId": 3,
      "attendance": true,
      "progress": "Good",
      "notes": "Memorized verses well"
    }
  ],
  "notes": "Great session overall"
}
```

#### GET /halaqat/:id/session-logs
Get session logs for a halaqah.

---

### Lessons Endpoints (Public)

#### GET /lessons
Get all lessons.

**Query Parameters:**
- `category` (optional): Filter by category (tajweed, arabic, fiqh)

**Response:**
```json
{
  "lessons": [
    {
      "id": 1,
      "title": "Introduction to Tajweed",
      "category": "tajweed",
      "content": "{...}",
      "orderIndex": 1,
      "createdAt": "2025-11-22T03:00:00.000Z"
    }
  ]
}
```

#### GET /lessons/:id
Get a specific lesson.

---

### Dhikr Endpoints (Public)

#### GET /dhikr
Get all adhkar.

**Query Parameters:**
- `category` (optional): Filter by category (morning, evening, general)

**Response:**
```json
{
  "adhkar": [
    {
      "id": 1,
      "title": "Morning Tasbih",
      "arabicText": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      "transliteration": "Subhana Allahi wa bihamdihi",
      "translation": "Glory be to Allah and praise Him",
      "category": "morning",
      "repetitions": 100,
      "reference": "Sahih Muslim",
      "orderIndex": 1,
      "createdAt": "2025-11-22T03:00:00.000Z"
    }
  ]
}
```

#### GET /dhikr/:id
Get a specific dhikr.

---

## Error Responses

All endpoints may return the following error responses:

**401 Unauthorized:**
```json
{
  "message": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "message": "Insufficient permissions"
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Internal server error"
}
```
