-- CT1 Healthcare System Sample Data
-- Insert sample data for testing

USE ct1_healthcare;

-- Insert sample users with different roles
INSERT INTO users (id, email, password, name, role, department) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@ct1.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'super_admin', 'Administration'),
('550e8400-e29b-41d4-a716-446655440002', 'receptionist@ct1.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane Smith', 'receptionist', 'Front Desk'),
('550e8400-e29b-41d4-a716-446655440003', 'nurse@ct1.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mary Johnson', 'nurse', 'General Medicine'),
('550e8400-e29b-41d4-a716-446655440004', 'doctor@ct1.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. Robert Wilson', 'doctor', 'Internal Medicine'),
('550e8400-e29b-41d4-a716-446655440005', 'erdoctor@ct1.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. Sarah Davis', 'er_doctor', 'Emergency'),
('550e8400-e29b-41d4-a716-446655440006', 'telehealth@ct1.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lisa Brown', 'telehealth_coord', 'Telehealth'),
('550e8400-e29b-41d4-a716-446655440007', 'admission@ct1.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Michael Chen', 'admission_officer', 'Admissions');

-- Insert sample patients
INSERT INTO patients (id, first_name, last_name, date_of_birth, phone, email, address, insurance_provider, insurance_number, emergency_contact_name, emergency_contact_phone, medical_history) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'John', 'Doe', '1985-06-15', '(555) 123-4567', 'john.doe@email.com', '123 Main St, Anytown, ST 12345', 'Blue Cross Blue Shield', 'BC123456789', 'Jane Doe', '(555) 987-6543', 'Hypertension, Type 2 Diabetes'),
('650e8400-e29b-41d4-a716-446655440002', 'Sarah', 'Johnson', '1992-03-22', '(555) 234-5678', 'sarah.j@email.com', '456 Oak Ave, Anytown, ST 12345', 'Aetna', 'AE987654321', 'Mike Johnson', '(555) 876-5432', 'Asthma'),
('650e8400-e29b-41d4-a716-446655440003', 'Robert', 'Miller', '1978-11-08', '(555) 345-6789', 'r.miller@email.com', '789 Pine Rd, Anytown, ST 12345', 'Cigna', 'CG456789123', 'Linda Miller', '(555) 765-4321', 'Heart Disease, High Cholesterol'),
('650e8400-e29b-41d4-a716-446655440004', 'Emily', 'Davis', '1995-09-12', '(555) 456-7890', 'emily.davis@email.com', '321 Elm St, Anytown, ST 12345', 'United Healthcare', 'UH789123456', 'Tom Davis', '(555) 654-3210', 'No significant medical history'),
('650e8400-e29b-41d4-a716-446655440005', 'Michael', 'Wilson', '1980-04-25', '(555) 567-8901', 'm.wilson@email.com', '654 Maple Dr, Anytown, ST 12345', 'Kaiser Permanente', 'KP321654987', 'Susan Wilson', '(555) 543-2109', 'Diabetes, Kidney Disease');

-- Insert sample appointments
INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, appointment_time, type, status, notes) VALUES
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', '2024-01-25', '09:00:00', 'consultation', 'scheduled', 'Annual physical examination'),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', '2024-01-25', '10:30:00', 'follow_up', 'confirmed', 'Follow-up for asthma treatment'),
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '2024-01-25', '14:00:00', 'consultation', 'scheduled', 'Chest pain evaluation'),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440006', '2024-01-26', '11:00:00', 'telehealth', 'scheduled', 'Virtual consultation for routine check-up');

-- Insert sample consultations
INSERT INTO consultations (id, appointment_id, patient_id, provider_id, session_type, status, session_notes, follow_up_required) VALUES
('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440006', 'video', 'scheduled', 'Routine telehealth consultation', FALSE);

-- Insert sample triage cases
INSERT INTO triage (id, patient_id, triage_level, chief_complaint, vital_signs, assigned_nurse_id, status, arrival_time, notes) VALUES
('950e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', 'level_2', 'Severe chest pain, shortness of breath', 'BP: 180/110, HR: 105, Temp: 98.8°F, O2: 92%, RR: 22', '550e8400-e29b-41d4-a716-446655440003', 'in_assessment', '2024-01-20 08:30:00', 'Patient appears distressed, requires immediate attention'),
('950e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440005', 'level_4', 'Minor laceration on hand from kitchen accident', 'BP: 125/80, HR: 78, Temp: 98.6°F, O2: 98%, RR: 16', '550e8400-e29b-41d4-a716-446655440003', 'waiting', '2024-01-20 10:15:00', 'Small cut, needs cleaning and bandaging');

-- Insert sample beds
INSERT INTO beds (id, bed_number, room_number, department, bed_type, status) VALUES
('a50e8400-e29b-41d4-a716-446655440001', 'ICU-001', '101', 'Intensive Care', 'icu', 'available'),
('a50e8400-e29b-41d4-a716-446655440002', 'ICU-002', '102', 'Intensive Care', 'icu', 'occupied'),
('a50e8400-e29b-41d4-a716-446655440003', 'GEN-201', '201', 'General Medicine', 'general', 'available'),
('a50e8400-e29b-41d4-a716-446655440004', 'GEN-202', '202', 'General Medicine', 'general', 'available'),
('a50e8400-e29b-41d4-a716-446655440005', 'PVT-301', '301', 'Private Wing', 'private', 'available'),
('a50e8400-e29b-41d4-a716-446655440006', 'ER-001', 'ER1', 'Emergency', 'emergency', 'available'),
('a50e8400-e29b-41d4-a716-446655440007', 'ER-002', 'ER2', 'Emergency', 'emergency', 'occupied');

-- Insert sample admissions
INSERT INTO admissions (id, patient_id, bed_id, admitting_doctor_id, admission_date, admission_type, diagnosis, status) VALUES
('b50e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', 'a50e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', '2024-01-20 09:00:00', 'emergency', 'Acute myocardial infarction', 'admitted'),
('b50e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440005', '2024-01-19 14:30:00', 'observation', 'Chest pain observation', 'admitted');

-- Note: All passwords are hashed version of 'password123'
-- Use these credentials for testing:
-- admin@ct1.com / password123 (Super Admin)
-- receptionist@ct1.com / password123 (Receptionist)
-- nurse@ct1.com / password123 (Nurse)
-- doctor@ct1.com / password123 (Doctor)
-- erdoctor@ct1.com / password123 (ER Doctor)
-- telehealth@ct1.com / password123 (Telehealth Coordinator)
-- admission@ct1.com / password123 (Admission Officer)