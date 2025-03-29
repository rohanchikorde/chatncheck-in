
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, ChevronLeft, LayoutDashboard, 
  Users, Calendar, FileText, MessageSquare, Settings, 
  LogOut, Menu
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function AppSidebar() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isInterviewerPath = location.pathname.startsWith('/interviewer');
  const isIntervieweePath = location.pathname.startsWith('/interviewee');

  let navigationItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/admin/interviews', label: 'Interviews', icon: <Calendar size={18} /> },
    { path: '/admin/companies', label: 'Companies', icon: <Building2 size={18} /> },
    { path: '/admin/users', label: 'Users', icon: <Users size={18} /> },
    { path: '/admin/demo-requests', label: 'Demo Requests', icon: <FileText size={18} /> },
  ];

  if (isInterviewerPath) {
    navigationItems = [
      { path: '/interviewer/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
      { path: '/interviewer/interviews', label: 'My Interviews', icon: <Calendar size={18} /> },
      { path: '/interviewer/feedback', label: 'Feedback', icon: <MessageSquare size={18} /> },
    ];
  } else if (isIntervieweePath) {
    navigationItems = [
      { path: '/interviewee/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
      { path: '/interviewee/interviews', label: 'My Interviews', icon: <Calendar size={18} /> },
    ];
  }

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center px-4 py-3">
          <div className="flex w-full items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                IP
              </div>
              <span className="text-xl font-semibold">Interview Platform</span>
            </Link>
            <SidebarTrigger asChild>
              <button className="p-1 hover:bg-muted rounded-md lg:hidden">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </SidebarTrigger>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <div className="px-4 mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            {isAdminPath ? 'Admin Portal' : isInterviewerPath ? 'Interviewer Portal' : 'Interviewee Portal'}
          </h3>
        </div>
        <nav className="grid gap-1 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors
                ${location.pathname === item.path ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-2">
        <div className="grid gap-1">
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings size={18} />
            Settings
          </Link>
          <Link
            to="/logout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
