import { Button } from "@/components/ui/button";
import { ShoppingBag, Shield, Zap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">ProtiMart</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Login
          </Button>
          <Button onClick={() => navigate("/auth?mode=signup")}>
            Get Started
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Protein Supplement Marketplace
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect sellers and customers in the protein supplement industry with secure payments, real-time tracking, and verified sellers
          </p>
          <Button size="lg" onClick={() => navigate("/auth?mode=signup")} className="gap-2">
            <ShoppingBag className="h-5 w-5" />
            Start Selling Today
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-6 rounded-lg bg-card border text-center">
            <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Sellers</h3>
            <p className="text-muted-foreground">
              KYC verification with GSTIN, food certificates, and document validation
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border text-center">
            <div className="rounded-full bg-accent/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-muted-foreground">
              Track orders, payments, and inventory in real-time
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border text-center">
            <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Built for Scale</h3>
            <p className="text-muted-foreground">
              Create bundles, manage products, and grow your business
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join ProtiMart?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of sellers and customers in the protein supplement marketplace
          </p>
          <Button size="lg" onClick={() => navigate("/auth?mode=signup")}>
            Create Your Account
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Landing;
