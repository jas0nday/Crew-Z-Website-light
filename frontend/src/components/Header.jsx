import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { label: 'Products', children: [
    { label: 'CrewZ Speed', to: '/products/speed' },
    { label: 'CrewZ Cox', to: '/products/cox' },
    { label: 'CrewZ Coach', to: '/products/coach' },
  ]},
  { label: 'Technology', to: '/technology' },
  { label: 'Compare', to: '/compare' },
  { label: 'Founders', to: '/founders' },
  { label: 'App', to: '/app' },
  { label: 'Support', to: '/support' },
];

export default function Header() {
  const { cartCount } = useCart();
  const location = useLocation();
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/70 backdrop-blur-xl border-b border-white/10" data-testid="main-header">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold tracking-wider text-white" data-testid="logo-link">
          CREW<span className="text-[#007AFF]">Z</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
          {navLinks.map(link =>
            link.children ? (
              <div key={link.label} className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}>
                <button className="flex items-center gap-1 text-sm font-body text-gray-300 hover:text-white transition-colors uppercase tracking-wider" data-testid="nav-products-dropdown">
                  {link.label} <ChevronDown className="w-3 h-3" />
                </button>
                {productsOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-[#111111] border border-white/10 rounded-sm py-2 min-w-[180px]">
                    {link.children.map(child => (
                      <Link key={child.to} to={child.to}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-body"
                        data-testid={`nav-product-${child.to.split('/').pop()}`}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.to} to={link.to}
                className={`text-sm font-body uppercase tracking-wider transition-colors ${location.pathname === link.to ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                data-testid={`nav-${link.to.slice(1)}`}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/shop"
            className="hidden lg:inline-block bg-[#007AFF] text-white font-heading uppercase tracking-widest text-xs py-2 px-6 rounded-sm hover:bg-[#3395FF] hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all"
            data-testid="shop-nav-btn">
            SHOP
          </Link>
          <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors" data-testid="cart-nav-btn">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#007AFF] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body font-bold" data-testid="cart-count-badge">
                {cartCount}
              </span>
            )}
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="text-white" data-testid="mobile-menu-btn">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A0A0A] border-l border-white/10 w-[280px] p-6">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map(link =>
                  link.children ? (
                    <div key={link.label}>
                      <p className="text-[#007AFF] font-heading uppercase tracking-wider text-sm mb-2">{link.label}</p>
                      {link.children.map(child => (
                        <Link key={child.to} to={child.to} onClick={() => setMobileOpen(false)}
                          className="block py-2 pl-4 text-sm text-gray-300 hover:text-white font-body">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                      className="text-sm font-heading uppercase tracking-wider text-gray-300 hover:text-white">
                      {link.label}
                    </Link>
                  )
                )}
                <Link to="/shop" onClick={() => setMobileOpen(false)}
                  className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-3 px-6 rounded-sm text-center mt-4 hover:bg-[#3395FF] transition-all">
                  SHOP NOW
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
