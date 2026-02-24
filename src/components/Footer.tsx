import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background/80 mt-20">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h3 className="font-display text-2xl font-bold text-background tracking-wider mb-4">GIFFIES</h3>
          <p className="text-sm leading-relaxed text-background/60">
            Thoughtfully curated gifts for every occasion. Making moments memorable since 2024.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-background text-sm uppercase tracking-wider mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-background transition-premium">All Products</Link></li>
            <li><span className="cursor-default">New Arrivals</span></li>
            <li><span className="cursor-default">Best Sellers</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-background text-sm uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="cursor-default">About Us</span></li>
            <li><span className="cursor-default">Contact</span></li>
            <li><span className="cursor-default">Careers</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-background text-sm uppercase tracking-wider mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="cursor-default">Shipping Info</span></li>
            <li><span className="cursor-default">Returns</span></li>
            <li><span className="cursor-default">FAQ</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
        2024 GIFFIES. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
