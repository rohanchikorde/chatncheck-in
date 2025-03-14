
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function InterviewDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Interview Details`} 
        description={`Managing interview #${id}`}
      >
        <Button variant="outline" onClick={() => navigate('/admin/interviews')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Interviews
        </Button>
      </PageHeader>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-lg">Interview details coming soon...</p>
        <p className="text-muted-foreground">This page will display full details for interview #{id}</p>
      </div>
    </div>
  );
}
