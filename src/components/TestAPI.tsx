
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const TestAPI: React.FC = () => {
  const [testData, setTestData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching test data from API...');
        const response = await fetch('/api/demo-requests/test');
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        setTestData(data);
        setError(null);
        toast({
          title: "API Test Successful",
          description: "Successfully retrieved data from the API",
          variant: "default",
        });
      } catch (err: any) {
        console.error('Error fetching test data:', err);
        setError(err.message || 'An error occurred while fetching data');
        setTestData(null);
        toast({
          title: "API Test Failed",
          description: err.message || 'An error occurred while fetching data',
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTest();
  }, [toast, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">API Test</h2>
      
      {isLoading && <p className="text-gray-600">Loading data...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
          <button 
            onClick={handleRetry}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            Retry
          </button>
        </div>
      )}
      
      {testData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Response Data:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestAPI;
