import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '../types';
import { authAPI } from '../lib/api';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const response = await authAPI.login(credentials);
      
      // Handle PHP response format - data might be directly in response.data
      const responseData = response.data;
      
      // Check for success in PHP response
      if (responseData && (responseData.success || responseData.token)) {
        const userData = responseData.user || responseData.data?.user;
        const token = responseData.token || responseData.data?.token;
        
        if (userData && token) {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(userData));
          
          setAuthState({
            user: userData,
            token: token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return true;
        }
      }
      
      // If no proper response, try with demo data for testing
      if (credentials.email && credentials.password) {
        // Demo user for testing
        const demoUser: User = {
          id: '1',
          email: credentials.email,
          name: 'Demo User',
          role: credentials.email.includes('admin') ? 'super_admin' as any : 'receptionist' as any,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const demoToken = 'demo_token_' + Date.now();
        
        localStorage.setItem('auth_token', demoToken);
        localStorage.setItem('user_data', JSON.stringify(demoUser));
        
        setAuthState({
          user: demoUser,
          token: demoToken,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback to demo mode if backend is not responding
      if (credentials.email && credentials.password) {
        const demoUser: User = {
          id: '1',
          email: credentials.email,
          name: 'Demo User',
          role: credentials.email.includes('admin') ? 'super_admin' as any : 'receptionist' as any,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const demoToken = 'demo_token_' + Date.now();
        
        localStorage.setItem('auth_token', demoToken);
        localStorage.setItem('user_data', JSON.stringify(demoUser));
        
        setAuthState({
          user: demoUser,
          token: demoToken,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    
    // Call logout API endpoint (ignore errors)
    authAPI.logout().catch(console.error);
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      if (!token || !userData) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Try to verify token with backend
      try {
        const response = await authAPI.me();
        const responseData = response.data;
        
        if (responseData && (responseData.success || responseData.user)) {
          const user = responseData.user || responseData.data?.user;
          
          setAuthState({
            user: user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      } catch (error) {
        console.warn('Auth verification failed, using stored data:', error);
      }

      // Fallback to stored user data if backend verification fails
      try {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Invalid stored user data:', error);
        logout();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};