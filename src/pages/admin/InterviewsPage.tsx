
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Plus, Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/hooks/use-toast";
import CreateInterviewModal from "@/components/admin/CreateInterviewModal";
import { supabase } from "@/integrations/supabase/client";

// Interviews interface
interface Interview {
  id: string;
  interviewer: {
    name: string;
  };
  interviewee: {
    name: string;
  };
  scheduled_at: string;
  status: string;
  feedback_submitted: string;
  interviewee_id: string;
  interviewer_id: string;
  job_role?: string;
  format?: string;
  duration?: string;
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [interviewerFilter, setInterviewerFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to fetch interviews with optional filters from Supabase
  const fetchInterviews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('interviews')
        .select(`
          id,
          scheduled_at,
          status,
          feedback_submitted,
          notes,
          interviewer_id,
          interviewee_id,
          interviewer:interviewers(id, name),
          interviewee:interviewees(id, name, role_applied)
        `);
      
      // Apply filters
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      if (searchQuery) {
        // Since we can't directly filter on joined tables with Supabase,
        // we'll fetch all and filter client-side for search
        // In a production app, you might want to implement a more efficient solution
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Transform data to match our interface
      const formattedData = data.map(interview => ({
        ...interview,
        id: interview.id,
        job_role: interview.interviewee?.role_applied || 'Unknown',
      }));
      
      // Client-side filtering for search query if needed
      let filteredData = formattedData;
      if (searchQuery && searchQuery.trim() !== '') {
        const searchLower = searchQuery.toLowerCase();
        filteredData = formattedData.filter(interview => 
          interview.interviewee?.name?.toLowerCase().includes(searchLower) ||
          interview.interviewer?.name?.toLowerCase().includes(searchLower) ||
          (interview.job_role && interview.job_role.toLowerCase().includes(searchLower))
        );
      }
      
      // Client-side filtering for interviewer if needed
      if (interviewerFilter && interviewerFilter.trim() !== '') {
        filteredData = filteredData.filter(interview => 
          interview.interviewer?.name === interviewerFilter
        );
      }
      
      setInterviews(filteredData);
    } catch (err: any) {
      console.error("Error loading interviews:", err);
      setError(err.message || "Error loading interviews. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load interviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch interviews on component mount and when filters change
  useEffect(() => {
    fetchInterviews();
  }, [statusFilter, interviewerFilter, searchQuery]);

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy h:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Function to delete an interview
  const handleDeleteInterview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this interview?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('interviews')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Interview Deleted",
        description: "The interview has been successfully deleted.",
      });
      
      // Refresh interviews
      fetchInterviews();
    } catch (error: any) {
      console.error("Error deleting interview:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete the interview",
        variant: "destructive",
      });
    }
  };

  // Function to handle interview creation
  const handleInterviewCreated = () => {
    // Refresh the interviews list
    fetchInterviews();
  };

  // Function to clear all filters
  const clearFilters = () => {
    setStatusFilter("");
    setInterviewerFilter("");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="All Interviews" 
        description="View and manage all interviews"
      >
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Create Interview
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="grid w-full sm:w-auto gap-1.5">
          <div className="relative">
            <Input
              placeholder="Search by name or job role..."
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
        
        <div className="grid w-full sm:w-auto gap-1.5">
          <Select value={interviewerFilter} onValueChange={setInterviewerFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by interviewer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Interviewers</SelectItem>
              <SelectItem value="Isha Patel">Isha Patel</SelectItem>
              <SelectItem value="Michael Chen">Michael Chen</SelectItem>
              <SelectItem value="Alex Rivera">Alex Rivera</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {(statusFilter || interviewerFilter || searchQuery) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Interviews Table */}
      <div className="rounded-md border">
        {loading ? (
          <div className="p-8 text-center">Loading interviews...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            {error}
            <Button variant="link" onClick={fetchInterviews} className="ml-2">
              Retry
            </Button>
          </div>
        ) : interviews.length === 0 ? (
          <div className="p-8 text-center">
            No interviews found. 
            {!statusFilter && !interviewerFilter && !searchQuery ? (
              <Button variant="link" onClick={() => setCreateModalOpen(true)}>
                Create your first interview
              </Button>
            ) : (
              <Button variant="link" onClick={clearFilters}>
                Clear filters to see all interviews
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Candidate</th>
                  <th className="py-3 px-4 text-left font-medium">Interviewer</th>
                  <th className="py-3 px-4 text-left font-medium">Date & Time</th>
                  <th className="py-3 px-4 text-left font-medium">Job Role</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Feedback</th>
                  <th className="py-3 px-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview) => (
                  <tr 
                    key={interview.id} 
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4">{interview.interviewee?.name || "Unknown"}</td>
                    <td className="py-3 px-4">{interview.interviewer?.name || "Unknown"}</td>
                    <td className="py-3 px-4">{formatDate(interview.scheduled_at)}</td>
                    <td className="py-3 px-4">{interview.job_role || "Not specified"}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        interview.status === "Completed" 
                          ? "bg-green-100 text-green-800" 
                          : interview.status === "Cancelled" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {interview.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {interview.feedback_submitted === "Yes" ? (
                        <span className="text-green-600 font-medium">Submitted</span>
                      ) : (
                        <span className="text-amber-600 font-medium">Pending</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate(`/admin/interviews/${interview.id}`)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteInterview(interview.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CreateInterviewModal 
        isOpen={createModalOpen} 
        onClose={() => setCreateModalOpen(false)}
        onInterviewCreated={handleInterviewCreated}
      />
    </div>
  );
}
