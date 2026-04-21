import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-24 md:py-32 bg-[#0A1628] border-t border-[#0A1628]" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-heading text-2xl font-bold tracking-wider text-white mb-4">
              CREW<span className="text-[#007AFF]">Z</span>
            </h3>
            <p className="font-body text-sm text-[#A1A1AA] leading-relaxed">
              The world's first rowing computer that uses your smartphone as the display. Built by a three-time Olympian.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-[#007AFF] mb-4">Products</h4>
            <div className="flex flex-col gap-2">
              <Link to="/products/speed" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body" data-testid="footer-link-speed">CrewZ Speed</Link>
              <Link to="/products/cox" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body" data-testid="footer-link-cox">CrewZ Cox</Link>
              <Link to="/products/coach" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body" data-testid="footer-link-coach">CrewZ Coach</Link>
              <Link to="/shop" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body" data-testid="footer-link-shop">Shop</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-[#007AFF] mb-4">Company</h4>
            <div className="flex flex-col gap-2">
              <Link to="/technology" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body">Technology</Link>
              <Link to="/compare" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body">Compare</Link>
              <Link to="/founders" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body">Founders</Link>
              <Link to="/app" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body">App</Link>
              <Link to="/support" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body">Support</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-[#007AFF] mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body">Privacy Policy</Link>
              <Link to="/returns" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body">Returns Policy</Link>
              <Link to="/track-order" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-body">Track Order</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-body">&copy; {new Date().getFullYear()} CrewZ. All rights reserved.</p>
          <p className="text-xs text-gray-400 font-body">Built by a rower, for rowers.</p>
        </div>
      </div>
    </footer>
  );
}
