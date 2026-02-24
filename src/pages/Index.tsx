import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, Product } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Gift, Truck, Heart, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Premium gifting" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
    </div>
    <div className="relative container mx-auto px-6">
      <div className="max-w-xl">
        <p className="text-primary-foreground/70 text-sm uppercase tracking-[0.3em] font-medium mb-4 animate-fade-in">
          Premium Gifting
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Gifts That Speak Volumes
        </h1>
        <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Curated collections for every meaningful moment. Discover thoughtfully selected gifts that leave lasting impressions.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-md font-medium text-sm uppercase tracking-wider hover:bg-primary/90 transition-premium animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Shop Collection
          <ShoppingBag size={16} />
        </Link>
      </div>
    </div>
  </section>
);

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="group animate-fade-in">
      <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-premium"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <button
          onClick={() => addItem({ productId: product.id, name: product.name, price: product.price, image: product.image })}
          className="absolute bottom-3 right-3 bg-card text-foreground p-2.5 rounded-full shadow-card opacity-0 group-hover:opacity-100 transition-premium hover:bg-primary hover:text-primary-foreground"
        >
          <ShoppingBag size={16} />
        </button>
      </div>
      <h3 className="font-medium text-foreground text-sm mb-1">{product.name}</h3>
      <p className="text-primary font-semibold">${product.price?.toFixed(2)}</p>
    </div>
  );
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-2">Our Collection</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Featured Products</h2>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-secondary rounded-lg mb-4" />
              <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
              <div className="h-4 bg-secondary rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          Products will appear here once the backend is running at localhost:3000
        </p>
      )}
      <div className="text-center mt-10">
        <Link to="/shop" className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 rounded-md text-sm font-medium uppercase tracking-wider hover:bg-foreground hover:text-background transition-premium">
          View All Products
        </Link>
      </div>
    </section>
  );
};

const features = [
  { icon: Gift, title: "Curated With Care", desc: "Every gift is hand-selected by our expert team for quality and uniqueness." },
  { icon: Truck, title: "Fast Delivery", desc: "Free shipping on orders over $50 with express delivery options available." },
  { icon: Heart, title: "Gift Wrapping", desc: "Complimentary premium gift wrapping on all orders, ready to delight." },
];

const WhyChooseUs = () => (
  <section className="bg-secondary/50 py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-2">Why GIFFIES</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">The GIFFIES Difference</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-card rounded-lg p-8 shadow-soft text-center transition-premium hover:shadow-hover animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <f.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const testimonials = [
  { name: "Sarah M.", text: "The packaging was absolutely stunning. My friend was thrilled with her birthday gift!", rating: 5 },
  { name: "James K.", text: "GIFFIES made anniversary shopping effortless. High quality and beautiful presentation.", rating: 5 },
  { name: "Emily R.", text: "I keep coming back for every occasion. The curation is unmatched and delivery is always on time.", rating: 5 },
];

const Testimonials = () => (
  <section className="container mx-auto px-6 py-20">
    <div className="text-center mb-12">
      <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-2">Testimonials</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">What Our Customers Say</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-card rounded-lg p-8 shadow-soft animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="flex gap-0.5 mb-4">
            {[...Array(t.rating)].map((_, j) => (
              <Star key={j} size={14} className="fill-primary text-primary" />
            ))}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
          <p className="text-foreground font-medium text-sm">{t.name}</p>
        </div>
      ))}
    </div>
  </section>
);

const Index = () => (
  <>
    <HeroSection />
    <FeaturedProducts />
    <WhyChooseUs />
    <Testimonials />
  </>
);

export default Index;
