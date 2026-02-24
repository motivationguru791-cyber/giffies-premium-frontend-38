import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/cart");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.placeOrder(items.map((i) => ({ productId: i.productId, quantity: i.quantity })));
      clearCart();
      navigate("/");
    } catch (e: any) {
      setError(e.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-muted-foreground/40 mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Discover our curated collection of premium gifts.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-medium uppercase tracking-wider hover:bg-primary/90 transition-premium">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold text-foreground mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 bg-card rounded-lg p-4 shadow-soft animate-fade-in">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md bg-secondary"
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{item.name}</h3>
                  <p className="text-primary font-semibold text-sm">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-premium">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-premium">
                    <Plus size={14} />
                  </button>
                  <button onClick={() => removeItem(item.productId)} className="ml-auto text-muted-foreground hover:text-destructive transition-premium">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg p-6 shadow-soft h-fit sticky top-24">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground font-medium">{totalPrice > 50 ? "Free" : "$5.99"}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-foreground text-lg">${(totalPrice > 50 ? totalPrice : totalPrice + 5.99).toFixed(2)}</span>
            </div>
          </div>
          {error && <p className="text-destructive text-sm mb-3">{error}</p>}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium text-sm uppercase tracking-wider hover:bg-primary/90 transition-premium disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
