import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ROLE_PERMISSIONS, MODULES } from '../lib/constants';
import { UserRole } from '../types';

// Import module components
import SPRS from '../components/modules/SPRS';
import ASS from '../components/modules/ASS';
import TOCS from '../components/modules/TOCS';
import EERTS from '../components/modules/EERTS';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  if (!user) {
    return <div>Loading...</div>;
  }

  const userPermissions = ROLE_PERMISSIONS[user.role as UserRole];

  const getModuleComponent = (moduleKey: string) => {
    switch (moduleKey) {
      case 'sprs':
        return <SPRS permissions={userPermissions.sprs} />;
      case 'ass':
        return <ASS permissions={userPermissions.ass} />;
      case 'tocs':
        return <TOCS permissions={userPermissions.tocs} />;
      case 'eerts':
        return <EERTS permissions={userPermissions.eerts} />;
      case 'ibms':
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Inpatient Bed Management</h3>
            <p className="text-gray-600">Module coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  const hasModuleAccess = (moduleKey: string) => {
    const permission = userPermissions[moduleKey as keyof typeof userPermissions];
    return permission && (permission.read || permission.write);
  };

  if (activeModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setActiveModule(null)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  ← Back to Dashboard
                </Button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {MODULES[activeModule as keyof typeof MODULES]?.name}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {user.name} ({user.role})
                </span>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border-0">
            {getModuleComponent(activeModule)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-sm text-white font-bold">CT1</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Healthcare Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}
          </h2>
          <p className="text-gray-600">
            Access your authorized modules below based on your role permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(MODULES).map(([key, module]) => {
            const hasAccess = hasModuleAccess(key);
            const permission = userPermissions[key as keyof typeof userPermissions];
            
            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all duration-200 border-0 shadow-lg hover:shadow-xl ${
                  hasAccess
                    ? 'bg-white hover:scale-105'
                    : 'bg-gray-100 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => hasAccess && setActiveModule(key)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{module.icon}</div>
                    <div className="flex space-x-1">
                      {permission?.read && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Read
                        </Badge>
                      )}
                      {permission?.write && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          Write
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {module.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {module.description}
                  </CardDescription>
                  {!hasAccess && (
                    <p className="text-xs text-red-500 mt-2">
                      No access permissions for your role
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Ready</div>
              <div className="text-sm text-gray-600">System Status</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{user.role}</div>
              <div className="text-sm text-gray-600">Your Role</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Object.values(userPermissions).filter(p => p.read || p.write).length}
              </div>
              <div className="text-sm text-gray-600">Accessible Modules</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">Demo</div>
              <div className="text-sm text-gray-600">Environment</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;