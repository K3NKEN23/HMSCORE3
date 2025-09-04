import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Permission, Patient } from '../../types';

interface SPRSProps {
  permissions: Permission;
}

const SPRS: React.FC<SPRSProps> = ({ permissions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone: '',
    email: '',
    address: '',
    insurance_provider: '',
    insurance_number: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
  });

  // Mock patient data for demo
  const mockPatients: Patient[] = [
    {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      date_of_birth: '1985-06-15',
      phone: '(555) 123-4567',
      email: 'john.doe@email.com',
      address: '123 Main St, City, State 12345',
      insurance_provider: 'Blue Cross',
      insurance_number: 'BC123456789',
      emergency_contact_name: 'Jane Doe',
      emergency_contact_phone: '(555) 987-6543',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      first_name: 'Sarah',
      last_name: 'Johnson',
      date_of_birth: '1992-03-22',
      phone: '(555) 234-5678',
      email: 'sarah.j@email.com',
      address: '456 Oak Ave, City, State 12345',
      insurance_provider: 'Aetna',
      insurance_number: 'AE987654321',
      emergency_contact_name: 'Mike Johnson',
      emergency_contact_phone: '(555) 876-5432',
      created_at: '2024-01-16T14:20:00Z',
      updated_at: '2024-01-16T14:20:00Z'
    }
  ];

  const filteredPatients = mockPatients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would call the API
    console.log('Registering patient:', newPatient);
    alert('Patient registered successfully! (Demo mode)');
    setNewPatient({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      phone: '',
      email: '',
      address: '',
      insurance_provider: '',
      insurance_number: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Patient Registration System</h2>
          <p className="text-gray-600 mt-1">Manage patient profiles and registration</p>
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

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search Patients</TabsTrigger>
          <TabsTrigger value="register" disabled={!permissions.write}>
            Register New Patient
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Search</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Search by name or phone number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">Search</Button>
              </div>

              <div className="space-y-2">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {patient.first_name} {patient.last_name}
                        </h4>
                        <p className="text-sm text-gray-600">DOB: {patient.date_of_birth}</p>
                        <p className="text-sm text-gray-600">Phone: {patient.phone}</p>
                      </div>
                      <Badge variant="outline">ID: {patient.id}</Badge>
                    </div>
                  </div>
                ))}
              </div>

              {selectedPatient && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Patient Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Full Name</Label>
                        <p className="text-sm text-gray-900">
                          {selectedPatient.first_name} {selectedPatient.last_name}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Date of Birth</Label>
                        <p className="text-sm text-gray-900">{selectedPatient.date_of_birth}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Phone</Label>
                        <p className="text-sm text-gray-900">{selectedPatient.phone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p className="text-sm text-gray-900">{selectedPatient.email}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium">Address</Label>
                        <p className="text-sm text-gray-900">{selectedPatient.address}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Insurance Provider</Label>
                        <p className="text-sm text-gray-900">{selectedPatient.insurance_provider}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Insurance Number</Label>
                        <p className="text-sm text-gray-900">{selectedPatient.insurance_number}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Emergency Contact</Label>
                        <p className="text-sm text-gray-900">{selectedPatient.emergency_contact_name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Emergency Phone</Label>
                        <p className="text-sm text-gray-900">{selectedPatient.emergency_contact_phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Register New Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterPatient} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={newPatient.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={newPatient.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth *</Label>
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      value={newPatient.date_of_birth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newPatient.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newPatient.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance_provider">Insurance Provider</Label>
                    <Input
                      id="insurance_provider"
                      name="insurance_provider"
                      value={newPatient.insurance_provider}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={newPatient.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance_number">Insurance Number</Label>
                    <Input
                      id="insurance_number"
                      name="insurance_number"
                      value={newPatient.insurance_number}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact_name">Emergency Contact Name *</Label>
                    <Input
                      id="emergency_contact_name"
                      name="emergency_contact_name"
                      value={newPatient.emergency_contact_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact_phone">Emergency Contact Phone *</Label>
                    <Input
                      id="emergency_contact_phone"
                      name="emergency_contact_phone"
                      value={newPatient.emergency_contact_phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline">Cancel</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Register Patient
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SPRS;