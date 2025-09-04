import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Permission, TriageCase, TriageLevel, TriageStatus } from '../../types';
import { TRIAGE_COLORS, TRIAGE_LABELS } from '../../lib/constants';

interface EERTSProps {
  permissions: Permission;
}

const EERTS: React.FC<EERTSProps> = ({ permissions }) => {
  const [newTriage, setNewTriage] = useState({
    patient_id: '',
    chief_complaint: '',
    vital_signs: '',
    triage_level: TriageLevel.LEVEL_3
  });

  // Mock triage cases
  const mockTriageCases: TriageCase[] = [
    {
      id: '1',
      patient_id: '1',
      triage_level: TriageLevel.LEVEL_1,
      chief_complaint: 'Chest pain, difficulty breathing',
      vital_signs: 'BP: 180/120, HR: 110, Temp: 98.6°F, O2: 88%',
      status: TriageStatus.IN_ASSESSMENT,
      arrival_time: '2024-01-20T08:30:00Z',
      assessment_time: '2024-01-20T08:35:00Z',
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
      triage_level: TriageLevel.LEVEL_3,
      chief_complaint: 'Sprained ankle from fall',
      vital_signs: 'BP: 120/80, HR: 75, Temp: 98.2°F, O2: 98%',
      status: TriageStatus.WAITING,
      arrival_time: '2024-01-20T09:15:00Z',
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

  const sortedCases = mockTriageCases.sort((a, b) => {
    const levelOrder = { level_1: 1, level_2: 2, level_3: 3, level_4: 4, level_5: 5 };
    return levelOrder[a.triage_level] - levelOrder[b.triage_level];
  });

  const handleCreateTriage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating triage case:', newTriage);
    alert('Triage case created successfully! (Demo mode)');
    setNewTriage({
      patient_id: '',
      chief_complaint: '',
      vital_signs: '',
      triage_level: TriageLevel.LEVEL_3
    });
  };

  const getStatusColor = (status: TriageStatus) => {
    switch (status) {
      case TriageStatus.WAITING:
        return 'bg-yellow-100 text-yellow-700';
      case TriageStatus.IN_ASSESSMENT:
        return 'bg-blue-100 text-blue-700';
      case TriageStatus.TREATMENT:
        return 'bg-green-100 text-green-700';
      case TriageStatus.DISCHARGED:
        return 'bg-gray-100 text-gray-700';
      case TriageStatus.ADMITTED:
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Emergency Triage System</h2>
          <p className="text-gray-600 mt-1">Manage emergency room triage and patient flow</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Triage Queue */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Triage Queue</CardTitle>
              <p className="text-sm text-gray-600">Sorted by priority level</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedCases.map((triageCase) => (
                  <div
                    key={triageCase.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {triageCase.patient?.first_name} {triageCase.patient?.last_name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Arrived: {new Date(triageCase.arrival_time).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={TRIAGE_COLORS[triageCase.triage_level]}>
                          {TRIAGE_LABELS[triageCase.triage_level]}
                        </Badge>
                        <Badge className={getStatusColor(triageCase.status)}>
                          {triageCase.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700">Chief Complaint:</p>
                      <p className="text-sm text-gray-600">{triageCase.chief_complaint}</p>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700">Vital Signs:</p>
                      <p className="text-sm text-gray-600">{triageCase.vital_signs}</p>
                    </div>

                    {permissions.write && (
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          Update Status
                        </Button>
                        <Button size="sm" variant="outline">
                          Assign Provider
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Priority Alert
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Triage Form */}
        {permissions.write && (
          <Card>
            <CardHeader>
              <CardTitle>New Triage Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTriage} className="space-y-4">
                <div>
                  <Label htmlFor="patient_search">Patient *</Label>
                  <Input
                    id="patient_search"
                    placeholder="Search patient..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="chief_complaint">Chief Complaint *</Label>
                  <Textarea
                    id="chief_complaint"
                    value={newTriage.chief_complaint}
                    onChange={(e) => setNewTriage(prev => ({ ...prev, chief_complaint: e.target.value }))}
                    placeholder="Describe primary complaint..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="vital_signs">Vital Signs *</Label>
                  <Textarea
                    id="vital_signs"
                    value={newTriage.vital_signs}
                    onChange={(e) => setNewTriage(prev => ({ ...prev, vital_signs: e.target.value }))}
                    placeholder="BP, HR, Temp, O2 Sat, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="triage_level">Triage Level *</Label>
                  <Select
                    value={newTriage.triage_level}
                    onValueChange={(value) => setNewTriage(prev => ({ ...prev, triage_level: value as TriageLevel }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TriageLevel.LEVEL_1}>
                        Level 1 - Critical
                      </SelectItem>
                      <SelectItem value={TriageLevel.LEVEL_2}>
                        Level 2 - Emergent
                      </SelectItem>
                      <SelectItem value={TriageLevel.LEVEL_3}>
                        Level 3 - Urgent
                      </SelectItem>
                      <SelectItem value={TriageLevel.LEVEL_4}>
                        Level 4 - Less Urgent
                      </SelectItem>
                      <SelectItem value={TriageLevel.LEVEL_5}>
                        Level 5 - Non-urgent
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Create Triage Case
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EERTS;