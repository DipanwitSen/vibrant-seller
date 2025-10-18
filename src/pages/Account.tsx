import { User, Building, CreditCard, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Account = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            👤 Account Settings
          </h1>
          <p className="text-muted-foreground">Manage your profile and business details</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="business" className="gap-2">
              <Building className="h-4 w-4" />
              Business
            </TabsTrigger>
            <TabsTrigger value="banking" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Banking
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <div className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue="Rajesh" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue="Kumar" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" defaultValue="rajesh@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input type="tel" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input defaultValue="123 MG Road, Bangalore, Karnataka" />
                </div>
                <Separator />
                <Button>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Business Details</h2>
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input defaultValue="FitSupps India" />
                </div>
                <div className="space-y-2">
                  <Label>GSTIN</Label>
                  <Input defaultValue="29ABCDE1234F1Z5" />
                </div>
                <div className="space-y-2">
                  <Label>PAN Number</Label>
                  <Input defaultValue="ABCDE1234F" />
                </div>
                <div className="space-y-2">
                  <Label>Business Address</Label>
                  <Input defaultValue="456 Commercial Street, Bangalore" />
                </div>
                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Input defaultValue="Retailer" />
                </div>
                <Separator />
                <Button>Update Business Info</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="banking">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Banking Information</h2>
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Input defaultValue="HDFC Bank" />
                </div>
                <div className="space-y-2">
                  <Label>Account Holder Name</Label>
                  <Input defaultValue="Rajesh Kumar" />
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input type="password" defaultValue="****1234" />
                </div>
                <div className="space-y-2">
                  <Label>IFSC Code</Label>
                  <Input defaultValue="HDFC0001234" />
                </div>
                <div className="space-y-2">
                  <Label>UPI ID</Label>
                  <Input defaultValue="rajesh@paytm" />
                </div>
                <Separator />
                <Button>Update Banking Details</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-medium mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive order updates via email
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Low Stock Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when stock is low
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-4">Security</h3>
                  <div className="space-y-3">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Enable Two-Factor Authentication</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2 text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Irreversible actions for your account
                  </p>
                  <Button variant="destructive">Deactivate Account</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Account;
