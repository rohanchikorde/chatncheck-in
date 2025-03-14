
import React, { useState } from 'react';
import { Plus, Search, Filter, X, Edit, Trash2, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Isha Patel",
    email: "isha.patel@example.com",
    role: "interviewer",
    department: "Engineering",
    status: "active",
    interviews_conducted: 12,
    avatar: ""
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "interviewer",
    department: "Design",
    status: "active",
    interviews_conducted: 8,
    avatar: ""
  },
  {
    id: "3",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "admin",
    department: "HR",
    status: "active",
    interviews_conducted: 15,
    avatar: ""
  },
  {
    id: "4",
    name: "Jordan Smith",
    email: "jordan.smith@example.com",
    role: "interviewer",
    department: "Engineering",
    status: "inactive",
    interviews_conducted: 3,
    avatar: ""
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    role: "interviewer",
    department: "Product",
    status: "active",
    interviews_conducted: 7,
    avatar: ""
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const { toast } = useToast();

  // Filter users based on search and filter criteria
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "" || user.role === roleFilter;
    const matchesDepartment = departmentFilter === "" || user.department === departmentFilter;
    const matchesStatus = statusFilter === "" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  // Function to delete a user
  const handleDeleteUser = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
      toast({
        title: "User Deleted",
        description: "The user has been successfully removed from the system.",
      });
    }
  };

  // Function to add a new user
  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newUser = {
      id: (users.length + 1).toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      department: formData.get('department') as string,
      status: "active",
      interviews_conducted: 0,
      avatar: ""
    };
    
    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`,
    });
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setRoleFilter("");
    setDepartmentFilter("");
    setStatusFilter("");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Users Management" 
        description="Manage interviewers, admins, and user accounts"
      >
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="grid w-full sm:w-auto gap-1.5 relative">
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px] pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="grid w-full sm:w-auto gap-1.5">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="interviewer">Interviewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid w-full sm:w-auto gap-1.5">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid w-full sm:w-auto gap-1.5">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {(searchQuery || roleFilter || departmentFilter || statusFilter) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-10">
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No users found matching your filters.</p>
            {(searchQuery || roleFilter || departmentFilter || statusFilter) && (
              <Button variant="link" onClick={clearFilters}>
                Clear filters to see all users
              </Button>
            )}
          </div>
        ) : (
          filteredUsers.map(user => (
            <Card key={user.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{user.name}</CardTitle>
                      <CardDescription className="text-xs">{user.email}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={user.status === "active" ? "success" : "secondary"}>
                    {user.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-medium capitalize">{user.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium">{user.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interviews:</span>
                    <span className="font-medium">{user.interviews_conducted}</span>
                  </div>
                  <div className="flex gap-2 mt-4 justify-end">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system. All users can be assigned to interviews.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Jane Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="jane.doe@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue="interviewer">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="interviewer">Interviewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select name="department" defaultValue="Engineering">
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
