
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, ArrowRight, BarChart } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

export default function StaffingSolutionsPage() {
  const navigate = useNavigate();
  
  const benefits = [
    "Screen candidates 5x faster with automated initial assessments",
    "Reduce recruiter workload by standardizing the technical evaluation process",
    "Improve candidate quality with consistent skill evaluation",
    "Scale your technical interviews without expanding your team",
    "Get detailed analytics on your recruitment pipeline efficiency"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="border-b border-border/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">IP</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">InterviewPulse</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              onClick={() => navigate('/book-demo')}
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          <div className="md:w-1/2">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
                <Users size={16} />
                <span>Staffing Solutions</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Accelerate Your Recruitment
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Boost recruiter efficiency and productivity at scale. Streamline your staffing operations with our specialized interview platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                onClick={() => navigate('/book-demo')}
              >
                Schedule a Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/contact')}
              >
                Contact Sales
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/placeholder.svg"
              alt="Staffing solutions platform"
              className="rounded-lg shadow-lg h-auto w-full max-w-lg mx-auto"
              width={540}
              height={400}
            />
          </div>
        </div>

        <div className="mb-16">
          <PageHeader 
            title="Staffing Agency Solutions" 
            description="Purpose-built tools to enhance recruiter productivity and candidate quality" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-none">
              <CardHeader>
                <BarChart className="h-10 w-10 text-indigo-600 mb-2" />
                <CardTitle>Recruiter Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  A centralized platform for recruiters to track candidate progress, schedule interviews, and generate reports.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-none">
              <CardHeader>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 mb-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M8 18v-1"/><path d="M16 18v-3"/></svg>
                <CardTitle>Skill Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Technical and soft skill assessment tools to evaluate candidates before client submission.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-none">
              <CardHeader>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 mb-2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>
                <CardTitle>Client Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Dedicated client access to review pre-screened candidates with detailed assessment reports.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16 bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Benefits for Staffing Agencies</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                onClick={() => navigate('/book-demo')}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">ROI Calculator</h3>
              <p className="text-gray-600 mb-6">
                See how InterviewPulse can impact your staffing metrics:
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Time saved per technical screening</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full w-[75%]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0 hours</span>
                    <span>4 hours saved per candidate</span>
                  </div>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Increase in candidate quality</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full w-[65%]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0%</span>
                    <span>65% improvement</span>
                  </div>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Reduction in candidate dropout</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full w-[40%]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0%</span>
                    <span>40% reduction</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <p className="font-medium text-indigo-700">For a staffing agency placing 100 technical candidates per year:</p>
                <p className="font-bold text-2xl mt-2">$320,000 estimated annual savings</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to boost your staffing efficiency?</h2>
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            onClick={() => navigate('/book-demo')}
          >
            Schedule Your Demo Today
          </Button>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4 bg-gray-50 mt-16">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 InterviewPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
