import { Card } from "./ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ProductItemProps {
  name: string;
  sales: string;
  status: "high" | "low";
}

const ProductItem = ({ name, sales, status }: ProductItemProps) => (
  <div className="flex items-center justify-between py-3 border-b last:border-0">
    <div className="flex items-center gap-3">
      {status === "high" ? (
        <div className="rounded-full bg-green-100 p-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
        </div>
      ) : (
        <div className="rounded-full bg-red-100 p-2">
          <TrendingDown className="h-4 w-4 text-red-600" />
        </div>
      )}
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{sales}</p>
      </div>
    </div>
  </div>
);

const ProductPerformance = () => {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-green-700">
          📊 Top Selling Product
        </h3>
        <ProductItem 
          name="Protein Bar - Almond" 
          sales="Sales: 10 units" 
          status="high" 
        />
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-red-700">
          📉 Low Performing Product
        </h3>
        <ProductItem 
          name="Fitness Starter Pack" 
          sales="Sales: 0 units" 
          status="low" 
        />
      </Card>
    </div>
  );
};

export default ProductPerformance;
