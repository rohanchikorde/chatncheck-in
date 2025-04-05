
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Box, CheckCircle, UserPlus, BarChart3 } from 'lucide-react';

export default function EnterpriseSolutionsPage() {
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
              Enterprise
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline your technical hiring process and make better decisions with our comprehensive enterprise platform.
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
              <h2 className="text-2xl font-semibold mb-4">Built for Enterprise Scale</h2>
              <p className="text-gray-600 mb-6">
                InterviewPulse provides a comprehensive suite of tools to manage technical interviews across departments, locations, and hiring managers.
              </p>
              <ul className="space-y-3">
                {[
                  'Centralized interview management',
                  'Custom assessment templates',
                  'Role-based access control',
                  'Single Sign-On (SSO) integration',
                  'Enterprise-grade security',
                  'Dedicated account management'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Box className="h-12 w-12 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">Scalable Solutions</h3>
              <p className="text-gray-600">
                Whether you're hiring dozens or hundreds of engineers, our platform scales to meet your needs. Maintain consistency across your organization while empowering individual hiring managers.
              </p>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Key Enterprise Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <UserPlus className="h-10 w-10 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">Global Talent Pipeline</h3>
                <p className="text-gray-600">
                  Build and manage a centralized talent pipeline across departments and locations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <BarChart3 className="h-10 w-10 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-600">
                  Gain insights into your hiring process with comprehensive reporting and analytics.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Box className="h-10 w-10 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">API Integration</h3>
                <p className="text-gray-600">
                  Seamlessly integrate with your existing HR systems and ATS platforms.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-16 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to transform your enterprise hiring?</h2>
            <p className="text-gray-600 mb-6">
              Our team will work with you to customize a solution that meets your specific requirements.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              onClick={() => navigate('/book-demo')}
            >
              Request Enterprise Demo
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
