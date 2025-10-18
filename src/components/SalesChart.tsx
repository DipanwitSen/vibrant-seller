import { Card } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", sales: 4200, profit: 2800 },
  { month: "Feb", sales: 3100, profit: 1900 },
  { month: "Mar", sales: 5200, profit: 3400 },
  { month: "Apr", sales: 2800, profit: 1600 },
  { month: "May", sales: 6200, profit: 4100 },
  { month: "Jun", sales: 3900, profit: 2400 },
];

const SalesChart = () => {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">📈 Sales & Profit Trend</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "white", 
              border: "1px solid #e5e7eb",
              borderRadius: "8px"
            }} 
          />
          <Legend />
          <Bar dataKey="sales" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} name="Sales" />
          <Bar dataKey="profit" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SalesChart;
