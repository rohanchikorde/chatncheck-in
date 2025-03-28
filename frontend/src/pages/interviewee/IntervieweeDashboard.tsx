import { Calendar, Clock, MessageSquare } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DashboardMetricCard from '@/components/shared/DashboardMetricCard';
import InterviewCard, { InterviewCardProps } from '@/components/shared/InterviewCard';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user } = useAuth();

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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Welcome, {user?.name || 'Interviewee'}!</h1>
        </div>
        <div className="text-gray-600">
          {totalUpcoming > 0 
            ? `You have ${totalUpcoming} upcoming ${totalUpcoming === 1 ? 'interview' : 'interviews'} this week`
            : "No upcoming interviews scheduled"
          }
        </div>
      </div>

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
          title="Preparation Tips"
          value={preparationTips.length}
          icon={<MessageSquare className="h-5 w-5" />}
          description="Available tips"
        />
      </div>

      {/* Upcoming Interviews */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockInterviews
            .filter(i => i.status === 'scheduled')
            .map((interview) => (
              <InterviewCard
                key={interview.id}
                {...interview}
                viewerRole="interviewee"
                onView={() => handleViewInterview(interview.id)}
                onJoin={() => handleJoinInterview(interview.id)}
              />
            ))}
        </div>
      </div>

      {/* Past Interviews */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockInterviews
            .filter(i => i.status === 'completed')
            .map((interview) => (
              <InterviewCard
                key={interview.id}
                {...interview}
                viewerRole="interviewee"
                onView={() => handleViewInterview(interview.id)}
              />
            ))}
        </div>
      </div>

      {/* Preparation Tips */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Interview Preparation Tips</h2>
        <div className="space-y-4">
          {preparationTips.map((tip, index) => (
            <Card key={index} className="p-4">
              <p className="text-gray-700">{tip}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
