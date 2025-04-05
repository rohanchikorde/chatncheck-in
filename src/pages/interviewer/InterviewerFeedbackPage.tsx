
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InterviewerFeedbackPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Feedback</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pending Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No pending feedback requests.</p>
        </CardContent>
      </Card>
    </div>
  );
}
