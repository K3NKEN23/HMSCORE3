import axios from 'axios';
import { API_BASE_URL } from './constants';
import { Patient, Appointment, TriageCase, LoginCredentials, User, ApiResponse } from '../types';

// Create axios instance with base configuration for PHP backend
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add ngrok bypass header
    'ngrok-skip-browser-warning': 'true'
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors and PHP response format
api.interceptors.response.use(
  (response) => {
    // Handle PHP response format - data might be directly in response.data
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API endpoints adapted for PHP backend structure
export const authAPI = {
  login: (credentials: LoginCredentials) =>
    api.post('/auth/login.php', credentials),
  logout: () => api.post('/auth/logout.php'),
  me: () => api.get('/auth/me.php'),
};

export const patientsAPI = {
  getAll: (params?: Record<string, unknown>) => api.get('/patients/list.php', { params }),
  getById: (id: string) => api.get(`/patients/get.php?id=${id}`),
  create: (data: Partial<Patient>) => api.post('/patients/create.php', data),
  update: (id: string, data: Partial<Patient>) => api.post('/patients/update.php', { id, ...data }),
  delete: (id: string) => api.post('/patients/delete.php', { id }),
  search: (query: string) => api.get(`/patients/search.php?q=${query}`),
};

export const appointmentsAPI = {
  getAll: (params?: Record<string, unknown>) => api.get('/appointments/list.php', { params }),
  getById: (id: string) => api.get(`/appointments/get.php?id=${id}`),
  create: (data: Partial<Appointment>) => api.post('/appointments/create.php', data),
  update: (id: string, data: Partial<Appointment>) => api.post('/appointments/update.php', { id, ...data }),
  delete: (id: string) => api.post('/appointments/delete.php', { id }),
  getByPatient: (patientId: string) => api.get(`/appointments/by-patient.php?patient_id=${patientId}`),
};

export const triageAPI = {
  getAll: (params?: Record<string, unknown>) => api.get('/triage/list.php', { params }),
  getById: (id: string) => api.get(`/triage/get.php?id=${id}`),
  create: (data: Partial<TriageCase>) => api.post('/triage/create.php', data),
  update: (id: string, data: Partial<TriageCase>) => api.post('/triage/update.php', { id, ...data }),
  updateStatus: (id: string, status: string) => api.post('/triage/update-status.php', { id, status }),
};

export const bedsAPI = {
  getAll: (params?: Record<string, unknown>) => api.get('/beds/list.php', { params }),
  getById: (id: string) => api.get(`/beds/get.php?id=${id}`),
  updateStatus: (id: string, status: string) => api.post('/beds/update-status.php', { id, status }),
};

export const admissionsAPI = {
  getAll: (params?: Record<string, unknown>) => api.get('/admissions/list.php', { params }),
  getById: (id: string) => api.get(`/admissions/get.php?id=${id}`),
  create: (data: Record<string, unknown>) => api.post('/admissions/create.php', data),
  update: (id: string, data: Record<string, unknown>) => api.post('/admissions/update.php', { id, ...data }),
  discharge: (id: string, notes: string) => api.post('/admissions/discharge.php', { id, notes }),
};

// Test connection function
export const testConnection = async () => {
  try {
    const response = await api.get('/test.php');
    return response.data;
  } catch (error) {
    console.error('Connection test failed:', error);
    throw error;
  }
};