
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export interface InterviewCardProps {
  id: string;
  title: string;
  date: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'technical' | 'behavioral' | 'mixed';
  participants: {
    name: string;
    role: 'interviewer' | 'interviewee';
    avatar?: string;
  }[];
  onView?: (id: string) => void;
  onJoin?: (id: string) => void;
  viewerRole: 'admin' | 'interviewer' | 'interviewee';
}

export default function InterviewCard({
  id,
  title,
  date,
  duration,
  status,
  type,
  participants,
  onView,
  onJoin,
  viewerRole,
}: InterviewCardProps) {
  const statusColors = {
    scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    'in-progress': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
  };

  const typeColors = {
    technical: 'bg-purple-50 text-purple-700 border-purple-200',
    behavioral: 'bg-teal-50 text-teal-700 border-teal-200',
    mixed: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  const isUpcoming = new Date() < date && status === 'scheduled';
  const canJoin = status === 'scheduled' && 
    new Date() >= new Date(date.getTime() - 5 * 60000) && // 5 minutes before
    new Date() <= new Date(date.getTime() + duration * 60000); // Before end time

  return (
    <Card className="h-full overflow-hidden animate-scale-in transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <h3 className="font-medium truncate">{title}</h3>
          <div className="flex gap-2">
            <Badge variant="outline" className={typeColors[type]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
            <Badge variant="outline" className={statusColors[status]}>
              {status === 'in-progress' ? 'Live' : status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{format(date, 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{format(date, 'h:mm a')} • {duration} mins</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Participants</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {participants.map((participant, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="text-xs">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <span>{participant.name}</span>
                    <span className="text-muted-foreground ml-1">
                      ({participant.role === 'interviewer' ? 'Interviewer' : 'Candidate'})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" onClick={() => onView?.(id)}>
          View Details
        </Button>
        {canJoin && (
          <Button size="sm" onClick={() => onJoin?.(id)}>
            Join Interview
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
