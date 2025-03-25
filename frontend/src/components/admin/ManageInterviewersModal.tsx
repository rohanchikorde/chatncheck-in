
import React, { useState } from "react";
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

interface Interviewer {
  id: string;
  name: string;
  expertise: string;
  availability: string;
  active: boolean;
}

interface ManageInterviewersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock interviewers data
const initialInterviewers: Interviewer[] = [
  { 
    id: "1", 
    name: "Isha Patel", 
    expertise: "Frontend Developer", 
    availability: "Mon-Fri, 9-11 AM", 
    active: true 
  },
  { 
    id: "2", 
    name: "Michael Chen", 
    expertise: "UX Designer", 
    availability: "Mon-Wed, 1-5 PM", 
    active: true 
  },
  { 
    id: "3", 
    name: "Alex Rivera", 
    expertise: "Product Manager", 
    availability: "Tue-Thu, 10 AM-3 PM", 
    active: false 
  },
];

export default function ManageInterviewersModal({
  isOpen,
  onClose,
}: ManageInterviewersModalProps) {
  const [interviewers, setInterviewers] = useState<Interviewer[]>(initialInterviewers);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newInterviewer, setNewInterviewer] = useState({
    name: "",
    expertise: "",
    availability: ""
  });
  const { toast } = useToast();

  const handleAddNew = () => {
    setIsAdding(true);
    setNewInterviewer({
      name: "",
      expertise: "",
      availability: ""
    });
  };

  const handleEdit = (interviewer: Interviewer) => {
    setIsEditing(interviewer.id);
    setNewInterviewer({
      name: interviewer.name,
      expertise: interviewer.expertise,
      availability: interviewer.availability
    });
  };

  const handleSaveNew = () => {
    if (!newInterviewer.name || !newInterviewer.expertise) {
      toast({
        title: "Required fields missing",
        description: "Name and expertise are required fields.",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate names
    const isDuplicate = interviewers.some(i => 
      i.name.toLowerCase() === newInterviewer.name.toLowerCase());

    if (isDuplicate) {
      const confirm = window.confirm(
        `Another interviewer named "${newInterviewer.name}" exists. Continue?`
      );
      if (!confirm) return;
    }

    const newId = (interviewers.length + 1).toString();
    setInterviewers([
      ...interviewers,
      {
        id: newId,
        name: newInterviewer.name,
        expertise: newInterviewer.expertise,
        availability: newInterviewer.availability || "Not specified",
        active: true
      }
    ]);

    toast({
      title: "Interviewer added",
      description: `${newInterviewer.name} has been added to the interviewer pool.`
    });

    setIsAdding(false);
    setNewInterviewer({
      name: "",
      expertise: "",
      availability: ""
    });
  };

  const handleSaveEdit = () => {
    if (!isEditing) return;
    
    if (!newInterviewer.name || !newInterviewer.expertise) {
      toast({
        title: "Required fields missing",
        description: "Name and expertise are required fields.",
        variant: "destructive"
      });
      return;
    }

    setInterviewers(interviewers.map(i => 
      i.id === isEditing 
        ? { 
            ...i, 
            name: newInterviewer.name,
            expertise: newInterviewer.expertise,
            availability: newInterviewer.availability || "Not specified"
          } 
        : i
    ));

    toast({
      title: "Interviewer updated",
      description: `${newInterviewer.name}'s information has been updated.`
    });

    setIsEditing(null);
    setNewInterviewer({
      name: "",
      expertise: "",
      availability: ""
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setIsAdding(false);
    setNewInterviewer({
      name: "",
      expertise: "",
      availability: ""
    });
  };

  const toggleStatus = (id: string) => {
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
                        <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
                          Expertise <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="expertise"
                          value={newInterviewer.expertise}
                          onChange={(e) => setNewInterviewer({...newInterviewer, expertise: e.target.value})}
                          placeholder="e.g., Frontend Developer"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                          Availability
                        </label>
                        <Input
                          id="availability"
                          value={newInterviewer.availability}
                          onChange={(e) => setNewInterviewer({...newInterviewer, availability: e.target.value})}
                          placeholder="e.g., Mon-Fri, 9-11 AM"
                          className="mt-1"
                        />
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
                        <label htmlFor="edit-expertise" className="block text-sm font-medium text-gray-700">
                          Expertise <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="edit-expertise"
                          value={newInterviewer.expertise}
                          onChange={(e) => setNewInterviewer({...newInterviewer, expertise: e.target.value})}
                          placeholder="e.g., Frontend Developer"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-availability" className="block text-sm font-medium text-gray-700">
                          Availability
                        </label>
                        <Input
                          id="edit-availability"
                          value={newInterviewer.availability}
                          onChange={(e) => setNewInterviewer({...newInterviewer, availability: e.target.value})}
                          placeholder="e.g., Mon-Fri, 9-11 AM"
                          className="mt-1"
                        />
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

            {!isAdding && !isEditing && interviewers.length > 0 && (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Expertise</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interviewers.map((interviewer) => (
                      <TableRow key={interviewer.id}>
                        <TableCell className="font-medium">{interviewer.name}</TableCell>
                        <TableCell>{interviewer.expertise}</TableCell>
                        <TableCell>{interviewer.availability}</TableCell>
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
                              onClick={() => toggleStatus(interviewer.id)}
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
          </>
        )}
      </div>
    </Modal>
  );
}
