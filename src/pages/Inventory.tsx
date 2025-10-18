import { AlertTriangle, Package, TrendingDown, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  reorderLevel: number;
  maxStock: number;
  lastRestocked: string;
  status: "healthy" | "low" | "critical";
}

const inventory: InventoryItem[] = [
  {
    id: "1",
    name: "Whey Protein Isolate",
    currentStock: 45,
    reorderLevel: 20,
    maxStock: 100,
    lastRestocked: "2024-01-15",
    status: "healthy",
  },
  {
    id: "2",
    name: "BCAA Powder",
    currentStock: 8,
    reorderLevel: 15,
    maxStock: 50,
    lastRestocked: "2024-01-10",
    status: "low",
  },
  {
    id: "3",
    name: "Creatine Monohydrate",
    currentStock: 2,
    reorderLevel: 10,
    maxStock: 60,
    lastRestocked: "2024-01-05",
    status: "critical",
  },
  {
    id: "4",
    name: "Pre-Workout Energy",
    currentStock: 32,
    reorderLevel: 15,
    maxStock: 75,
    lastRestocked: "2024-01-18",
    status: "healthy",
  },
];

const StockStats = () => (
  <div className="grid gap-4 md:grid-cols-3 mb-8">
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Total Items</p>
          <h3 className="text-2xl font-bold mt-1">{inventory.length}</h3>
        </div>
        <Package className="h-10 w-10 text-primary" />
      </div>
    </Card>
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Low Stock Items</p>
          <h3 className="text-2xl font-bold mt-1 text-yellow-600">
            {inventory.filter((i) => i.status === "low").length}
          </h3>
        </div>
        <TrendingDown className="h-10 w-10 text-yellow-600" />
      </div>
    </Card>
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Critical Stock</p>
          <h3 className="text-2xl font-bold mt-1 text-destructive">
            {inventory.filter((i) => i.status === "critical").length}
          </h3>
        </div>
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>
    </Card>
  </div>
);

const Inventory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              📊 Inventory Management
            </h1>
            <p className="text-muted-foreground">Track and manage your stock levels</p>
          </div>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync Inventory
          </Button>
        </div>

        <StockStats />

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Stock Overview</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.currentStock}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress
                        value={(item.currentStock / item.maxStock) * 100}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {item.currentStock} / {item.maxStock}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                  <TableCell>{item.lastRestocked}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "healthy"
                          ? "default"
                          : item.status === "low"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {item.status === "healthy" && "Healthy"}
                      {item.status === "low" && "Low Stock"}
                      {item.status === "critical" && "Critical"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.status !== "healthy" && (
                      <Button size="sm" variant="outline">
                        Restock
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default Inventory;
