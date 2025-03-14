
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Plus, Search, Filter, X, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/hooks/use-toast";
import CreateInterviewModal from "@/components/admin/CreateInterviewModal";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Interviews interface
interface Interview {
  id: string;
  candidate_name: string;
  interviewer_name: string;
  scheduled_at: string;
  status: string;
  feedback_submitted: string;
  job_role: string;
  format?: string;
  duration?: string;
}

// API URL for interviews
const API_URL = "http://localhost:5000/interviews";

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

  // Function to fetch interviews with optional filters
  const fetchInterviews = async () => {
    setLoading(true);
    setError(null);
    
    // Build query parameters
    const params = new URLSearchParams();
    if (statusFilter) params.append("status", statusFilter);
    if (interviewerFilter) params.append("interviewer_name", interviewerFilter);
    if (searchQuery) params.append("search", searchQuery);
    
    try {
      console.log(`Fetching interviews from: ${API_URL}?${params.toString()}`);
      const response = await fetch(`${API_URL}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Fetched interviews:", data);
      setInterviews(data);
    } catch (err) {
      console.error("Error fetching interviews:", err);
      setError("Failed to connect to the interview server. Please ensure the server is running.");
      toast({
        title: "Connection Error",
        description: "Failed to load interviews. Please check if the server is running.",
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
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete interview");
      }
      
      toast({
        title: "Interview Deleted",
        description: "The interview has been successfully deleted.",
      });
      
      // Refresh interviews
      fetchInterviews();
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast({
        title: "Error",
        description: "Failed to delete the interview. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Function to handle interview creation
  const handleInterviewCreated = () => {
    // Refresh the interviews list
    fetchInterviews();
    toast({
      title: "Success",
      description: "Interview has been successfully created and saved.",
    });
  };

  // Function to clear all filters
  const clearFilters = () => {
    setStatusFilter("");
    setInterviewerFilter("");
    setSearchQuery("");
  };

  // Function to get unique interviewers from the data
  const getUniqueInterviewers = () => {
    const interviewers = new Set<string>();
    interviews.forEach(interview => {
      if (interview.interviewer_name) {
        interviewers.add(interview.interviewer_name);
      }
    });
    return Array.from(interviewers);
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

      {/* Connection Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center">
            <span>{error}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchInterviews}
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

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
              {getUniqueInterviewers().map(interviewer => (
                <SelectItem key={interviewer} value={interviewer}>
                  {interviewer}
                </SelectItem>
              ))}
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Interviewer</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>{interview.candidate_name}</TableCell>
                    <TableCell>{interview.interviewer_name}</TableCell>
                    <TableCell>{formatDate(interview.scheduled_at)}</TableCell>
                    <TableCell>{interview.job_role}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        interview.status === "Completed" 
                          ? "bg-green-100 text-green-800" 
                          : interview.status === "Cancelled" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {interview.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {interview.feedback_submitted === "Yes" ? (
                        <span className="text-green-600 font-medium">Submitted</span>
                      ) : (
                        <span className="text-amber-600 font-medium">Pending</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
