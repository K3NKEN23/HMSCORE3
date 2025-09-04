// Core data types for CT1 Healthcare System

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  created_at: string;
  updated_at: string;
}

export enum UserRole {
  RECEPTIONIST = 'receptionist',
  NURSE = 'nurse',
  DOCTOR = 'doctor',
  ER_DOCTOR = 'er_doctor',
  TELEHEALTH_COORD = 'telehealth_coord',
  ADMISSION_OFFICER = 'admission_officer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
  email?: string;
  address: string;
  insurance_provider?: string;
  insurance_number?: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  medical_history?: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
  patient?: Patient;
  doctor?: User;
}

export enum AppointmentType {
  CONSULTATION = 'consultation',
  FOLLOW_UP = 'follow_up',
  EMERGENCY = 'emergency',
  TELEHEALTH = 'telehealth'
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export interface TriageCase {
  id: string;
  patient_id: string;
  triage_level: TriageLevel;
  chief_complaint: string;
  vital_signs: string;
  assigned_nurse_id?: string;
  assigned_doctor_id?: string;
  status: TriageStatus;
  arrival_time: string;
  assessment_time?: string;
  patient?: Patient;
}

export enum TriageLevel {
  LEVEL_1 = 'level_1', // Critical
  LEVEL_2 = 'level_2', // Emergent
  LEVEL_3 = 'level_3', // Urgent
  LEVEL_4 = 'level_4', // Less Urgent
  LEVEL_5 = 'level_5'  // Non-urgent
}

export enum TriageStatus {
  WAITING = 'waiting',
  IN_ASSESSMENT = 'in_assessment',
  TREATMENT = 'treatment',
  DISCHARGED = 'discharged',
  ADMITTED = 'admitted'
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Permission system
export interface ModulePermissions {
  sprs: Permission;
  ass: Permission;
  tocs: Permission;
  eerts: Permission;
  ibms: Permission;
}

export interface Permission {
  read: boolean;
  write: boolean;
  delete?: boolean;
}