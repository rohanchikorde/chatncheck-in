
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Building, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  X 
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, icon, title, isActive, onClick }: NavItemProps) => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        isActive ? "bg-muted" : ""
      )}
      onClick={() => {
        navigate(href);
        if (onClick) onClick();
      }}
    >
      <span className="mr-2">{icon}</span>
      <span>{title}</span>
    </Button>
  );
};

interface ShellProps {
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAdmin = location.pathname.startsWith('/admin');
  const isInterviewer = location.pathname.startsWith('/interviewer');
  const isInterviewee = location.pathname.startsWith('/interviewee');
  
  const closeSidebar = () => setIsSidebarOpen(false);

  let navItems: NavItemProps[] = [];
  
  if (isAdmin) {
    navItems = [
      { href: '/admin/dashboard', icon: <LayoutDashboard size={20} />, title: 'Dashboard' },
      { href: '/admin/interviews', icon: <FileText size={20} />, title: 'Interviews' },
      { href: '/admin/users', icon: <Users size={20} />, title: 'Users' },
      { href: '/admin/companies', icon: <Building size={20} />, title: 'Companies' },
      { href: '/admin/demo-requests', icon: <Calendar size={20} />, title: 'Demo Requests' }
    ];
  } else if (isInterviewer) {
    navItems = [
      { href: '/interviewer/dashboard', icon: <LayoutDashboard size={20} />, title: 'Dashboard' },
      { href: '/interviewer/interviews', icon: <FileText size={20} />, title: 'My Interviews' },
      { href: '/interviewer/feedback', icon: <FileText size={20} />, title: 'Feedback' }
    ];
  } else if (isInterviewee) {
    navItems = [
      { href: '/interviewee/dashboard', icon: <LayoutDashboard size={20} />, title: 'Dashboard' },
      { href: '/interviewee/interviews', icon: <FileText size={20} />, title: 'My Interviews' }
    ];
  }
  
  let userRole = 'User';
  if (isAdmin) userRole = 'Admin';
  if (isInterviewer) userRole = 'Interviewer';
  if (isInterviewee) userRole = 'Interviewee';

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-2 mb-8 pl-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">IP</span>
            </div>
            <span className="font-semibold text-lg">InterviewPulse</span>
          </div>
          
          <div className="space-y-1 mb-4">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                isActive={location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)}
                onClick={closeSidebar}
              />
            ))}
          </div>
          
          <div className="mt-auto space-y-1">
            <NavItem
              href="/settings"
              icon={<Settings size={20} />}
              title="Settings"
              onClick={closeSidebar}
            />
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => {
                navigate('/');
                closeSidebar();
              }}
            >
              <LogOut size={20} className="mr-2" />
              <span>Sign Out</span>
            </Button>
          </div>
          
          <div className="border-t border-border mt-4 pt-4">
            <div className="flex items-center px-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-sm">{userRole.substring(0, 1)}</span>
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Shell;
