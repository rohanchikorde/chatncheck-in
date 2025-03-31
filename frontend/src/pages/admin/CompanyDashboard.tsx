
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Download, FileText, MessageSquare, Plus, Users, Eye, PieChart, Building, BarChart } from 'lucide-react';
import { format } from 'date-fns';

import PageHeader from '@/components/shared/PageHeader';
import DashboardMetricCard from '@/components/shared/DashboardMetricCard';
import InterviewCard, { InterviewCardProps } from '@/components/shared/InterviewCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock company details
const mockCompanyDetails = {
  id: '1',
  name: 'HireSync Solutions',
  industry: 'Tech Recruitment',
  size: 'Mid-sized (200 employees)',
  foundedYear: 2015,
  logo: '',
  description: 'HireSync Solutions is a tech recruitment company specializing in helping tech companies find the right talent. Their mission is to streamline the hiring process, reduce time-to-hire by 30%, and improve collaboration between HR and engineering teams.',
  location: 'San Francisco, CA',
  website: 'www.hiresyncsolutions.com',
  contactEmail: 'contact@hiresyncsolutions.com',
  contactPhone: '+1 (555) 123-4567',
  admins: [
    { id: '1', name: 'Jane Smith', role: 'HR Manager', email: 'jane.smith@hiresync.com', avatar: '' },
    { id: '2', name: 'Tom Wilson', role: 'Technical Recruiter', email: 'tom.wilson@hiresync.com', avatar: '' },
  ]
};

// Mock interviews
const mockInterviews = [
  {
    id: '1',
    title: 'Senior React Developer - First Round',
    date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    duration: 60,
    status: 'scheduled',
    type: 'technical',
    participants: [
      { name: 'Isha Patel', role: 'interviewer', avatar: '' },
      { name: 'Sam Johnson', role: 'interviewee', avatar: '' },
    ],
  },
  {
    id: '2',
    title: 'UX Designer - Final Round',
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    duration: 45,
    status: 'scheduled',
    type: 'behavioral',
    participants: [
      { name: 'Michael Chen', role: 'interviewer', avatar: '' },
      { name: 'Emma Davis', role: 'interviewee', avatar: '' },
    ],
  },
  {
    id: '3',
    title: 'Product Manager - Initial Screening',
    date: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    duration: 30,
    status: 'completed',
    type: 'mixed',
    participants: [
      { name: 'Alex Rivera', role: 'interviewer', avatar: '' },
      { name: 'Jordan Smith', role: 'interviewee', avatar: '' },
    ],
  },
];

// Mock demo requests
const mockDemoRequests = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@hiresync.com',
    date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
    service: 'All Services',
    status: 'scheduled',
    message: 'Interested in learning more about your interview platform.'
  },
  {
    id: '2',
    name: 'Robert Lee',
    email: 'robert.lee@hiresync.com',
    date: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
    service: 'Structured Interviews',
    status: 'completed',
    message: 'Need help with technical interview assessments.'
  },
  {
    id: '3',
    name: 'Emily Wilson',
    email: 'emily.w@hiresync.com',
    date: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000),
    service: 'Interview Reports',
    status: 'pending',
    message: 'Looking for ways to improve our reporting workflow.'
  }
];

// Mock team members
const mockTeamMembers = [
  {
    id: '1',
    name: 'Jane Smith',
    role: 'HR Manager',
    email: 'jane.smith@hiresync.com',
    avatar: '',
    interviews: 12,
    status: 'active',
    lastActive: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    name: 'Tom Wilson',
    role: 'Technical Recruiter',
    email: 'tom.wilson@hiresync.com',
    avatar: '',
    interviews: 24,
    status: 'active',
    lastActive: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'HR Specialist',
    email: 'sarah.j@hiresync.com',
    avatar: '',
    interviews: 8,
    status: 'inactive',
    lastActive: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    id: '4',
    name: 'Alex Rivera',
    role: 'Department Head',
    email: 'alex.r@hiresync.com',
    avatar: '',
    interviews: 18,
    status: 'active',
    lastActive: new Date(new Date().getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
];

// Mock activity
const mockActivity = [
  {
    id: '1',
    type: 'interview_scheduled',
    user: { name: 'Jane Smith', avatar: '' },
    subject: 'Senior React Developer',
    timestamp: new Date(new Date().getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    id: '2',
    type: 'feedback_submitted',
    user: { name: 'Tom Wilson', avatar: '' },
    subject: 'UX Designer Candidate',
    timestamp: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '3',
    type: 'demo_requested',
    user: { name: 'Sarah Johnson', avatar: '' },
    subject: 'Interview Platform Demo',
    timestamp: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '4',
    type: 'user_added',
    user: { name: 'Jane Smith', avatar: '' },
    subject: 'New Technical Recruiter',
    timestamp: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
];

const CompanyDashboard = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // For this demo, we're ignoring the companyId and using mock data
  // In a real implementation, we would fetch company data based on the companyId
  const company = mockCompanyDetails;

  const handleViewInterview = (id: string) => {
    navigate(`/admin/interviews/${id}`);
  };

  const handleJoinInterview = (id: string) => {
    toast({
      title: "Interview Room",
      description: "You're joining the interview as an observer.",
    });
    navigate(`/admin/interviews/${id}/room`);
  };

  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };

  const formatDateTime = (date: Date) => {
    return format(date, 'MMM d, yyyy h:mm a');
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  // Format the activity item based on type
  const formatActivityItem = (activity: typeof mockActivity[0]) => {
    switch (activity.type) {
      case 'interview_scheduled':
        return (
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span>{' '}
                scheduled an interview for{' '}
                <span className="font-medium">{activity.subject}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(activity.timestamp)}
              </p>
            </div>
          </div>
        );
      case 'feedback_submitted':
        return (
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span>{' '}
                submitted feedback for{' '}
                <span className="font-medium">{activity.subject}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(activity.timestamp)}
              </p>
            </div>
          </div>
        );
      case 'demo_requested':
        return (
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span>{' '}
                requested a{' '}
                <span className="font-medium">{activity.subject}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(activity.timestamp)}
              </p>
            </div>
          </div>
        );
      case 'user_added':
        return (
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span>{' '}
                added a{' '}
                <span className="font-medium">{activity.subject}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(activity.timestamp)}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title={company.name} 
        description={`${company.industry} · ${company.size}`}
      >
        <div className="flex gap-3">
          <Button onClick={() => navigate(`/admin/companies/${companyId}/edit`)}>
            Edit Company
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/companies')}>
            All Companies
          </Button>
        </div>
      </PageHeader>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="demos">Demo Requests</TabsTrigger>
          <TabsTrigger value="details">Company Details</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <DashboardMetricCard
              title="Total Interviews"
              value={28}
              icon={<Calendar className="h-5 w-5" />}
              description="This month"
              trend="up"
              trendValue="12%"
            />
            <DashboardMetricCard
              title="Active Team Members"
              value={8}
              icon={<Users className="h-5 w-5" />}
              description="From 12 registered"
            />
            <DashboardMetricCard
              title="Pending Demos"
              value={3}
              icon={<MessageSquare className="h-5 w-5" />}
              description="Awaiting scheduling"
              trend="down"
              trendValue="2"
            />
            <DashboardMetricCard
              title="Hire Rate"
              value="68%"
              icon={<BarChart className="h-5 w-5" />}
              description="Last 30 days"
              trend="up"
              trendValue="5%"
            />
          </div>

          {/* Recent Activity & Next Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockActivity.map((activity) => (
                    <div key={activity.id}>
                      {formatActivityItem(activity)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => navigate(`/admin/interviews/new?company=${companyId}`)} 
                  className="w-full justify-start" 
                  variant="info"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule New Interview
                </Button>
                <Button 
                  onClick={() => navigate(`/admin/team/new?company=${companyId}`)} 
                  className="w-full justify-start" 
                  variant="success"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
                <Button 
                  onClick={() => navigate(`/admin/companies/${companyId}/reports`)} 
                  className="w-full justify-start" 
                  variant="warning"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button 
                  onClick={() => navigate(`/admin/companies/${companyId}/analytics`)} 
                  className="w-full justify-start" 
                  variant="action"
                >
                  <PieChart className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Interviews */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Upcoming Interviews</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveTab('interviews')}
              >
                View All
                <Clock className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockInterviews
                .filter((interview) => interview.status === 'scheduled')
                .map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    {...interview}
                    viewerRole="admin"
                    onView={handleViewInterview}
                    onJoin={handleJoinInterview}
                  />
                ))}
            </div>
          </div>
        </TabsContent>

        {/* Interviews Tab */}
        <TabsContent value="interviews" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">All Interviews</CardTitle>
                <Button onClick={() => navigate(`/admin/interviews/new?company=${companyId}`)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Interview
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Interviewee</TableHead>
                    <TableHead>Interviewer</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInterviews.concat(mockInterviews).map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.title}</TableCell>
                      <TableCell>
                        {interview.participants.find(p => p.role === 'interviewee')?.name}
                      </TableCell>
                      <TableCell>
                        {interview.participants.find(p => p.role === 'interviewer')?.name}
                      </TableCell>
                      <TableCell>{formatDateTime(interview.date)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            interview.status === 'scheduled' ? 'outline' : 
                            interview.status === 'completed' ? 'success' : 
                            'destructive'
                          }
                        >
                          {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewInterview(interview.id)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                          {interview.status === 'scheduled' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleJoinInterview(interview.id)}
                            >
                              <Clock className="mr-1 h-4 w-4" />
                              Join
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">Team Members</CardTitle>
                <Button onClick={() => navigate(`/admin/team/new?company=${companyId}`)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Interviews</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTeamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.interviews}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={member.status === 'active' ? 'success' : 'destructive'}
                        >
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatTimeAgo(member.lastActive)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/team/${member.id}`)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demo Requests Tab */}
        <TabsContent value="demos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Demo Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDemoRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.name}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{formatDate(request.date)}</TableCell>
                      <TableCell>{request.service}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            request.status === 'pending' ? 'outline' : 
                            request.status === 'scheduled' ? 'success' : 
                            request.status === 'completed' ? 'secondary' :
                            'destructive'
                          }
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/demo-requests/${request.id}`)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Company Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Company Name</h3>
                    <p className="text-base">{company.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
                    <p className="text-base">{company.industry}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Size</h3>
                    <p className="text-base">{company.size}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Founded</h3>
                    <p className="text-base">{company.foundedYear}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                    <p className="text-base">{company.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Website</h3>
                    <p className="text-base">{company.website}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Email</h3>
                    <p className="text-base">{company.contactEmail}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Phone</h3>
                    <p className="text-base">{company.contactPhone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Primary Admins</h3>
                    <div className="mt-2 space-y-2">
                      {company.admins.map(admin => (
                        <div key={admin.id} className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={admin.avatar} />
                            <AvatarFallback>{admin.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{admin.name}</p>
                            <p className="text-xs text-muted-foreground">{admin.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="text-base mt-1">{company.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDashboard;
