import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Mock API call - in real app, this would validate the token with backend
          const mockUser: User = {
            id: '1',
            email: 'user@example.com',
            username: 'creator1',
            role: 'user',
            credits: 150,
            profileCompleted: true,
            lastLogin: new Date().toISOString(),
            createdAt: '2023-01-01T00:00:00Z',
          };
          setUser(mockUser);
        } catch (error) {
          console.error('Auth error:', error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - in real app, this would authenticate with backend
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user',
        credits: 100,
        profileCompleted: false,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      
      // Mock JWT token
      const token = 'mock-jwt-token';
      localStorage.setItem('token', token);
      
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - in real app, this would register with backend
      const mockUser: User = {
        id: '1',
        email,
        username,
        role: 'user',
        credits: 50, // Initial credits
        profileCompleted: false,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      
      // Mock JWT token
      const token = 'mock-jwt-token';
      localStorage.setItem('token', token);
      
      setUser(mockUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};