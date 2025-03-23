
import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

interface InterviewerFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: {
    problem_solving: number;
    communication: number;
    comments: string;
  }) => void;
  interviewId: string;
}

export default function InterviewerFeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  interviewId,
}: InterviewerFeedbackModalProps) {
  const [problemSolving, setProblemSolving] = useState<number>(5);
  const [communication, setCommunication] = useState<number>(5);
  const [comments, setComments] = useState<string>('');

  const handleSubmit = () => {
    onSubmit({
      problem_solving: problemSolving,
      communication: communication,
      comments: comments,
    });
  };

  return (
    <Modal
      title="Submit Interview Feedback"
      description="Provide your assessment of the candidate's performance"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="problem-solving">Problem Solving</Label>
              <span className="text-sm font-medium">{problemSolving}/10</span>
            </div>
            <Slider
              id="problem-solving"
              min={1}
              max={10}
              step={1}
              value={[problemSolving]}
              onValueChange={(value) => setProblemSolving(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Ability to analyze problems and implement effective solutions
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="communication">Communication</Label>
              <span className="text-sm font-medium">{communication}/10</span>
            </div>
            <Slider
              id="communication"
              min={1}
              max={10}
              step={1}
              value={[communication]}
              onValueChange={(value) => setCommunication(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Clarity of explanation and technical communication skills
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Detailed Feedback</Label>
          <Textarea
            id="comments"
            placeholder="Provide detailed feedback about the candidate's performance..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5}
          />
        </div>
      </div>
    </Modal>
  );
}
