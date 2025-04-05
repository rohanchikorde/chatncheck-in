
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Box, Code, GraduationCap, Building, Users, Rocket, ArrowRight, Briefcase, User } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold tracking-tighter">
              <span className="text-black">Interview</span>
              <span className="text-blue-600">Pulse</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium bg-transparent">Why InterviewPulse?</NavigationMenuTrigger>
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
                  <NavigationMenuTrigger className="text-base font-medium bg-transparent">Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      <ListItem 
                        href="/solutions/enterprise"
                        title="Enterprise Solutions"
                        className="flex items-start gap-2"
                      >
                        <Box className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        Hire top engineers company-wide in minutes
                      </ListItem>
                      <ListItem 
                        href="/solutions/it-services"
                        title="IT Services" 
                        className="flex items-start gap-2"
                      >
                        <Code className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        Conduct seamless coding interviews for IT talent pipelines
                      </ListItem>
                      <ListItem 
                        href="/solutions/staffing"
                        title="Staffing Solutions" 
                        className="flex items-start gap-2"
                      >
                        <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        Boost recruiter efficiency and productivity at scale
                      </ListItem>
                      <ListItem 
                        href="/solutions/startups"
                        title="Startup Solutions" 
                        className="flex items-start gap-2"
                      >
                        <Rocket className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        Scale your tech teams fast with minimal effort
                      </ListItem>
                      <ListItem 
                        href="/solutions/education"
                        title="Education Solutions" 
                        className="flex items-start gap-2"
                      >
                        <GraduationCap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        Simplify university hiring with scalable tech screening
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/pricing')}
                    className="p-0 font-medium text-base"
                  >
                    Pricing
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium bg-transparent">Resources</NavigationMenuTrigger>
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
                    onClick={() => navigate('/contact')}
                    className="p-0 font-medium text-base"
                  >
                    Contact Us
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="border-black text-black hover:bg-gray-50 font-medium rounded-none px-6"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/book-demo')}
              className="bg-black text-white hover:bg-gray-800 font-medium rounded-none px-6"
            >
              Request demo
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                InterviewPulse Platform
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                InterviewPulse is an all-in-one platform designed to streamline every aspect of your tech hiring process.
              </p>
              <Button
                onClick={() => navigate('/book-demo')}
                className="bg-black text-white hover:bg-gray-800 font-medium rounded-none px-6 h-12 flex items-center gap-2"
              >
                Request demo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative z-10">
                <img 
                  src="/lovable-uploads/94070a4f-6dcd-4bfb-98f1-e24d3d8742e4.png" 
                  alt="Interview Platform" 
                  className="max-w-full" 
                />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -z-10 opacity-50 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full -z-10 opacity-50 blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="mb-6 p-3 bg-gray-100 rounded-full w-fit">
                <Briefcase className="h-6 w-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Business</h2>
              <p className="text-gray-600 mb-6">
                Expert-led technical interviews on demand for all your hiring needs.
              </p>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  onClick={() => navigate('/solutions/enterprise')}
                  className="border-black text-black hover:bg-gray-50 font-medium rounded-none px-6"
                >
                  Learn more
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="mb-6 p-3 bg-gray-100 rounded-full w-fit">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Individuals</h2>
              <p className="text-gray-600 mb-6">
                Setup 1:1 with industry experts and crack your next tech interview.
              </p>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  onClick={() => navigate('/solutions/individual')}
                  className="border-black text-black hover:bg-gray-50 font-medium rounded-none px-6"
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Visionaries Grow with InterviewPulse
            </h2>
            
            {/* Add testimonial content here */}
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-8 px-4 bg-white">
        <div className="container mx-auto text-center text-sm text-gray-600">
          © 2023 InterviewPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
