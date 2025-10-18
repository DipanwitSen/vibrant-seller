import { Bell, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary/95 to-primary/90 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-primary/80 supports-[backdrop-filter]:to-primary/75">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
              <span className="text-xl font-bold text-white">🏋️</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                Protein Supplement <span className="text-white/90">Market</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/products" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Products
            </a>
            <a href="/inventory" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Inventory
            </a>
            <a href="/orders" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Orders
            </a>
            <a href="/earnings" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Earnings
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Seller Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/account">Profile & Settings</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/account">Bank Details</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
