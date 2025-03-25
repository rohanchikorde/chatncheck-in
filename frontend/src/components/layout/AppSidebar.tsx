import {
  LayoutDashboard,
  Users,
  Calendar,
  CalendarPlus,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  role: string | undefined;
}

const SidebarItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
            isActive
              ? "bg-secondary text-foreground"
              : "text-muted-foreground"
          }`
        }
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
};

const AppSidebar = ({ role }: SidebarProps) => {
  return (
    <div className="flex h-full select-none flex-col border-r bg-background">
      <div className="px-4 py-6">
        <span className="font-bold text-lg">InterviewPulse</span>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="grid gap-1 px-2 text-sm">
          <SidebarItem
            icon={<LayoutDashboard size={16} />}
            label="Dashboard"
            href="/admin/dashboard"
          />
          {role === "admin" && (
            <>
              <SidebarItem
                icon={<Users size={16} />}
                label="Users"
                href="/admin/users"
              />
              <SidebarItem
                icon={<Calendar size={16} />}
                label="Interviews"
                href="/admin/interviews"
              />
              <SidebarItem
                icon={<CalendarPlus size={16} />}
                label="Demo Requests"
                href="/admin/demo-requests"
              />
            </>
          )}

          {role === "interviewer" && (
            <>
              <SidebarItem
                icon={<Calendar size={16} />}
                label="Interviews"
                href="/interviewer/interviews"
              />
            </>
          )}

          {role === "interviewee" && (
            <>
              <SidebarItem
                icon={<Calendar size={16} />}
                label="Interviews"
                href="/interviewee/interviews"
              />
            </>
          )}
        </nav>
      </div>
      <div className="px-4 py-4">
        <SidebarItem
          icon={<Settings size={16} />}
          label="Settings"
          href="/settings"
        />
      </div>
    </div>
  );
};

export default AppSidebar;
