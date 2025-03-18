
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, User, Briefcase, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

interface Interview {
  id: string;
  candidate_name: string;
  interviewer_name: string;
  scheduled_at: string;
  status: string;
  feedback_submitted: string;
  job_role: string;
  format?: string;
  duration_minutes?: number;
  resume_url?: string | null;
}

export default function InterviewDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInterview = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!id) throw new Error("Interview ID is required");
      
      const { data, error: fetchError } = await supabase
        .from('interviews')
        .select('*')
        .eq('id', id)
        .single();
      
      if (fetchError) {
        throw new Error(fetchError.message);
      }
      
      if (!data) {
        throw new Error("Interview not found");
      }
      
      setInterview(data as Interview);
    } catch (err) {
      console.error("Error fetching interview:", err);
      setError("Error loading interview details. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load interview details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInterview();
    }
  }, [id]);

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Function to format time
  const formatTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), "h:mm a");
    } catch (error) {
      return "Invalid time";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Loading..." 
          description="Fetching interview details"
        >
          <Button variant="outline" onClick={() => navigate('/admin/interviews')}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Interviews
          </Button>
        </PageHeader>
        <div className="flex justify-center p-8">
          <div className="animate-pulse">Loading interview details...</div>
        </div>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Error" 
          description="Failed to load interview details"
        >
          <Button variant="outline" onClick={() => navigate('/admin/interviews')}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Interviews
          </Button>
        </PageHeader>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              {error || "Interview not found"}
              <div className="mt-4">
                <Button onClick={fetchInterview}>Retry</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Interview with ${interview.candidate_name}`} 
        description={`Interview details for ${interview.job_role} position`}
      >
        <Button variant="outline" onClick={() => navigate('/admin/interviews')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Interviews
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold">Interview Details</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Candidate</h3>
                      <p>{interview.candidate_name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Interviewer</h3>
                      <p>{interview.interviewer_name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Job Role</h3>
                      <p>{interview.job_role}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Date</h3>
                      <p>{formatDate(interview.scheduled_at)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Time</h3>
                      <p>{formatTime(interview.scheduled_at)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {interview.feedback_submitted === "Yes" ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">Feedback</h3>
                      <p>{interview.feedback_submitted === "Yes" ? "Submitted" : "Pending"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Status</h3>
                <Badge className={`${
                  interview.status === "Completed" 
                    ? "bg-green-100 text-green-800 hover:bg-green-200" 
                    : interview.status === "Cancelled" 
                    ? "bg-red-100 text-red-800 hover:bg-red-200" 
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}>
                  {interview.status}
                </Badge>
              </div>

              {/* Additional interview details could be displayed here */}
              {interview.format && (
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Interview Format</h3>
                  <p>{interview.format}</p>
                </div>
              )}
              
              {interview.duration_minutes && (
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Duration</h3>
                  <p>{interview.duration_minutes} minutes</p>
                </div>
              )}

              {interview.resume_url && (
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Resume</h3>
                  <a 
                    href={interview.resume_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold">Actions</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {interview.status === "Scheduled" && (
              <>
                <Button className="w-full" variant="outline">
                  Reschedule Interview
                </Button>
                <Button className="w-full" variant="outline">
                  Cancel Interview
                </Button>
              </>
            )}
            
            {interview.status === "Completed" && (
              <>
                <Button className="w-full" variant={interview.feedback_submitted === "Yes" ? "outline" : "default"}>
                  {interview.feedback_submitted === "Yes" ? "View Feedback" : "Submit Feedback"}
                </Button>
              </>
            )}
            
            <Button 
              className="w-full" 
              variant="destructive" 
              onClick={async () => {
                // Confirm and navigate back upon successful deletion
                if (confirm("Are you sure you want to delete this interview?")) {
                  try {
                    const { error } = await supabase
                      .from('interviews')
                      .delete()
                      .eq('id', interview.id);
                      
                    if (error) throw error;
                    
                    toast({
                      title: "Interview Deleted",
                      description: "The interview has been successfully deleted.",
                    });
                    navigate("/admin/interviews");
                  } catch (error) {
                    console.error("Error deleting interview:", error);
                    toast({
                      title: "Error",
                      description: "Failed to delete the interview",
                      variant: "destructive",
                    });
                  }
                }
              }}
            >
              Delete Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
