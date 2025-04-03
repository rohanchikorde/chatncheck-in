import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RegisterFormData {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      full_name: (document.getElementById('full_name') as HTMLInputElement).value,
      phone_number: (document.getElementById('phone_number') as HTMLInputElement).value,
      role: 'user'
    };

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/auth/register', formData);
      
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-2">
            Create Account
          </CardTitle>
          <p className="text-center text-gray-600">Create your account to get started.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                type="tel"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>
          <div className="text-center mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
