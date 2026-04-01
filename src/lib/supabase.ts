import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_mutuelle: boolean;
  referring_doctor: string;
  medical_history: string;
  gdpr_consent: boolean;
  created_at: string;
};

export type Session = {
  id: string;
  patient_id: string;
  date: string;
  status_billing: 'paid' | 'unpaid' | 'pending';
  clinical_notes: string;
  location: 'cabinet' | 'domicile' | 'clinique' | 'visio';
};

export type Pathology = {
  id: string;
  patient_id: string;
  diagnosis: string;
  treatment_plan: string;
};
