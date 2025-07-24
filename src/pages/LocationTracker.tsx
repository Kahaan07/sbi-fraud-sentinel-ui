import { useState } from "react";
import { Send, MapPin, Clock, User, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,  
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const LocationTracker = () => {
  const [sendingStates, setSendingStates] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  // Mock data for users
  const userData = [
    { 
      id: 1, 
      name: "Rajesh Kumar", 
      phone: "+91-9876543210", 
      account: "XXXX-1234",
      riskLevel: "High",
      lastSeen: "2 hours ago",
      locationStatus: "Pending"
    },
    { 
      id: 2, 
      name: "Priya Sharma", 
      phone: "+91-9876543211", 
      account: "XXXX-5678",
      riskLevel: "Medium",
      lastSeen: "1 day ago",
      locationStatus: "Received"
    },
    { 
      id: 3, 
      name: "Amit Patel", 
      phone: "+91-9876543212", 
      account: "XXXX-9012",
      riskLevel: "High",
      lastSeen: "30 minutes ago",
      locationStatus: "Not Sent"
    },
    { 
      id: 4, 
      name: "Sunita Singh", 
      phone: "+91-9876543213", 
      account: "XXXX-3456",
      riskLevel: "Low",
      lastSeen: "3 hours ago",
      locationStatus: "Received"
    },
  ];

  // Mock location data received from SMS clicks
  const locationData = [
    {
      id: 1,
      name: "Priya Sharma",
      phone: "+91-9876543211",
      latitude: 28.6139,
      longitude: 77.2090,
      location: "New Delhi, India",
      timestamp: "2024-01-24 14:30:25",
      accuracy: "High"
    },
    {
      id: 2,
      name: "Sunita Singh", 
      phone: "+91-9876543213",
      latitude: 19.0760,
      longitude: 72.8777,
      location: "Mumbai, India",
      timestamp: "2024-01-24 12:15:10",
      accuracy: "Medium"
    }
  ];

  const handleSendSMS = async (userId: number, phone: string, name: string) => {
    setSendingStates(prev => ({ ...prev, [userId]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSendingStates(prev => ({ ...prev, [userId]: false }));
    
    toast({
      title: "SMS Sent Successfully",
      description: `Location tracker link sent to ${name} at ${phone}`,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Received": return "bg-green-500 text-white";
      case "Pending": return "bg-yellow-500 text-white";
      case "Not Sent": return "bg-muted";
      default: return "bg-muted";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-roboto font-bold text-foreground">Location Tracker</h1>
        <p className="text-muted-foreground font-open-sans">Send SMS with location tracking links to users</p>
      </div>

      {/* Users List */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-roboto flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>User List</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-roboto">Name</TableHead>
                  <TableHead className="font-roboto">Phone Number</TableHead>
                  <TableHead className="font-roboto">Account</TableHead>
                  <TableHead className="font-roboto">Risk Level</TableHead>
                  <TableHead className="font-roboto">Last Seen</TableHead>
                  <TableHead className="font-roboto">Status</TableHead>
                  <TableHead className="font-roboto">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-open-sans font-medium">{user.name}</TableCell>
                    <TableCell className="font-mono text-sm">{user.phone}</TableCell>
                    <TableCell className="font-mono text-sm">{user.account}</TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(user.riskLevel)}>
                        {user.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastSeen}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(user.locationStatus)}>
                        {user.locationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleSendSMS(user.id, user.phone, user.name)}
                        disabled={sendingStates[user.id] || user.locationStatus === "Received"}
                        size="sm"
                        className="font-open-sans"
                      >
                        {sendingStates[user.id] ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send SMS
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Location Data Received */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-roboto flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Location Data Received</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {locationData.length > 0 ? (
            <div className="space-y-4">
              {locationData.map((location) => (
                <div key={location.id} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-open-sans font-medium">{location.name}</span>
                        <Badge variant="outline" className="ml-2">
                          <Phone className="h-3 w-3 mr-1" />
                          {location.phone}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{location.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{location.timestamp}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Coordinates: {location.latitude}, {location.longitude} • Accuracy: {location.accuracy}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="font-open-sans">
                        View on Map
                      </Button>
                      <Button variant="outline" size="sm" className="font-open-sans">
                        Export Data
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-open-sans">No location data received yet</p>
              <p className="text-sm">Send SMS links to users to start collecting location data</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationTracker;