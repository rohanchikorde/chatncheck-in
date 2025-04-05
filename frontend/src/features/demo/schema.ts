
import { z } from "zod";

// Service options
export const serviceOptions = [
  { value: "all_services", label: "All Services" },
  { value: "interview_platform", label: "Interview Platform" },
  { value: "recruitment", label: "Recruitment Services" },
  { value: "assessment_tools", label: "Assessment Tools" },
  { value: "candidate_tracking", label: "Candidate Tracking" },
  { value: "resume_analysis", label: "Resume Analysis" },
  { value: "reporting_analytics", label: "Reporting & Analytics" }
];

// Schema for demo request form validation
export const demoRequestSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name cannot exceed 50 characters." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name cannot exceed 50 characters." }),
  work_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .refine((email) => {
      const parts = email.split("@");
      return parts.length === 2 && !parts[1].includes("gmail.com") && !parts[1].includes("yahoo.com");
    }, { message: "Please use your work email address." }),
  phone_number: z
    .string()
    .min(0) // Make it optional
    .max(20, { message: "Phone number cannot exceed 20 characters." })
    .optional(),
  service_interest: z
    .string()
    .min(0)
    .optional(),
  message: z
    .string()
    .min(0)
    .max(500, { message: "Message cannot exceed 500 characters." })
    .optional(),
});

// Export the type derived from the schema
export type DemoRequestFormValues = z.infer<typeof demoRequestSchema>;
