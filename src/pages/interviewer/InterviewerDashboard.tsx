
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CalendarClock, CheckSquare, Clock, MessageSquare } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DashboardMetricCard from '@/components/shared/DashboardMetricCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockUpcomingInterviews = [
  {
    id: '1',
    candidate_name: 'Sam Patel',
    scheduled_at: '2025-03-15T10:00:00Z',
    status: 'Scheduled',
    job_role: 'Frontend Developer',
  },
  {
    id: '2',
    candidate_name: 'John Doe',
    scheduled_at: '2025-03-16T14:00:00Z',
    status: 'Scheduled',
    job_role: 'Backend Developer',
  },
];

const mockRecentFeedback = [
  {
    id: '1',
    candidate_name: 'Maria Garcia',
    job_role: 'UX Designer',
    problem_solving: 8,
    communication: 7,
    submitted_at: '2025-03-10T13:30:00Z',
  },
];

// Upcoming tasks
const upcomingTasks = [
  { 
    id: '1', 
    title: 'Review frontend coding challenge for Sam', 
    dueDate: '2025-03-14T17:00:00Z', 
    type: 'preparation' 
  },
  { 
    id: '2', 
    title: 'Submit feedback for Maria Garcia', 
    dueDate: '2025-03-11T23:59:59Z', 
    type: 'feedback' 
  },
];

export default function InterviewerDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock statistics
  const totalScheduled = mockUpcomingInterviews.length;
  const totalCompleted = 15;
  const feedbackPending = 1;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTaskBadge = (type: string) => {
    switch (type) {
      case 'preparation':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Preparation</Badge>;
      case 'feedback':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Feedback</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleJoinInterview = (id: string) => {
    toast({
      title: "Interview Room",
      description: "You're joining as an interviewer. The room will open in a new tab.",
    });
    // In a real app, this would navigate to a video call page
    window.open(`/interview-room/${id}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Interviewer Dashboard" 
        description="Manage your upcoming interviews and feedback tasks"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <DashboardMetricCard
          title="Upcoming Interviews"
          value={totalScheduled}
          icon={<Calendar className="h-5 w-5" />}
          description="Scheduled interviews"
        />
        <DashboardMetricCard
          title="Completed Interviews"
          value={totalCompleted}
          icon={<CheckSquare className="h-5 w-5" />}
          description="All time"
        />
        <DashboardMetricCard
          title="Pending Feedback"
          value={feedbackPending}
          icon={<MessageSquare className="h-5 w-5" />}
          description="Awaiting submission"
        />
      </div>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            <span>Upcoming Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTasks.map(task => (
              <div key={task.id} className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium">{task.title}</span>
                  {getTaskBadge(task.type)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Due: {format(new Date(task.dueDate), 'MMM d')}
                  </span>
                  <Button 
                    size="sm" 
                    variant={task.type === 'feedback' ? 'default' : 'outline'}
                    onClick={() => {
                      if (task.type === 'feedback') {
                        navigate('/interviewer/interviews');
                      } else {
                        toast({
                          title: "Task Completed",
                          description: "Task marked as complete.",
                        });
                      }
                    }}
                  >
                    {task.type === 'feedback' ? 'Submit' : 'Complete'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Interviews */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Upcoming Interviews</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/interviewer/interviews')}>
            View All
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUpcomingInterviews.length > 0 ? (
                mockUpcomingInterviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell className="font-medium">{interview.candidate_name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        {format(new Date(interview.scheduled_at), 'MMM d, yyyy h:mm a')}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(interview.status)}</TableCell>
                    <TableCell>{interview.job_role}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/interviewer/interviews/${interview.id}`)}
                        >
                          View
                        </Button>
                        
                        {/* Join button - would be enabled only when close to interview time */}
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleJoinInterview(interview.id)}
                        >
                          Join
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No upcoming interviews. Check back later.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Recent Feedback */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Recent Feedback</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/interviewer/feedback')}>
            View All Feedback
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRecentFeedback.map(feedback => (
            <Card key={feedback.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{feedback.candidate_name}</CardTitle>
                  <span className="text-sm text-muted-foreground">{feedback.job_role}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Problem Solving</span>
                    <span className="font-medium">{feedback.problem_solving}/10</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Communication</span>
                    <span className="font-medium">{feedback.communication}/10</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Submitted on {format(new Date(feedback.submitted_at), 'MMM d, yyyy')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
