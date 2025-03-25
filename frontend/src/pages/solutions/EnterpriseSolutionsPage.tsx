
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Globe, Users, ShieldCheck, LucideBarChart, Clock, Code, Lock, Database } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

export default function EnterpriseSolutionsPage() {
  const navigate = useNavigate();
  
  const challenges = [
    {
      title: "Lengthy hiring cycles",
      description: "Traditional interview processes can take weeks or months, causing you to miss out on top talent."
    },
    {
      title: "Engineering bandwidth bottleneck",
      description: "Your engineers spend valuable time conducting interviews instead of building products."
    },
    {
      title: "Inconsistent evaluation standards",
      description: "Without structured assessment methods, hiring decisions lack objectivity and reliability."
    },
    {
      title: "High candidate drop-off rates",
      description: "Prolonged interview cycles lead to candidates accepting offers elsewhere before you can decide."
    }
  ];

  const benefits = [
    {
      title: "Accelerate your hiring pipeline",
      description: "Reduce time-to-hire by 45% with streamlined technical interviews and rapid candidate assessment.",
      icon: <Clock className="w-10 h-10 text-indigo-500" />
    },
    {
      title: "Free up engineering resources",
      description: "Let your engineers focus on building products while our platform handles technical evaluations.",
      icon: <Code className="w-10 h-10 text-indigo-500" />
    },
    {
      title: "Standardize assessment criteria",
      description: "Implement consistent evaluation rubrics for fair, data-driven hiring decisions across your organization.",
      icon: <LucideBarChart className="w-10 h-10 text-indigo-500" />
    },
    {
      title: "Enterprise-grade security",
      description: "Your data is protected with SOC 2 compliant infrastructure and end-to-end encryption protocols.",
      icon: <Lock className="w-10 h-10 text-indigo-500" />
    },
    {
      title: "Seamless ATS integration",
      description: "Connects with your existing applicant tracking system for a unified hiring workflow.",
      icon: <Database className="w-10 h-10 text-indigo-500" />
    },
    {
      title: "Global talent access",
      description: "Tap into a diverse pool of candidates regardless of geographical boundaries.",
      icon: <Globe className="w-10 h-10 text-indigo-500" />
    }
  ];

  const trustedBy = [
    "Google", "Microsoft", "Amazon", "Oracle", "Adobe", "IBM", "Salesforce"
  ];

  const features = [
    {
      title: "Expert Interviewer Network",
      description: "Access to verified technical interviewers from top-tier companies",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Comprehensive Dashboard",
      description: "Monitor all interview activities across your organization",
      icon: <LucideBarChart className="h-5 w-5" />
    },
    {
      title: "Advanced Analytics",
      description: "Data-driven insights to optimize your hiring process",
      icon: <LucideBarChart className="h-5 w-5" />
    },
    {
      title: "Secure Environment",
      description: "Enterprise-grade security with SOC 2 compliance",
      icon: <ShieldCheck className="h-5 w-5" />
    }
  ];

  const testimonial = {
    quote: "InterviewPulse has transformed our technical hiring process. We've reduced our time-to-hire by 40% while maintaining the highest quality standards for engineering talent.",
    author: "Sarah Chen",
    title: "VP of Engineering, Fortune 500 Tech Company"
  };

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
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          <div className="md:w-1/2">
            <Badge className="mb-4 px-3 py-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none">
              Enterprise Solutions
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Build engineering teams that deliver faster
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              In the fast-moving world of enterprise technology, great products need great execution. Hiring the right engineers is vital but shouldn't slow you down.
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
              alt="Enterprise interview platform"
              className="rounded-lg shadow-lg h-auto w-full max-w-lg mx-auto"
              width={540}
              height={400}
            />
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Trusted by global industry leaders
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Join the ranks of industry leaders who rely on InterviewPulse to streamline their tech hiring and build high-performing teams.
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            {trustedBy.map((company, index) => (
              <div key={index} className="text-xl font-bold text-gray-500">
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Challenges Section */}
        <div className="mb-16">
          <PageHeader 
            title="Challenges faced by enterprises in technical hiring" 
            description="Common bottlenecks that slow down your engineering recruitment process" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {challenges.map((challenge, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <PageHeader 
            title="How InterviewPulse empowers enterprise teams" 
            description="Our platform solves your biggest technical hiring challenges" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-start transition-all hover:shadow-md">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Recruit exceptional tech talent</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Stop letting hiring bottlenecks slow you down. Join hundreds of enterprises that trust InterviewPulse to hire smarter and faster.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-indigo-700 hover:bg-gray-100"
            onClick={() => navigate('/request-demo')}
          >
            Request a demo today <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Features Section */}
        <div className="mb-16 bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Key features tailored for enterprises</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Expert interviewers specialized in roles like DevOps, full-stack, and site reliability engineering</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Standardized rubrics tailored to your requirements for consistent assessments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Advanced analytics dashboards with actionable hiring insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Enterprise-grade security with SOC 2 compliance and data encryption</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Seamless integration with your existing ATS or HRMS</span>
                </li>
              </ul>
              <Button
                className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                onClick={() => navigate('/book-demo')}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Case Study: Global Tech Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-700">
                    A Fortune 500 technology company improved their engineering hiring process by standardizing technical interviews across 12 global offices, reducing their time-to-hire by 45% and increasing quality of hires.
                  </p>
                  <blockquote className="border-l-4 border-indigo-300 pl-4 italic">
                    "{testimonial.quote}"
                    <footer className="mt-2 text-sm font-medium">— {testimonial.author}, {testimonial.title}</footer>
                  </blockquote>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Read Full Case Study
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Rubric-based evaluations for consistency</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Use standardized rubrics tailored to your requirements for consistent assessments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Guarantee fair, data-driven hiring decisions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Build confidence in the selection process with a structured approach</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Advanced cheating detection</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Ensure fair evaluations with features like live monitoring and event tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Detect and flag malpractice, including tab-switching and code copy-pasting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Instantly notify interviewers for review of suspicious activities</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">AI-powered candidate authenticity</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Build trust with real-time face verification and lip-sync detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Confirm candidate identity with advanced authentication features</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Ensure a secure and reliable evaluation process</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Enterprise-grade security & compliance</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Prioritize data safety with enterprise-grade security standards</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Ensure complete protection at every stage of the hiring process</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Trust a platform built for stringent security compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Expert Interviewers Section */}
        <div className="mb-16">
          <PageHeader 
            title="Our expert interviewer panel" 
            description="Access to qualified technical interviewers around the clock from leading companies" 
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src="/placeholder.svg" 
                    alt="Interviewer profile" 
                    className="object-cover w-full h-full" 
                  />
                  <div className="absolute bottom-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded flex items-center text-sm font-medium">
                    <span className="mr-1">4.{80 + item}</span>
                    <span>★</span>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium truncate">Expert Interviewer {item}</h4>
                  <p className="text-sm text-muted-foreground truncate">Senior Engineer at Tech Company</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="mx-auto">
              View all interviewers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build your dream team?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join hundreds of enterprises that trust InterviewPulse to hire smarter, faster, and better.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-indigo-700 hover:bg-gray-100"
            onClick={() => navigate('/request-demo')}
          >
            Request demo <ArrowRight className="ml-2 h-4 w-4" />
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
