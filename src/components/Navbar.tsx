import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-wider text-foreground">
          GIFFIES
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-premium">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-premium">
            Shop
          </Link>
          <Link to="/cart" className="relative text-muted-foreground hover:text-foreground transition-premium">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">{user?.name}</span>
              <button onClick={handleLogout} className="text-muted-foreground hover:text-foreground transition-premium">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-premium">
              <User size={18} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-6 pb-4 space-y-3 animate-fade-in">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground">Home</Link>
          <Link to="/shop" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground">Shop</Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground">Cart ({totalItems})</Link>
          {isAuthenticated ? (
            <>
              <span className="block text-sm font-medium text-foreground">{user?.name}</span>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-sm text-muted-foreground">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground">Login / Register</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
