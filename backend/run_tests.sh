
#!/bin/bash

# Start the Flask backend in the background
echo "Starting Flask backend..."
cd "$(dirname "$0")"
python server.py &
SERVER_PID=$!

# Give the server time to start
echo "Waiting for server to start..."
sleep 5

# Run the tests
echo "Running API tests..."
python test_api.py

# Shutdown the server
echo "Shutting down server..."
kill $SERVER_PID

echo "Tests completed!"
