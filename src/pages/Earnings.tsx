import { DollarSign, TrendingUp, CreditCard, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const earningsData = [
  { month: "Jan", earnings: 18000 },
  { month: "Feb", earnings: 22000 },
  { month: "Mar", earnings: 19000 },
  { month: "Apr", earnings: 25000 },
  { month: "May", earnings: 28000 },
  { month: "Jun", earnings: 22345 },
];

const transactions = [
  { date: "2024-01-20", description: "Order #ORD-1001 - Whey Protein", amount: 2499, type: "credit" },
  { date: "2024-01-19", description: "Order #ORD-1002 - BCAA Powder", amount: 1299, type: "credit" },
  { date: "2024-01-18", description: "Platform Commission", amount: -450, type: "debit" },
  { date: "2024-01-17", description: "Payout to Bank", amount: -5000, type: "debit" },
  { date: "2024-01-16", description: "Order #ORD-1005 - Pre-Workout", amount: 1799, type: "credit" },
];

const Earnings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              💰 Earnings & Payouts
            </h1>
            <p className="text-muted-foreground">Track your revenue and request payouts</p>
          </div>
          <Button className="gap-2">
            <CreditCard className="h-4 w-4" />
            Request Payout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <h3 className="text-2xl font-bold">₹1,34,345</h3>
              </div>
            </div>
            <p className="text-sm text-accent mt-2">+15.3% from last month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-full bg-accent/10 p-3">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <h3 className="text-2xl font-bold">₹22,345</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Ready to withdraw</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-full bg-yellow-100 p-3">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Payout</p>
                <h3 className="text-2xl font-bold">₹0</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">No pending requests</p>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Earnings Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
                <div className={`font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type === "credit" ? "+" : ""}₹{Math.abs(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Earnings;
