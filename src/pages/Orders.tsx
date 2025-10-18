import { ShoppingCart, Clock, CheckCircle, XCircle, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Order {
  id: string;
  customerName: string;
  products: string[];
  amount: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  date: string;
  orderNumber: string;
}

const orders: Order[] = [
  {
    id: "1",
    customerName: "Rahul Sharma",
    products: ["Whey Protein Isolate", "BCAA Powder"],
    amount: 3798,
    status: "pending",
    date: "2024-01-20",
    orderNumber: "#ORD-1001",
  },
  {
    id: "2",
    customerName: "Priya Patel",
    products: ["Pre-Workout Energy"],
    amount: 1799,
    status: "processing",
    date: "2024-01-19",
    orderNumber: "#ORD-1002",
  },
  {
    id: "3",
    customerName: "Amit Kumar",
    products: ["Whey Protein Isolate", "Creatine Monohydrate"],
    amount: 3398,
    status: "delivered",
    date: "2024-01-18",
    orderNumber: "#ORD-1003",
  },
  {
    id: "4",
    customerName: "Sneha Reddy",
    products: ["BCAA Powder"],
    amount: 1299,
    status: "cancelled",
    date: "2024-01-17",
    orderNumber: "#ORD-1004",
  },
];

const OrderCard = ({ order }: { order: Order }) => {
  const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", label: "Pending" },
    processing: { icon: Package, color: "text-blue-600", bg: "bg-blue-50", label: "Processing" },
    delivered: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "Delivered" },
    cancelled: { icon: XCircle, color: "text-red-600", bg: "bg-red-50", label: "Cancelled" },
  };

  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
          <p className="text-sm text-muted-foreground">{order.customerName}</p>
        </div>
        <Badge className={`${config.bg} ${config.color} border-0`}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-muted-foreground">Products:</p>
        {order.products.map((product, index) => (
          <p key={index} className="text-sm">• {product}</p>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Order Date</p>
          <p className="font-medium">{order.date}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Amount</p>
          <p className="font-bold text-primary">₹{order.amount}</p>
        </div>
      </div>

      {order.status === "pending" && (
        <div className="flex gap-2 mt-4">
          <Button size="sm" className="flex-1">Accept Order</Button>
          <Button size="sm" variant="outline" className="flex-1">Reject</Button>
        </div>
      )}
      
      {order.status === "processing" && (
        <Button size="sm" className="w-full mt-4">Mark as Delivered</Button>
      )}
    </Card>
  );
};

const Orders = () => {
  const filterOrders = (status: string) => {
    if (status === "all") return orders;
    return orders.filter((order) => order.status === status);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              🛒 Order Management
            </h1>
            <p className="text-muted-foreground">View and manage customer orders</p>
          </div>
          <div className="flex gap-2">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filterOrders("pending").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="processing" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filterOrders("processing").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filterOrders("delivered").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Orders;
