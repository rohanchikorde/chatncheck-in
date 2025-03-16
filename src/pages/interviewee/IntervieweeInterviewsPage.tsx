
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Clock, RefreshCw, Video } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock data for interviewee interviews
const mockInterviews = [
  {
    id: '1',
    interviewer_name: 'Isha Gupta',
    scheduled_at: '2025-03-15T10:00:00Z',
    status: 'Scheduled',
    job_role: 'Frontend Developer',
  },
  {
    id: '2',
    interviewer_name: 'Alex Johnson',
    scheduled_at: '2025-03-18T14:00:00Z',
    status: 'Scheduled',
    job_role: 'Frontend Developer',
  },
  {
    id: '3',
    interviewer_name: 'Michael Chen',
    scheduled_at: '2025-03-10T11:00:00Z',
    status: 'Completed',
    job_role: 'Frontend Developer',
    feedback_status: 'Under Review'
  }
];

export default function IntervieweeInterviewsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [interviews, setInterviews] = useState(mockInterviews);
  const [activeTab, setActiveTab] = useState<string>('upcoming');

  // Filter interviews based on active tab
  const filteredInterviews = interviews.filter(interview => {
    if (activeTab === 'upcoming') {
      return interview.status === 'Scheduled';
    } else if (activeTab === 'past') {
      return interview.status === 'Completed' || interview.status === 'Cancelled';
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
      case 'Completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getFeedbackBadge = (status: string) => {
    switch (status) {
      case 'Under Review':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Under Review</Badge>;
      case 'Available':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Feedback Available</Badge>;
      default:
        return null;
    }
  };

  const handleJoinInterview = (id: string) => {
    // Update status to "In Progress" when joining
    setInterviews(prevInterviews => 
      prevInterviews.map(interview => 
        interview.id === id 
          ? { ...interview, status: 'In Progress' } 
          : interview
      )
    );
    
    toast({
      title: "Interview Room",
      description: "You're joining as a candidate. Good luck!",
    });
    
    // In a real app, this would navigate to a video call page
    window.open(`/interview-room/${id}`, '_blank');
  };

  // Check if interview is ready to join (within 15 minutes of scheduled time)
  const isInterviewReady = (scheduledAt: string) => {
    const now = new Date();
    const interviewTime = new Date(scheduledAt);
    const timeDiff = (interviewTime.getTime() - now.getTime()) / (1000 * 60); // diff in minutes
    
    return timeDiff <= 15 && timeDiff >= -60; // can join 15min before until 60min after start time
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Interviews" 
        description="View your scheduled and past interviews"
        actions={
          <Button variant="outline" onClick={() => toast({ description: "Refreshed interviews" })}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        }
      />

      {/* Interview Preparation Resources */}
      {activeTab === 'upcoming' && filteredInterviews.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Prepare for Your Interview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Here are some resources to help you prepare for your upcoming interviews.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Technical Preparation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Review core frontend concepts</li>
                    <li>Practice coding problems</li>
                    <li>Prepare for system design questions</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Behavioral Preparation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Prepare STAR method responses</li>
                    <li>Research the company culture</li>
                    <li>Prepare questions for the interviewer</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Technical Setup</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Test your microphone and camera</li>
                    <li>Ensure stable internet connection</li>
                    <li>Prepare a quiet environment</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interview Tabs */}
      <div className="flex border-b">
        <Button
          variant="link"
          className={`pb-2 px-4 ${activeTab === 'upcoming' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </Button>
        <Button
          variant="link"
          className={`pb-2 px-4 ${activeTab === 'past' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('past')}
        >
          Past Interviews
        </Button>
      </div>

      {/* Interviews Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Interviewer</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInterviews.length > 0 ? (
              filteredInterviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell className="font-medium">{interview.interviewer_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {format(new Date(interview.scheduled_at), 'MMM d, yyyy')}
                      <Clock className="ml-3 mr-2 h-4 w-4 text-muted-foreground" />
                      {format(new Date(interview.scheduled_at), 'h:mm a')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {getStatusBadge(interview.status)}
                      {interview.feedback_status && getFeedbackBadge(interview.feedback_status)}
                    </div>
                  </TableCell>
                  <TableCell>{interview.job_role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/interviewee/interviews/${interview.id}`)}
                      >
                        Details
                      </Button>
                      
                      {interview.status === 'Scheduled' && (
                        <Button 
                          variant="default" 
                          size="sm"
                          disabled={!isInterviewReady(interview.scheduled_at)}
                          onClick={() => handleJoinInterview(interview.id)}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Join
                        </Button>
                      )}
                      
                      {interview.feedback_status === 'Available' && (
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => navigate(`/interviewee/feedback/${interview.id}`)}
                        >
                          View Feedback
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  {activeTab === 'upcoming' 
                    ? "No upcoming interviews scheduled. Check back later." 
                    : "No past interviews found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
