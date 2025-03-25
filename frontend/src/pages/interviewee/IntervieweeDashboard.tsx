
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DashboardMetricCard from '@/components/shared/DashboardMetricCard';
import InterviewCard, { InterviewCardProps } from '@/components/shared/InterviewCard';
import { Card } from '@/components/ui/card';
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
    title: 'Senior React Developer - Behavioral',
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    duration: 30,
    status: 'scheduled',
    type: 'behavioral',
    participants: [
      { name: 'Alex Rivera', role: 'interviewer', avatar: '' },
      { name: 'Sam Johnson', role: 'interviewee', avatar: '' },
    ],
  },
  {
    id: '3',
    title: 'Coding Assessment - Algorithms',
    date: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    duration: 45,
    status: 'completed',
    type: 'technical',
    participants: [
      { name: 'Michael Chen', role: 'interviewer', avatar: '' },
      { name: 'Sam Johnson', role: 'interviewee', avatar: '' },
    ],
  },
];

// Mock preparation tips
const preparationTips = [
  "Research the company and role before your interview",
  "Prepare examples of past projects relevant to the position",
  "Practice explaining technical concepts clearly and concisely",
  "Prepare questions to ask your interviewer about the role and team",
  "Test your camera, microphone, and internet connection before the interview",
];

export default function IntervieweeDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewInterview = (id: string) => {
    navigate(`/interviewee/interviews/${id}`);
  };

  const handleJoinInterview = (id: string) => {
    toast({
      title: "Interview Room",
      description: "You're joining as an interviewee. Good luck!",
    });
    navigate(`/interviewee/interviews/${id}/room`);
  };

  // Calculate statistics
  const totalUpcoming = mockInterviews.filter(i => i.status === 'scheduled').length;
  const totalCompleted = mockInterviews.filter(i => i.status === 'completed').length;
  const nextInterviewDate = mockInterviews
    .filter(i => i.status === 'scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.date;

  return (
    <div className="space-y-8">
      <PageHeader 
        title="My Dashboard" 
        description="Prepare for your interviews and track your progress"
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <DashboardMetricCard
          title="Upcoming Interviews"
          value={totalUpcoming}
          icon={<Calendar className="h-5 w-5" />}
          description={nextInterviewDate ? `Next in ${Math.ceil((nextInterviewDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days` : "None scheduled"}
        />
        <DashboardMetricCard
          title="Completed Interviews"
          value={totalCompleted}
          icon={<Clock className="h-5 w-5" />}
          description="Past 30 days"
        />
        <DashboardMetricCard
          title="Feedback Received"
          value={totalCompleted}
          icon={<MessageSquare className="h-5 w-5" />}
          description="Available to review"
        />
      </div>

      {/* Next Interview */}
      {nextInterviewDate && (
        <div className="glass-panel rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">Your Next Interview</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockInterviews
              .filter(i => i.status === 'scheduled')
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 1)
              .map(interview => (
                <InterviewCard
                  key={interview.id}
                  {...interview}
                  viewerRole="interviewee"
                  onView={handleViewInterview}
                  onJoin={handleJoinInterview}
                />
              ))}
          </div>
        </div>
      )}

      {/* Interview Preparation */}
      <div>
        <h2 className="text-lg font-medium mb-4">Interview Preparation Tips</h2>
        <Card className="p-4">
          <ul className="space-y-2">
            {preparationTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  {index + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* All Upcoming Interviews */}
      <div>
        <h2 className="text-lg font-medium mb-4">All Upcoming Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockInterviews
            .filter(i => i.status === 'scheduled')
            .map(interview => (
              <InterviewCard
                key={interview.id}
                {...interview}
                viewerRole="interviewee"
                onView={handleViewInterview}
                onJoin={handleJoinInterview}
              />
            ))}
        </div>
      </div>

      {/* Past Interviews */}
      <div>
        <h2 className="text-lg font-medium mb-4">Past Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockInterviews
            .filter(i => i.status === 'completed')
            .map(interview => (
              <InterviewCard
                key={interview.id}
                {...interview}
                viewerRole="interviewee"
                onView={handleViewInterview}
                onJoin={handleJoinInterview}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
