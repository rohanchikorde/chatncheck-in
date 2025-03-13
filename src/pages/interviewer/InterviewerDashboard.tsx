
import { Calendar, CheckSquare, Clock } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DashboardMetricCard from '@/components/shared/DashboardMetricCard';
import InterviewCard, { InterviewCardProps } from '@/components/shared/InterviewCard';
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
    title: 'Frontend Developer - Technical Assessment',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    duration: 45,
    status: 'scheduled',
    type: 'technical',
    participants: [
      { name: 'Isha Patel', role: 'interviewer', avatar: '' },
      { name: 'Maria Rodriguez', role: 'interviewee', avatar: '' },
    ],
  },
  {
    id: '3',
    title: 'React Native Developer - Code Review',
    date: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    duration: 45,
    status: 'completed',
    type: 'technical',
    participants: [
      { name: 'Isha Patel', role: 'interviewer', avatar: '' },
      { name: 'David Chen', role: 'interviewee', avatar: '' },
    ],
  },
];

export default function InterviewerDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewInterview = (id: string) => {
    navigate(`/interviewer/interviews/${id}`);
  };

  const handleJoinInterview = (id: string) => {
    toast({
      title: "Interview Room",
      description: "You're joining the interview as the interviewer.",
    });
    navigate(`/interviewer/interviews/${id}/room`);
  };

  // Calculate statistics
  const totalUpcoming = mockInterviews.filter(i => i.status === 'scheduled').length;
  const totalCompleted = mockInterviews.filter(i => i.status === 'completed').length;
  const feedbackPending = 1; // Mock value
  const nextInterviewDate = mockInterviews
    .filter(i => i.status === 'scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.date;

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Interviewer Dashboard" 
        description="Manage your upcoming interviews and review previous ones"
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <DashboardMetricCard
          title="Upcoming Interviews"
          value={totalUpcoming}
          icon={<Calendar className="h-5 w-5" />}
          description="Next in 2 days"
        />
        <DashboardMetricCard
          title="Completed Interviews"
          value={totalCompleted}
          icon={<CheckSquare className="h-5 w-5" />}
          description="This month"
        />
        <DashboardMetricCard
          title="Feedback Pending"
          value={feedbackPending}
          icon={<Clock className="h-5 w-5" />}
          description="Needs attention"
          trend={feedbackPending > 0 ? "up" : "neutral"}
          trendValue={feedbackPending > 0 ? `${feedbackPending}` : "0"}
        />
        <DashboardMetricCard
          title="Average Interview"
          value="48 min"
          description="Last 10 interviews"
        />
      </div>

      {/* Next Interview */}
      {nextInterviewDate && (
        <div className="glass-panel rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">Your Next Interview</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {mockInterviews
              .filter(i => i.status === 'scheduled')
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 1)
              .map(interview => (
                <InterviewCard
                  key={interview.id}
                  {...interview}
                  viewerRole="interviewer"
                  onView={handleViewInterview}
                  onJoin={handleJoinInterview}
                />
              ))}
          </div>
        </div>
      )}

      {/* Upcoming Interviews */}
      <div>
        <h2 className="text-lg font-medium mb-4">All Upcoming Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInterviews
            .filter(i => i.status === 'scheduled')
            .map(interview => (
              <InterviewCard
                key={interview.id}
                {...interview}
                viewerRole="interviewer"
                onView={handleViewInterview}
                onJoin={handleJoinInterview}
              />
            ))}
        </div>
      </div>

      {/* Past Interviews */}
      <div>
        <h2 className="text-lg font-medium mb-4">Past Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInterviews
            .filter(i => i.status === 'completed')
            .map(interview => (
              <InterviewCard
                key={interview.id}
                {...interview}
                viewerRole="interviewer"
                onView={handleViewInterview}
                onJoin={handleJoinInterview}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
