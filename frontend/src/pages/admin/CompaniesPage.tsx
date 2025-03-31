
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock company data
const mockCompanies = [
  {
    id: '1',
    name: 'HireSync Solutions',
    industry: 'Tech Recruitment',
    size: 'Mid-sized (200 employees)',
    status: 'active',
    createdAt: '2023-05-10T09:00:00Z',
    contactPerson: 'Jane Smith',
    email: 'jane.smith@hiresync.com',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    name: 'TalentWave',
    industry: 'HR Technology',
    size: 'Enterprise (1200+ employees)',
    status: 'active',
    createdAt: '2022-11-15T14:30:00Z',
    contactPerson: 'Michael Chen',
    email: 'michael.chen@talentwave.com',
    phone: '+1 (555) 987-6543',
  },
  {
    id: '3',
    name: 'RecruitPro Solutions',
    industry: 'Recruitment',
    size: 'Small (45 employees)',
    status: 'inactive',
    createdAt: '2023-02-22T11:15:00Z',
    contactPerson: 'Alex Johnson',
    email: 'alex.j@recruitpro.com',
    phone: '+1 (555) 234-5678',
  },
  {
    id: '4',
    name: 'EduHire Academy',
    industry: 'Education',
    size: 'Mid-sized (350 employees)',
    status: 'active',
    createdAt: '2023-06-05T16:45:00Z',
    contactPerson: 'Sarah Wilson',
    email: 's.wilson@eduhire.edu',
    phone: '+1 (555) 876-5432',
  },
  {
    id: '5',
    name: 'TechTalent Inc.',
    industry: 'Technology',
    size: 'Enterprise (950 employees)',
    status: 'active',
    createdAt: '2022-09-30T10:20:00Z',
    contactPerson: 'Robert Lee',
    email: 'robert.lee@techtalent.com',
    phone: '+1 (555) 321-7890',
  },
];

// Company form component
const CompanyForm = ({ 
  company = null, 
  onSubmit 
}: { 
  company?: any; 
  onSubmit: (data: any) => void 
}) => {
  const [formData, setFormData] = useState({
    name: company?.name || '',
    industry: company?.industry || '',
    size: company?.size || '',
    contactPerson: company?.contactPerson || '',
    email: company?.email || '',
    phone: company?.phone || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="size">Company Size</Label>
          <Input
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{company ? 'Update Company' : 'Add Company'}</Button>
      </DialogFooter>
    </form>
  );
};

const CompaniesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState(mockCompanies);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCompany = (data: any) => {
    const newCompany = {
      id: Date.now().toString(),
      ...data,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setCompanies([...companies, newCompany]);
    setIsAddDialogOpen(false);
    toast({
      title: 'Company Added',
      description: `${data.name} has been added successfully.`,
    });
  };

  const handleEditCompany = (data: any) => {
    const updatedCompanies = companies.map(company => 
      company.id === selectedCompany.id ? { ...company, ...data } : company
    );
    setCompanies(updatedCompanies);
    setIsEditDialogOpen(false);
    toast({
      title: 'Company Updated',
      description: `${data.name} has been updated successfully.`,
    });
  };

  const handleDeleteCompany = () => {
    const updatedCompanies = companies.filter(company => company.id !== selectedCompany.id);
    setCompanies(updatedCompanies);
    setIsDeleteDialogOpen(false);
    toast({
      title: 'Company Deleted',
      description: `${selectedCompany.name} has been deleted.`,
      variant: 'destructive',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Companies"
        description="Manage the companies using the interview platform"
      >
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Enter the details of the new company to add it to the platform.
              </DialogDescription>
            </DialogHeader>
            <CompanyForm onSubmit={handleAddCompany} />
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{company.size}</TableCell>
                  <TableCell>
                    <Badge variant={company.status === 'active' ? 'success' : 'destructive'}>
                      {company.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(company.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedCompany(company);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedCompany(company);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          // Open company dashboard
                          window.location.href = `/admin/companies/${company.id}`;
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View Dashboard</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Company Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Update the company details.
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <CompanyForm company={selectedCompany} onSubmit={handleEditCompany} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Company Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this company? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCompany}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompaniesPage;
