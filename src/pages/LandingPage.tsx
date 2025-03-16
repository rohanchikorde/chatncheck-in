
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Calendar, Users, MessageSquare } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Streamlined Interview Scheduling",
      description: "Schedule interviews with ease. Choose interviewers, set times, and send automatic invitations to candidates.",
      icon: <Calendar className="h-8 w-8 text-primary" />,
    },
    {
      title: "Interviewer Management",
      description: "Manage your interviewer pool. Track interviewer skills, availability and feedback quality.",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Structured Feedback Collection",
      description: "Collect standardized feedback from interviewers with customizable templates and scoring systems.",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
    },
  ];

  const benefits = [
    "Cut interview scheduling time by 80%",
    "Reduce time-to-hire by 30%",
    "Improve candidate experience",
    "Standardize your interview process",
    "Make better hiring decisions with structured data",
    "Identify top performing interviewers"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center mb-16">
            <div className="text-2xl font-bold">InterviewPro</div>
            <div className="space-x-4">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                Features
              </Button>
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                Pricing
              </Button>
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                About
              </Button>
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-indigo-700"
                onClick={() => navigate("/index")}
              >
                Sign In
              </Button>
            </div>
          </nav>

          <div className="flex flex-col md:flex-row items-center justify-between py-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Streamline Your Technical Interview Process
              </h1>
              <p className="text-xl mb-6 text-indigo-100">
                Powerful tools for scheduling, conducting, and evaluating technical interviews - all in one platform.
              </p>
              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-700 hover:bg-indigo-100"
                  onClick={() => navigate("/index")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/20"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/placeholder.svg" 
                alt="Interview Dashboard" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Your Hiring Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform helps you streamline the entire interview process from scheduling to feedback collection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Benefits of InterviewPro</h2>
              <p className="text-xl text-gray-600 mb-6">
                Our customers see dramatic improvements in their technical interview process.
              </p>
              
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                size="lg" 
                className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => navigate("/index")}
              >
                Start Free Trial
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-200 rounded-lg transform rotate-3"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Interview Benefits" 
                  className="relative rounded-lg shadow-lg z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Interview Process?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of companies that have streamlined their technical interviews with our platform.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-indigo-700 hover:bg-indigo-100"
            onClick={() => navigate("/index")}
          >
            Sign Up Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">InterviewPro</h3>
              <p className="text-gray-400">The complete platform for technical interview management.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Testimonials</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Legal</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2023 InterviewPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
