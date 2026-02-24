import { useEffect, useState } from "react";
import { api, Product } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    api.getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-2">Browse</p>
        <h1 className="font-display text-4xl font-bold text-foreground">All Products</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-secondary rounded-lg mb-4" />
              <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
              <div className="h-4 bg-secondary rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group animate-fade-in">
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-premium"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
                <button
                  onClick={() => addItem({ productId: product.id, name: product.name, price: product.price, image: product.image })}
                  className="absolute bottom-3 right-3 bg-card text-foreground p-2.5 rounded-full shadow-card opacity-0 group-hover:opacity-100 transition-premium hover:bg-primary hover:text-primary-foreground"
                >
                  <ShoppingBag size={16} />
                </button>
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{product.name}</h3>
              {product.description && <p className="text-muted-foreground text-xs mb-1 line-clamp-2">{product.description}</p>}
              <p className="text-primary font-semibold">${product.price?.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Products will appear here once the backend is running at localhost:3000</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
