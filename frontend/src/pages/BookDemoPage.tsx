import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { demoRequestSchema, type DemoRequestFormValues, serviceOptions } from '@/features/demo/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function BookDemoPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<DemoRequestFormValues>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      work_email: '',
      phone_number: '',
      service_interest: 'all_services',
      message: '',
      agrees_to_terms: false,
    },
  });

  const onSubmit = async (values: DemoRequestFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Log the form values being submitted
      console.log('Form values being submitted:', values);
      
      // Send request to the Flask backend through the proxy
      const response = await fetch('http://localhost:5000/api/v1/demo-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          work_email: values.work_email,
          phone_number: values.phone_number || null,
          service_interest: values.service_interest || null,
          message: values.message || null,
          agrees_to_terms: values.agrees_to_terms
        }),
      });

      // Log the response status
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit demo request');
      }

      toast({
        title: "Success!",
        description: "Your demo request has been submitted.",
      });
      
      navigate('/demo-scheduled');
    } catch (error) {
      console.error('Error submitting demo request:', error);
      let errorMessage = "There was a problem submitting your request. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('terms and conditions')) {
          errorMessage = "You must agree to our terms and conditions";
        } else if (error.message.includes('required fields')) {
          errorMessage = "Please fill in all required fields";
        } else if (error.message.includes('email format')) {
          errorMessage = "Please enter a valid email address";
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <header className="border-b border-border/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">IP</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">InterviewPulse</span>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
          >
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="pr-0 lg:pr-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-indigo-900">
            Experience the power of Interview Intelligence
          </h1>
          
          <p className="text-lg mb-8 text-gray-700">
            Our Free Demo illustrates how InterviewPulse platform provides:
          </p>
          
          <ul className="space-y-4 mb-12">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              <span className="text-gray-700">Structured Interviewing</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              <span className="text-gray-700">Interview Assistant</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              <span className="text-gray-700">Interviewer training via quality reports</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              <span className="text-gray-700">Bias free (and lightning-fast!) feedback</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              <span className="text-gray-700">Interview reports</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              <span className="text-gray-700">Fast and collaborative decision making</span>
            </li>
          </ul>
          
          <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-green-500">75 min</p>
              <p className="text-sm text-gray-600">Saved per screen</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-500">$4k</p>
              <p className="text-sm text-gray-600">Appx. saving per hire</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-500">17%</p>
              <p className="text-sm text-gray-600">Faster offer rollouts</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Tell us a little about yourself so we can get started
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="work_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Work Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service_interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Looking for Services</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select services you're interested in" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your specific requirements"
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agrees_to_terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-gray-600 font-normal">
                        By submitting your information, you agree to InterviewPulse's Terms and Privacy Policy. You can opt-out anytime.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4 bg-gray-50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          2023 InterviewPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
