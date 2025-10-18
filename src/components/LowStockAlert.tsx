import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

const LowStockAlert = () => {
  return (
    <Alert className="border-yellow-400 bg-yellow-50 text-yellow-900">
      <AlertTriangle className="h-5 w-5 text-yellow-600" />
      <AlertDescription className="ml-2">
        <span className="font-semibold">⚠️ LOW STOCK ALERT!</span> 1 product(s) running low.{" "}
        <span className="font-medium">Green Tea Powder - 250g</span> (1 left)
      </AlertDescription>
    </Alert>
  );
};

export default LowStockAlert;
