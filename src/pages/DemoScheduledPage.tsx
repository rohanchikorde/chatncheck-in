
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function DemoScheduledPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Thank You!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg">Your demo request has been successfully submitted.</p>
          <p>Our team will reach out to you within the next 24 hours to schedule your personalized demo of InterviewPulse.</p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-100 mt-6">
            <p className="font-semibold">What happens next?</p>
            <ol className="text-left list-decimal pl-5 mt-2 space-y-1">
              <li>You'll receive a confirmation email shortly</li>
              <li>A member of our team will contact you to schedule the demo</li>
              <li>We'll prepare a customized presentation for your needs</li>
              <li>Join the scheduled call and see InterviewPulse in action</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            onClick={() => window.location.href = "mailto:support@interviewpulse.com"}
          >
            Contact Support
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
