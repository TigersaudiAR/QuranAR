# Client-Side Instructions

applyTo: client/**/*

## UI Component Guidelines

### Component Structure
- Use Radix UI primitives from `@radix-ui/react-*` for accessible components
- Extend with Tailwind CSS classes for styling
- Reusable UI components are in `/client/src/components/ui`
- Feature-specific components go in `/client/src/components`

### Styling
- Use Tailwind CSS utility classes
- Follow the theme defined in `theme.json` and `tailwind.config.ts`
- Use CSS variables for colors (defined in `index.css`)
- Maintain consistent spacing using Tailwind's spacing scale
- Use `cn()` utility from `@/lib/utils` for conditional classes

### State Management
- Use TanStack Query for server state
- Use React hooks (useState, useReducer) for local component state
- Create custom hooks in `/client/src/hooks` for reusable logic
- Avoid prop drilling - use context when appropriate

### Forms
- Use React Hook Form for form management
- Validate with Zod schemas (import from `@shared/schema`)
- Use `@hookform/resolvers/zod` for integration
- Display validation errors inline

### Routing
- Use Wouter's `useRoute` and `useLocation` hooks
- Define routes in the main routing component
- Use `Link` component for navigation
- Implement proper 404 handling

### API Integration
- Use TanStack Query's `useQuery` for GET requests
- Use `useMutation` for POST/PUT/DELETE requests
- Define API functions in service files
- Handle loading and error states properly

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers when possible
- Use Radix UI components which have built-in accessibility

### Performance
- Lazy load routes and heavy components
- Optimize images and assets
- Minimize re-renders with React.memo when appropriate
- Use proper dependency arrays in hooks

## RTL (Right-to-Left) Support

- The application supports Arabic (RTL) content
- Ensure layouts work correctly in RTL mode
- Use logical properties (e.g., `margin-inline-start` instead of `margin-left`)
- Test bidirectional text rendering

## Component Examples

### Good Component Pattern
```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
  className?: string;
}

export function MyComponent({ title, onAction, className }: MyComponentProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
}
```

## Icons
- Use Lucide React for UI icons
- Use React Icons for brand/social icons
- Keep icon sizes consistent (typically h-4 w-4, h-6 w-6, or h-8 w-8)

## Error Handling
- Display user-friendly error messages
- Use toast notifications for feedback
- Implement error boundaries for component errors
- Log errors appropriately

## Best Practices
- Keep components small and focused
- Extract complex logic into custom hooks
- Use TypeScript types for all props
- Write descriptive component and prop names
- Follow existing patterns in the codebase
