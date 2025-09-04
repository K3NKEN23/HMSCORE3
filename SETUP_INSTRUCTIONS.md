# CT1 Healthcare System - Setup Instructions

## Overview
Complete healthcare management system with patient registration, appointments, telehealth, emergency triage, and inpatient bed management.

## System Requirements
- **Frontend**: React with TypeScript, Vite, Tailwind CSS
- **Backend**: PHP Laravel framework with MySQL
- **Database**: MySQL via XAMPP
- **Development Tools**: Node.js, Composer, ngrok

## Installation Steps

### 1. Prerequisites Installation

#### Install XAMPP
1. Download XAMPP from https://www.apachefriends.org/
2. Install XAMPP with Apache and MySQL modules
3. Start Apache and MySQL services from XAMPP Control Panel

#### Install Node.js and pnpm
1. Download Node.js from https://nodejs.org/
2. Install pnpm globally: `npm install -g pnpm`

#### Install Composer
1. Download Composer from https://getcomposer.org/
2. Install globally for PHP dependency management

#### Install ngrok
1. Sign up at https://ngrok.com/
2. Download and install ngrok
3. Configure your auth token: `ngrok config add-authtoken YOUR_TOKEN`

### 2. Database Setup

#### Create Database
1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Create new database named `ct1_healthcare`
3. Import the schema: `database/ct1_schema.sql`
4. Import sample data: `database/sample_data.sql`

### 3. Backend Setup (Laravel)

#### Create Laravel Project
```bash
composer create-project laravel/laravel ct1-backend
cd ct1-backend
```

#### Install Dependencies
```bash
composer install
composer require laravel/sanctum
```

#### Environment Configuration
1. Copy `.env.example` to `.env`
2. Configure database connection:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ct1_healthcare
DB_USERNAME=root
DB_PASSWORD=
```

#### Generate Application Key
```bash
php artisan key:generate
```

#### Setup Sanctum
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

#### Start Laravel Server
```bash
php artisan serve
```
Server will run on http://localhost:8000

### 4. Frontend Setup

#### Install Dependencies
```bash
pnpm install
```

#### Configure API URL
1. Update `src/lib/constants.ts`
2. Replace `API_BASE_URL` with your ngrok URL:
```typescript
export const API_BASE_URL = 'https://your-ngrok-url.ngrok-free.app/api';
```

#### Start Development Server
```bash
pnpm run dev
```
Frontend will run on http://localhost:5173

### 5. ngrok Configuration

#### Expose Laravel Backend
```bash
ngrok http 8000
```

#### Update Frontend Configuration
1. Copy the ngrok HTTPS URL (e.g., https://abc123.ngrok-free.app)
2. Update `API_BASE_URL` in `src/lib/constants.ts`
3. Restart the frontend development server

### 6. Testing the System

#### Demo Login Credentials
- **Super Admin**: admin@ct1.com / password123
- **Receptionist**: receptionist@ct1.com / password123
- **Nurse**: nurse@ct1.com / password123
- **Doctor**: doctor@ct1.com / password123
- **ER Doctor**: erdoctor@ct1.com / password123
- **Telehealth Coordinator**: telehealth@ct1.com / password123
- **Admission Officer**: admission@ct1.com / password123

#### Access the Application
1. Open http://localhost:5173 in your browser
2. Login with any of the demo credentials above
3. Explore different modules based on user role permissions

## System Modules

### 1. SPRS (Smart Patient Registration)
- Register new patients
- Search and view patient profiles
- Update patient information
- **Access**: Receptionist (write), Others (read only)

### 2. ASS (Appointment Scheduling)
- Schedule new appointments
- View daily appointment calendar
- Manage appointment status
- **Access**: Receptionist, Telehealth Coordinator (write), Others (read only)

### 3. TOCS (Telehealth/Outpatient Care)
- Manage video consultations
- Schedule telehealth appointments
- Track consultation history
- **Access**: Nurses, Doctors, Telehealth Coordinator (write)

### 4. EERTS (Emergency Triage)
- Create triage assessments
- Assign triage levels (1-5)
- Track emergency patient flow
- **Access**: Nurses, ER Doctors (write)

### 5. IBMS (Inpatient Bed Management)
- Manage bed allocation
- Track admissions and discharges
- Monitor bed availability
- **Access**: Nurses, ER Doctors, Admission Officers (write)

## Role-Based Access Control

### User Roles and Permissions
- **Receptionist**: SPRS (write), ASS (write)
- **Nurse**: SPRS (read), EERTS/TOCS/IBMS (write)
- **Doctor**: SPRS/ASS (read), TOCS/EERTS (write/limited)
- **ER Doctor**: SPRS (read), EERTS/IBMS (write/limited)
- **Telehealth Coordinator**: SPRS (read), ASS/TOCS (write)
- **Admission Officer**: SPRS (read), IBMS (write)
- **Admin**: All non-clinical modules (write)
- **Super Admin**: Full access to all modules

## Security Features

### HIPAA Compliance
- Data encryption in transit and at rest
- Audit logging for all user actions
- Role-based access control
- Secure authentication with JWT tokens

### Authentication
- Laravel Sanctum for API authentication
- JWT token-based session management
- Automatic token refresh
- Secure logout functionality

## Troubleshooting

### Common Issues

#### Frontend Cannot Connect to Backend
1. Ensure Laravel server is running (`php artisan serve`)
2. Verify ngrok is exposing the correct port
3. Check API_BASE_URL in constants.ts matches ngrok URL
4. Ensure CORS is configured in Laravel

#### Database Connection Issues
1. Verify XAMPP MySQL service is running
2. Check database credentials in Laravel .env file
3. Ensure ct1_healthcare database exists
4. Verify sample data has been imported

#### Authentication Issues
1. Clear browser localStorage
2. Restart Laravel server
3. Check Laravel logs for authentication errors
4. Verify Sanctum is properly configured

### Development Tips
1. Use browser developer tools to monitor API calls
2. Check Laravel logs in `storage/logs/laravel.log`
3. Monitor ngrok dashboard for request debugging
4. Use phpMyAdmin to verify database operations

## Production Deployment

### Frontend Deployment
```bash
pnpm run build
```
Deploy the `dist` folder to your web server.

### Backend Deployment
1. Configure production database
2. Set proper environment variables
3. Run migrations: `php artisan migrate --force`
4. Configure web server (Apache/Nginx)
5. Set up SSL certificates
6. Configure proper CORS settings

## Support
For technical support or questions about the CT1 Healthcare System, please refer to the documentation or contact the development team.