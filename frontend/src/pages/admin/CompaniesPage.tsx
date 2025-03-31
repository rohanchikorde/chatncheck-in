
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Search, Plus, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

// Mock data for companies
const COMPANIES_DATA = [
  {
    id: '1',
    name: 'HireSync Solutions',
    industry: 'Tech Recruitment',
    size: 'Mid-sized (200 employees)',
    interviews: 28,
    activeDemos: 3,
    createdAt: '2023-05-10T09:00:00Z'
  },
  {
    id: '2',
    name: 'CodeCraft Systems',
    industry: 'Software Development',
    size: 'Large (750 employees)',
    interviews: 42,
    activeDemos: 1,
    createdAt: '2023-01-15T09:00:00Z'
  },
  {
    id: '3',
    name: 'TalentWave',
    industry: 'HR Technology',
    size: 'Small (45 employees)',
    interviews: 15,
    activeDemos: 2,
    createdAt: '2023-07-22T09:00:00Z'
  },
  {
    id: '4',
    name: 'Recruiter Plus',
    industry: 'Staffing & Recruitment',
    size: 'Medium (150 employees)',
    interviews: 32,
    activeDemos: 0,
    createdAt: '2022-11-03T09:00:00Z'
  }
];

const CompaniesPage = () => {
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      // We would normally fetch from the API, but using mock data for now
      console.log('Fetching companies data');
      return COMPANIES_DATA;
    }
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Companies" 
        description="Manage and view all companies using the platform"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        }
      />

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          Filter
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          Loading companies...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies?.map((company) => (
            <Card key={company.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{company.name}</CardTitle>
                  <Building className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription className="flex flex-col gap-1 mt-1">
                  <span>{company.industry}</span>
                  <span>{company.size}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Interviews</span>
                    <span className="text-2xl font-bold">{company.interviews}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Active Demos</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{company.activeDemos}</span>
                      {company.activeDemos > 0 && (
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 mt-auto">
                <Button asChild className="w-full" variant="outline">
                  <Link to={`/admin/companies/${company.id}`}>
                    View Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
