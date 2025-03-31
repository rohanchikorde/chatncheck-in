import React, { useState, useEffect } from 'react';

const TestAPI: React.FC = () => {
  const [testData, setTestData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch('/api/demo-requests/test');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTestData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTest();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>API Test</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {testData && (
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
          {JSON.stringify(testData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestAPI;
