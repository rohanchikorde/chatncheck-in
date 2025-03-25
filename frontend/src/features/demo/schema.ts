
import * as z from "zod";

export const serviceOptions = [
  { value: "all_services", label: "All Services" },
  { value: "structured_interviews", label: "Structured Interviews" },
  { value: "interview_assistant", label: "Interview Assistant" },
  { value: "interviewer_training", label: "Interviewer Training" },
  { value: "interview_reports", label: "Interview Reports" },
];

export const demoRequestSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  work_email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone_number: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().optional(),
  agrees_to_terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

export type DemoRequestFormValues = z.infer<typeof demoRequestSchema>;
