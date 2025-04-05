
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const BackendHealthCheck: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const { toast } = useToast();

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch('/api/demo-requests/test');
        if (response.ok) {
          setStatus('online');
          toast({
            title: "Backend Connection Successful",
            description: "Successfully connected to the backend server",
            variant: "default",
          });
        } else {
          setStatus('offline');
          toast({
            title: "Backend Connection Failed",
            description: `Error status: ${response.status}`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Backend health check failed:', error);
        setStatus('offline');
        toast({
          title: "Backend Connection Failed",
          description: "Could not connect to backend server. Is it running?",
          variant: "destructive",
        });
      }
    };

    checkBackendStatus();
  }, [toast]);

  return (
    <div className="fixed bottom-4 right-4 p-2 rounded-full shadow-md">
      <div 
        className={`w-3 h-3 rounded-full ${
          status === 'checking' ? 'bg-yellow-400' : 
          status === 'online' ? 'bg-green-500' : 'bg-red-500'
        }`} 
        title={`Backend is ${status}`}
      ></div>
    </div>
  );
};

export default BackendHealthCheck;
