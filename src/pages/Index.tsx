
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, UserCog } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">InterviewPro</h1>
          <p className="text-xl text-gray-600">Select your role to continue</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-blue-50 rounded-t-lg">
              <UserCog className="h-10 w-10 text-blue-500 mb-2" />
              <CardTitle>Admin</CardTitle>
              <CardDescription>Manage interviews, users, and settings</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-600">
                <li>• Schedule interviews</li>
                <li>• Manage interviewers</li>
                <li>• View reports and analytics</li>
                <li>• Configure system settings</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/admin/dashboard")}
              >
                Continue as Admin
              </Button>
            </CardFooter>
          </Card>
          
          {/* Interviewer Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-purple-50 rounded-t-lg">
              <User className="h-10 w-10 text-purple-500 mb-2" />
              <CardTitle>Interviewer</CardTitle>
              <CardDescription>Conduct interviews and submit feedback</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-600">
                <li>• View scheduled interviews</li>
                <li>• Conduct technical assessments</li>
                <li>• Submit structured feedback</li>
                <li>• Track interview history</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate("/interviewer/dashboard")}
              >
                Continue as Interviewer
              </Button>
            </CardFooter>
          </Card>
          
          {/* Interviewee Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-green-50 rounded-t-lg">
              <Users className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle>Interviewee</CardTitle>
              <CardDescription>Join interviews and track applications</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-600">
                <li>• Check interview schedule</li>
                <li>• Join video interviews</li>
                <li>• Update profile information</li>
                <li>• Review feedback (when shared)</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/interviewee/dashboard")}
              >
                Continue as Interviewee
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            New to InterviewPro? <a href="#" className="text-blue-600 hover:underline">Learn more</a> about our platform
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
