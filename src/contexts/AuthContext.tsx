
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  role: string;
} | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Mock authentication check - simulate retrieving user from storage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
    
    setLoading(false);
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      // For development/demo purposes only
      // In a real application, this would make an API call
      
      // Simple demo authentication
      if (email === 'admin@example.com' && password === 'admin123') {
        const userData = { id: '1', email, role: 'admin' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else if (email === 'interviewer@example.com' && password === 'test123') {
        const userData = { id: '2', email, role: 'interviewer' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else if (email === 'interviewee@example.com' && password === 'test123') {
        const userData = { id: '3', email, role: 'interviewee' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      }
      
      return { success: false, error: 'Invalid email or password' };
    } catch (err) {
      console.error('Error during sign in:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };
  
  const signOut = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };
  
  const value = {
    user,
    loading,
    signIn,
    signOut
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
