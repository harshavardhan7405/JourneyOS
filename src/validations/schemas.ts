import { z } from 'zod';

// Programme List Query Schema
export const programmesQuerySchema = z.object({
  search: z.string().optional().default(''),
  destinationId: z.string().optional(),
  durationMin: z.coerce.number().int().min(0).max(52).optional(),
  ageMin: z.coerce.number().int().min(0).optional(),
  ageMax: z.coerce.number().int().min(0).max(100).optional(),
  sortBy: z.enum(['price', 'title', 'created_at']).default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type ProgrammesQueryInput = z.infer<typeof programmesQuerySchema>;

// Single Programme Get Schema
export const programmeGetSchema = z.object({
  id: z.string().min(1),
});

// Programme Create Schema
export const programmeCreateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  destinationId: z.string().optional(),
  durationWeeks: z.number().int().min(1, 'Duration must be at least 1 week').max(52),
  ageMin: z.number().int().min(0, 'Age must be a non-negative number').max(100),
  ageMax: z.number().int().min(0).max(100),
  priceCents: z.number().int().min(1, 'Price must be at least 1 cent').max(1_000_000_00),
  currency: z.string().length(3, 'Currency must be a 3-letter ISO code'),
  availability: z.number().int().min(0, 'Availability cannot be negative').max(100),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  learningOutcomes: z.array(z.string()).min(1, 'At least one learning outcome is required'),
  whatIncluded: z.array(z.string()).default([]),
});

export const createProgrammeSchema = programmeCreateSchema;

export type ProgrammesCreateInput = z.infer<typeof programmeCreateSchema>;

// Programme Update Schema
export const programmeUpdateSchema = programmeCreateSchema.partial();

export type ProgrammesUpdateInput = z.infer<typeof programmeUpdateSchema>;

// Registration Create Schema
export const registrationCreateSchema = z.object({
  programmeId: z.string().uuid(),
  studentId: z.string().uuid(),
});

export type RegistrationsCreateInput = z.infer<typeof registrationCreateSchema>;

// Payment Create Schema (for Razorpay order creation)
export const paymentOrderSchema = z.object({
  registrationId: z.string().min(1),
  amountCents: z.number().int().positive(),
  currency: z.string().length(3),
});

export type PaymentOrderInput = z.infer<typeof paymentOrderSchema>;

// Announcement Create Schema
export const announcementCreateSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export type AnnouncementCreateInput = z.infer<typeof announcementCreateSchema>;

// Error Response Schema — code is REQUIRED so malformed responses are rejected
export const errorResponseSchema = z.object({
  error: z.string(),
  code: z.number().int().min(100).max(599),
  details: z.record(z.string(), z.unknown()).optional(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;