import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Permission } from '../../types';

interface TOCSProps {
  permissions: Permission;
}

const TOCS: React.FC<TOCSProps> = ({ permissions }) => {
  const [activeConsultations] = useState([
    {
      id: '1',
      patient_name: 'John Doe',
      appointment_time: '14:30',
      type: 'Video Consultation',
      status: 'Waiting'
    },
    {
      id: '2',
      patient_name: 'Sarah Johnson',
      appointment_time: '15:00',
      type: 'Follow-up Call',
      status: 'In Progress'
    }
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Telehealth & Outpatient Care System</h2>
          <p className="text-gray-600 mt-1">Manage video consultations and outpatient care</p>
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

      <Tabs defaultValue="consultations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="consultations">Active Consultations</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="consultations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Telehealth Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeConsultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {consultation.patient_name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {consultation.appointment_time} - {consultation.type}
                          </p>
                        </div>
                        <Badge 
                          className={
                            consultation.status === 'In Progress' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }
                        >
                          {consultation.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        {consultation.status === 'Waiting' && permissions.write && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Start Session
                          </Button>
                        )}
                        {consultation.status === 'In Progress' && permissions.write && (
                          <Button size="sm" variant="outline" className="text-red-600">
                            End Session
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {permissions.write && (
                  <>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Start Emergency Consultation
                    </Button>
                    <Button variant="outline" className="w-full">
                      Schedule Follow-up
                    </Button>
                    <Button variant="outline" className="w-full">
                      Send Patient Instructions
                    </Button>
                  </>
                )}
                <Button variant="outline" className="w-full">
                  View Patient Records
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Telehealth Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No upcoming telehealth appointments scheduled.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Consultation History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Consultation history will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TOCS;