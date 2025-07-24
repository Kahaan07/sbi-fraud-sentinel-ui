import { useState } from "react";
import { Upload, FileText, Download, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UploadCSV = () => {
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for the table
  const mockData = [
    { id: 1, name: "Rajesh Kumar", account: "XXXX-1234", phone: "+91-9876543210", riskScore: 85, probability: "High", status: "Flagged" },
    { id: 2, name: "Priya Sharma", account: "XXXX-5678", phone: "+91-9876543211", riskScore: 45, probability: "Medium", status: "Under Review" },
    { id: 3, name: "Amit Patel", account: "XXXX-9012", phone: "+91-9876543212", riskScore: 25, probability: "Low", status: "Clear" },
    { id: 4, name: "Sunita Singh", account: "XXXX-3456", phone: "+91-9876543213", riskScore: 75, probability: "High", status: "Flagged" },
    { id: 5, name: "Vikram Gupta", account: "XXXX-7890", phone: "+91-9876543214", riskScore: 35, probability: "Low", status: "Clear" },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-yellow-500 text-white";
      case "Low": return "bg-green-500 text-white";
      default: return "bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Flagged": return "bg-destructive text-destructive-foreground";
      case "Under Review": return "bg-yellow-500 text-white";
      case "Clear": return "bg-green-500 text-white";
      default: return "bg-muted";
    }
  };

  const filteredData = mockData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.account.includes(searchTerm) ||
    item.phone.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-roboto font-bold text-foreground">Upload CSV</h1>
        <p className="text-muted-foreground font-open-sans">Upload customer data files for fraud analysis</p>
      </div>

      {/* Upload Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-roboto flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>File Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-open-sans font-medium mb-2">
              Drop your CSV file here, or <span className="text-primary cursor-pointer">browse</span>
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports CSV files up to 10MB. Required columns: Name, Account, Phone, Email
            </p>
            <Button className="font-open-sans">
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-roboto">Fraud Analysis Results</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 font-open-sans"
                />
              </div>
              <Button variant="outline" size="sm" className="font-open-sans">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="font-open-sans">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-roboto">Customer Name</TableHead>
                  <TableHead className="font-roboto">Account Number</TableHead>
                  <TableHead className="font-roboto">Phone Number</TableHead>
                  <TableHead className="font-roboto">Risk Score</TableHead>
                  <TableHead className="font-roboto">Fraud Probability</TableHead>
                  <TableHead className="font-roboto">Status</TableHead>
                  <TableHead className="font-roboto">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/50">
                    <TableCell className="font-open-sans font-medium">{row.name}</TableCell>
                    <TableCell className="font-mono text-sm">{row.account}</TableCell>
                    <TableCell className="font-mono text-sm">{row.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              row.riskScore >= 70 ? "bg-destructive" :
                              row.riskScore >= 40 ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{ width: `${row.riskScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-open-sans w-8">{row.riskScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getProbabilityColor(row.probability)}>
                        {row.probability}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(row.status)}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="font-open-sans">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadCSV;