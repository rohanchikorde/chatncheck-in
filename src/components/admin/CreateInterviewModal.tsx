
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface CreateInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInterviewCreated?: () => void;
}

const formSchema = z.object({
  candidateName: z.string().min(2, {
    message: "Candidate name must be at least 2 characters.",
  }),
  candidateEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  roleApplied: z.string().min(2, {
    message: "Job role must be at least 2 characters.",
  }),
  interviewer: z.string({
    required_error: "Please select an interviewer.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string({
    required_error: "A time is required.",
  }),
  duration: z.string({
    required_error: "Please select a duration.",
  }),
  format: z.string({
    required_error: "Please select an interview format.",
  }),
  organization: z.string({
    required_error: "Please select an organization.",
  }),
  useQuestionBank: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface Interviewer {
  id: string;
  name: string;
  specialization?: string;
}

interface Organization {
  id: string;
  name: string;
}

export default function CreateInterviewModal({
  isOpen,
  onClose,
  onInterviewCreated,
}: CreateInterviewModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch interviewers and organizations when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchInterviewers();
      fetchOrganizations();
    }
  }, [isOpen]);

  const fetchInterviewers = async () => {
    try {
      const { data, error } = await supabase
        .from('interviewers')
        .select('id, name, specialization');
      
      if (error) throw error;
      setInterviewers(data || []);
    } catch (error: any) {
      console.error('Error fetching interviewers:', error);
      toast({
        title: "Error",
        description: "Failed to load interviewers. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchOrganizations = async () => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('id, name');
      
      if (error) throw error;
      setOrganizations(data || []);
    } catch (error: any) {
      console.error('Error fetching organizations:', error);
      toast({
        title: "Error",
        description: "Failed to load organizations. Please try again.",
        variant: "destructive",
      });
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidateName: "",
      candidateEmail: "",
      roleApplied: "",
      useQuestionBank: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Format date and time into ISO format
      const timeString = data.time;
      const dateObj = data.date;
      
      // Combine date and time
      const dateTimeString = `${format(dateObj, "yyyy-MM-dd")}T${timeString}:00Z`;
      
      // Step 1: Check if interviewee exists or create a new one
      let intervieweeId = "";
      const { data: existingInterviewees, error: intervieweeCheckError } = await supabase
        .from('interviewees')
        .select('id')
        .eq('email', data.candidateEmail)
        .limit(1);
      
      if (intervieweeCheckError) throw intervieweeCheckError;
      
      if (existingInterviewees && existingInterviewees.length > 0) {
        intervieweeId = existingInterviewees[0].id;
      } else {
        // Create new interviewee
        const { data: newInterviewee, error: createIntervieweeError } = await supabase
          .from('interviewees')
          .insert({
            name: data.candidateName,
            email: data.candidateEmail,
            role_applied: data.roleApplied,
            organization_id: data.organization
          })
          .select('id')
          .single();
        
        if (createIntervieweeError) throw createIntervieweeError;
        if (!newInterviewee) throw new Error("Failed to create interviewee");
        
        intervieweeId = newInterviewee.id;
      }
      
      // Step 2: Create the interview
      const { data: newInterview, error: createInterviewError } = await supabase
        .from('interviews')
        .insert({
          interviewer_id: data.interviewer,
          interviewee_id: intervieweeId,
          organization_id: data.organization,
          scheduled_at: dateTimeString,
          status: 'Scheduled',
          feedback_submitted: 'No',
          notes: `Format: ${data.format}, Duration: ${data.duration} minutes`
        })
        .select()
        .single();
      
      if (createInterviewError) throw createInterviewError;
      
      // Success notification
      toast({
        title: "Interview Scheduled",
        description: `Interview for ${data.candidateName} has been created.`,
      });
      
      // Reset form and close modal
      form.reset();
      onClose();
      
      // Call the callback function if provided
      if (onInterviewCreated) {
        onInterviewCreated();
      }
    } catch (error: any) {
      // Error notification
      console.error("Error creating interview:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create interview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create New Interview"
      description="Schedule a new interview with a candidate"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Interview"}
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="candidateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="candidateEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="roleApplied"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Role</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {organizations.length > 0 ? (
                      organizations.map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No organizations available. Add one first.
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interviewer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interviewer</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an interviewer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {interviewers.length > 0 ? (
                      interviewers.map((interviewer) => (
                        <SelectItem key={interviewer.id} value={interviewer.id}>
                          {interviewer.name} {interviewer.specialization ? `(${interviewer.specialization})` : ''}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No interviewers available. Add one first.
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
                        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
                        "15:00", "15:30", "16:00", "16:30", "17:00"].map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Format</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="panel">Panel</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="useQuestionBank"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Use predefined question bank</FormLabel>
                  <FormDescription>
                    This will use questions from your organization's question bank
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
}
