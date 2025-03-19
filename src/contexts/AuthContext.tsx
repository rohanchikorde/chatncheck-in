import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

// Define types
type User = {
  id: string;
  email: string;
  role?: string;
};

type Profile = {
  id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  position?: string;
  company?: string;
  role: 'admin' | 'interviewer' | 'interviewee';
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userId: string, data: Partial<Profile>) => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize Supabase client
const supabaseUrl = 'https://igkehjzqgrahfxkwmhbc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2VoanpxZ3JhaGZ4a3dtaGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDU1MjEsImV4cCI6MjA1NzUyMTUyMX0.MOCLW0QA4wRoYtt3E9wXWd1RVcx2ceMRC_6qgEgIMng';
const supabase = createClient(supabaseUrl, supabaseKey);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const session = supabase.auth.getSession();
    
    // Set initial user
    const initUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
        });
        
        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('userId', session.user.id)
          .single();
          
        if (profileData) {
          setProfile(profileData as Profile);
        }
      }
      
      setLoading(false);
    };
    
    initUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
          });
          
          // Fetch user profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('userId', session.user.id)
            .single();
            
          if (profileData) {
            setProfile(profileData as Profile);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;

        // Set user state after successful login
        setUser({
            id: data.user.id,
            email: data.user.email || '',
        });

        // Fetch user profile
        const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('userId', data.user.id)
            .single();

        if (profileData) {
            setProfile(profileData as Profile);
        }
    } catch (error: any) {
        console.error('Login error:', error.message);
        throw new Error(error.message);
    } finally {
        setLoading(false);
    }
  };
  
  // Register function
  const register = async (email: string, password: string) => {
    setLoading(true);
    
    try {
        console.log('Registering user with email:', email);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        
        if (error) {
            console.error('Signup error:', error.message);
            throw error;
        }
        
        // Create profile for new user
        if (data.user) {
            const newProfile = {
                userId: data.user.id,
                role: 'interviewee', // Default role
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            
            const { error: profileError } = await supabase
                .from('profiles')
                .insert(newProfile);
                
            if (profileError) {
                console.error('Profile creation error:', profileError.message);
                throw profileError;
            }
        }
    } catch (error: any) {
        console.error('Registration error:', error.message);
        throw new Error(error.message);
    } finally {
        setLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  
  // Update profile function
  const updateProfile = async (userId: string, data: Partial<Profile>) => {
    try {
      const updates = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('userId', userId);
        
      if (error) throw error;
      
      // Update local profile state
      if (profile) {
        setProfile({
          ...profile,
          ...updates,
        });
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      login, 
      register, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Function to expose test users in development
export const exposeDevelopmentHelpers = () => {
  // This is just a stub - in a real app you might handle test users here
  console.log('Development helpers exposed');
  
  return {
    loginAsAdmin: async () => {
      await supabase.auth.signInWithPassword({
        email: 'admin@example.com',
        password: 'password123',
      });
    },
    loginAsInterviewer: async () => {
      await supabase.auth.signInWithPassword({
        email: 'interviewer@example.com',
        password: 'password123',
      });
    },
    loginAsInterviewee: async () => {
      await supabase.auth.signInWithPassword({
        email: 'interviewee@example.com',
        password: 'password123',
      });
    },
  };
};
