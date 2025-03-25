
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, GraduationCap, ArrowRight, BookOpen } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

export default function EducationSolutionsPage() {
  const navigate = useNavigate();
  
  const benefits = [
    "Standardize skills assessment across departments and programs",
    "Create custom evaluation criteria aligned with curriculum",
    "Provide students with real-world interview experience",
    "Help career services improve student placement rates",
    "Connect with employers seeking to hire from your institution"
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
                <GraduationCap size={16} />
                <span>Education Solutions</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Elevate Academic Hiring & Training
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Simplify university hiring with scalable tech screening. Prepare students for industry interviews and improve placement rates.
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
                Contact Education Team
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/placeholder.svg"
              alt="Education solutions platform"
              className="rounded-lg shadow-lg h-auto w-full max-w-lg mx-auto"
              width={540}
              height={400}
            />
          </div>
        </div>

        <div className="mb-16">
          <PageHeader 
            title="Solutions for Educational Institutions" 
            description="Comprehensive tools for universities, colleges, and technical schools" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Faculty & Staff Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Streamline your technical faculty recruitment with standardized evaluation processes that ensure fair assessment of candidates.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Customizable assessment templates</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Interview scheduling and management</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Collaborative evaluation tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Student Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Prepare your students for industry roles with realistic technical interview simulations and feedback.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Industry-standard interview simulations</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Detailed feedback and improvement suggestions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Progress tracking over time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6">Benefits for Academic Institutions</h2>
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
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Academic Success Stories</h3>
              
              <div className="mb-8">
                <h4 className="font-bold mb-2">Technical University of California</h4>
                <p className="mb-4">Improved student placement rates by 32% after implementing interview preparation program.</p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-white/80">
                  <span>Before: 68%</span>
                  <span>After: 90%</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">Midwest College of Computing</h4>
                <p className="mb-4">Reduced faculty hiring time by 40% while increasing diversity in technical departments.</p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-2/5"></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-white/80">
                  <span>Before: 120 days</span>
                  <span>After: 72 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <PageHeader 
            title="Educational Pricing" 
            description="Special pricing for educational institutions" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="border-2 border-indigo-100 relative">
              <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardHeader>
                <CardTitle>Department</CardTitle>
                <p className="text-3xl font-bold mt-2">$499<span className="text-sm font-normal text-gray-500">/month</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>For individual departments</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Up to 50 interviews/month</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>10 administrator accounts</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" 
                  onClick={() => navigate('/book-demo')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Faculty Hiring</CardTitle>
                <p className="text-3xl font-bold mt-2">$299<span className="text-sm font-normal text-gray-500">/month</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>For HR departments</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Up to 25 faculty interviews/month</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>5 administrator accounts</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/book-demo')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Institution</CardTitle>
                <p className="text-3xl font-bold mt-2">Contact Us<span className="text-sm font-normal text-gray-500"> for pricing</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>For entire institutions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Unlimited interviews</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Unlimited administrator accounts</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Advanced analytics and reporting</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your educational hiring and training?</h2>
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
