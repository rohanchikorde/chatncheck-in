import { useState, useEffect } from 'react';
import { Calendar, Clock, Download, FileText, MessageSquare, Plus, Users, Eye, PieChart, RefreshCw } from 'lucide-react';
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
import CreateInterviewModal from '@/components/admin/CreateInterviewModal';
import ManageInterviewersModal from '@/components/admin/ManageInterviewersModal';
import GenerateReportModal from '@/components/admin/GenerateReportModal';

// API URL for interviews
const API_URL = "http://localhost:5000/interviews";

// Interface for interview data
interface Interview {
  id: string;
  candidate_name: string;
  interviewer_name: string;
  scheduled_at: string;
  status: string;
  feedback_submitted: string;
  job_role: string;
  format?: string;
  duration?: string;
}

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
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [interviewersModalOpen, setInterviewersModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch interviews from the server
  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      console.log("Fetching interviews for dashboard from:", API_URL);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Fetched interviews for dashboard:", data);
      setInterviews(data);
    } catch (err) {
      console.error("Error fetching interviews for dashboard:", err);
      setError("Failed to connect to the interview server. Please ensure the server is running.");
      toast({
        title: "Connection Error",
        description: "Failed to load interviews. Please check if the server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Convert API interviews to InterviewCard format
  const convertToInterviewCardProps = (interview: Interview): Omit<InterviewCardProps, 'viewerRole' | 'onView' | 'onJoin'> => {
    return {
      id: interview.id,
      title: `${interview.job_role} - ${interview.format || 'Interview'}`,
      date: new Date(interview.scheduled_at),
      duration: interview.duration ? parseInt(interview.duration) : 60,
      status: interview.status.toLowerCase() as 'scheduled' | 'completed' | 'cancelled',
      type: interview.format?.toLowerCase() || 'technical',
      participants: [
        { 
          name: interview.interviewer_name, 
          role: 'interviewer', 
          avatar: '' 
        },
        { 
          name: interview.candidate_name, 
          role: 'interviewee', 
          avatar: '' 
        },
      ],
    };
  };

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
    setCreateModalOpen(true);
  };

  const handleViewAllInterviews = () => {
    console.log("Navigating to /admin/interviews");
    navigate('/admin/interviews');
  };

  const handleManageInterviewers = () => {
    setInterviewersModalOpen(true);
  };

  const handleGenerateReport = () => {
    setReportModalOpen(true);
  };

  const handleInterviewCreated = () => {
    fetchInterviews();
    setCreateModalOpen(false);
    toast({
      title: "Interview Created",
      description: "The interview has been successfully scheduled.",
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

  // Calculate stats from interview data
  const totalScheduled = interviews.filter(i => i.status.toLowerCase() === 'scheduled').length;
  const totalCompleted = interviews.filter(i => i.status.toLowerCase() === 'completed').length;
  const pendingFeedback = interviews.filter(i => i.status.toLowerCase() === 'completed' && i.feedback_submitted === 'No').length;
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

      {/* Connection Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="flex justify-between items-center">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={fetchInterviews}>
              <RefreshCw className="mr-1 h-3 w-3" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

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
          value={interviews.length}
          icon={<Calendar className="h-5 w-5" />}
          description="All interviews"
          trend="up"
          trendValue={`${interviews.length > 0 ? Math.floor((interviews.length / 10) * 100) : 0}%`}
        />
        <DashboardMetricCard
          title="Scheduled Interviews"
          value={totalScheduled}
          icon={<Users className="h-5 w-5" />}
          description="Upcoming interviews"
        />
        <DashboardMetricCard
          title="Pending Feedback"
          value={pendingFeedback}
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
            <Button onClick={handleCreateInterview} className="w-full justify-start" variant="info">
              <Plus className="mr-2 h-4 w-4" />
              Create New Interview
            </Button>
            <Button onClick={handleViewAllInterviews} className="w-full justify-start" variant="success">
              <Eye className="mr-2 h-4 w-4" />
              View All Interviews
            </Button>
            <Button onClick={handleManageInterviewers} className="w-full justify-start" variant="warning">
              <Users className="mr-2 h-4 w-4" />
              Manage Interviewers
            </Button>
            <Button onClick={handleGenerateReport} className="w-full justify-start" variant="action">
              <PieChart className="mr-2 h-4 w-4" />
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
          {loading ? (
            <div className="col-span-full p-8 text-center">Loading interviews...</div>
          ) : error ? (
            <div className="col-span-full p-8 text-center text-red-500">
              {error}
              <Button variant="link" onClick={fetchInterviews} className="ml-2">
                Retry
              </Button>
            </div>
          ) : interviews.length === 0 ? (
            <div className="col-span-full p-8 text-center">
              No interviews found. 
              <Button variant="link" onClick={() => setCreateModalOpen(true)}>
                Create your first interview
              </Button>
            </div>
          ) : (
            interviews
              .filter((interview) => interview.status.toLowerCase() !== 'completed')
              .slice(0, 3)
              .map((interview) => (
                <InterviewCard
                  key={interview.id}
                  {...convertToInterviewCardProps(interview)}
                  viewerRole="admin"
                  onView={() => handleViewInterview(interview.id)}
                  onJoin={() => handleJoinInterview(interview.id)}
                />
              ))
          )}
        </div>
      </div>

      {/* Recent Interviews */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Completed Interviews</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/admin/interviews?status=completed')}
          >
            View All
            <Clock className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full p-8 text-center">Loading interviews...</div>
          ) : error ? (
            <div className="col-span-full p-8 text-center text-red-500">
              {error}
              <Button variant="link" onClick={fetchInterviews} className="ml-2">
                Retry
              </Button>
            </div>
          ) : interviews.filter(i => i.status.toLowerCase() === 'completed').length === 0 ? (
            <div className="col-span-full p-8 text-center">
              No completed interviews yet.
            </div>
          ) : (
            interviews
              .filter((interview) => interview.status.toLowerCase() === 'completed')
              .slice(0, 3)
              .map((interview) => (
                <InterviewCard
                  key={interview.id}
                  {...convertToInterviewCardProps(interview)}
                  viewerRole="admin"
                  onView={() => handleViewInterview(interview.id)}
                  onJoin={() => handleJoinInterview(interview.id)}
                />
              ))
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateInterviewModal 
        isOpen={createModalOpen} 
        onClose={() => setCreateModalOpen(false)}
        onInterviewCreated={handleInterviewCreated}
      />
      
      <ManageInterviewersModal 
        isOpen={interviewersModalOpen} 
        onClose={() => setInterviewersModalOpen(false)} 
      />
      
      <GenerateReportModal 
        isOpen={reportModalOpen} 
        onClose={() => setReportModalOpen(false)} 
      />
    </div>
  );
}
