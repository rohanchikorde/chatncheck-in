
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Phone, Calendar, BarChart3 } from "lucide-react";
import { format } from "date-fns";

type DemoRequest = {
  id: string;
  first_name: string;
  last_name: string;
  work_email: string;
  phone_number: string | null;
  service_interest: string | null;
  message: string | null;
  created_at: string;
};

const serviceMap: Record<string, string> = {
  technical_interviews: "Technical Interviews",
  hr_interviews: "HR Interviews",
  leadership_interviews: "Leadership Interviews",
  all_services: "All Services",
};

export default function DemoRequestsPage() {
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const { data: demoRequests, isLoading, error } = useQuery({
    queryKey: ["demoRequests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("demo_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as DemoRequest[];
    },
  });

  const toggleDetails = (id: string) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Demo Requests"
        description="View demo requests from potential customers."
        actions={
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {isLoading ? "..." : demoRequests?.length || 0}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {isLoading
                  ? "..."
                  : demoRequests?.filter(
                      (req) =>
                        new Date(req.created_at) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length || 0}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Most Requested Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {isLoading
                  ? "..."
                  : demoRequests?.length
                  ? (function () {
                      const services = demoRequests
                        .filter((req) => req.service_interest)
                        .map((req) => req.service_interest);
                      const counts: Record<string, number> = {};
                      services.forEach((s) => {
                        if (s) counts[s] = (counts[s] || 0) + 1;
                      });
                      if (Object.keys(counts).length === 0) return "N/A";
                      const topService = Object.entries(counts).sort(
                        (a, b) => b[1] - a[1]
                      )[0][0];
                      return serviceMap[topService] || topService;
                    })()
                  : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {error ? (
        <Card className="mb-8">
          <CardContent className="py-4">
            <p className="text-destructive">
              Error loading demo requests. Please try again.
            </p>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <Card className="mb-8">
          <CardContent className="py-4">
            <p>Loading demo requests...</p>
          </CardContent>
        </Card>
      ) : demoRequests?.length === 0 ? (
        <Card className="mb-8">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No demo requests yet</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Service Interest</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoRequests?.map((request) => (
                  <React.Fragment key={request.id}>
                    <TableRow>
                      <TableCell className="font-medium">
                        {request.first_name} {request.last_name}
                      </TableCell>
                      <TableCell>{request.work_email}</TableCell>
                      <TableCell>
                        {request.service_interest
                          ? serviceMap[request.service_interest] ||
                            request.service_interest
                          : "Not specified"}
                      </TableCell>
                      <TableCell>
                        {format(new Date(request.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleDetails(request.id)}
                        >
                          {showDetails === request.id ? "Hide" : "Details"}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {showDetails === request.id && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-muted/30">
                          <div className="px-4 py-3">
                            {request.phone_number && (
                              <div className="flex items-center gap-2 mb-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{request.phone_number}</span>
                              </div>
                            )}
                            {request.message && (
                              <div>
                                <p className="font-medium mb-1">Message:</p>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                  {request.message}
                                </p>
                              </div>
                            )}
                            <div className="mt-2 text-xs text-muted-foreground">
                              Submitted on{" "}
                              {format(
                                new Date(request.created_at),
                                "MMMM d, yyyy 'at' h:mm a"
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
