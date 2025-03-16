
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
import { createInterview, getInterviewers, getInterviewees, Interviewer, Interviewee } from "@/services/supabaseService";

interface CreateInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInterviewCreated?: () => void;
}

const formSchema = z.object({
  intervieweeId: z.string({
    required_error: "Please select a candidate.",
  }),
  interviewerId: z.string({
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
  organizationId: z.string().default("00000000-0000-0000-0000-000000000000"), // Default organization for demo
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateInterviewModal({
  isOpen,
  onClose,
  onInterviewCreated,
}: CreateInterviewModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const [interviewees, setInterviewees] = useState<Interviewee[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch interviewers and interviewees when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [interviewersData, intervieweesData] = await Promise.all([
            getInterviewers(),
            getInterviewees()
          ]);
          
          setInterviewers(interviewersData || []);
          setInterviewees(intervieweesData || []);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast({
            title: "Error",
            description: "Failed to load interviewers and candidates",
            variant: "destructive",
          });
        }
      };

      fetchData();
    }
  }, [isOpen, toast]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationId: "00000000-0000-0000-0000-000000000000", // Default organization for demo
      notes: "",
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
      
      // Map form data to API format
      const interviewData = {
        interviewer_id: data.interviewerId,
        interviewee_id: data.intervieweeId,
        organization_id: data.organizationId,
        scheduled_at: dateTimeString,
        status: "Scheduled",
        notes: data.notes,
        feedback_submitted: "No"
      };
      
      console.log("Creating interview with data:", interviewData);
      
      // Create interview in Supabase
      const newInterview = await createInterview(interviewData);
      console.log("Interview created successfully:", newInterview);
      
      // Success notification
      toast({
        title: "Interview Scheduled",
        description: "The interview has been created successfully.",
      });
      
      // Reset form and close modal
      form.reset();
      onClose();
      
      // Call the callback function if provided
      if (onInterviewCreated) {
        onInterviewCreated();
      }
      
      // Navigate to interviews page to see the new interview
      navigate("/admin/interviews");
    } catch (error) {
      // Error notification
      console.error("Error creating interview:", error);
      toast({
        title: "Error",
        description: "Failed to create interview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      // Handle file upload logic here
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
          <FormField
            control={form.control}
            name="intervieweeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Candidate</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a candidate" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {interviewees.length > 0 ? (
                      interviewees.map((interviewee) => (
                        <SelectItem key={interviewee.id} value={interviewee.id || ""}>
                          {interviewee.name} - {interviewee.role_applied || "Candidate"}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No candidates available. Add one first.
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
            name="interviewerId"
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
                        <SelectItem key={interviewer.id} value={interviewer.id || ""}>
                          {interviewer.name} ({interviewer.specialization || "Interviewer"})
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
                        className="p-3"
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
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Additional notes or instructions" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Resume (Optional)</FormLabel>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 10MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
