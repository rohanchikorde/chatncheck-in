
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Demo login credentials for testing
      if (email === 'admin@example.com' && password === 'admin123') {
        toast({
          title: "Login successful",
          description: "Welcome to InterviewPulse",
        });
        navigate('/admin');
      } else if (email === 'interviewer@example.com' && password === 'test123') {
        toast({
          title: "Login successful",
          description: "Welcome to InterviewPulse",
        });
        navigate('/interviewer');
      } else if (email === 'interviewee@example.com' && password === 'test123') {
        toast({
          title: "Login successful",
          description: "Welcome to InterviewPulse",
        });
        navigate('/interviewee');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred while logging in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="mb-8 flex items-center">
        <div className="w-10 h-10 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-2">
          <span className="font-bold text-primary-foreground text-lg">IP</span>
        </div>
        <span className="font-semibold text-xl tracking-tight">InterviewPulse</span>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal text-xs"
                  onClick={() => toast({
                    title: "Password reset",
                    description: "Check your email for a reset link",
                  })}
                >
                  Forgot password?
                </Button>
              </div>
              <Input 
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Demo Login Credentials</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="border rounded p-2">
                <p className="font-medium">Admin:</p>
                <p>admin@example.com</p>
                <p>admin123</p>
              </div>
              <div className="border rounded p-2">
                <p className="font-medium">Interviewer:</p>
                <p>interviewer@example.com</p>
                <p>test123</p>
              </div>
            </div>
          </div>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button 
              variant="link" 
              className="p-0 h-auto font-normal"
              onClick={() => navigate('/book-demo')}
            >
              Contact us
            </Button>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            size="sm"
            className="w-full"
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
