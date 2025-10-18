import { TrendingUp, ShoppingCart, DollarSign, Package } from "lucide-react";
import { Card } from "./ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        {trend && (
          <p className="mt-1 text-sm text-accent font-medium">{trend}</p>
        )}
      </div>
      <div className="rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
    </div>
  </Card>
);

const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value="₹22,345.40"
        icon={<DollarSign className="h-6 w-6" />}
        trend="+12.5% from last month"
      />
      <StatCard
        title="Total Orders"
        value="20"
        icon={<ShoppingCart className="h-6 w-6" />}
        trend="+8 new orders"
      />
      <StatCard
        title="Avg Profit Margin"
        value="44.81%"
        icon={<TrendingUp className="h-6 w-6" />}
        trend="Above industry avg"
      />
      <StatCard
        title="Active Products"
        value="7"
        icon={<Package className="h-6 w-6" />}
        trend="3 low stock"
      />
    </div>
  );
};

export default DashboardStats;
