
# InterviewSync Backend

A lightweight Python Flask backend for the "InterviewSync" portal's "View All Interviews" page.

## Overview

This backend provides API endpoints to:
- Fetch all interviews with filtering options
- Create new interviews
- Edit existing interviews
- Delete interviews

Data is temporarily stored in a CSV file (`interviews.csv`), with plans to transition to a database in the future.

## Setup

1. Install dependencies:
```
pip install -r requirements.txt
```

2. Run the server:
```
python server.py
```

The server will run on port 5000 by default.

## API Endpoints

### GET /interviews
Fetch all interviews with optional filtering.

Query parameters:
- `status`: Filter by interview status (e.g., "Scheduled", "Completed")
- `interviewer_name`: Filter by interviewer
- `date_start`: Filter by start date (ISO format)
- `date_end`: Filter by end date (ISO format)
- `search`: Search in candidate name, interviewer name, or job role

### POST /interviews
Create a new interview.

Request body:
```json
{
  "candidate_name": "Sam Patel",
  "interviewer_name": "Isha Gupta",
  "scheduled_at": "2025-03-15T10:00:00Z",
  "status": "Scheduled",
  "job_role": "Frontend Developer"
}
```

### PUT /interviews/<id>
Edit an existing interview.

Request body:
```json
{
  "candidate_name": "Sam Patel",
  "interviewer_name": "Isha Gupta",
  "scheduled_at": "2025-03-15T11:00:00Z",
  "status": "Scheduled",
  "job_role": "Frontend Developer",
  "feedback_submitted": "No"
}
```

### DELETE /interviews/<id>
Delete an interview.

## CSV Structure

The `interviews.csv` file has the following structure:
- `id`: Unique identifier for the interview
- `candidate_name`: Name of the candidate
- `interviewer_name`: Name of the interviewer
- `scheduled_at`: Date and time of the interview (ISO format)
- `status`: Status of the interview (e.g., "Scheduled", "Completed")
- `feedback_submitted`: Whether feedback has been submitted ("Yes" or "No")
- `job_role`: Role the candidate is interviewing for

## Future Plans

This backend is designed for easy transition to a database system like PostgreSQL in the future, replacing the CSV storage with database queries.
