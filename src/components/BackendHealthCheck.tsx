
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

const BackendHealthCheck: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [retryCount, setRetryCount] = useState<number>(0);
  const { toast } = useToast();

  const checkBackendStatus = useCallback(async () => {
    try {
      console.log('Checking backend health...');
      const response = await fetch('/api/demo-requests/test', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        console.log('Backend is online');
        setStatus('online');
        toast({
          title: "Backend Connection Successful",
          description: "Successfully connected to the backend server",
          variant: "default",
        });
      } else {
        console.error(`Backend health check failed with status: ${response.status}`);
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
  }, [toast]);

  // Initial check
  useEffect(() => {
    checkBackendStatus();
    
    // Setup periodic checking
    const intervalId = setInterval(() => {
      if (status === 'offline') {
        setRetryCount(prev => prev + 1);
      }
    }, 30000); // Check every 30 seconds if offline
    
    return () => clearInterval(intervalId);
  }, [checkBackendStatus, status]);

  // Retry when retryCount changes
  useEffect(() => {
    if (retryCount > 0) {
      checkBackendStatus();
    }
  }, [retryCount, checkBackendStatus]);

  const handleManualRetry = () => {
    setStatus('checking');
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className={`w-4 h-4 rounded-full ${
          status === 'checking' ? 'bg-yellow-400 animate-pulse' : 
          status === 'online' ? 'bg-green-500' : 'bg-red-500'
        }`} 
        title={`Backend is ${status}`}
        onClick={handleManualRetry}
        style={{ cursor: 'pointer' }}
      ></div>
    </div>
  );
};

export default BackendHealthCheck;
