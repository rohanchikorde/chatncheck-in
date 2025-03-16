import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, User, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/shared/PageHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import { Filter, Search, X } from "lucide-react";

// Interview interface
interface Interview {
  id: string;
  interviewee: {
    name: string;
    role_applied: string;
  };
  scheduled_at: string;
  status: string;
  feedback_submitted: string;
}

export default function InterviewerInterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { toast } = useToast();

  // Fetch interviews function - updated to use Supabase
  const fetchInterviews = async () => {
    setLoading(true);
    try {
      // Mock interviewer ID - in a real app, this would come from authentication
      const interviewerId = "3d68b0e0-5837-40c3-aabc-8c79a0530fab"; // Replace with a valid ID from your database
      
      let query = supabase
        .from('interviews')
        .select(`
          id,
          scheduled_at,
          status,
          feedback_submitted,
          interviewee:interviewees(name, role_applied)
        `)
        .eq('interviewer_id', interviewerId);
      
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Filter by search query if needed (client-side)
      let filteredData = data;
      if (searchQuery && searchQuery.trim() !== '') {
        const searchLower = searchQuery.toLowerCase();
        filteredData = data.filter(interview => 
          interview.interviewee?.name?.toLowerCase().includes(searchLower) ||
          interview.interviewee?.role_applied?.toLowerCase().includes(searchLower)
        );
      }
      
      setInterviews(filteredData);
      
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
  }, [statusFilter, searchQuery]);

  // Format date function
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy h:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Filter interviews based on status and search query
  const filteredInterviews = interviews;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="My Interviews"
        description="View and manage your upcoming interviews"
        actions={
          <RefreshButton onRefresh={fetchInterviews} />
        }
      />

      {/* Filters UI */}
      <div className="flex flex-col sm:flex-row gap-4 items-end animate-fade-in animation-delay-100">
        <div className="grid w-full sm:w-auto gap-1.5">
          <div className="relative">
            <Input
              placeholder="Search by candidate or job role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[300px] pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 opacity-50" />
            </div>
          </div>
        </div>

        <div className="grid w-full sm:w-auto gap-1.5">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(statusFilter || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter("");
              setSearchQuery("");
            }}
            className="animate-fade-in"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Interviews Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="flex justify-end">
                  <div className="h-9 bg-gray-200 rounded w-24"></div>
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
            {statusFilter || searchQuery
              ? "Try changing your filters to see more results."
              : "You don't have any interviews scheduled yet."}
          </p>
          {(statusFilter || searchQuery) && (
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter("");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInterviews.map((interview, index) => (
            <Card
              key={interview.id}
              className="border shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:translate-y-[-2px]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{interview.interviewee?.name || "Unknown Candidate"}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      <Briefcase className="h-3.5 w-3.5 mr-1" />
                      {interview.interviewee?.role_applied || "No role specified"}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        interview.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : interview.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {interview.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatDate(interview.scheduled_at)}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <User className="h-4 w-4 mr-2" />
                    <span>Candidate: {interview.interviewee?.name || "Unknown"}</span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  {interview.status === "Completed" ? (
                    interview.feedback_submitted === "Yes" ? (
                      <span className="text-green-600 font-medium text-sm">Feedback Submitted</span>
                    ) : (
                      <Button
                        variant="default"
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 animate-pulse"
                      >
                        Submit Feedback
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="outline"
                      className="transition-all duration-300 hover:border-primary"
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
