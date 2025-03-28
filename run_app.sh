
#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== InterviewPulse Application Launcher ===${NC}"

# Ensure the script is executable
chmod +x run_app.sh

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo -e "${RED}Python is not installed. Please install Python.${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js.${NC}"
    exit 1
fi

# Check if .env file exists in frontend, if not copy from example
if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    cp frontend/.env.example frontend/.env
    echo -e "${GREEN}Created frontend/.env file. Please edit it with your actual credentials.${NC}"
fi

# Start the backend server
echo -e "${YELLOW}Starting Flask backend server...${NC}"
cd backend
python app.py &
BACKEND_PID=$!
echo -e "${GREEN}Backend server started with PID: $BACKEND_PID${NC}"

# Wait a moment for the backend to initialize
echo -e "${YELLOW}Waiting for backend to initialize...${NC}"
sleep 3

# Start the frontend
echo -e "${YELLOW}Starting Vite frontend server...${NC}"
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend server started with PID: $FRONTEND_PID${NC}"

# Function to handle script exit
function cleanup {
  echo -e "${YELLOW}Shutting down servers...${NC}"
  kill $FRONTEND_PID
  kill $BACKEND_PID
  echo -e "${GREEN}Servers shut down.${NC}"
  exit
}

# Trap SIGINT (ctrl+c) and call cleanup
trap cleanup INT

# Keep script running
echo -e "${GREEN}Both servers are running. Press Ctrl+C to stop both servers.${NC}"
echo -e "${YELLOW}Frontend: http://localhost:5173${NC}"
echo -e "${YELLOW}Backend: http://localhost:5000${NC}"
wait
