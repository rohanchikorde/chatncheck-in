
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, CheckCircle, Zap, Clock } from 'lucide-react';

export default function StartupSolutionsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="border-b border-border/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">IP</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">InterviewPulse</span>
          </div>
          
          <Button
            onClick={() => navigate('/book-demo')}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            Request Demo
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8"
        >
          ← Back to Home
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <div className="inline-block p-1 px-3 mb-4 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
              Startups
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Startup Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Scale your technical team quickly and confidently with our startup-focused interviewing platform.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              onClick={() => navigate('/book-demo')}
            >
              Schedule a Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Built for Growing Startups</h2>
              <p className="text-gray-600 mb-6">
                InterviewPulse helps startups build high-performing technical teams without the overhead of a large recruiting department.
              </p>
              <ul className="space-y-3">
                {[
                  'Ready-to-use technical interview templates',
                  'On-demand expert interviewers',
                  'Consistent evaluation frameworks',
                  'Scalable hiring process',
                  'Affordable pricing plans',
                  'Quick implementation'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Rocket className="h-12 w-12 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">Built for Growth</h3>
              <p className="text-gray-600">
                Focus on building your product while we handle your technical hiring pipeline. Scale your team with confidence using our proven assessment methods.
              </p>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Key Startup Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Zap className="h-10 w-10 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">Quick Setup</h3>
                <p className="text-gray-600">
                  Get your technical hiring process up and running in minutes, not days or weeks.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Clock className="h-10 w-10 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">Time Savings</h3>
                <p className="text-gray-600">
                  Reduce time spent on technical interviews by 70% with our optimized process.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Rocket className="h-10 w-10 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">Flexible Scaling</h3>
                <p className="text-gray-600">
                  Our platform grows with you, from your first technical hire to your hundredth.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-16 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to scale your startup's technical team?</h2>
            <p className="text-gray-600 mb-6">
              Our team will work with you to customize a solution that fits your startup's unique needs and budget.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              onClick={() => navigate('/book-demo')}
            >
              Request Startup Demo
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border py-8 px-4 bg-gray-50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 InterviewPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
