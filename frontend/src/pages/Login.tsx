import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to interviewee dashboard
    navigate('/interviewee/dashboard');
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
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
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
            >
              Login
            </Button>
          </form>
          <div className="text-center mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/book-demo')}
            >
              Don't have an account? Request Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
