
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Interview Platform as a Service</h1>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Welcome to the Interview Platform
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Select your role to proceed to the appropriate dashboard
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Admin Card */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Platform Admin</CardTitle>
                <CardDescription>
                  Manage companies, roles, and users across the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Manage multiple companies</li>
                  <li>Create and assign roles</li>
                  <li>Manage platform users</li>
                  <li>View platform statistics</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/admin/dashboard">Go to Admin Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Interviewer Card */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Interviewer</CardTitle>
                <CardDescription>
                  View and manage your assigned interviews
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>See upcoming interviews</li>
                  <li>Provide feedback after interviews</li>
                  <li>View your interview schedule</li>
                  <li>Manage your skills profile</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/interviewer/dashboard">Go to Interviewer Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Interviewee Card */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Candidate</CardTitle>
                <CardDescription>
                  Apply for roles and manage your interviews
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Browse available roles</li>
                  <li>Apply to open positions</li>
                  <li>View upcoming interviews</li>
                  <li>Track application status</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/interviewee/dashboard">Go to Candidate Portal</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Interview Platform as a Service. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
