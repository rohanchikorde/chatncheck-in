
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Filter, RefreshCw } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import InterviewerFeedbackModal from '@/components/interviewer/InterviewerFeedbackModal';

// Mock data for now - would be replaced with API calls
const mockInterviews = [
  {
    id: '1',
    candidate_name: 'Sam Patel',
    scheduled_at: '2025-03-15T10:00:00Z',
    status: 'Scheduled',
    job_role: 'Frontend Developer',
    feedback_submitted: 'No'
  },
  {
    id: '2',
    candidate_name: 'John Doe',
    scheduled_at: '2025-03-16T14:00:00Z',
    status: 'Scheduled',
    job_role: 'Backend Developer',
    feedback_submitted: 'No'
  },
  {
    id: '3',
    candidate_name: 'Maria Garcia',
    scheduled_at: '2025-03-10T11:00:00Z',
    status: 'Completed',
    job_role: 'UX Designer',
    feedback_submitted: 'No'
  }
];

export default function InterviewerInterviewsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [interviews, setInterviews] = useState(mockInterviews);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredInterviews = statusFilter === 'All' 
    ? interviews 
    : interviews.filter(interview => interview.status === statusFilter);

  const handleSubmitFeedback = (interviewId: string, feedback: any) => {
    console.log('Submitting feedback for interview', interviewId, feedback);
    
    // Update the local state (would be an API call in production)
    setInterviews(prevInterviews => 
      prevInterviews.map(interview => 
        interview.id === interviewId 
          ? { ...interview, feedback_submitted: 'Yes' } 
          : interview
      )
    );
    
    setShowFeedbackModal(false);
    
    toast({
      title: "Feedback submitted",
      description: "Your feedback has been recorded successfully.",
    });
  };

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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Interviews" 
        description="Manage your assigned interviews and submit feedback"
        actions={
          <Button variant="outline" onClick={() => toast({ description: "Refreshed interviews" })}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        }
      />

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['All', 'Scheduled', 'In Progress', 'Completed'].map(status => (
              <Button 
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Interviews Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInterviews.length > 0 ? (
              filteredInterviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell className="font-medium">{interview.candidate_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
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
                        View Details
                      </Button>
                      
                      {interview.status === 'Completed' && interview.feedback_submitted === 'No' && (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => {
                            setSelectedInterview(interview.id);
                            setShowFeedbackModal(true);
                          }}
                        >
                          Submit Feedback
                        </Button>
                      )}
                      
                      {interview.feedback_submitted === 'Yes' && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Feedback Submitted
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No interviews found. Adjust filters or check back later.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedInterview && (
        <InterviewerFeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={(feedback) => handleSubmitFeedback(selectedInterview, feedback)}
          interviewId={selectedInterview}
        />
      )}
    </div>
  );
}
