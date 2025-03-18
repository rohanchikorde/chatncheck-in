import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  CalendarCheck, 
  BarChart3, 
  Users, 
  MessageSquare, 
  CheckSquare, 
  ArrowRight, 
  Clock, 
  Brain, 
  BarChartHorizontal,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">IP</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">InterviewPulse</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/auth')}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/auth?tab=signup')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col space-y-6 animate-fade-in">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-2 self-start">
                  Smart Hiring Platform
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Hiring</span> Process
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Streamline your interviews with AI-powered insights, expert interviewers, and comprehensive analytics to find the perfect candidates faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/admin')}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/admin')}>
                    Explore Features
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-200 rounded-full opacity-50"></div>
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 p-2">
                    <div className="relative rounded-lg overflow-hidden bg-indigo-600">
                      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-indigo-500 rounded-tl-[100px]"></div>
                      <div className="relative z-10 p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                              <span className="text-xs font-semibold">Hire Rate</span>
                            </div>
                            <div className="text-2xl font-bold">+35%</div>
                          </div>
                          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                              <span className="text-xs font-semibold">Time Saved</span>
                            </div>
                            <div className="text-2xl font-bold">60+ min</div>
                          </div>
                          <div className="col-span-2 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                            <div className="h-20 flex items-center justify-center">
                              <div className="w-full bg-gray-100 h-8 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full w-3/4 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-xl font-medium text-muted-foreground">Trusted by innovative companies</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-gradient-to-br from-white via-indigo-50 to-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Intelligent Interview Solutions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive platform streamlines the entire interview process with cutting-edge AI technology
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <CalendarCheck className="h-10 w-10 text-indigo-500" />,
                  title: "Structured Interviews",
                  description: "Consistently evaluate candidates with customizable interview templates"
                },
                {
                  icon: <Brain className="h-10 w-10 text-indigo-500" />,
                  title: "AI Interview Assistant",
                  description: "Get real-time insights and suggestions during interviews"
                },
                {
                  icon: <MessageSquare className="h-10 w-10 text-indigo-500" />,
                  title: "Comprehensive Feedback",
                  description: "Collect and analyze detailed feedback from interviewers"
                },
                {
                  icon: <BarChart3 className="h-10 w-10 text-indigo-500" />,
                  title: "Analytics Dashboard",
                  description: "Track hiring metrics and optimize your recruitment process"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-card rounded-lg p-6 flex flex-col items-center text-center animate-fade-in hover:shadow-md transition-shadow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 bg-indigo-50 p-3 rounded-lg">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How InterviewPulse Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process makes hiring efficient, fair, and effective
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-indigo-100 hidden md:block"></div>
              <div className="space-y-12 md:space-y-0 relative">
                {[
                  {
                    title: "Define Your Requirements",
                    description: "Set up job requirements, interview structure and evaluation criteria",
                    icon: <CheckSquare className="h-8 w-8 text-white" />
                  },
                  {
                    title: "Schedule Interviews",
                    description: "Our platform connects candidates with expert interviewers",
                    icon: <CalendarCheck className="h-8 w-8 text-white" />
                  },
                  {
                    title: "Conduct AI-Assisted Interviews",
                    description: "Get real-time insights during interviews to make better decisions",
                    icon: <Users className="h-8 w-8 text-white" />
                  },
                  {
                    title: "Analyze Detailed Reports",
                    description: "Review comprehensive feedback and make data-driven hiring decisions",
                    icon: <BarChartHorizontal className="h-8 w-8 text-white" />
                  }
                ].map((step, index) => (
                  <div key={index} className={`md:flex items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                      <div className="relative">
                        <div className="z-10 relative w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                          {step.icon}
                        </div>
                        <div className="absolute inset-0 bg-indigo-100 w-14 h-14 rounded-full opacity-50 animate-pulse"></div>
                      </div>
                    </div>
                    <Card className={`md:w-1/2 border-0 shadow-md ${index % 2 === 1 ? 'text-right' : 'text-left'}`}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Real Results, Real Impact</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Our platform delivers measurable improvements to your hiring process
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  value: "30%",
                  label: "Less Time-to-hire",
                  icon: <Clock className="h-8 w-8" />
                },
                {
                  value: "45min",
                  label: "Saved per interview",
                  icon: <CalendarCheck className="h-8 w-8" />
                },
                {
                  value: "$3k+",
                  label: "Savings per hire",
                  icon: <BarChart3 className="h-8 w-8" />
                },
                {
                  value: "20%",
                  label: "More quality hires",
                  icon: <Users className="h-8 w-8" />
                }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 text-indigo-200">{stat.icon}</div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from professionals who transformed their hiring process with InterviewPulse
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "InterviewPulse transformed our technical hiring process. We've cut interview time by 40% while finding better candidates.",
                  name: "Sarah Chen",
                  title: "CTO, TechInnovate",
                  image: "https://placekitten.com/64/64"
                },
                {
                  quote: "The structured interview templates and AI insights have completely standardized our hiring process. Game-changer for our HR team.",
                  name: "Michael Rodriguez",
                  title: "Head of Talent, GrowthCorp",
                  image: "https://placekitten.com/65/65"
                },
                {
                  quote: "The analytics dashboard helps us track and optimize our entire recruitment funnel. We've improved quality of hire significantly.",
                  name: "Priya Sharma",
                  title: "HR Director, FutureTech",
                  image: "https://placekitten.com/66/66"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-md overflow-hidden">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="text-3xl text-indigo-200 mb-4">"</div>
                      <p className="italic text-muted-foreground mb-6">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                        {/* <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" /> */}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="glass-panel bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-200 rounded-full opacity-50"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Ready to transform your interview process?</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Experience the future of interviewing with our comprehensive platform designed for modern hiring teams.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/admin')}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    Book a Demo Today
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/admin')}>
                    Explore Features
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="font-bold text-primary-foreground text-lg">IP</span>
                </div>
                <span className="font-semibold tracking-tight">InterviewPulse</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Transforming the interview process with AI-powered insights and expert interviewers.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">How It Works</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary">Guides</a></li>
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2023 InterviewPulse. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
