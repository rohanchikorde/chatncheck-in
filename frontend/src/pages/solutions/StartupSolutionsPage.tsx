
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Rocket, ArrowRight, Zap } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

export default function StartupSolutionsPage() {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Affordable Plans",
      description: "Pricing designed for startups with flexible pay-as-you-go options"
    },
    {
      title: "Quick Setup",
      description: "Be up and running in hours, not weeks or months"
    },
    {
      title: "Expert Network",
      description: "Access to experienced technical interviewers on demand"
    },
    {
      title: "Scalable Solution",
      description: "Grows with your team from seed to Series B and beyond"
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
                <Rocket size={16} />
                <span>Startup Solutions</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Build Your Dream Team Fast
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Scale your tech teams quickly with minimal effort. Optimize your limited resources with our startup-friendly interview platform.
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
                onClick={() => navigate('/pricing')}
              >
                See Startup Pricing
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/placeholder.svg"
              alt="Startup hiring solutions"
              className="rounded-lg shadow-lg h-auto w-full max-w-lg mx-auto"
              width={540}
              height={400}
            />
          </div>
        </div>

        <div className="mb-16">
          <PageHeader 
            title="Built for Fast-Growing Teams" 
            description="Everything your startup needs to hire technical talent efficiently" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none bg-white shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16 overflow-hidden rounded-lg shadow-lg">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
            <h2 className="text-3xl font-bold mb-6">Why Startups Choose InterviewPulse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Save Engineering Time</h3>
                  <p className="text-white/80">Your engineers should be building, not interviewing. We handle the initial technical screens.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Hire Faster</h3>
                  <p className="text-white/80">Reduce your time-to-hire by 40% with our streamlined interview process.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Reduce Costs</h3>
                  <p className="text-white/80">Pay only for what you use with no long-term commitments or setup fees.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Improve Quality</h3>
                  <p className="text-white/80">Make better hiring decisions with structured interviews and objective evaluations.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8">
            <h3 className="text-2xl font-bold mb-4">Startup Success Story</h3>
            <blockquote className="italic text-gray-700 mb-6">
              "As a Series A startup, we couldn't afford to make bad engineering hires. InterviewPulse helped us establish a professional, consistent interview process that both improved our candidate experience and our hiring outcomes."
              <footer className="mt-2 text-sm font-medium">— CTO, AI Startup (YC W22)</footer>
            </blockquote>
            <p className="text-gray-600">
              This startup scaled from 5 to 25 engineers in 6 months while maintaining high quality standards and keeping their existing team focused on building their product.
            </p>
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="border-indigo-200 hover:bg-indigo-50 text-indigo-700"
              >
                Read the full case study
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Startup-Friendly Pricing</h2>
              <p className="text-gray-600 mb-6">
                We understand the unique needs and constraints of startups. Our flexible pricing plans are designed to grow with your business.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Pay-as-you-go options with no minimum commitment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Special pricing for YC, Techstars, and other accelerator alumni</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Scale up or down as your hiring needs change</span>
                </li>
              </ul>
              <Button
                className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                onClick={() => navigate('/book-demo')}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/3">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Startup Special</h3>
                <p className="text-3xl font-bold mb-2">$99 <span className="text-base font-normal text-gray-600">/month</span></p>
                <p className="text-sm text-gray-600 mb-4">Billed monthly, cancel anytime</p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Up to 10 interviews/month</span>
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>2 team members</span>
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/pricing')}
                >
                  View All Plans
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to accelerate your startup hiring?</h2>
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
