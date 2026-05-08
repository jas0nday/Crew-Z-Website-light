import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ProductPage from '@/pages/ProductPage';
import TechnologyPage from '@/pages/TechnologyPage';
import ComparePage from '@/pages/ComparePage';
import ShopPage from '@/pages/ShopPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import FoundersPage from '@/pages/FoundersPage';
import AppPage from '@/pages/AppPage';
import SupportPage from '@/pages/SupportPage';
import AdminDashboard from '@/pages/AdminDashboard';
import OrderTrackingPage from '@/pages/OrderTrackingPage';
import AuthCallback from '@/pages/AuthCallback';
import { ReturnsPolicy, PrivacyPolicy } from '@/pages/PolicyPages';
import '@/App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRouter() {
  const location = useLocation();

  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/founders" element={<FoundersPage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route path="/returns" element={<ReturnsPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
