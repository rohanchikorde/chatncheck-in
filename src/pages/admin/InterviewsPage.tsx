
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InterviewsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Interviews</h1>
        <Button variant="default">Schedule New Interview</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interview List</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No interviews found.</p>
        </CardContent>
      </Card>
    </div>
  );
}
