
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
import { Calendar, LayoutDashboard, MessageSquare, Settings, Users } from 'lucide-react';
import { useState } from 'react';

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<'admin' | 'interviewer' | 'interviewee'>('admin');

  const adminMenuItems = [
    { title: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { title: 'Interviews', path: '/admin/interviews', icon: Calendar },
    { title: 'Users', path: '/admin/users', icon: Users },
    { title: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const interviewerMenuItems = [
    { title: 'Dashboard', path: '/interviewer', icon: LayoutDashboard },
    { title: 'My Interviews', path: '/interviewer/interviews', icon: Calendar },
    { title: 'Feedback', path: '/interviewer/feedback', icon: MessageSquare },
    { title: 'Settings', path: '/interviewer/settings', icon: Settings },
  ];

  const intervieweeMenuItems = [
    { title: 'Dashboard', path: '/interviewee', icon: LayoutDashboard },
    { title: 'My Interviews', path: '/interviewee/interviews', icon: Calendar },
    { title: 'Feedback', path: '/interviewee/feedback', icon: MessageSquare },
    { title: 'Settings', path: '/interviewee/settings', icon: Settings },
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

  const handleRoleChange = (newRole: 'admin' | 'interviewer' | 'interviewee') => {
    setRole(newRole);
    
    // Navigate to the appropriate dashboard
    switch (newRole) {
      case 'admin':
        navigate('/admin');
        break;
      case 'interviewer':
        navigate('/interviewer');
        break;
      case 'interviewee':
        navigate('/interviewee');
        break;
    }
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

        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-muted-foreground mb-1">Switch Role</p>
          <div className="grid grid-cols-3 gap-1.5">
            <Button 
              variant={role === 'admin' ? 'default' : 'outline'} 
              size="sm" 
              className="w-full py-1 h-8 text-xs"
              onClick={() => handleRoleChange('admin')}
            >
              Admin
            </Button>
            <Button 
              variant={role === 'interviewer' ? 'default' : 'outline'} 
              size="sm" 
              className="w-full py-1 h-8 text-xs"
              onClick={() => handleRoleChange('interviewer')}
            >
              Interviewer
            </Button>
            <Button 
              variant={role === 'interviewee' ? 'default' : 'outline'} 
              size="sm" 
              className="w-full py-1 h-8 text-xs"
              onClick={() => handleRoleChange('interviewee')}
            >
              Interviewee
            </Button>
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
          <div className="glass-card rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Currently using</p>
            <p className="font-medium capitalize">{role} View</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
