import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, FileText, Settings, LogOut } from 'lucide-react';

export function Dashboard() {
  const { auth, logout } = useAuth();
  const { user, permissions } = auth;

  if (!user) return null;

  const menuItems = [
    {
      icon: FileText,
      label: 'Content',
      permission: 'read',
    },
    {
      icon: Users,
      label: 'Users',
      permission: 'manage_users',
    },
    {
      icon: Shield,
      label: 'Roles',
      permission: 'manage_roles',
    },
    {
      icon: Settings,
      label: 'Settings',
      permission: 'write',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">RBAC Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-700">{user.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {menuItems.map((item) => {
              const hasPermission = permissions.some(p => p.id === item.permission);
              const Icon = item.icon;
              
              return (
                <div
                  key={item.label}
                  className={`p-6 bg-white rounded-lg shadow-sm border ${
                    hasPermission
                      ? 'cursor-pointer hover:shadow-md transition-shadow'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className={`w-6 h-6 ${hasPermission ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">{item.label}</h3>
                  </div>
                  {!hasPermission && (
                    <p className="mt-2 text-sm text-red-500">
                      No permission to access this feature
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Permissions</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {permissions.map((permission) => (
                  <li key={permission.id} className="px-6 py-4">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-green-500" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {permission.name.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-gray-500">{permission.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}