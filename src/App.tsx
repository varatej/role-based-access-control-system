import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';

function AuthenticatedApp() {
  const { auth } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {auth.isAuthenticated ? <Dashboard /> : <LoginForm />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <AuthenticatedApp />
      </div>
    </AuthProvider>
  );
}

export default App;