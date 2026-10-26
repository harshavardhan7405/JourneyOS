import { getSupabaseServiceClient } from '@/lib/supabase/service';
import type { Database, Programme, Destination, ItineraryItem, Registration, Announcement, PaymentOrder } from '@/db/types';
import { AppError } from '@/lib/utils/errors';

const client = () => getSupabaseServiceClient();

/**
 * Query programmes with filtering, sorting, and pagination.
 */
export const queryProgrammes = async (params: {
  search?: string;
  destinationId?: string;
  durationMin?: number;
  ageMin?: number;
  ageMax?: number;
  sortBy: 'price' | 'title' | 'created_at';
  order: 'asc' | 'desc';
  page: number;
  limit: number;
}): Promise<{ items: Programme[]; count: number }> => {
  let query = client().from('programmes').select('*', { count: 'exact' });

  // Public search filter — safe defaults only
  if (params.search) {
    query = query.ilike('title', `%${params.search}%`);
  }
  if (params.destinationId) {
    query = query.eq('destination_id', params.destinationId);
  }
  if (params.durationMin !== undefined) {
    query = query.gte('duration_weeks', params.durationMin);
  }
  if (params.ageMin !== undefined) {
    query = query.gte('age_min', params.ageMin);
  }
  if (params.ageMax !== undefined) {
    query = query.lte('age_max', params.ageMax);
  }

  // Sorting
  switch (params.sortBy) {
    case 'price':
      query = query.order('price_cents', { ascending: params.order === 'asc' });
      break;
    case 'title':
      query = query.order('title', { ascending: params.order === 'asc' });
      break;
    default:
      query = query.order('created_at', { ascending: params.order === 'asc' });
  }

  // Pagination
  query = query.range(
    (params.page - 1) * params.limit,
    params.page * params.limit - 1
  );

  const { data, count, error } = await query;
  if (error) {
    throw new AppError(500, error.message, 500);
  }

  return { items: (data as Programme[]) ?? [], count: count ?? 0 };
};

/**
 * Get a single programme by ID.
 */
export const getProgrammeById = async (id: string): Promise<Programme> => {
  const { data, error } = await client().from('programmes').select('*').eq('id', id).single();
  if (error || !data) {
    throw new AppError(404, `Programme not found`, 404);
  }
  return data as Programme;
};

/**
 * Create a new programme (admin only).
 */
export const createProgramme = async (input: any): Promise<Programme> => {
  const { data, error } = await client()
    .from('programmes')
    .insert({
      title: input.title,
      description: input.description ?? null,
      destination_id: input.destinationId ?? null,
      duration_weeks: input.durationWeeks,
      age_min: input.ageMin,
      age_max: input.ageMax,
      price_cents: input.priceCents,
      currency: input.currency,
      availability: input.availability,
      start_date: input.startDate,
      end_date: input.endDate,
      learning_outcomes: input.learningOutcomes,
      what_included: input.whatIncluded ?? [],
    })
    .select()
    .single();

  if (error) throw error;
  return data as Programme;
};

/**
 * Update an existing programme (admin only).
 */
export const updateProgramme = async (id: string, updates: any): Promise<Programme> => {
  const { data, error } = await client()
    .from('programmes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Programme;
};

/**
 * Get itinerary items for a programme.
 */
export const getItineraryItems = async (programmeId: string): Promise<ItineraryItem[]> => {
  const { data, error } = await client()
    .from('itinerary_items')
    .select('*')
    .eq('programme_id', programmeId);

  if (error) throw error;
  return (data as ItineraryItem[]) ?? [];
};

/**
 * Add itinerary item to a programme.
 */
export const addItineraryItem = async (input: {
  programmeId: string;
  dayNumber: number;
  title: string;
  description?: string;
  activities?: string[];
}) => {
  const { data, error } = await client()
    .from('itinerary_items')
    .insert({
      programme_id: input.programmeId,
      day_number: input.dayNumber,
      title: input.title,
      description: input.description ?? null,
      activities: input.activities ?? [],
    })
    .select()
    .single();

  if (error) throw error;
  return data as ItineraryItem;
};

/**
 * Delete an itinerary item.
 */
export const deleteItineraryItem = async (id: string): Promise<void> => {
  const { error } = await client().from('itinerary_items').delete().eq('id', id);
  if (error) throw error;
};

/**
 * Query registrations for a user (parent portal or admin).
 */
export const queryRegistrationsForUser = async (userId: string, opts: { page: number; limit: number } = { page: 1, limit: 20 }) => {
  const { data, count, error } = await client()
    .from('registrations')
    .select('*, profile:profiles!user_id(full_name, avatar_url)', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range((opts.page - 1) * opts.limit, opts.page * opts.limit - 1);

  if (error) throw error;
  return { data: (data as any[]) ?? [], count: count ?? 0 };
};

/**
 * Query registrations by student ID (for student portal).
 */
export const queryRegistrationsByStudent = async (studentId: string, opts: { page: number; limit: number } = { page: 1, limit: 20 }) => {
  const { data, count, error } = await client()
    .from('registrations')
    .select('*, profile:profiles!user_id(full_name, avatar_url)', { count: 'exact' })
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
    .range((opts.page - 1) * opts.limit, opts.page * opts.limit - 1);

  if (error) throw error;
  return { data: (data as any[]) ?? [], count: count ?? 0 };
};

/**
 * Query all registrations (admin dashboard).
 */
export const queryAllRegistrations = async (opts: { page: number; limit: number } = { page: 1, limit: 20 }) => {
  const { data, count, error } = await client()
    .from('registrations')
    .select('*, profile:profiles!user_id(full_name, email, avatar_url), programme:programmes!programme_id(title)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((opts.page - 1) * opts.limit, opts.page * opts.limit - 1);

  if (error) throw error;
  return { data: (data as any[]) ?? [], count: count ?? 0 };
};

/**
 * Query destinations for public listing.
 */
export const queryDestinations = async (opts: { search?: string } = {}) => {
  let query = client().from('destinations').select('*', { count: 'exact' });
  if (opts.search) {
    query = query.ilike('name', `%${opts.search}%`);
  }
  const { data, count, error } = await query;
  if (error) throw error;
  return { items: (data as Destination[]) ?? [], count: count ?? 0 };
};

/**
 * Query announcements.
 */
export const queryAnnouncements = async (opts: { page: number; limit: number } = { page: 1, limit: 20 }) => {
  const { data, count, error } = await client()
    .from('announcements')
    .select('*, profile:profiles!created_by(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((opts.page - 1) * opts.limit, opts.page * opts.limit - 1);

  if (error) throw error;
  return { items: (data as Announcement[]) ?? [], count: count ?? 0 };
};

/**
 * Query announcements for a specific user.
 */
export const queryUserAnnouncements = async (userId: string, unreadOnly = false) => {
  let query = client()
    .from('announcement_recipients')
    .select('*, announcement:announcements(*)')
    .eq('user_id', userId);

  if (unreadOnly) {
    query = query.eq('read', false);
  }

  const { data, error } = await query.order('created_at', { ascending: false }).limit(50);
  if (error) throw error;
  return (data as any[]) ?? [];
};

/**
 * Mark announcement as read.
 */
export const markAnnouncementRead = async (announcementId: string, userId: string): Promise<void> => {
  const { error } = await client()
    .from('announcement_recipients')
    .upsert({
      announcement_id: announcementId,
      user_id: userId,
      read: true,
      read_at: new Date().toISOString(),
    }, { onConflict: 'announcement_id,user_id' });

  if (error) throw error;
};

/**
 * Create announcement.
 */
export const createAnnouncement = async (userId: string, title: string, content: string): Promise<any> => {
  const { data, error } = await client()
    .from('announcements')
    .insert({ title, content, created_by: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Query payment orders (admin and parent portals).
 */
export const queryPaymentOrders = async (userId: string, opts: { page: number; limit: number } = { page: 1, limit: 20 }) => {
  const { data, count, error } = await client()
    .from('payment_orders')
    .select('*, registration:registrations(*)', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range((opts.page - 1) * opts.limit, opts.page * opts.limit - 1);

  if (error) throw error;
  return { items: (data as PaymentOrder[]) ?? [], count: count ?? 0 };
};

/**
 * Check if a user is an administrator.
 */
export const isAdmin = async (profileId: string): Promise<boolean> => {
  const { data } = await client().from('profiles').select('role').eq('id', profileId).single();
  return (data as any)?.role === 'admin';
};

/**
 * Get the full details of a user including their parent-student relationships.
 */
export const getUserWithRelationships = async (profileId: string): Promise<any> => {
  const { data, error } = await client()
    .from('profiles')
    .select('*, parent_student_relationships(student_id, student:profiles(full_name, email, avatar_url))')
    .eq('id', profileId)
    .single();

  if (error || !data) {
    throw new AppError(404, 'User not found', 404);
  }
  return data as any;
};

/**
 * Check if a parent has access to a student.
 */
export const hasParentAccessToStudent = async (parentId: string, studentId: string): Promise<boolean> => {
  const { data } = await client()
    .from('parent_student_relationships')
    .select('*')
    .eq('parent_id', parentId)
    .eq('student_id', studentId)
    .maybeSingle();
  return !!data;
};
