import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Permission, Appointment, AppointmentStatus, AppointmentType } from '../../types';

interface ASSProps {
  permissions: Permission;
}

const ASS: React.FC<ASSProps> = ({ permissions }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock appointments data
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      patient_id: '1',
      doctor_id: '1',
      appointment_date: '2024-01-20',
      appointment_time: '09:00',
      type: AppointmentType.CONSULTATION,
      status: AppointmentStatus.SCHEDULED,
      notes: 'Regular checkup',
      created_at: '2024-01-15T10:30:00Z',
      patient: {
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '1985-06-15',
        phone: '(555) 123-4567',
        address: '123 Main St',
        emergency_contact_name: 'Jane Doe',
        emergency_contact_phone: '(555) 987-6543',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z'
      }
    },
    {
      id: '2',
      patient_id: '2',
      doctor_id: '2',
      appointment_date: '2024-01-20',
      appointment_time: '10:30',
      type: AppointmentType.FOLLOW_UP,
      status: AppointmentStatus.CONFIRMED,
      notes: 'Follow-up after surgery',
      created_at: '2024-01-16T14:20:00Z',
      patient: {
        id: '2',
        first_name: 'Sarah',
        last_name: 'Johnson',
        date_of_birth: '1992-03-22',
        phone: '(555) 234-5678',
        address: '456 Oak Ave',
        emergency_contact_name: 'Mike Johnson',
        emergency_contact_phone: '(555) 876-5432',
        created_at: '2024-01-16T14:20:00Z',
        updated_at: '2024-01-16T14:20:00Z'
      }
    }
  ];

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.SCHEDULED:
        return 'bg-blue-100 text-blue-700';
      case AppointmentStatus.CONFIRMED:
        return 'bg-green-100 text-green-700';
      case AppointmentStatus.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-700';
      case AppointmentStatus.COMPLETED:
        return 'bg-gray-100 text-gray-700';
      case AppointmentStatus.CANCELLED:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Appointment scheduled successfully! (Demo mode)');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment Scheduling System</h2>
          <p className="text-gray-600 mt-1">Schedule and manage patient appointments</p>
        </div>
        <div className="flex space-x-2">
          {permissions.read && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Read Access
            </Badge>
          )}
          {permissions.write && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Write Access
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="date-select">Date:</Label>
              <Input
                id="date-select"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {appointment.patient?.first_name} {appointment.patient?.last_name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {appointment.appointment_time} - {appointment.type}
                      </p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  {appointment.notes && (
                    <p className="text-sm text-gray-600 mt-2">
                      Notes: {appointment.notes}
                    </p>
                  )}
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {permissions.write && (
                      <>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {permissions.write && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScheduleAppointment} className="space-y-4">
                <div>
                  <Label htmlFor="patient_search">Patient *</Label>
                  <Input
                    id="patient_search"
                    placeholder="Search patient by name or ID..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="doctor_select">Doctor *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dr. Smith (Cardiology)</SelectItem>
                      <SelectItem value="2">Dr. Johnson (General Medicine)</SelectItem>
                      <SelectItem value="3">Dr. Williams (Pediatrics)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="appointment_date">Date *</Label>
                    <Input
                      id="appointment_date"
                      type="date"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="appointment_time">Time *</Label>
                    <Input
                      id="appointment_time"
                      type="time"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="appointment_type">Type *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow_up">Follow-up</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="telehealth">Telehealth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    placeholder="Additional notes..."
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Schedule Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ASS;