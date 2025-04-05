
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DemoRequestsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Demo Requests</h1>
      <Card>
        <CardHeader>
          <CardTitle>Demo Request List</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No demo requests found.</p>
        </CardContent>
      </Card>
    </div>
  );
}
