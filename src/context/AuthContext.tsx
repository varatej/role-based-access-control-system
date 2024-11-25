import React, { createContext, useContext, useState } from 'react';
import type { AuthState, User, Role } from '../types/auth';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  permissions: [],
};

const AuthContext = createContext<{
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
} | null>(null);

// Simulated user data - In production, this would come from your backend
const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin@example.com': {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop',
  },
  'mod@example.com': {
    id: '2',
    email: 'mod@example.com',
    password: 'mod123',
    name: 'Moderator User',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop',
  },
};

const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
  moderator: ['read', 'write', 'manage_content'],
  user: ['read'],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(initialState);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS[email];
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    setAuth({
      user: userWithoutPassword,
      isAuthenticated: true,
      permissions: ROLE_PERMISSIONS[user.role].map(p => ({
        id: p,
        name: p,
        description: `Permission to ${p.replace('_', ' ')}`,
      })),
    });
  };

  const logout = () => {
    setAuth(initialState);
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (MOCK_USERS[email]) {
      throw new Error('User already exists');
    }

    // In a real app, this would be handled by the backend
    const newUser: User & { password: string } = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&fit=crop',
    };

    MOCK_USERS[email] = newUser;
    
    const { password: _, ...userWithoutPassword } = newUser;
    setAuth({
      user: userWithoutPassword,
      isAuthenticated: true,
      permissions: ROLE_PERMISSIONS[newUser.role].map(p => ({
        id: p,
        name: p,
        description: `Permission to ${p.replace('_', ' ')}`,
      })),
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}