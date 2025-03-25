
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Code, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

export default function ITServicesPage() {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Live Coding Interviews",
      description: "Real-time collaborative coding environment with video integration"
    },
    {
      title: "Technical Assessment Library",
      description: "Curated collection of coding challenges across languages and frameworks"
    },
    {
      title: "Automated Evaluation",
      description: "AI-powered code analysis to evaluate solution quality and efficiency"
    },
    {
      title: "Custom Interview Design",
      description: "Create tailored interview flows specific to your technology stack"
    }
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
                <Code size={16} />
                <span>IT Services</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Optimize Your Technical Hiring
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Conduct seamless coding interviews for IT talent pipelines. Evaluate technical skills effectively with our specialized platform.
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
              alt="IT Services coding interview platform"
              className="rounded-lg shadow-lg h-auto w-full max-w-lg mx-auto"
              width={540}
              height={400}
            />
          </div>
        </div>

        <div className="mb-16">
          <PageHeader 
            title="Technical Interview Solutions" 
            description="Purpose-built tools for assessing technical talent efficiently" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-bold mb-6">Streamline Your Technical Assessment</h2>
              <p className="text-gray-600 mb-6">
                Our platform helps IT service companies evaluate candidates' coding skills, problem-solving abilities, and technical knowledge with precision and efficiency.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Support for 30+ programming languages</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Framework-specific assessment templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Real-time code execution and testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Detailed performance analytics and reports</span>
                </li>
              </ul>
              
              <Button
                className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                onClick={() => navigate('/book-demo')}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white flex items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Success Story: TechServe Inc.</h3>
                <p className="mb-6">
                  A leading IT services company reduced their technical screening time by 60% while improving candidate quality by implementing InterviewPulse's structured assessment process.
                </p>
                <blockquote className="border-l-4 border-white/30 pl-4 italic">
                  "The quality of technical talent we're able to identify has dramatically improved since implementing InterviewPulse. Our clients have noticed the difference."
                  <footer className="mt-2 text-sm font-medium">— Director of Talent Acquisition</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your technical hiring?</h2>
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
