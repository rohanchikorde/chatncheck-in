
import { Calendar, MessageSquare, Users } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DashboardMetricCard from '@/components/shared/DashboardMetricCard';
import InterviewCard, { InterviewCardProps } from '@/components/shared/InterviewCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockInterviews: Omit<InterviewCardProps, 'viewerRole' | 'onView' | 'onJoin'>[] = [
  {
    id: '1',
    title: 'Senior React Developer - First Round',
    date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    duration: 60,
    status: 'scheduled',
    type: 'technical',
    participants: [
      { name: 'Isha Patel', role: 'interviewer', avatar: '' },
      { name: 'Sam Johnson', role: 'interviewee', avatar: '' },
    ],
  },
  {
    id: '2',
    title: 'UX Designer - Final Round',
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    duration: 45,
    status: 'scheduled',
    type: 'behavioral',
    participants: [
      { name: 'Michael Chen', role: 'interviewer', avatar: '' },
      { name: 'Emma Davis', role: 'interviewee', avatar: '' },
    ],
  },
  {
    id: '3',
    title: 'Product Manager - Initial Screening',
    date: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    duration: 30,
    status: 'completed',
    type: 'mixed',
    participants: [
      { name: 'Alex Rivera', role: 'interviewer', avatar: '' },
      { name: 'Jordan Smith', role: 'interviewee', avatar: '' },
    ],
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewInterview = (id: string) => {
    navigate(`/admin/interviews/${id}`);
  };

  const handleJoinInterview = (id: string) => {
    toast({
      title: "Interview Room",
      description: "You're joining the interview as an observer.",
    });
    navigate(`/admin/interviews/${id}/room`);
  };

  const handleCreateInterview = () => {
    navigate('/admin/interviews/new');
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Admin Dashboard" 
        description="Monitor interviews and manage your team"
      >
        <Button onClick={handleCreateInterview}>Create Interview</Button>
      </PageHeader>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <DashboardMetricCard
          title="Total Interviews"
          value={28}
          icon={<Calendar className="h-5 w-5" />}
          description="This month"
          trend="up"
          trendValue="12%"
        />
        <DashboardMetricCard
          title="Active Interviewers"
          value={8}
          icon={<Users className="h-5 w-5" />}
          description="From 12 registered"
        />
        <DashboardMetricCard
          title="Pending Feedback"
          value={3}
          icon={<MessageSquare className="h-5 w-5" />}
          description="Awaiting review"
          trend="down"
          trendValue="2"
        />
        <DashboardMetricCard
          title="Completion Rate"
          value="94%"
          description="Last 30 days"
          trend="up"
          trendValue="2%"
        />
      </div>

      {/* Upcoming Interviews */}
      <div>
        <h2 className="text-lg font-medium mb-4">Upcoming Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInterviews
            .filter((interview) => interview.status !== 'completed')
            .map((interview) => (
              <InterviewCard
                key={interview.id}
                {...interview}
                viewerRole="admin"
                onView={handleViewInterview}
                onJoin={handleJoinInterview}
              />
            ))}
        </div>
      </div>

      {/* Recent Interviews */}
      <div>
        <h2 className="text-lg font-medium mb-4">Recent Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInterviews
            .filter((interview) => interview.status === 'completed')
            .map((interview) => (
              <InterviewCard
                key={interview.id}
                {...interview}
                viewerRole="admin"
                onView={handleViewInterview}
                onJoin={handleJoinInterview}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
