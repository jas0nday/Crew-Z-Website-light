import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/AdminDashboard.jsx";
import AppPage from "@/pages/AppPage.jsx";
import AuthCallback from "@/pages/AuthCallback.jsx";
import CartPage from "@/pages/CartPage.jsx";
import CheckoutPage from "@/pages/CheckoutPage.jsx";
import ComparePage from "@/pages/ComparePage.jsx";
import FoundersPage from "@/pages/FoundersPage.jsx";
import HomePage from "@/pages/HomePage.jsx";
import OrderTrackingPage from "@/pages/OrderTrackingPage.jsx";
import PolicyPages from "@/pages/PolicyPages.jsx";
import ProductPage from "@/pages/ProductPage.jsx";
import ShopPage from "@/pages/ShopPage.jsx";
import SupportPage from "@/pages/SupportPage.jsx";
import TechnologyPage from "@/pages/TechnologyPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/founders" element={<FoundersPage />} />
        <Route path="/order-tracking" element={<OrderTrackingPage />} />
        <Route path="/policy/*" element={<PolicyPages />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
