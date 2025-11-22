# Server-Side Instructions

applyTo: server/**/*

## API Design

### Route Structure
- All API routes are defined in `/server/routes.ts`
- Group related endpoints logically
- Use RESTful conventions:
  - GET: Retrieve resources
  - POST: Create resources
  - PUT/PATCH: Update resources
  - DELETE: Remove resources

### Controllers
- Place controller logic in `/server/controllers`
- Keep controllers thin - delegate business logic to services
- Handle HTTP concerns (request/response) in controllers
- Return appropriate HTTP status codes

### Services
- Business logic goes in `/server/services`
- Services should be database and HTTP agnostic
- Make services testable and reusable
- Handle errors appropriately

### Request/Response Pattern
```typescript
import { Request, Response } from "express";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  value: z.number()
});

export async function myController(req: Request, res: Response) {
  try {
    const data = schema.parse(req.body);
    // Process data
    const result = await myService(data);
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
```

## Database

### Schema Definition
- Database schema is defined in `/shared/schema.ts` using Drizzle ORM
- Keep schema definitions shared between client and server
- Use appropriate PostgreSQL types
- Define foreign keys and constraints

### Queries
- Use Drizzle ORM query builder
- Avoid raw SQL unless necessary
- Use transactions for multi-step operations
- Handle database errors gracefully

### Migrations
- Use `npm run db:push` to push schema changes
- Test migrations in development before production
- Keep migrations backward compatible when possible

## Authentication & Authorization

### Session Management
- Sessions are managed with express-session
- Use memorystore in development, pg-simple for production
- Configure session security options properly
- Set appropriate cookie options

### Passport.js
- Authentication strategies in passport configuration
- Serialize/deserialize user properly
- Protect routes that require authentication
- Return appropriate 401/403 responses

## Middleware

### Custom Middleware
- Place middleware close to where it's used
- Document middleware purpose clearly
- Handle errors in middleware
- Use next() to pass control

### Error Handling
- Central error handling middleware is configured
- Return consistent error response format
- Log errors appropriately
- Don't expose sensitive information in errors

## Logging

- Use the `log()` utility from `./vite`
- Log API requests and responses
- Include timing information
- Don't log sensitive data

## Environment Variables

- Use environment variables for configuration
- Provide defaults for development
- Document required environment variables
- Never commit secrets to the repository

## Security Best Practices

- Validate all user input with Zod schemas
- Sanitize data before database operations
- Use parameterized queries (Drizzle handles this)
- Implement rate limiting for APIs
- Set appropriate CORS policies
- Use HTTPS in production
- Keep dependencies updated

## Performance

- Use database indexes for frequently queried fields
- Implement pagination for large datasets
- Cache responses when appropriate
- Monitor query performance
- Use connection pooling

## Code Organization

```
server/
├── controllers/      # HTTP request handlers
├── services/        # Business logic
├── data/           # Static data files
├── index.ts        # Application entry point
├── routes.ts       # Route definitions
└── vite.ts         # Vite integration
```

## Error Response Format

Maintain consistent error responses:
```typescript
{
  "message": "Human-readable error message",
  "errors": [] // Optional: validation errors
}
```

## API Endpoint Naming

- Use plural nouns for resources: `/api/users`, `/api/posts`
- Use kebab-case for multi-word resources: `/api/prayer-times`
- Nest resources logically: `/api/users/:id/posts`
- Use query parameters for filtering/sorting

## Best Practices

- Keep functions small and focused
- Write self-documenting code
- Use TypeScript types for request/response
- Handle all error cases
- Return appropriate status codes
- Implement proper logging
- Follow the existing code patterns
