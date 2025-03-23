
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestDemoModal: React.FC<RequestDemoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Request Submitted",
        description: "Thank you! We'll get back to you soon.",
        variant: "success",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          phoneNumber: "",
          message: "",
        });
        setIsSubmitted(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <Modal
      title="Request a Demo"
      description="Tell us a little about yourself so we can get started"
      isOpen={isOpen}
      onClose={onClose}
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your work email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your company name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Your phone number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements"
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="py-12 flex flex-col items-center justify-center">
          <div className="bg-green-100 rounded-full p-3 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-center">Thank you!</h3>
          <p className="text-center text-muted-foreground mt-2">
            We've received your request and will get back to you soon.
          </p>
          <Button onClick={onClose} className="mt-6">
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default RequestDemoModal;
