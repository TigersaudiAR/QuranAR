// User Roles
export const UserRole = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// Memorization Set Types
export const SetType = {
  SURAH: 'SURAH',
  PAGE: 'PAGE',
} as const;

export type SetType = typeof SetType[keyof typeof SetType];

// Memorization Status
export const MemorizationStatus = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  MASTERED: 'MASTERED',
} as const;

export type MemorizationStatus = typeof MemorizationStatus[keyof typeof MemorizationStatus];

// Assignment Status
export const AssignmentStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  OVERDUE: 'OVERDUE',
} as const;

export type AssignmentStatus = typeof AssignmentStatus[keyof typeof AssignmentStatus];

// Halaqah Member Role
export const HalaqahMemberRole = {
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const;

export type HalaqahMemberRole = typeof HalaqahMemberRole[keyof typeof HalaqahMemberRole];
