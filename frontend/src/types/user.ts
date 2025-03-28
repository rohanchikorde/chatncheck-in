export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'interviewer' | 'interviewee';
  createdAt?: string;
  updatedAt?: string;
}
