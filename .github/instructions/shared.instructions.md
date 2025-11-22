# Shared Code Instructions

applyTo: shared/**/*

## Purpose

The `/shared` directory contains code that is used by both the client and server. This ensures type safety and consistency across the full stack.

## Schema Definitions

### Drizzle ORM Schemas
- Database table schemas are defined here using Drizzle ORM
- These schemas are used for:
  - Database operations on the server
  - Type inference for TypeScript
  - Generating types for the client

### Zod Validation Schemas
- Define Zod schemas for data validation
- Use these schemas on both client (form validation) and server (API validation)
- Derive TypeScript types from Zod schemas when possible

## Best Practices

### Type Definitions
- Define shared types and interfaces here
- Export types that are used in multiple places
- Keep types close to their related schemas

### Example Schema Pattern
```typescript
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Database schema
export const myTable = pgTable("my_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schemas for validation
export const insertMyTableSchema = createInsertSchema(myTable);
export const selectMyTableSchema = createSelectSchema(myTable);

// Custom validation schema with additional rules
export const createMyTableSchema = insertMyTableSchema.omit({ 
  id: true, 
  createdAt: true 
}).extend({
  name: z.string().min(1).max(100),
});

// TypeScript types
export type MyTable = typeof myTable.$inferSelect;
export type NewMyTable = typeof myTable.$inferInsert;
```

### Naming Conventions
- Table names: snake_case (database convention)
- Schema exports: camelCase with descriptive suffixes
  - `insertXSchema` - for insert operations
  - `selectXSchema` - for select operations
  - `createXSchema` - for creation with custom validation
  - `updateXSchema` - for updates with custom validation

### Constants and Enums
- Define shared constants here
- Use `as const` for literal types
- Document the purpose of constants

## Guidelines

### What Belongs in Shared
- Database schemas (Drizzle)
- Validation schemas (Zod)
- Type definitions used by both client and server
- Shared constants and enums
- Utility types

### What Doesn't Belong in Shared
- Client-specific UI logic
- Server-specific business logic
- Framework-specific code
- API client functions
- Database query implementations

## Validation

- Always provide validation schemas for user input
- Use Zod's built-in validators (email, url, etc.)
- Add custom validation rules as needed
- Keep validation rules DRY by reusing schemas

## Type Safety

- Leverage TypeScript's type inference from schemas
- Avoid manual type definitions when they can be inferred
- Use `$inferSelect` and `$inferInsert` from Drizzle
- Use `z.infer<typeof schema>` for Zod types

## Modifications

When modifying shared schemas:
- Consider impact on both client and server
- Update related validation schemas
- Check for breaking changes
- Test both client and server after changes

## Documentation

- Document complex schemas with comments
- Explain non-obvious validation rules
- Note any database constraints or relationships
- Keep documentation up-to-date with changes
