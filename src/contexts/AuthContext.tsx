import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Define types
type User = {
  id: string;
  email: string;
  role?: string;
};

type Profile = {
  id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  position?: string;
  company?: string;
  role: 'admin' | 'interviewer' | 'interviewee';
  created_at: string;
  updated_at: string;
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
  const navigate = useNavigate();

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
          .eq('id', session.user.id)
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
            .eq('id', session.user.id)
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
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError) {
            console.error('Profile fetch error:', profileError);
            // Profile doesn't exist, create one
            const newProfile = {
                id: data.user.id,
                role: 'interviewee', // Default role
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            
            const { error: insertError } = await supabase
                .from('profiles')
                .insert(newProfile);
                
            if (insertError) {
                console.error('Profile creation error:', insertError);
                throw insertError;
            }
            
            setProfile(newProfile as Profile);
        } else if (profileData) {
            setProfile(profileData as Profile);
        }

        // Navigate to users page
        window.location.href = '/admin/users';
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
                id: data.user.id,
                role: 'interviewee', // Default role
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
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
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
        
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

// Move development helpers to a separate file to fix Fast Refresh
const developmentHelpers = {
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

// Export development helpers only in development
export const exposeDevelopmentHelpers = process.env.NODE_ENV === 'development' 
  ? () => developmentHelpers 
  : undefined;
