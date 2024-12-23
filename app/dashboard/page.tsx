'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Settings, Lightbulb } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { ProfileCard } from "@/components/ProfileCard";
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SearchAndFilterBar, FilterOptions } from "@/components/SearchAndFilterBar";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    industry: 'all',
    collaboration: 'all',
    phase: 'all',
  });
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<string | null>(null);
  const [motivation, setMotivation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [startupOpportunities, setStartupOpportunities] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    const email = localStorage.getItem('email') || '';
    setUserName(`${firstName} ${lastName}`.trim());
    setUserEmail(email);

    // Check if profile is complete (this is a placeholder, replace with actual logic)
    const profileComplete = localStorage.getItem('profileComplete') === 'true';
    setIsProfileComplete(profileComplete);

    if (!profileComplete) {
      toast({
        title: "Complete Your Profile",
        description: "Please complete your profile to get the most out of StartupMatch.",
        duration: 5000,
      });
    }
  }, []);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch('/api/startups');
        if (response.ok) {
          const data = await response.json();
          setStartupOpportunities(data);
        } else {
          console.error('Failed to fetch startups');
        }
      } catch (error) {
        console.error('Error fetching startups:', error);
      }
    };

    fetchStartups();
  }, []);

  const filteredOpportunities = startupOpportunities.filter(opportunity =>
    opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filters.industry === 'all' || opportunity.industry === filters.industry) &&
    (filters.collaboration === 'all' || opportunity.collaboration === filters.collaboration) &&
    (filters.phase === 'all' || opportunity.phase === filters.phase)
  );

  const handleApproach = (startupName: string) => {
    setSelectedStartup(startupName);
    setIsDialogOpen(true);
  };

  const handleSubmitApproach = () => {
    console.log({
      startup: selectedStartup,
      motivation,
      additionalInfo
    });
    setIsDialogOpen(false);
    setMotivation('');
    setAdditionalInfo('');
    setSelectedStartup(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href="/validate-idea" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Validate Idea
              </Button>
            </Link>
            <ProfileCard 
              name={userName} 
              email={userEmail} 
              isProfileComplete={isProfileComplete}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <SearchAndFilterBar
            onSearch={setSearchQuery}
            onFilterChange={setFilters}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredOpportunities.map((opportunity, index) => (
            <Card key={index} className="rounded-lg border border-gray-300 bg-white shadow-md transition hover:shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-t-lg">
                    <span className="text-sm text-gray-700">
                      <strong>Startup Website:</strong>{' '}
                      <a href={`https://${opportunity.website}`} className="text-blue-600 underline">
                        {opportunity.website}
                      </a>
                    </span>
                  </div>
                  <div className="text-gray-700">
                    <h3 className="text-lg font-semibold">
                      <strong>Startup Name:</strong> {opportunity.name}
                    </h3>
                    <h4 className="mt-2 font-medium">What we are solving:</h4>
                    <textarea
                      readOnly
                      value={opportunity.description}
                      className="mt-1 w-full resize-none rounded-md border p-2 text-sm text-gray-600"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <strong>Industry:</strong> {opportunity.industry}
                    </div>
                    <div>
                      <strong>Founder:</strong> {opportunity.founder}
                    </div>
                    <div>
                      <strong>Collaboration:</strong> {opportunity.collaboration}
                    </div>
                    <div>
                      <strong>Phase:</strong> {opportunity.phase}
                    </div>
                    <div className="col-span-2">
                      <strong>We need help in:</strong> {opportunity.helpNeeded}
                    </div>
                  </div>
                  <div className="text-right">
                    <Button 
                      className="bg-indigo-600 text-white hover:bg-indigo-700"
                      onClick={() => handleApproach(opportunity.name)}
                    >
                      Approach
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Approach {selectedStartup}</DialogTitle>
            <DialogDescription>
              Please provide some information about why you want to join this startup and how you can contribute.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="motivation">Why do you want to be part of this startup and how will you help?</label>
              <Textarea
                id="motivation"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Share your motivation and skills..."
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="additional-info">Anything else you'd like to add?</label>
              <Textarea
                id="additional-info"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Any additional information..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmitApproach}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
