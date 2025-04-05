
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InterviewerInterviewsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Interviews</h1>
      <Card>
        <CardHeader>
          <CardTitle>Interview List</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No interviews assigned to you.</p>
        </CardContent>
      </Card>
    </div>
  );
}
