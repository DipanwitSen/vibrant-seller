import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  status: "active" | "low-stock" | "out-of-stock";
}

const products: Product[] = [
  {
    id: "1",
    name: "Whey Protein Isolate",
    brand: "ProMax",
    price: 2499,
    stock: 45,
    category: "Protein",
    image: "🥛",
    status: "active",
  },
  {
    id: "2",
    name: "BCAA Powder",
    brand: "FitFuel",
    price: 1299,
    stock: 8,
    category: "Supplements",
    image: "💪",
    status: "low-stock",
  },
  {
    id: "3",
    name: "Creatine Monohydrate",
    brand: "MuscleMax",
    price: 899,
    stock: 0,
    category: "Supplements",
    image: "⚡",
    status: "out-of-stock",
  },
  {
    id: "4",
    name: "Pre-Workout Energy",
    brand: "PowerBoost",
    price: 1799,
    stock: 32,
    category: "Pre-Workout",
    image: "🔥",
    status: "active",
  },
];

const ProductCard = ({ product }: { product: Product }) => (
  <Card className="p-4 hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4">
      <div className="text-5xl">{product.image}</div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
          <Badge
            variant={
              product.status === "active"
                ? "default"
                : product.status === "low-stock"
                ? "secondary"
                : "destructive"
            }
          >
            {product.status === "active"
              ? "Active"
              : product.status === "low-stock"
              ? "Low Stock"
              : "Out of Stock"}
          </Badge>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm">
          <span className="font-semibold text-primary">₹{product.price}</span>
          <span className="text-muted-foreground">Stock: {product.stock}</span>
          <span className="text-muted-foreground">{product.category}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" variant="outline" className="gap-2 text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              📦 Product Management
            </h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product to your catalog
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input placeholder="e.g., Whey Protein" />
                  </div>
                  <div className="space-y-2">
                    <Label>Brand</Label>
                    <Input placeholder="e.g., ProMax" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price (₹)</Label>
                    <Input type="number" placeholder="2499" />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock Quantity</Label>
                    <Input type="number" placeholder="50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input placeholder="e.g., Protein, Pre-Workout" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Product description..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <Input type="file" accept="image/*" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="grid gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <Card className="p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first product to the catalog
            </p>
            <Button>Add Your First Product</Button>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Products;
