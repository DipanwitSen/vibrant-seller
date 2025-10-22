import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import LowStockAlert from "@/components/LowStockAlert";
import SalesChart from "@/components/SalesChart";
import ProductPerformance from "@/components/ProductPerformance";
import { Button } from "@/components/ui/button";
import { CreateBundle } from "@/components/CreateBundle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              🛍️ Seller Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, seller!</p>
          </div>
          <div className="flex gap-3">
            <CreateBundle />
            <Button className="gap-2 bg-primary hover:bg-primary/90" asChild>
              <a href="/products">
                <Plus className="h-4 w-4" />
                Add Product
              </a>
            </Button>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="mb-6">
          <LowStockAlert />
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <DashboardStats />
        </div>

        {/* Charts and Products */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div className="lg:col-span-1">
            <ProductPerformance />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
