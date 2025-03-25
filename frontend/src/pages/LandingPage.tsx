
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Box, Code, GraduationCap, Building, Users, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function LandingPage() {
  const navigate = useNavigate();

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
          
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Why InterviewPulse?</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <ListItem title="About Us" href="/about">
                        Learn about our mission and why we're transforming the hiring process
                      </ListItem>
                      <ListItem title="Success Stories" href="/success-stories">
                        See how companies improved their hiring with InterviewPulse
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      <ListItem 
                        href="/solutions/enterprise"
                        title="Enterprise Solutions"
                        className="flex items-start gap-2"
                      >
                        <Box className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        Hire top engineers company-wide in minutes
                      </ListItem>
                      <ListItem 
                        href="/solutions/it-services"
                        title="IT Services" 
                        className="flex items-start gap-2"
                      >
                        <Code className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        Conduct seamless coding interviews for IT talent pipelines
                      </ListItem>
                      <ListItem 
                        href="/solutions/staffing"
                        title="Staffing Solutions" 
                        className="flex items-start gap-2"
                      >
                        <Users className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        Boost recruiter efficiency and productivity at scale
                      </ListItem>
                      <ListItem 
                        href="/solutions/startups"
                        title="Startup Solutions" 
                        className="flex items-start gap-2"
                      >
                        <Rocket className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        Scale your tech teams fast with minimal effort
                      </ListItem>
                      <ListItem 
                        href="/solutions/education"
                        title="Education Solutions" 
                        className="flex items-start gap-2"
                      >
                        <GraduationCap className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        Simplify university hiring with scalable tech screening
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1">
                      <ListItem title="Blog" href="/blog">
                        Latest insights on technical interviews and hiring
                      </ListItem>
                      <ListItem title="Guides" href="/guides">
                        Comprehensive guides to improve your interview process
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/pricing')}
                    className="p-0 font-normal"
                  >
                    Pricing
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/contact')}
                    className="p-0 font-normal"
                  >
                    Contact Us
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              onClick={() => navigate('/book-demo')}
            >
              Request Demo
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Transform Your Hiring Process
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              AI-powered insights, expert interviewers, and comprehensive analytics to make better hiring decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                onClick={() => navigate('/book-demo')}
              >
                Book a Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/admin')}
              >
                Explore Platform
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Standardized Interviews</h3>
              <p className="text-gray-600">Consistent interview processes across all candidates, ensuring fair and unbiased evaluations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Interviewers</h3>
              <p className="text-gray-600">Access to a network of professional interviewers with domain expertise across industries.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-gray-600">Comprehensive analytics and reporting to help you make informed hiring decisions.</p>
            </div>
          </div>

          <div className="py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Solutions for Every Industry</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <Box className="h-10 w-10 p-2 bg-indigo-100 text-indigo-600 rounded-lg" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Enterprise Solutions</h3>
                    <p className="text-gray-600 text-sm">Hire top engineers company-wide in minutes</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/solutions/enterprise')}>
                  Learn More
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <Code className="h-10 w-10 p-2 bg-indigo-100 text-indigo-600 rounded-lg" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">IT Services</h3>
                    <p className="text-gray-600 text-sm">Conduct seamless coding interviews for IT talent pipelines</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/solutions/it-services')}>
                  Learn More
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <Users className="h-10 w-10 p-2 bg-indigo-100 text-indigo-600 rounded-lg" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Staffing Solutions</h3>
                    <p className="text-gray-600 text-sm">Boost recruiter efficiency and productivity at scale</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/solutions/staffing')}>
                  Learn More
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <Rocket className="h-10 w-10 p-2 bg-indigo-100 text-indigo-600 rounded-lg" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Startup Solutions</h3>
                    <p className="text-gray-600 text-sm">Scale your tech teams fast with minimal effort</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/solutions/startups')}>
                  Learn More
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <GraduationCap className="h-10 w-10 p-2 bg-indigo-100 text-indigo-600 rounded-lg" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Education Solutions</h3>
                    <p className="text-gray-600 text-sm">Simplify university hiring with scalable tech screening</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/solutions/education')}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your hiring process?</h2>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              onClick={() => navigate('/book-demo')}
            >
              Book a Demo Today
            </Button>
          </div>
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
