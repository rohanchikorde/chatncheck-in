import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
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
  RefreshCw
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function LandingPage() {
  const navigate = useNavigate();
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroSubTextRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navButtonRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [statValues, setStatValues] = useState({ hireRate: 0, timeSaved: 0 });

  // Initialize animations on component mount
  useEffect(() => {
    // Initialize AOS library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });

    // Logo animation
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotation: 0, opacity: 0 },
      { scale: 1, rotation: 360, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" }
    );

    // Navbar button floating animation
    gsap.to(navButtonRef.current, {
      y: "-10px",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Typewriter effect for heading
    const headingText = "Transform Your Hiring Process";
    if (heroHeadingRef.current) {
      heroHeadingRef.current.textContent = "";
      gsap.to(heroHeadingRef.current, {
        duration: headingText.length * 0.05,
        text: headingText,
        ease: "none",
        delay: 1
      });
    }

    // Subtitle fade-in animation
    gsap.fromTo(
      heroSubTextRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: headingText.length * 0.05 + 1.2 }
    );

    // CTA button pulse animation
    gsap.to(heroCTARef.current, {
      boxShadow: "0 0 15px rgba(79, 70, 229, 0.8)",
      scale: 1.03,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Set up stats counter animations with ScrollTrigger
    ScrollTrigger.create({
      trigger: ".stats-section",
      start: "top 80%",
      onEnter: () => {
        // Animate the stats values - fix the reference to statValues object
        // Create a temporary object for the animation
        const animObj = { hireRate: 0, timeSaved: 0 };
        
        gsap.to(animObj, {
          hireRate: 35,
          timeSaved: 60,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            setStatValues({
              hireRate: Math.round(animObj.hireRate),
              timeSaved: Math.round(animObj.timeSaved)
            });
          }
        });
      }
    });

    // Create parallax effects for background elements
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const background = section.querySelector(".bg-parallax");
      if (background) {
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.to(background, {
              y: (self.progress * 50),
              ease: "none",
              overwrite: "auto"
            });
          }
        });
      }
    });

    // Add cursor follower effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Update cursor follower position
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  }, [mousePosition]);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Custom cursor follower */}
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 mix-blend-screen pointer-events-none z-50"
        style={{ top: -15, left: -15 }}
      />

      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div ref={logoRef} className="flex items-center gap-2">
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
              onClick={() => navigate('/admin/interviews')}
              className="hidden sm:flex"
            >
              Demo
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/interviewer/interviews')}
              className="hidden sm:flex"
            >
              Interviewer
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/interviewee/interviews')}
              className="hidden sm:flex"
            >
              Interviewee
            </Button>
            <Button 
              ref={navButtonRef}
              onClick={() => navigate('/admin/interviews')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
          {/* Parallax background elements */}
          <div className="bg-parallax absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute bottom-10 -left-20 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-xl"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-2 self-start"
                  data-aos="fade-right" data-aos-delay="200">
                  Smart Hiring Platform
                </div>
                <h1 ref={heroHeadingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Transform Your Hiring Process</span>
                </h1>
                <p ref={heroSubTextRef} className="text-lg text-muted-foreground max-w-xl">
                  Streamline your interviews with AI-powered insights, expert interviewers, and comprehensive analytics to find the perfect candidates faster.
                </p>
                <div ref={heroCTARef} className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/admin/interviews')}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform transition-transform hover:scale-110"
                  >
                    Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/admin/interviews')}>
                    Explore Features
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative" data-aos="zoom-in-left" data-aos-delay="300">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-200 rounded-full opacity-50"></div>
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 p-2">
                    <div className="relative rounded-lg overflow-hidden bg-indigo-600">
                      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-indigo-500 rounded-tl-[100px]"></div>
                      <div className="relative z-10 p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="stats-section bg-white/90 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-500" 
                              data-aos="flip-left" data-aos-delay="400">
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                              <span className="text-xs font-semibold">Hire Rate</span>
                            </div>
                            <div className="text-2xl font-bold">+{statValues.hireRate}%</div>
                          </div>
                          <div className="stats-section bg-white/90 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-500" 
                              data-aos="flip-right" data-aos-delay="600">
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                              <span className="text-xs font-semibold">Time Saved</span>
                            </div>
                            <div className="text-2xl font-bold">{statValues.timeSaved}+ min</div>
                          </div>
                          <div className="col-span-2 bg-white/90 backdrop-blur-sm p-4 rounded-lg" 
                              data-aos="fade-up" data-aos-delay="800">
                            <div className="h-20 flex items-center justify-center">
                              <div className="w-full bg-gray-100 h-8 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full w-3/4 rounded-full animate-pulse"></div>
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
        <section className="py-12 px-4 bg-white relative overflow-hidden">
          <div className="bg-parallax absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/0 to-white/50"></div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center mb-10" data-aos="fade-up">
              <h2 className="text-xl font-medium text-muted-foreground">Trusted by innovative companies</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i} 
                  className="h-8 w-24 bg-gray-200 rounded animate-pulse hover:animate-none hover:translate-y-[-5px] transition-transform duration-300"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-gradient-to-br from-white via-indigo-50 to-white relative">
          <div className="bg-parallax absolute inset-0 pointer-events-none">
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-xl"></div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center mb-12" data-aos="fade-up">
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
                  className="glass-card rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-500"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="mb-4 bg-indigo-50 p-3 rounded-lg" 
                       data-aos="rotate-in" data-aos-delay={index * 100 + 200}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 bg-white relative">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl font-bold mb-4">How InterviewPulse Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process makes hiring efficient, fair, and effective
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-indigo-100 hidden md:block" id="process-line"></div>
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
                  <div 
                    key={index} 
                    className={`md:flex items-center gap-8 mb-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    data-aos-delay={index * 100}
                  >
                    <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                      <div className="relative">
                        <div className="z-10 relative w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg process-icon"
                             data-aos="rotate-in" data-aos-delay={index * 150}>
                          {step.icon}
                        </div>
                        <div className="absolute inset-0 bg-indigo-100 w-14 h-14 rounded-full opacity-50 animate-pulse"></div>
                      </div>
                    </div>
                    <Card className={`md:w-1/2 border-0 shadow-md ${index % 2 === 1 ? 'text-right' : 'text-left'} transform transition-all duration-500 hover:shadow-lg hover:translate-y-[-5px]`}>
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
        <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative">
          <div className="bg-parallax absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400 rounded-full opacity-20 blur-xl"></div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center mb-16" data-aos="fade-up">
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
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center transform transition-all duration-500 hover:bg-white/20"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="mb-4 text-indigo-200" 
                       data-aos="flip-up" data-aos-delay={index * 100 + 300}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2 stat-value">{stat.value}</div>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4 bg-white relative">
          <div className="bg-parallax absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-0 w-full h-64 bg-gradient-to-r from-indigo-50/30 to-purple-50/30"></div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center mb-16" data-aos="fade-up">
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
                <Card 
                  key={index} 
                  className="border-0 shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:translate-y-[-10px]"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="text-3xl text-indigo-200 mb-4">"</div>
                      <p className="italic text-muted-foreground mb-6">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4"></div>
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
        <section id="contact" className="py-24 px-4 relative">
          <div className="bg-parallax absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-xl"></div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div 
              className="glass-panel bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 md:p-12 text-center relative overflow-hidden transform transition-all duration-700 hover:shadow-2xl"
              data-aos="zoom-in"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-200 rounded-full opacity-50"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">Ready to transform your interview process?</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                  Experience the future of interviewing with our comprehensive platform designed for modern hiring teams.
                </p>
                <div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  data-aos="fade-up" data-aos-delay="200"
                >
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/admin/interviews')}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Book a Demo Today
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => navigate('/admin/interviews')}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
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
            <div data-aos="fade-up">
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
            
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="font-medium mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2023 InterviewPulse. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.
