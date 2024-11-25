export type Role = 'admin' | 'moderator' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  permissions: Permission[];
}