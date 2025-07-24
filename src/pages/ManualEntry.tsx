import { useState } from "react";
import { Save, User, Phone, Mail, CreditCard, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ManualEntry = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pan: "",
    aadhaar: "",
    accountNumber: "",
    bankBranch: "",
    address: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Entry Saved Successfully",
      description: `User data for ${formData.name} has been added to the database.`,
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      pan: "",
      aadhaar: "",
      accountNumber: "",
      bankBranch: "",
      address: "",
      notes: ""
    });

    setIsSubmitting(false);
  };

  const isFormValid = formData.name && formData.phone && formData.email && 
                      (formData.pan || formData.aadhaar) && formData.accountNumber;

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-roboto font-bold text-foreground">Manual Entry</h1>
        <p className="text-muted-foreground font-open-sans">Manually enter user details for fraud monitoring</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-roboto flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>User Information Form</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-open-sans">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <User className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter full name"
                      className="pl-10 font-open-sans"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-open-sans">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91-XXXXXXXXXX"
                      className="pl-10 font-open-sans"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-open-sans">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="user@example.com"
                      className="pl-10 font-open-sans"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="font-open-sans">
                    Account Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <CreditCard className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                      placeholder="Account number"
                      className="pl-10 font-open-sans"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Identity Documents */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-roboto font-semibold mb-4">Identity Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pan" className="font-open-sans">
                      PAN Number
                    </Label>
                    <div className="relative">
                      <Hash className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="pan"
                        value={formData.pan}
                        onChange={(e) => handleInputChange("pan", e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        className="pl-10 font-open-sans uppercase"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadhaar" className="font-open-sans">
                      Aadhaar Number
                    </Label>
                    <div className="relative">
                      <Hash className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="aadhaar"
                        value={formData.aadhaar}
                        onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                        placeholder="XXXX-XXXX-XXXX"
                        className="pl-10 font-open-sans"
                        maxLength={12}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 font-open-sans">
                  * At least one identity document (PAN or Aadhaar) is required
                </p>
              </div>

              {/* Additional Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-roboto font-semibold mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankBranch" className="font-open-sans">Bank Branch</Label>
                    <Input
                      id="bankBranch"
                      value={formData.bankBranch}
                      onChange={(e) => handleInputChange("bankBranch", e.target.value)}
                      placeholder="Branch name/code"
                      className="font-open-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="font-open-sans">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Complete address"
                      className="font-open-sans"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="font-open-sans">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Additional notes or observations"
                      className="font-open-sans"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-6 flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({
                    name: "", phone: "", email: "", pan: "", aadhaar: "",
                    accountNumber: "", bankBranch: "", address: "", notes: ""
                  })}
                  className="font-open-sans"
                >
                  Clear Form
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="font-open-sans"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Entry
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManualEntry;