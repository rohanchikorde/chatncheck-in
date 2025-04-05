
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InterviewDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Interview Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Interview #{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No details available for this interview.</p>
        </CardContent>
      </Card>
    </div>
  );
}
