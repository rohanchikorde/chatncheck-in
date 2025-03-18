
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { CalendarCheck, Users, BarChart, Award, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Modern Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center">
                <span className="font-bold text-primary text-xl">IP</span>
              </div>
              <span className="font-bold text-xl">InterviewPulse</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth" className="text-white hover:text-white/80">
                Log In
              </Link>
              <Link to="/auth?tab=signup">
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Streamline Your Interview Process
              </h1>
              <p className="text-xl opacity-90 max-w-xl">
                Effortlessly manage, schedule, and conduct interviews with our comprehensive platform designed for recruiters and candidates alike.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/auth?tab=signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 p-6 rounded-lg flex flex-col items-center text-center">
                    <CalendarCheck className="h-10 w-10 mb-3" />
                    <h3 className="font-medium">Easy Scheduling</h3>
                  </div>
                  <div className="bg-white/20 p-6 rounded-lg flex flex-col items-center text-center">
                    <Users className="h-10 w-10 mb-3" />
                    <h3 className="font-medium">Candidate Tracking</h3>
                  </div>
                  <div className="bg-white/20 p-6 rounded-lg flex flex-col items-center text-center">
                    <BarChart className="h-10 w-10 mb-3" />
                    <h3 className="font-medium">Insightful Analytics</h3>
                  </div>
                  <div className="bg-white/20 p-6 rounded-lg flex flex-col items-center text-center">
                    <Award className="h-10 w-10 mb-3" />
                    <h3 className="font-medium">Skill Assessment</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content sections */}
      <main className="flex-grow">
        {/* Features section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Every Step</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CalendarCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Smart Scheduling</h3>
                <p className="text-gray-600">
                  Automatically find the perfect time for interviews based on availability of all participants.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Interviewer Matching</h3>
                <p className="text-gray-600">
                  Match candidates with the right interviewers based on skills, experience, and expertise.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Detailed Analytics</h3>
                <p className="text-gray-600">
                  Gain insights into your interview process with comprehensive reporting and analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How InterviewPulse Works</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Create Your Account</h3>
                    <p className="text-gray-600">Sign up as an interviewer or interviewee and set up your profile.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Schedule Interviews</h3>
                    <p className="text-gray-600">Easily create and manage interview sessions with built-in scheduling tools.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Conduct Interviews</h3>
                    <p className="text-gray-600">Use our platform to conduct seamless interviews with helpful tools and prompts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Analyze Results</h3>
                    <p className="text-gray-600">Review feedback, scores, and make data-driven hiring decisions.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-gray-100 rounded-xl p-8 max-w-md w-full">
                  <img 
                    src="/placeholder.svg" 
                    alt="Interview Process" 
                    className="w-full h-64 object-cover rounded-lg bg-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Interview Process?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have streamlined their hiring with InterviewPulse.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth?tab=signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
                  <span className="font-bold text-gray-800 text-lg">IP</span>
                </div>
                <span className="font-bold text-lg">InterviewPulse</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Simplifying the interview process for both recruiters and candidates.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Use Cases</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Documentation</a></li>
                  <li><a href="#" className="hover:text-white">Support</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} InterviewPulse. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
