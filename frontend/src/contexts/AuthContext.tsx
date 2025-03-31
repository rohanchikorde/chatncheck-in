import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'interviewee' | 'interviewer' | 'admin';
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'interviewee'
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
