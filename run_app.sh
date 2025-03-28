
#!/bin/bash

# Start the backend server
echo "Starting Flask backend server..."
cd backend
python app.py &
BACKEND_PID=$!
echo "Backend server started with PID: $BACKEND_PID"

# Wait a moment for the backend to initialize
sleep 3

# Start the frontend
echo "Starting Vite frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "Frontend server started with PID: $FRONTEND_PID"

# Function to handle script exit
function cleanup {
  echo "Shutting down servers..."
  kill $FRONTEND_PID
  kill $BACKEND_PID
  echo "Servers shut down."
  exit
}

# Trap SIGINT (ctrl+c) and call cleanup
trap cleanup INT

# Keep script running
echo "Both servers are running. Press Ctrl+C to stop both servers."
wait
