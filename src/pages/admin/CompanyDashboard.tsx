
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CompanyDashboard() {
  const { companyId } = useParams<{ companyId: string }>();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Company Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Company #{companyId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No company details available.</p>
        </CardContent>
      </Card>
    </div>
  );
}
