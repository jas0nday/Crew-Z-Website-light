import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function PageWrapper({ title, children }) {
  return (
    <div className="bg-[#FFFDF7] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#007AFF] font-body text-sm hover:text-[#3395FF] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-[#1A1A2E] mb-12">{title}</h1>
        <div className="font-body text-[#6B7280] leading-relaxed space-y-6 text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ReturnsPolicy() {
  return (
    <PageWrapper title="Returns Policy">
      <section data-testid="returns-policy">
        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3">30-Day Return Policy</h2>
        <p>We offer a 30-day return policy from the date of delivery. To be eligible for a return, your CrewZ product must be:</p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>In its original, unused condition</li>
          <li>In the original packaging with all accessories included</li>
          <li>Accompanied by your proof of purchase (order confirmation email)</li>
        </ul>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">How to Return</h2>
        <p>To initiate a return, please contact us through our <Link to="/support" className="text-[#007AFF] hover:underline">Support page</Link> with your order number and reason for return. We will provide you with a return shipping address and instructions.</p>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">Refunds</h2>
        <p>Once we receive and inspect your returned product, we will process your refund within 5-10 business days. Refunds will be issued to the original payment method. Shipping costs are non-refundable.</p>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">Damaged or Defective Products</h2>
        <p>If your CrewZ product arrives damaged or defective, please contact us immediately through our Support page. We will arrange a replacement or full refund including shipping costs.</p>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">Warranty</h2>
        <p>All CrewZ products come with a 12-month manufacturer warranty covering defects in materials and workmanship under normal use. The warranty does not cover damage from misuse, unauthorized modifications, or normal wear and tear.</p>
      </section>
    </PageWrapper>
  );
}

export function PrivacyPolicy() {
  return (
    <PageWrapper title="Privacy Policy">
      <section data-testid="privacy-policy">
        <p>Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
        <p className="mt-2">CrewZ Rowing Technology Limited, Company No. 17180291, registered in England and Wales.</p>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">Information We Collect</h2>
        <p>When you use our website and place orders, we collect:</p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Contact information (name, email address)</li>
          <li>Shipping address</li>
          <li>Order details and transaction history</li>
          <li>Device and browser information for analytics</li>
          <li>Newsletter subscription preferences</li>
        </ul>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Process and fulfil your orders</li>
          <li>Send order confirmations and shipping updates</li>
          <li>Send newsletter communications (with your consent)</li>
          <li>Respond to support enquiries</li>
          <li>Improve our products and services</li>
        </ul>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">Data Sharing</h2>
        <p>We share your shipping information with our fulfilment partner for order processing and delivery. We do not sell or share your personal data with third parties for marketing purposes.</p>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">Your Rights (GDPR)</h2>
        <p>Under GDPR, you have the right to access, correct, delete, or export your personal data. To exercise these rights, please contact us through our <Link to="/support" className="text-[#007AFF] hover:underline">Support page</Link>.</p>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">Cookies</h2>
        <p>We use essential cookies for site functionality and analytics cookies to understand how our site is used. You can manage cookie preferences through your browser settings.</p>

        <h2 className="font-heading text-xl text-[#1A1A2E] uppercase mb-3 mt-8">Contact</h2>
        <p>For privacy-related enquiries, please contact us through our <Link to="/support" className="text-[#007AFF] hover:underline">Support page</Link>.</p>
      </section>
    </PageWrapper>
  );
}
