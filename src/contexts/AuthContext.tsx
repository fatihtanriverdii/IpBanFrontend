'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as auth from '@/services/auth';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import type { JwtPayload as JwtDecodePayload } from 'jwt-decode';

interface JwtPayload extends JwtDecodePayload {
  sub: string;
  exp: number;
  iat: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [statusCheckInterval, setStatusCheckInterval] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const startStatusCheck = useCallback(() => {
    if (statusCheckInterval) return;

    const interval = setInterval(async () => {
      const isBanned = await auth.checkUserStatus();
      console.log("isBanned: " + isBanned);
      if (isBanned) {
        await auth.logoutUser();
        setIsAuthenticated(false);
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
          setStatusCheckInterval(null);
        }
      }
    }, 10000); // Her 10 saniyede bir kontrol et

    setStatusCheckInterval(interval);
  }, [statusCheckInterval]);

  // Sayfa yüklendiğinde cookie'den token'ı al
  useEffect(() => {
    const checkToken = async () => {
      const savedToken = Cookies.get('token');
      if (savedToken) {
        const { jwtDecode } = await import('jwt-decode');
        const decoded = jwtDecode<JwtPayload>(savedToken);
        setUsername(decoded.sub);
        setIsAuthenticated(true);
      }
    };
    checkToken();
  }, [startStatusCheck]);

  const stopStatusCheck = useCallback(() => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
  }, [statusCheckInterval]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await auth.login({ username, password });
      const { jwtDecode } = await import('jwt-decode');
      const decoded = jwtDecode<JwtPayload>(response.token);
      setUsername(decoded.sub);
      setIsAuthenticated(true);
      startStatusCheck();
      
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  }, [startStatusCheck, router]);

  const register = useCallback(async (firstName: string, lastName: string, username: string, email: string, password: string) => {
    try {
      await auth.register({ firstName, lastName, username, email, password });
      router.push('/login');
    } catch (error) {
      throw error;
    }
  }, [router]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    stopStatusCheck();
    router.push('/login');
  }, [stopStatusCheck, router]);

  useEffect(() => {
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [statusCheckInterval]);

  const value = {
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 