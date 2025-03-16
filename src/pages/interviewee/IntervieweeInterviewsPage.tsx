
import React, { useState, useEffect } from "react";
import { format, parseISO, isAfter, subMinutes } from "date-fns";
import { Calendar, Clock, User, Briefcase, Filter, Search, X, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/shared/PageHeader";
import RefreshButton from "@/components/shared/RefreshButton";

// Interview interface
interface Interview {
  id: string;
  interviewer: {
    name: string;
  };
  scheduled_at: string;
  status: string;
  job_role?: string;
  feedback_submitted?: string;
  interviewee_id: string;
}

export default function IntervieweeInterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Fetch interviews function - updated to use Supabase
  const fetchInterviews = async () => {
    setLoading(true);
    try {
      // Mock interviewee ID - in a real app, this would come from authentication
      const intervieweeId = "7f9e3c5a-4d2b-4b7f-8a6e-0c9d1f2e3b5a"; // Replace with a valid ID from your database
      
      let query = supabase
        .from('interviews')
        .select(`
          id,
          scheduled_at,
          status,
          feedback_submitted,
          interviewee_id,
          interviewer:interviewers(id, name)
        `)
        .eq('interviewee_id', intervieweeId);
      
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      setInterviews(data || []);
      
      toast({
        title: "Data refreshed",
        description: "Latest interviews have been loaded",
      });
    } catch (error: any) {
      console.error("Error fetching interviews:", error);
      toast({
        title: "Error",
        description: "Failed to load interviews. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load interviews on component mount
  useEffect(() => {
    fetchInterviews();
  }, [statusFilter]);

  // Format date function
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy h:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Check if interview can be joined (within 15 minutes of scheduled time)
  const canJoinInterview = (scheduledAt: string) => {
    try {
      const interviewTime = parseISO(scheduledAt);
      const fifteenMinutesBefore = subMinutes(interviewTime, 15);
      return isAfter(currentTime, fifteenMinutesBefore) && !isAfter(currentTime, interviewTime);
    } catch (error) {
      return false;
    }
  };

  // Join interview - updated to use Supabase
  const joinInterview = async (id: string) => {
    toast({
      title: "Joining interview",
      description: "Updating interview status...",
    });
    
    try {
      // Update interview status to "In Progress"
      const { error } = await supabase
        .from('interviews')
        .update({ status: 'In Progress' })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Interview Joined",
        description: "You will be redirected to the video call shortly.",
      });
      
      // Mock video call URL - in a real app, this would come from a video call service
      const mockJoinUrl = `https://video-call/${id}`;
      window.open(mockJoinUrl, "_blank");
      
      // Refresh the interviews to show updated status
      fetchInterviews();
    } catch (error: any) {
      console.error("Error joining interview:", error);
      toast({
        title: "Error",
        description: "Failed to join the interview. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter interviews based on status
  const filteredInterviews = interviews;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="My Interviews"
        description="View your upcoming and past interviews"
        actions={
          <RefreshButton onRefresh={fetchInterviews} />
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-end animate-fade-in animation-delay-100">
        <div className="grid w-full sm:w-auto gap-1.5">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {statusFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter("");
            }}
            className="animate-fade-in"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filter
          </Button>
        )}
      </div>

      {/* Interviews List */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-3 mb-4 sm:mb-0">
                    <div className="h-6 bg-gray-200 rounded w-48"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                  </div>
                  <div className="h-9 bg-gray-200 rounded w-28"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredInterviews.length === 0 ? (
        <div className="text-center p-10 animate-fade-in animation-delay-200">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-lg mb-2">No interviews found</h3>
          <p className="text-muted-foreground mb-4">
            {statusFilter
              ? "Try changing your filter to see more results."
              : "You don't have any interviews scheduled yet."}
          </p>
          {statusFilter && (
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter("");
              }}
            >
              Clear Filter
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInterviews.map((interview, index) => (
            <Card
              key={interview.id}
              className="border shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between sm:justify-start">
                      <h3 className="font-medium text-lg">{interview.job_role || "Interview"}</h3>
                      <span
                        className={`ml-3 inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          interview.status === "Completed" || interview.status === "Under Review"
                            ? "bg-green-100 text-green-800"
                            : interview.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : interview.status === "In Progress"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {interview.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-4 w-4 mr-2" />
                      <span>Interviewer: {interview.interviewer?.name || "Not assigned"}</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{formatDate(interview.scheduled_at)}</span>
                    </div>
                    
                    {interview.feedback_submitted === "Yes" && (
                      <div className="text-green-600 text-sm font-medium">
                        Feedback has been submitted
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0 self-end sm:self-center">
                    {interview.status === "Scheduled" ? (
                      canJoinInterview(interview.scheduled_at) ? (
                        <Button
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 group relative overflow-hidden"
                          onClick={() => joinInterview(interview.id)}
                        >
                          <span className="relative z-10 flex items-center">
                            <Video className="h-4 w-4 mr-2" />
                            Join Video
                          </span>
                          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                        </Button>
                      ) : (
                        <Button variant="outline" disabled={true} className="opacity-70">
                          <Clock className="h-4 w-4 mr-2" />
                          Not Yet Available
                        </Button>
                      )
                    ) : interview.status === "Completed" || interview.status === "Under Review" ? (
                      <Button variant="outline">
                        View Feedback
                      </Button>
                    ) : interview.status === "In Progress" ? (
                      <Button
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 animate-pulse"
                        onClick={() => joinInterview(interview.id)}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Rejoin
                      </Button>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
