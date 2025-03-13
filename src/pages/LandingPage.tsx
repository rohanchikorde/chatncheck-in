
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Users, MessageSquare, CheckSquare } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">IP</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">InterviewPulse</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/admin')}
              className="hidden sm:flex"
            >
              Admin
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/interviewer')}
              className="hidden sm:flex"
            >
              Interviewer
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/interviewee')}
              className="hidden sm:flex"
            >
              Interviewee
            </Button>
            <Button onClick={() => navigate('/admin')}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-pulse-subtle">
                Interview as a Service Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Streamline Your <span className="text-primary">Interview</span> Process
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Connect interviewers with interviewees for seamless, efficient, and customizable interview experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={() => navigate('/admin')}>
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/admin')}>
                  View Demos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-secondary/50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Powerful Features</h2>
              <p className="text-muted-foreground mt-2">Everything you need for a seamless interview experience</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <CalendarIcon className="h-10 w-10 text-primary" />,
                  title: "Scheduling",
                  description: "Easy scheduling with automated notifications and reminders"
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Video Calls",
                  description: "Integrated video calls with screen sharing capabilities"
                },
                {
                  icon: <MessageSquare className="h-10 w-10 text-primary" />,
                  title: "Feedback",
                  description: "Structured feedback collection and evaluation system"
                },
                {
                  icon: <CheckSquare className="h-10 w-10 text-primary" />,
                  title: "Customization",
                  description: "Question banks and customizable interview formats"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-card rounded-lg p-6 flex flex-col items-center text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="glass-panel rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your interview process?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience the future of interviewing with our comprehensive platform designed for admins, interviewers, and candidates.
              </p>
              <Button size="lg" onClick={() => navigate('/admin')}>
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="font-bold text-primary-foreground text-lg">IP</span>
              </div>
              <span className="font-semibold tracking-tight">InterviewPulse</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2023 InterviewPulse. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
