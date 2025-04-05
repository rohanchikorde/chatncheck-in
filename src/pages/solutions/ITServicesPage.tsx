
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, CheckCircle, Users, Laptop } from 'lucide-react';

export default function ITServicesPage() {
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
              IT Services
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              IT Services Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline technical assessments for IT service providers and consultancies with our specialized platform.
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
              <h2 className="text-2xl font-semibold mb-4">Designed for IT Service Providers</h2>
              <p className="text-gray-600 mb-6">
                InterviewPulse helps IT service companies efficiently assess technical skills to place the right consultants on client projects.
              </p>
              <ul className="space-y-3">
                {[
                  'Customizable coding assessments',
                  'Technical skill validation',
                  'Project-specific assessment templates',
                  'Multi-level interviewing workflows',
                  'Client-specific assessment protocols',
                  'Comprehensive feedback reports'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Code className="h-12 w-12 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">Technical Excellence</h3>
              <p className="text-gray-600">
                Ensure your consultants have the exact technical skills needed for each client project. Our platform combines live coding interviews with deep technical assessments.
              </p>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Key IT Service Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="h-10 w-10 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">Consultant Matching</h3>
                <p className="text-gray-600">
                  Match the right consultants to client projects based on verified technical skills.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Laptop className="h-10 w-10 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">Remote Assessments</h3>
                <p className="text-gray-600">
                  Conduct seamless remote technical assessments with our collaborative interviewing platform.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Code className="h-10 w-10 p-2 mb-4 bg-indigo-100 text-indigo-600 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">Skill Database</h3>
                <p className="text-gray-600">
                  Build a comprehensive database of consultant skills verified through our assessments.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-16 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to enhance your IT talent assessments?</h2>
            <p className="text-gray-600 mb-6">
              Our team will work with you to customize a solution that meets your specific IT service requirements.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              onClick={() => navigate('/book-demo')}
            >
              Request IT Services Demo
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
