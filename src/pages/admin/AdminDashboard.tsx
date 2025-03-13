
import { Calendar, Clock, Download, FileText, MessageSquare, Plus, Users } from 'lucide-react';
import { format } from 'date-fns';
import PageHeader from '@/components/shared/PageHeader';
import DashboardMetricCard from '@/components/shared/DashboardMetricCard';
import InterviewCard, { InterviewCardProps } from '@/components/shared/InterviewCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  {
    id: '4',
    title: 'Frontend Developer - Technical Assessment',
    date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    duration: 60,
    status: 'completed',
    type: 'technical',
    participants: [
      { name: 'Isha Patel', role: 'interviewer', avatar: '' },
      { name: 'Taylor Kim', role: 'interviewee', avatar: '' },
    ],
  },
  {
    id: '5',
    title: 'DevOps Engineer - Cultural Fit',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    duration: 45,
    status: 'scheduled',
    type: 'behavioral',
    participants: [
      { name: 'Michael Chen', role: 'interviewer', avatar: '' },
      { name: 'Riley Garcia', role: 'interviewee', avatar: '' },
    ],
  },
];

// Mock activity data
const recentActivity = [
  {
    id: '1',
    type: 'feedback_submitted',
    user: { name: 'Isha Patel', avatar: '' },
    subject: 'Taylor Kim',
    timestamp: new Date(new Date().getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
    details: 'Frontend Developer - Technical Assessment',
  },
  {
    id: '2',
    type: 'interview_rescheduled',
    user: { name: 'Michael Chen', avatar: '' },
    subject: 'Emma Davis',
    timestamp: new Date(new Date().getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
    details: 'UX Designer - Final Round',
    newDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'interview_created',
    user: { name: 'Alex Rivera', role: 'admin', avatar: '' },
    subject: 'Riley Garcia',
    timestamp: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    details: 'DevOps Engineer - Cultural Fit',
  },
  {
    id: '4',
    type: 'feedback_overdue',
    user: { name: 'Michael Chen', avatar: '' },
    subject: 'Jordan Smith',
    timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    details: 'Product Manager - Initial Screening',
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

  const handleViewAllInterviews = () => {
    navigate('/admin/interviews');
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Interview summary report has been exported as PDF.",
    });
  };

  // Format the activity item based on type
  const formatActivityItem = (activity: typeof recentActivity[0]) => {
    switch (activity.type) {
      case 'feedback_submitted':
        return (
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                <span className="font-medium">{activity.user.name}</span>{' '}
                submitted feedback for{' '}
                <span className="font-medium">{activity.subject}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.details}</p>
              <p className="text-xs text-muted-foreground">
                {format(activity.timestamp, 'MMM d, h:mm a')}
              </p>
            </div>
          </div>
        );
      case 'interview_rescheduled':
        return (
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">
                Interview with <span className="font-medium">{activity.subject}</span>{' '}
                rescheduled to{' '}
                <span className="font-medium">{format(activity.newDate!, 'MMM d, h:mm a')}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.details}</p>
              <p className="text-xs text-muted-foreground">
                {format(activity.timestamp, 'MMM d, h:mm a')}
              </p>
            </div>
          </div>
        );
      case 'interview_created':
        return (
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">
                New interview created for <span className="font-medium">{activity.subject}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.details}</p>
              <p className="text-xs text-muted-foreground">
                {format(activity.timestamp, 'MMM d, h:mm a')}
              </p>
            </div>
          </div>
        );
      case 'feedback_overdue':
        return (
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-red-600">
                <span className="font-medium">{activity.user.name}</span>'s feedback for{' '}
                <span className="font-medium">{activity.subject}</span> is overdue
              </p>
              <p className="text-xs text-muted-foreground">{activity.details}</p>
              <p className="text-xs text-muted-foreground">
                {format(activity.timestamp, 'MMM d, h:mm a')}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate stats from mock data
  const totalScheduled = mockInterviews.filter(i => i.status === 'scheduled').length;
  const totalCompleted = mockInterviews.filter(i => i.status === 'completed').length;
  const pendingFeedback = recentActivity.filter(a => a.type === 'feedback_overdue').length;
  const averageScore = 84; // Mock average score

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Admin Dashboard" 
        description="Monitor interviews and manage your team"
      >
        <div className="flex gap-3">
          <Button onClick={handleCreateInterview}>
            <Plus className="mr-1 h-4 w-4" />
            Create Interview
          </Button>
          <Button variant="outline" onClick={handleGenerateReport}>
            <Download className="mr-1 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </PageHeader>

      {/* Overview Alerts */}
      <div className="space-y-4">
        {pendingFeedback > 0 && (
          <Alert variant="destructive">
            <AlertDescription className="flex justify-between items-center">
              <span>There are {pendingFeedback} overdue feedback submissions.</span>
              <Button size="sm" variant="outline" onClick={() => navigate('/admin/feedback')}>
                Review Now
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </div>

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
          title="Average Score"
          value={`${averageScore}%`}
          icon={<FileText className="h-5 w-5" />}
          description="Last 30 days"
          trend="up"
          trendValue="3%"
        />
      </div>

      {/* Quick Actions and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id}>
                  {formatActivityItem(activity)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleCreateInterview} className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create New Interview
            </Button>
            <Button onClick={handleViewAllInterviews} className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              View All Interviews
            </Button>
            <Button onClick={() => navigate('/admin/users')} className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Interviewers
            </Button>
            <Button onClick={handleGenerateReport} className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Upcoming Interviews</h2>
          <Button variant="ghost" size="sm" onClick={handleViewAllInterviews}>
            View All
            <Clock className="ml-1 h-4 w-4" />
          </Button>
        </div>
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Completed Interviews</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/interviews?status=completed')}>
            View All
            <Clock className="ml-1 h-4 w-4" />
          </Button>
        </div>
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
