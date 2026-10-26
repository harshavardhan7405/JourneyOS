export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: 'parent' | 'student' | 'admin';
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
};

export type ParentStudentRelationship = {
  id: string;
  parent_id: string;
  student_id: string;
  created_at: string;
  [key: string]: unknown;
};

export type Destination = {
  id: string;
  name: string;
  country: string;
  description?: string | null;
  image_url?: string | null;
  created_at?: string;
  [key: string]: unknown;
};

export type Programme = {
  id: string;
  title: string;
  description?: string | null;
  destination_id?: string | null;
  duration_weeks: number;
  age_min: number;
  age_max: number;
  price_cents: number;
  currency: string;
  availability: number;
  start_date: string;
  end_date: string;
  learning_outcomes?: string[];
  what_included?: string[];
  created_at?: string;
  updated_at?: string;
  destination_name?: string | null;
  payment_status?: string | null;
  image_url?: string | null;
  status?: string | null;
  [key: string]: unknown;
};

export type ItineraryItem = {
  id: string;
  programme_id: string;
  day_number: number;
  title: string;
  description?: string | null;
  activities: string[];
  [key: string]: unknown;
};

export type Registration = {
  id: string;
  user_id: string;
  programme_id: string;
  student_id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  amount_cents: number;
  currency: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  [key: string]: unknown;
};

export type AnnouncementRecipient = {
  id: string;
  announcement_id: string;
  user_id: string;
  read: boolean;
  read_at: string | null;
  created_at: string;
  [key: string]: unknown;
};

export type PaymentOrder = {
  id: string;
  user_id: string;
  registration_id: string | null;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  attempts: number;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
};

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type GenericRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

type TableDef<TRow extends Record<string, unknown>, TInsert = Partial<TRow>, TUpdate = Partial<TRow>> = {
  Row: TRow;
  Insert: TInsert;
  Update: TUpdate;
  Relationships: GenericRelationship[];
};

export interface Database {
  public: {
    Tables: {
      profiles: TableDef<Profile>;
      Profiles: TableDef<Profile>;
      parent_student_relationships: TableDef<ParentStudentRelationship>;
      ParentStudentRelationships: TableDef<ParentStudentRelationship>;
      destinations: TableDef<Destination>;
      Destinations: TableDef<Destination>;
      programmes: TableDef<Programme>;
      Programmes: TableDef<Programme>;
      itinerary_items: TableDef<ItineraryItem>;
      ItineraryItems: TableDef<ItineraryItem>;
      registrations: TableDef<Registration>;
      Registrations: TableDef<Registration>;
      announcements: TableDef<Announcement>;
      Announcements: TableDef<Announcement>;
      announcement_recipients: TableDef<AnnouncementRecipient>;
      AnnouncementRecipients: TableDef<AnnouncementRecipient>;
      payment_orders: TableDef<PaymentOrder>;
      PaymentOrders: TableDef<PaymentOrder>;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
