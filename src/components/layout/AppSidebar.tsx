
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, LayoutDashboard, MessageSquare, Settings, Users, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  
  const role = profile?.role || 'admin';

  const adminMenuItems = [
    { title: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { title: 'Interviews', path: '/admin/interviews', icon: Calendar },
    { title: 'Users', path: '/admin/users', icon: Users },
    { title: 'Profile', path: '/admin/profile', icon: User },
  ];

  const interviewerMenuItems = [
    { title: 'Dashboard', path: '/interviewer', icon: LayoutDashboard },
    { title: 'My Interviews', path: '/interviewer/interviews', icon: Calendar },
    { title: 'Feedback', path: '/interviewer/feedback', icon: MessageSquare },
    { title: 'Profile', path: '/interviewer/profile', icon: User },
  ];

  const intervieweeMenuItems = [
    { title: 'Dashboard', path: '/interviewee', icon: LayoutDashboard },
    { title: 'My Interviews', path: '/interviewee/interviews', icon: Calendar },
    { title: 'Profile', path: '/interviewee/profile', icon: User },
  ];

  const getMenuItems = () => {
    switch (role) {
      case 'admin':
        return adminMenuItems;
      case 'interviewer':
        return interviewerMenuItems;
      case 'interviewee':
        return intervieweeMenuItems;
      default:
        return adminMenuItems;
    }
  };

  const menuItems = getMenuItems();

  // Get initials for avatar fallback
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    return role[0].toUpperCase();
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">IP</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">InterviewPulse</span>
          </div>
          <SidebarTrigger />
        </div>

        <div className="flex items-center gap-3 px-2 py-3 rounded-md bg-muted/50">
          <Avatar>
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{profile?.full_name || 'User'}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-3.5 mb-1.5">
          <Button 
            variant="outline" 
            className="w-full justify-start text-muted-foreground" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
