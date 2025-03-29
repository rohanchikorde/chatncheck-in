
import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Modal } from '@/components/ui/modal';
import CompanyForm from '@/components/admin/CompanyForm';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { Card } from '@/components/ui/card';
import PageHeader from '@/components/shared/PageHeader';
import { useToast } from '@/hooks/use-toast';

// Mock data for companies
const initialCompanies = [
  { 
    id: '1', 
    name: 'TechCorp', 
    industry: 'Technology', 
    contactEmail: 'contact@techcorp.com', 
    website: 'https://techcorp.com', 
    isActive: true, 
    createdAt: new Date('2023-01-10').toISOString() 
  },
  { 
    id: '2', 
    name: 'HealthPlus', 
    industry: 'Healthcare', 
    contactEmail: 'info@healthplus.org', 
    website: 'https://healthplus.org', 
    isActive: true, 
    createdAt: new Date('2023-02-15').toISOString() 
  },
  { 
    id: '3', 
    name: 'EduLearn', 
    industry: 'Education', 
    contactEmail: 'admin@edulearn.co', 
    website: 'https://edulearn.co', 
    isActive: false, 
    createdAt: new Date('2023-03-20').toISOString() 
  },
  { 
    id: '4', 
    name: 'FinSolutions', 
    industry: 'Finance', 
    contactEmail: 'support@finsolutions.net', 
    website: 'https://finsolutions.net', 
    isActive: true, 
    createdAt: new Date('2023-04-05').toISOString() 
  },
  { 
    id: '5', 
    name: 'EcoEnergy', 
    industry: 'Energy', 
    contactEmail: 'hello@ecoenergy.io', 
    website: 'https://ecoenergy.io', 
    isActive: false, 
    createdAt: new Date('2023-05-12').toISOString() 
  }
];

const CompaniesPage = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const { toast } = useToast();

  // Filter companies based on search query and status filter
  useEffect(() => {
    let filtered = companies;
    
    if (searchQuery) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(company => company.isActive === isActive);
    }
    
    setFilteredCompanies(filtered);
  }, [companies, searchQuery, statusFilter]);

  const handleAddCompany = (companyData) => {
    const newCompany = {
      ...companyData,
      id: (companies.length + 1).toString(),
      createdAt: new Date().toISOString()
    };
    
    setCompanies([...companies, newCompany]);
    setIsAddModalOpen(false);
    toast({
      title: "Company added",
      description: `${companyData.name} has been successfully added.`,
      variant: "success"
    });
  };

  const handleEditCompany = (companyData) => {
    const updatedCompanies = companies.map(company => 
      company.id === companyData.id ? { ...company, ...companyData } : company
    );
    
    setCompanies(updatedCompanies);
    setIsEditModalOpen(false);
    toast({
      title: "Company updated",
      description: `${companyData.name} has been successfully updated.`,
      variant: "success"
    });
  };

  const handleDeleteCompany = () => {
    if (currentCompany) {
      const updatedCompanies = companies.filter(company => company.id !== currentCompany.id);
      setCompanies(updatedCompanies);
      setIsDeleteModalOpen(false);
      toast({
        title: "Company deleted",
        description: `${currentCompany.name} has been successfully deleted.`,
        variant: "success"
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Company Management" 
        description="Add, edit or remove companies from the platform" 
      />
      
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="w-full md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company, index) => (
                  <TableRow key={company.id} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.contactEmail}</TableCell>
                    <TableCell>{formatDate(company.createdAt)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        company.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {company.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setCurrentCompany(company);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Company</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setCurrentCompany(company);
                                  setIsDeleteModalOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Company</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No companies found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Add Company Modal */}
      <Modal
        title="Add New Company"
        description="Enter details to create a new company"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <CompanyForm 
          onSubmit={handleAddCompany}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
      
      {/* Edit Company Modal */}
      <Modal
        title="Edit Company"
        description="Update company details"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        {currentCompany && (
          <CompanyForm 
            company={currentCompany}
            onSubmit={handleEditCompany}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCompany}
        title="Delete Company"
        description={`Are you sure you want to delete ${currentCompany?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default CompaniesPage;
