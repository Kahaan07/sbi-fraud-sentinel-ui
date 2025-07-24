import { useState } from "react";
import { Search, Users, ExternalLink, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SocialTracker = () => {
  const [searchForm, setSearchForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: ""
  });
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Mock social media data
  const mockResults = [
    {
      platform: "Facebook",
      profile: "https://facebook.com/rajesh.kumar.123",
      name: "Rajesh Kumar",
      verified: true,
      lastActive: "2 days ago",
      mutualConnections: 12,
      riskScore: "Medium"
    },
    {
      platform: "LinkedIn",
      profile: "https://linkedin.com/in/rajesh-kumar-sbi",
      name: "Rajesh Kumar",
      verified: false,
      lastActive: "1 week ago",
      mutualConnections: 5,
      riskScore: "Low"
    },
    {
      platform: "Twitter",
      profile: "https://twitter.com/rajesh_k_2024",
      name: "Rajesh K",
      verified: false,
      lastActive: "3 hours ago",
      mutualConnections: 0,
      riskScore: "High"
    }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchForm.name && !searchForm.phone && !searchForm.email) {
      toast({
        title: "Search Error",
        description: "Please provide at least one search parameter.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSearching(false);
    
    toast({
      title: "Search Completed",
      description: `Found ${mockResults.length} social media profiles.`,
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-yellow-500 text-white";
      case "Low": return "bg-green-500 text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-roboto font-bold text-foreground">Social Tracker</h1>
        <p className="text-muted-foreground font-open-sans">Search and monitor social media presence of users</p>
      </div>

      {/* Search Form */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-roboto flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>User Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="searchName" className="font-open-sans">Full Name</Label>
                <Input
                  id="searchName"
                  value={searchForm.name}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  className="font-open-sans"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="searchPhone" className="font-open-sans">Phone Number</Label>
                <Input
                  id="searchPhone"
                  value={searchForm.phone}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91-XXXXXXXXXX"
                  className="font-open-sans"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="searchEmail" className="font-open-sans">Email Address</Label>
                <Input
                  id="searchEmail"
                  type="email"
                  value={searchForm.email}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="user@example.com"
                  className="font-open-sans"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="searchLocation" className="font-open-sans">Location</Label>
                <Input
                  id="searchLocation"
                  value={searchForm.location}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State"
                  className="font-open-sans"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSearching}
                className="font-open-sans"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search Social Media
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Warning Notice */}
      <Card className="shadow-soft border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="space-y-1">
              <p className="font-open-sans font-medium text-yellow-800">
                Important Privacy Notice
              </p>
              <p className="text-sm text-yellow-700 font-open-sans">
                This feature is designed for legitimate fraud investigation purposes only. 
                All searches must comply with privacy regulations and SBI's data protection policies.
                Ensure proper authorization before conducting social media searches.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {mockResults.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-roboto flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Search Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-open-sans font-medium text-lg">{result.platform}</h3>
                        {result.verified && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            Verified
                          </Badge>
                        )}
                        <Badge className={getRiskColor(result.riskScore)}>
                          {result.riskScore} Risk
                        </Badge>
                      </div>
                      
                      <p className="font-open-sans font-medium">{result.name}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Last active: {result.lastActive}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{result.mutualConnections} mutual connections</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-primary font-mono">
                        {result.profile}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="font-open-sans">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" className="font-open-sans">
                        Monitor
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Placeholder Content */}
      {mockResults.length === 0 && !isSearching && (
        <Card className="shadow-soft">
          <CardContent className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-roboto font-medium mb-2">No Search Results</h3>
            <p className="text-muted-foreground font-open-sans mb-4">
              Enter user details above to search for social media profiles
            </p>
            <p className="text-sm text-muted-foreground font-open-sans">
              This feature will be integrated with social media APIs for comprehensive monitoring
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SocialTracker;