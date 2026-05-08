# CrewZ Website & Store - PRD

## Original Problem Statement
Build a modern, premium marketing and e-commerce website for CrewZ — a waterproof GPS rowing computer in a smartphone case form factor. Dark premium aesthetic (Garmin meets Apple). Navy, black, white with electric blue accent.

## User Personas
1. **Scullers/Sweep Rowers** - Individual athletes wanting GPS speed/split data
2. **Coxswains** - Need GPS + amplifier for crew boats
3. **Coaches** - Want multi-boat live data streaming
4. **Founder/Admin** - Order management, analytics

## Core Requirements (Static)
- 14-page marketing + e-commerce website
- Products: CrewZ Speed ($200), Cox ($250), Coach ($300) in USD
- Currency: USD primary, GBP/AUD via static multipliers
- Auth: Emergent Google OAuth for admin only
- Cart: localStorage-based guest checkout
- SMTP fulfilment emails (built, not configured)
- Stripe: DEFERRED (months away from product availability)

## Architecture
- **Backend**: FastAPI + MongoDB (server.py)
- **Frontend**: React + Tailwind + shadcn/ui + framer-motion
- **Auth**: Emergent Google OAuth
- **Design**: Oswald + Manrope fonts, #0A0A0A base, #007AFF accent

## What's Been Implemented (2026-04-16)
- Full 14-page website with routing
- Backend: Products, Orders, Newsletter, Contact, Auth, Admin APIs
- Frontend: Homepage (hero, products, differentiators, comparison, email capture)
- Product pages with dynamic data, specs, FAQ accordion
- Shop, Cart, Checkout (pre-order flow)
- Technology, Compare, Founders, App, Support/FAQ pages
- Admin Dashboard with order management (Google Auth protected)
- Order tracking page
- Returns & Privacy policy pages
- Responsive mobile navigation
- Currency switching (USD/GBP/AUD)

## Testing Results
- Backend: 14/14 tests passed (100%)
- Frontend: All pages load, all flows work (100%)
- E2E: Add to cart → Checkout → Order tracking verified

## Prioritized Backlog
### P0 (Before Launch)
- Configure SMTP credentials for fulfilment emails
- Add product photography (replace placeholders)
- Integrate Stripe payment processing
- Add real testimonials

### P1
- SEO meta tags and Open Graph
- GDPR cookie consent banner
- Tax handling (VAT for UK, GST for Australia)
- Apple Pay / Google Pay via Stripe

### P2
- Inventory management (stock levels per variant)
- Order confirmation emails to customers
- Real founder social media links
- App Store / Google Play links
- Performance optimization (image lazy loading, code splitting)
