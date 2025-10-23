import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const KYCUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [gstinImage, setGstinImage] = useState<File | null>(null);
  const [panImage, setPanImage] = useState<File | null>(null);
  const [aadhaarImage, setAadhaarImage] = useState<File | null>(null);
  const [foodCertImage, setFoodCertImage] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gstinImage || !panImage || !aadhaarImage || !foodCertImage) {
      toast({
        title: "Missing Documents",
        description: "Please upload all required documents to proceed.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Not authenticated");
      }

      const [gstinBase64, panBase64, aadhaarBase64, foodCertBase64] = await Promise.all([
        convertToBase64(gstinImage),
        convertToBase64(panImage),
        convertToBase64(aadhaarImage),
        convertToBase64(foodCertImage),
      ]);

      const { error } = await supabase
        .from("kyc_documents")
        .insert({
          user_id: user.id,
          gstin_image: gstinBase64,
          pan_image: panBase64,
          aadhaar_image: aadhaarBase64,
          food_certificate_image: foodCertBase64,
          verification_status: "pending",
        });

      if (error) throw error;

      toast({
        title: "Documents Uploaded",
        description: "Your KYC documents have been submitted for verification.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading KYC documents:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload documents",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Complete Your KYC Verification</CardTitle>
          <CardDescription>
            Upload the required documents to verify your seller account. All documents will be verified automatically through government databases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertDescription>
              <strong>Required Documents:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>GSTIN (GST Identification Number) - For tax verification</li>
                <li>PAN Card - For identity verification</li>
                <li>Aadhaar Card - Government issued ID proof</li>
                <li>Food License Certificate - FSSAI license for food supplements</li>
              </ul>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="gstin">GSTIN Document</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="gstin"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setGstinImage)}
                  required
                />
                {gstinImage && <Upload className="h-4 w-4 text-green-500" />}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pan">PAN Card</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="pan"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setPanImage)}
                  required
                />
                {panImage && <Upload className="h-4 w-4 text-green-500" />}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Card</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="aadhaar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setAadhaarImage)}
                  required
                />
                {aadhaarImage && <Upload className="h-4 w-4 text-green-500" />}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodcert">Food License Certificate</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="foodcert"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFoodCertImage)}
                  required
                />
                {foodCertImage && <Upload className="h-4 w-4 text-green-500" />}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading Documents...
                </>
              ) : (
                "Submit Documents for Verification"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCUpload;