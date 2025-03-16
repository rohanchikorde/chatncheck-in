
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  UserCog, 
  Users, 
  UserCheck,
  ArrowRight 
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-xl">IP</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to InterviewPulse</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your role to get started with managing your interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Organization Admin",
              description: "Manage your organization's interviews, interviewers, and interviewees",
              icon: <UserCog className="h-10 w-10 text-indigo-500" />,
              path: "/admin/interviews"
            },
            {
              title: "Interviewer",
              description: "View your upcoming interviews and submit feedback",
              icon: <UserCheck className="h-10 w-10 text-indigo-500" />,
              path: "/interviewer/interviews"
            },
            {
              title: "Interviewee",
              description: "Check your scheduled interviews and prepare",
              icon: <Users className="h-10 w-10 text-indigo-500" />,
              path: "/interviewee/interviews"
            }
          ].map((role, index) => (
            <Card 
              key={index} 
              className="border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-200"
            >
              <CardHeader className="pb-2">
                <div className="mb-2 bg-indigo-50 p-3 rounded-lg inline-block">
                  {role.icon}
                </div>
                <CardTitle>{role.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {role.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate(role.path)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-primary"
          >
            Return to Landing Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
