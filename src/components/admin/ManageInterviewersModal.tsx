import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Switch } from "@radix-ui/react-switch";
import { X, Plus, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Interviewer {
  id: string;
  name: string;
  email: string;
  specialization: string;
  organization_id?: string;
  active: boolean;
}

interface Organization {
  id: string;
  name: string;
}

interface ManageInterviewersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManageInterviewersModal({
  isOpen,
  onClose,
}: ManageInterviewersModalProps) {
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newInterviewer, setNewInterviewer] = useState({
    name: "",
    email: "",
    specialization: "",
    organization_id: ""
  });
  const { toast } = useToast();

  // Fetch data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchInterviewers();
      fetchOrganizations();
    }
  }, [isOpen]);

  const fetchInterviewers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('interviewers')
        .select('*');
      
      if (error) throw error;
      
      // Transform to add active field (all are active by default)
      const transformedData = data?.map(interviewer => ({
        ...interviewer,
        active: true
      })) || [];
      
      setInterviewers(transformedData);
    } catch (error: any) {
      console.error("Error fetching interviewers:", error);
      toast({
        title: "Error",
        description: "Failed to load interviewers",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
      console.error("Error fetching organizations:", error);
      toast({
        title: "Error",
        description: "Failed to load organizations",
        variant: "destructive"
      });
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setNewInterviewer({
      name: "",
      email: "",
      specialization: "",
      organization_id: ""
    });
  };

  const handleEdit = (interviewer: Interviewer) => {
    setIsEditing(interviewer.id);
    setNewInterviewer({
      name: interviewer.name,
      email: interviewer.email,
      specialization: interviewer.specialization || "",
      organization_id: interviewer.organization_id || ""
    });
  };

  const handleSaveNew = async () => {
    if (!newInterviewer.name || !newInterviewer.email) {
      toast({
        title: "Required fields missing",
        description: "Name and email are required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check for duplicate email
      const { data: existingWithEmail } = await supabase
        .from('interviewers')
        .select('id')
        .eq('email', newInterviewer.email);
      
      if (existingWithEmail && existingWithEmail.length > 0) {
        const confirm = window.confirm(
          `An interviewer with email "${newInterviewer.email}" already exists. Continue?`
        );
        if (!confirm) return;
      }

      // Create new interviewer
      const { data, error } = await supabase
        .from('interviewers')
        .insert({
          name: newInterviewer.name,
          email: newInterviewer.email,
          specialization: newInterviewer.specialization || null,
          organization_id: newInterviewer.organization_id || null
        })
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Interviewer added",
        description: `${newInterviewer.name} has been added to the interviewer pool.`
      });
      
      // Refresh interviewers list
      fetchInterviewers();
      
      setIsAdding(false);
      setNewInterviewer({
        name: "",
        email: "",
        specialization: "",
        organization_id: ""
      });
    } catch (error: any) {
      console.error("Error adding interviewer:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add interviewer",
        variant: "destructive"
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!isEditing) return;
    
    if (!newInterviewer.name || !newInterviewer.email) {
      toast({
        title: "Required fields missing",
        description: "Name and email are required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check for duplicate email (excluding current interviewer)
      const { data: existingWithEmail } = await supabase
        .from('interviewers')
        .select('id')
        .eq('email', newInterviewer.email)
        .neq('id', isEditing);
      
      if (existingWithEmail && existingWithEmail.length > 0) {
        const confirm = window.confirm(
          `Another interviewer with email "${newInterviewer.email}" already exists. Continue?`
        );
        if (!confirm) return;
      }

      // Update interviewer
      const { error } = await supabase
        .from('interviewers')
        .update({
          name: newInterviewer.name,
          email: newInterviewer.email,
          specialization: newInterviewer.specialization || null,
          organization_id: newInterviewer.organization_id || null
        })
        .eq('id', isEditing);
      
      if (error) throw error;
      
      toast({
        title: "Interviewer updated",
        description: `${newInterviewer.name}'s information has been updated.`
      });
      
      // Refresh interviewers list
      fetchInterviewers();
      
      setIsEditing(null);
      setNewInterviewer({
        name: "",
        email: "",
        specialization: "",
        organization_id: ""
      });
    } catch (error: any) {
      console.error("Error updating interviewer:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update interviewer",
        variant: "destructive"
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setIsAdding(false);
    setNewInterviewer({
      name: "",
      email: "",
      specialization: "",
      organization_id: ""
    });
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    // In a real app with authentication, you might deactivate the user account
    // For this demo, we're just toggling the status locally
    setInterviewers(interviewers.map(i => 
      i.id === id ? { ...i, active: !i.active } : i
    ));

    const interviewer = interviewers.find(i => i.id === id);
    if (interviewer) {
      toast({
        title: interviewer.active ? "Interviewer deactivated" : "Interviewer activated",
        description: `${interviewer.name} is now ${interviewer.active ? "inactive" : "active"}.`
      });
    }
  };

  return (
    <Modal
      title="Manage Interviewers"
      description="Add, edit, or deactivate interviewers"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        {interviewers.length === 0 && !isAdding ? (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center text-center p-6">
                <p className="text-muted-foreground mb-4">
                  No interviewers available. Add one to start scheduling.
                </p>
                <Button onClick={handleAddNew}>
                  <Plus className="mr-2 h-4 w-4" /> Add Interviewer
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Interviewer Pool</h3>
              {!isAdding && !isEditing && (
                <Button onClick={handleAddNew} size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
              )}
            </div>

            {isAdding && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add New Interviewer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          value={newInterviewer.name}
                          onChange={(e) => setNewInterviewer({...newInterviewer, name: e.target.value})}
                          placeholder="Full Name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={newInterviewer.email}
                          onChange={(e) => setNewInterviewer({...newInterviewer, email: e.target.value})}
                          placeholder="email@example.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
                          Expertise
                        </label>
                        <Input
                          id="expertise"
                          value={newInterviewer.specialization}
                          onChange={(e) => setNewInterviewer({...newInterviewer, specialization: e.target.value})}
                          placeholder="e.g., Frontend Developer"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                          Organization
                        </label>
                        <Select 
                          value={newInterviewer.organization_id} 
                          onValueChange={(value) => setNewInterviewer({...newInterviewer, organization_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {organizations.map(org => (
                              <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveNew}>
                        Save Interviewer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Edit Interviewer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="edit-name"
                          value={newInterviewer.name}
                          onChange={(e) => setNewInterviewer({...newInterviewer, name: e.target.value})}
                          placeholder="Full Name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={newInterviewer.email}
                          onChange={(e) => setNewInterviewer({...newInterviewer, email: e.target.value})}
                          placeholder="email@example.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-expertise" className="block text-sm font-medium text-gray-700">
                          Expertise
                        </label>
                        <Input
                          id="edit-expertise"
                          value={newInterviewer.specialization}
                          onChange={(e) => setNewInterviewer({...newInterviewer, specialization: e.target.value})}
                          placeholder="e.g., Frontend Developer"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-organization" className="block text-sm font-medium text-gray-700">
                          Organization
                        </label>
                        <Select 
                          value={newInterviewer.organization_id || ""} 
                          onValueChange={(value) => setNewInterviewer({...newInterviewer, organization_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {organizations.map(org => (
                              <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveEdit}>
                        Update Interviewer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isAdding && !isEditing && (
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Interviewer Pool</h3>
                <Button onClick={handleAddNew} size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
              </div>
            )}

            {!isAdding && !isEditing && interviewers.length > 0 && (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Expertise</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interviewers.map((interviewer) => (
                      <TableRow key={interviewer.id}>
                        <TableCell className="font-medium">{interviewer.name}</TableCell>
                        <TableCell>{interviewer.email}</TableCell>
                        <TableCell>{interviewer.specialization || "Not specified"}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className={`mr-2 h-2 w-2 rounded-full ${interviewer.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span>{interviewer.active ? 'Active' : 'Inactive'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEdit(interviewer)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant={interviewer.active ? "outline" : "default"}
                              size="sm"
                              onClick={() => toggleStatus(interviewer.id, interviewer.active)}
                            >
                              {interviewer.active ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {loading && (
              <div className="text-center p-4">
                <p className="text-muted-foreground">Loading interviewers...</p>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
