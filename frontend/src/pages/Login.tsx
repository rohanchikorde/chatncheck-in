import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    try {
        const response = await axios.post('/api/auth/login', { email, password });
        // Handle successful login (e.g., redirect or store token)
        navigate('/interviewee/dashboard');
    } catch (error) {
        console.error('Login failed:', error);
        // Handle error (e.g., show error message)
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const full_name = "John Doe"; // Replace with actual input
    const phone_number = "1234567890"; // Replace with actual input
    const role = "user"; // Replace with actual input
    try {
        const response = await axios.post('/api/auth/register', { email, password, full_name, phone_number, role });
        // Handle successful registration (e.g., redirect or show success message)
        console.log('Registration successful:', response.data);
    } catch (error) {
        console.error('Registration failed:', error);
        // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-2">
            InterviewPulse
          </CardTitle>
          <p className="text-center text-gray-600">Welcome back! Please login to continue.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-4">
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
            <Button
              type="submit"
              className="w-full"
              onClick={handleLogin}
            >
              Login2
            </Button>
          </form>
          <div className="text-center mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/register')}
            >
              Don't have an account? Create account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
