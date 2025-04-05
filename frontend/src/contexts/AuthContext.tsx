
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          setUser(null);
        } else if (session) {
          // If session exists, set the user
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: 'user' // Default role, should be fetched from your profile table in a real app
          });
        }
      } catch (err) {
        console.error('Unexpected error during session check:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && event === 'SIGNED_IN') {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: 'user' // Default role, should be fetched from your profile table in a real app
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setLoading(false);
      }
    );
    
    // Cleanup
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          role: 'user' // Default role, should be fetched from your profile table in a real app
        });
        return { success: true };
      }
      
      return { success: false, error: 'Failed to sign in' };
    } catch (err) {
      console.error('Unexpected error during sign in:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };
  
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
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
