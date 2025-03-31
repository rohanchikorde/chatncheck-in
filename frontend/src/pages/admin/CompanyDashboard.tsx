import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PageHeader from '@/components/shared/PageHeader';
import DashboardMetricCard from '@/components/shared/DashboardMetricCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock, CheckCircle2, AlertCircle, BarChart2 } from 'lucide-react';

// HireSync Solutions Data
const COMPANY_DATA = {
  name: 'HireSync Solutions',
  industry: 'Tech Recruitment',
  size: 'Mid-sized (200 employees)',
  createdAt: '2023-05-10T09:00:00Z',
  stats: {
    totalInterviews: 28,
    pendingInterviews: 12,
    completedInterviews: 16,
    activeTeamMembers: 8,
    pendingDemos: 3
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const interviewData = [
  { name: 'Week 1', interviews: 4 },
  { name: 'Week 2', interviews: 7 },
  { name: 'Week 3', interviews: 5 },
  { name: 'Week 4', interviews: 12 },
];

const hiringFunnelData = [
  { name: 'Applications', value: 120 },
  { name: 'Screened', value: 80 },
  { name: 'Interviewed', value: 40 },
  { name: 'Offers Made', value: 15 },
  { name: 'Hired', value: 8 },
];

const timeToHireData = [
  { name: 'Jan', days: 35 },
  { name: 'Feb', days: 32 },
  { name: 'Mar', days: 30 },
  { name: 'Apr', days: 28 },
  { name: 'May', days: 25 },
  { name: 'Jun', days: 22 },
];

const recentInterviews = [
  { id: 1, candidateName: 'Alex Johnson', position: 'Frontend Developer', date: '2023-06-10', status: 'completed' },
  { id: 2, candidateName: 'Sam Taylor', position: 'UI/UX Designer', date: '2023-06-12', status: 'completed' },
  { id: 3, candidateName: 'Jordan Smith', position: 'Backend Developer', date: '2023-06-15', status: 'scheduled' },
  { id: 4, candidateName: 'Casey Kim', position: 'Product Manager', date: '2023-06-18', status: 'scheduled' },
  { id: 5, candidateName: 'Morgan Lee', position: 'DevOps Engineer', date: '2023-06-20', status: 'scheduled' },
];

const CompanyDashboard = () => {
  const { companyId } = useParams<{ companyId: string }>();

  // Fetch company data - using mock data for now
  const { data: company, isLoading } = useQuery({
    queryKey: ['company', companyId],
    queryFn: async () => {
      // We would normally fetch from the API, but using mock data for now
      console.log(`Fetching company data for ID: ${companyId}`);
      return COMPANY_DATA;
    }
  });
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading company dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={company?.name || 'Company Dashboard'} 
        description={`${company?.industry} · ${company?.size}`}
        actions={
          <Button variant="outline">Generate Report</Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetricCard
          title="Total Interviews"
          value={company?.stats.totalInterviews}
          description="All time"
          icon={<Calendar className="h-5 w-5 text-primary" />}
        />
        <DashboardMetricCard
          title="Pending Interviews"
          value={company?.stats.pendingInterviews}
          description="Next 7 days"
          icon={<Clock className="h-5 w-5 text-orange-500" />}
        />
        <DashboardMetricCard
          title="Completed Interviews"
          value={company?.stats.completedInterviews}
          description="Last 30 days"
          icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
        />
        <DashboardMetricCard
          title="Active Team Members"
          value={company?.stats.activeTeamMembers}
          description="Interviewers"
          icon={<Users className="h-5 w-5 text-blue-500" />}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Interview Activity</CardTitle>
                <CardDescription>Monthly interview trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={interviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="interviews" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hiring Funnel</CardTitle>
                <CardDescription>Current hiring pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={hiringFunnelData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {hiringFunnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Time to Hire</CardTitle>
              <CardDescription>Average days from application to offer</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timeToHireData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="days" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Interviews</CardTitle>
              <CardDescription>Last 5 interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">{interview.candidateName}</div>
                      <div className="text-sm text-muted-foreground">{interview.position}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">{new Date(interview.date).toLocaleDateString()}</div>
                      <Badge variant={interview.status === 'completed' ? 'outline' : 'default'}>
                        {interview.status === 'completed' ? 'Completed' : 'Scheduled'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">This section would display a calendar view of upcoming interviews.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key hiring metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">This section would display detailed analytics charts and reports.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interviewer Activity</CardTitle>
              <CardDescription>Team member participation and feedback quality</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">This section would display team member activity and performance metrics.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDashboard;
