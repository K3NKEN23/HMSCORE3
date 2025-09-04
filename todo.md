# CT1 Healthcare System - MVP Implementation Plan

## Overview
Complete healthcare management system with 5 modules, 8 user roles, and RBAC implementation.

## Frontend Files to Create (React/TypeScript)

### 1. Core Authentication & Context
- `src/contexts/AuthContext.tsx` - Authentication state management
- `src/contexts/UserContext.tsx` - User role and permissions management
- `src/types/index.ts` - TypeScript interfaces for all data models

### 2. Main Application Structure
- `src/App.tsx` - Update with authentication routing
- `src/pages/Login.tsx` - Login form with role-based redirect
- `src/pages/Dashboard.tsx` - Role-based dashboard with module access
- `src/components/Layout.tsx` - Main layout with navigation

### 3. Module Components (5 main modules)
- `src/components/modules/SPRS.tsx` - Smart Patient Registration System
- `src/components/modules/ASS.tsx` - Appointment Scheduling System
- `src/components/modules/TOCS.tsx` - Telehealth/Outpatient Care System
- `src/components/modules/EERTS.tsx` - Emergency Triage System

### 4. Utility Files
- `src/lib/api.ts` - Axios configuration with ngrok URL
- `src/lib/permissions.ts` - Role-based permission checking
- `src/lib/constants.ts` - System constants and enums

## Backend Files to Create (PHP Laravel)

### 1. Database Schema
- `database/ct1_schema.sql` - Complete MySQL schema with all tables
- `database/sample_data.sql` - Sample data for testing

### 2. Laravel Models & Migrations
- `app/Models/Patient.php` - Patient model
- `app/Models/User.php` - User model with roles
- `app/Models/Appointment.php` - Appointment model
- `app/Http/Controllers/AuthController.php` - Authentication controller
- `app/Http/Controllers/PatientController.php` - Patient management

### 3. Configuration Files
- `.env.example` - Environment configuration template
- `routes/api.php` - API routes definition

## Implementation Priority
1. Database schema and sample data
2. Authentication system (frontend + backend structure)
3. Core SPRS module (most critical)
4. Dashboard with role-based access
5. Basic styling with Soft UI principles

## Key Features for MVP
- User login with JWT authentication
- Patient registration and search
- Basic appointment scheduling
- Role-based dashboard access
- Responsive Soft UI design
- ngrok integration setup

## File Limit: 8 core files maximum for successful implementation
Focus on essential functionality over comprehensive features.