import { UserRole, ModulePermissions } from '../types';

// API Configuration - Updated for new ngrok URL
export const API_BASE_URL = 'https://6f45feab8f9c.ngrok-free.app/php-backend';

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, ModulePermissions> = {
  [UserRole.RECEPTIONIST]: {
    sprs: { read: true, write: true },
    ass: { read: true, write: true },
    tocs: { read: false, write: false },
    eerts: { read: false, write: false },
    ibms: { read: false, write: false }
  },
  [UserRole.NURSE]: {
    sprs: { read: true, write: false },
    ass: { read: true, write: false },
    tocs: { read: true, write: true },
    eerts: { read: true, write: true },
    ibms: { read: true, write: true }
  },
  [UserRole.DOCTOR]: {
    sprs: { read: true, write: false },
    ass: { read: true, write: false },
    tocs: { read: true, write: true },
    eerts: { read: true, write: true },
    ibms: { read: true, write: false }
  },
  [UserRole.ER_DOCTOR]: {
    sprs: { read: true, write: false },
    ass: { read: true, write: false },
    tocs: { read: false, write: false },
    eerts: { read: true, write: true },
    ibms: { read: true, write: true }
  },
  [UserRole.TELEHEALTH_COORD]: {
    sprs: { read: true, write: false },
    ass: { read: true, write: true },
    tocs: { read: true, write: true },
    eerts: { read: false, write: false },
    ibms: { read: false, write: false }
  },
  [UserRole.ADMISSION_OFFICER]: {
    sprs: { read: true, write: false },
    ass: { read: true, write: false },
    tocs: { read: false, write: false },
    eerts: { read: false, write: false },
    ibms: { read: true, write: true }
  },
  [UserRole.ADMIN]: {
    sprs: { read: true, write: true },
    ass: { read: true, write: true },
    tocs: { read: true, write: false },
    eerts: { read: true, write: false },
    ibms: { read: true, write: true }
  },
  [UserRole.SUPER_ADMIN]: {
    sprs: { read: true, write: true },
    ass: { read: true, write: true },
    tocs: { read: true, write: true },
    eerts: { read: true, write: true },
    ibms: { read: true, write: true }
  }
};

// Triage level colors and priorities
export const TRIAGE_COLORS = {
  level_1: 'bg-red-500 text-white',
  level_2: 'bg-orange-500 text-white',
  level_3: 'bg-yellow-500 text-black',
  level_4: 'bg-green-500 text-white',
  level_5: 'bg-blue-500 text-white'
};

export const TRIAGE_LABELS = {
  level_1: 'Critical',
  level_2: 'Emergent',
  level_3: 'Urgent',
  level_4: 'Less Urgent',
  level_5: 'Non-urgent'
};

// Module names and descriptions
export const MODULES = {
  sprs: {
    name: 'Smart Patient Registration',
    description: 'Register and manage patient profiles',
    icon: '👥'
  },
  ass: {
    name: 'Appointment Scheduling',
    description: 'Schedule and manage appointments',
    icon: '📅'
  },
  tocs: {
    name: 'Telehealth/Outpatient',
    description: 'Video consultations and outpatient care',
    icon: '💻'
  },
  eerts: {
    name: 'Emergency Triage',
    description: 'Emergency room triage management',
    icon: '🚨'
  },
  ibms: {
    name: 'Inpatient Bed Management',
    description: 'Hospital bed allocation and management',
    icon: '🏥'
  }
};
