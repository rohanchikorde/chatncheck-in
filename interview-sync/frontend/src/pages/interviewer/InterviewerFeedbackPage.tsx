
import React, { useState } from 'react';
import { format } from 'date-fns';
import { MessageSquare, Search } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock feedback data
const mockFeedback = [
  {
    id: '1',
    candidate_name: 'Maria Garcia',
    interview_date: '2025-03-10T11:00:00Z',
    job_role: 'UX Designer',
    problem_solving: 8,
    communication: 7,
    submitted_at: '2025-03-10T13:30:00Z',
    comments: 'Strong in visual design. Articulated user research methods well. Could improve on user flow justifications.',
  },
  {
    id: '2',
    candidate_name: 'David Lee',
    interview_date: '2025-03-08T14:00:00Z',
    job_role: 'Frontend Developer',
    problem_solving: 9,
    communication: 8,
    submitted_at: '2025-03-08T15:45:00Z',
    comments: 'Excellent problem-solving skills. Clean code approach. Communicated thought process clearly throughout.',
  },
  {
    id: '3',
    candidate_name: 'Anna Kim',
    interview_date: '2025-03-05T10:30:00Z',
    job_role: 'Product Designer',
    problem_solving: 7,
    communication: 9,
    submitted_at: '2025-03-05T12:00:00Z',
    comments: 'Outstanding communication skills. Design thinking approach was solid. Could improve on technical implementation knowledge.',
  },
];

export default function InterviewerFeedbackPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);
  
  // Filter feedback based on search term
  const filteredFeedback = mockFeedback.filter(feedback => 
    feedback.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.job_role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpandFeedback = (feedbackId: string) => {
    if (expandedFeedback === feedbackId) {
      setExpandedFeedback(null);
    } else {
      setExpandedFeedback(feedbackId);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Feedback History" 
        description="Review the feedback you've provided to candidates"
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by candidate name or job role..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Feedback Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mockFeedback.length}</p>
            <p className="text-sm text-muted-foreground">Feedback submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Problem Solving</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {(mockFeedback.reduce((sum, item) => sum + item.problem_solving, 0) / mockFeedback.length).toFixed(1)}
            </p>
            <p className="text-sm text-muted-foreground">Out of 10 score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {(mockFeedback.reduce((sum, item) => sum + item.communication, 0) / mockFeedback.length).toFixed(1)}
            </p>
            <p className="text-sm text-muted-foreground">Out of 10 score</p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Interview Date</TableHead>
              <TableHead>Ratings</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedback.length > 0 ? (
              filteredFeedback.map((feedback) => (
                <React.Fragment key={feedback.id}>
                  <TableRow 
                    className={expandedFeedback === feedback.id ? "border-b-0" : ""}
                    onClick={() => toggleExpandFeedback(feedback.id)}
                  >
                    <TableCell className="font-medium">{feedback.candidate_name}</TableCell>
                    <TableCell>{feedback.job_role}</TableCell>
                    <TableCell>{format(new Date(feedback.interview_date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="justify-start gap-1 py-0.5">
                          Problem Solving: <span className="font-semibold">{feedback.problem_solving}/10</span>
                        </Badge>
                        <Badge variant="outline" className="justify-start gap-1 py-0.5">
                          Communication: <span className="font-semibold">{feedback.communication}/10</span>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="truncate max-w-[200px]">{feedback.comments}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {expandedFeedback === feedback.id && (
                    <TableRow className="bg-muted/20">
                      <TableCell colSpan={5} className="p-4">
                        <div className="space-y-3">
                          <h4 className="font-medium">Full Feedback</h4>
                          <p className="text-muted-foreground whitespace-pre-wrap">{feedback.comments}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted on {format(new Date(feedback.submitted_at), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No feedback records found. Try a different search term.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
