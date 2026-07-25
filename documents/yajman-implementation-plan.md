# Yajman Website — Implementation Plan

## Project Overview

Yajman is a puja and spiritual services booking platform. The website allows users to browse puja services (E-Puja, Pandit at Home, Premium Puja, Astrology, Katha/Aarti/Bhajan), view details, book and pay, manage bookings, and read articles/blogs. There is also a mobile app (not in scope here) that shares the same backend — keep API design compatible with both.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS, TypeScript, custom fetch utility for server/client.

**Figma Source:** `yajman app` → `website design` tab (31 screens at 1920px).

---

## Phase 1 — Foundation (Days 1–3)

### 1.1 Project Scaffold

Set up the Next.js project with App Router, Tailwind CSS, and the theme file (`theme.ts` provided separately). Configure path aliases, environment variables, and folder structure.

**Folder structure:**

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, header, footer)
│   ├── page.tsx                # Home page
│   ├── (auth)/
│   │   ├── login/page.tsx      # Login page
│   │   └── verify-otp/page.tsx # OTP verification page
│   ├── services/
│   │   ├── page.tsx            # Service listing page
│   │   └── [slug]/page.tsx     # Service detail (Pandit at Home, E-Puja, etc.)
│   ├── checkout/
│   │   └── page.tsx            # Checkout page
│   ├── payment/
│   │   ├── success/page.tsx    # Payment success
│   │   └── failed/page.tsx     # Payment failed
│   ├── bookings/
│   │   ├── page.tsx            # My bookings (tabs: upcoming/completed/cancelled)
│   │   └── [id]/page.tsx       # Booking detail
│   ├── profile/
│   │   └── page.tsx            # Profile / edit profile
│   ├── astrology/
│   │   └── [slug]/page.tsx     # Astrologer detail page
│   ├── articles/
│   │   └── page.tsx            # Articles listing (Aarti, Katha, Bhajan, Muhurat)
│   ├── blogs/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Blog detail
│   └── aayojan/
│       └── page.tsx            # Event planning / Aayojan page
├── components/
│   ├── layout/
│   │   ├── TopBar.tsx          # Top info bar (phone, email, offer strip)
│   │   ├── Header.tsx          # Main nav header (logo, nav links, lang, login)
│   │   ├── Footer.tsx          # Footer (4 columns + bottom bar)
│   │   └── Breadcrumb.tsx      # Breadcrumb navigation
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Tabs.tsx
│   │   ├── Modal.tsx
│   │   ├── StarRating.tsx
│   │   ├── PriceDisplay.tsx
│   │   ├── Pagination.tsx
│   │   ├── Spinner.tsx
│   │   └── OTPInput.tsx
│   ├── service/
│   │   ├── ServiceCard.tsx      # Card with image, title, price, discount, CTA
│   │   ├── ServiceGrid.tsx      # Grid of service cards
│   │   ├── CategoryFilter.tsx   # Sidebar filter (price, category, type, reviews)
│   │   ├── ImageGallery.tsx     # Main image + thumbnails carousel
│   │   ├── TabSection.tsx       # Key Features / Puja Details / Package / Reviews / FAQ
│   │   ├── BookingWidget.tsx    # Right sidebar: price, date picker, book CTA
│   │   └── ReviewSection.tsx    # Reviews with avatar, rating, text
│   ├── checkout/
│   │   ├── ContactDetails.tsx   # WhatsApp number + OTP verification
│   │   ├── MemberDetails.tsx    # Names + gotra input
│   │   ├── OrderSummary.tsx     # Right sidebar: item, subtotal, discount, total
│   │   ├── CouponInput.tsx      # Coupon code apply widget
│   │   └── PayButton.tsx        # "Pay ₹799.00" CTA
│   ├── booking/
│   │   ├── BookingCard.tsx      # Booking card in listing (image, title, date, status)
│   │   ├── BookingTimeline.tsx  # Date/time display card
│   │   ├── PriceBreakdown.tsx   # Fee + discount + total breakdown
│   │   └── ReviewModal.tsx      # Write review modal with star rating + text
│   ├── home/
│   │   ├── HeroSection.tsx      # Hero with search bar + popular searches
│   │   ├── CategorySection.tsx  # "Explore by Category" grid
│   │   ├── BestSellers.tsx      # "Best Sellers" carousel with tab filters
│   │   ├── WhyChooseUs.tsx      # Stats + feature cards (Complete Package, Live Coverage, etc.)
│   │   ├── TestimonialSection.tsx # Customer testimonials carousel
│   │   ├── HowItWorks.tsx       # 3-step: Choose Puja → Select Date → Book & Pay
│   │   ├── BlogPreview.tsx      # Recent News & Blogs section
│   │   ├── OfferBanner.tsx      # "50% Off" promotional banner
│   │   └── SupportSection.tsx   # Call us / Email us section
│   └── blog/
│       ├── BlogCard.tsx         # Blog card with image, category, date, excerpt
│       ├── BlogContent.tsx      # Rich text blog content
│       └── RelatedArticles.tsx  # Related articles grid
├── lib/
│   ├── fetch.ts                # Custom fetch wrapper (server + client)
│   ├── api.ts                  # API endpoint definitions + typed fetch calls
│   ├── auth.ts                 # Auth helpers (token storage, session check)
│   ├── constants.ts            # Nav items, categories, footer links
│   └── utils.ts                # formatPrice, formatDate, cn() utility
├── types/
│   ├── service.ts              # Service, Category, Review types
│   ├── booking.ts              # Booking, BookingStatus types
│   ├── user.ts                 # User, Profile types
│   ├── blog.ts                 # Blog, Article types
│   ├── checkout.ts             # Order, Coupon, Payment types
│   └── api.ts                  # APIResponse<T>, PaginatedResponse<T>
└── hooks/
    ├── useAuth.ts              # Auth context/hook
    ├── useBookings.ts          # Fetch bookings hook
    └── useServices.ts          # Fetch services hook
```

### 1.2 Custom Fetch Utility

Create `lib/fetch.ts` — a single fetch wrapper that works identically on server components and client components.

```typescript
// lib/fetch.ts
type FetchOptions = RequestInit & {
  params?: Record<string, string>;
  auth?: boolean; // auto-attach token
};

type APIResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<APIResponse<T>> {
  const { params, auth = false, headers: customHeaders, ...rest } = options;

  const url = new URL(endpoint, process.env.NEXT_PUBLIC_API_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (auth) {
    // Server: read from cookies; Client: read from localStorage
    const token = typeof window === "undefined"
      ? getServerToken()   // reads from cookies() in server context
      : localStorage.getItem("yajman_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), { ...rest, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new APIError(res.status, error.message || "Request failed");
  }

  return res.json();
}
```

### 1.3 Shared Layout Components

Build the three layout components that appear on every page:

**TopBar** — Sticky yellow/orange strip: "Save Extra 10% on all Prepaid Offers", phone number, email. Hides on scroll.

**Header** — Two rows: (1) Logo on left, nav links center [Home, E-puja, PanditJi At Home, Premium Puja, Astrology, Articles, Aayojan], right side [Language dropdown, Login/Register button, Cart icon]. (2) On mobile: hamburger menu with offcanvas sidebar.

**Footer** — Dark background (#1a1a2e). Four columns: (1) Logo + description + social icons (Facebook, Twitter, YouTube, Instagram). (2) "Our Services" links. (3) "Quick Links" (Services, Blogs, Contact). (4) "Terms" (Terms & Conditions, Privacy Policy, Cookies, Disclaimer, Return Policy). Bottom bar: copyright + address + payment icons.

---

## Phase 2 — Core Pages (Days 4–8)

### 2.1 Home Page (`/`)

The longest page (7964px tall). Sections top to bottom:

1. **Hero** — Full-width. Large heading "Connect With Divinity. Book Puja In Minutes", subtext "Verified Pandit · Authentic Rituals · Peace Of Mind", search bar with placeholder "Search for Puja, Festival & Rituals...", popular search tags below (Tithi, Katha, Aarti, Panchang, Choghadiya, Festival, Bhajan Lyrics).
2. **Testimonials** — Eyebrow "Our Testimonial" (Dancing Script), heading "What our customers talk about us." (Inter SemiBold 52px). Horizontal carousel of testimonial cards with quote, name, designation, and pagination dots.
3. **Why Choose Us** — Eyebrow "why choose us", heading "Why choose book Yajman?", two big stat numbers (10K+ Pujas Completed, 250 Connected Pandits), three feature cards (Complete Package, Live Ritual Coverage, Flexible Booking) each with icon and description.
4. **Best Sellers** — Eyebrow "Discover", heading "Best Sellers". Tab filters (Puja At Home, E-puja, Premium Puja). Grid of service cards (image, featured badge, title, location, original price strikethrough, discounted price, discount %, Book Now CTA).
5. **Explore by Category** — Eyebrow "Sacred Services", heading "Explore by Category". Category cards with icon, name, and description (Puja At Home, E-Puja, PanditJi At Home, Astrology).
6. **How It Works** — Eyebrow "Book In Minutes", heading "Instant Booking". Three steps: (1) Choose Puja, (2) Select Time & Date, (3) Book & Pay — each with description text.
7. **Offer Banner** — "Get UP TO 50% Off" promotional section with CTA.
8. **Recent Blogs** — Eyebrow "Recent News & Blogs", heading "News & views from Yajman". Grid of blog cards (image, category tag, date, author, title, excerpt, Read More link).
9. **Support Section** — Eyebrow "our support team", heading "We're here to help!". Phone: +918109181057, Email: contact@yajmanapp.in.

### 2.2 Service Listing Page (`/services`)

**Route:** `/services?category=e-puja&type=health&sort=title`

**Layout:** Header → Page title "Our Services" (64px heading, with search bar below) → Two-column layout: Left sidebar (280px) with filters, Right content area with service cards grid.

**Left Sidebar Filters:**
- Filter by Price — range slider (₹98 – ₹181)
- Reviews — star rating checkboxes (5★, 4★, etc.)
- Category — checkboxes (Astrology, PanditJi At Home, Premium Puja, E-Puja, Puja At Home, Aarti & Katha)
- Types — checkboxes (Health, Marriage, Business, Navgrah, Festival)
- Top Rated sidebar widget — small cards linking to popular services

**Right Content:**
- Sort dropdown (Title, Price, etc.)
- Grid of ServiceCards (same as home best sellers)
- Pagination (1, 2, ... →)

### 2.3 Service Detail Pages

**Route:** `/services/[slug]`

Five service categories share the same detail template with content variations:
- Pandit Ji at Home
- E-Puja
- Premium Puja
- Katha / Aarti / Mahurat / Bhajan
- Astrologer (slightly different layout)

**Common Detail Layout:**
- Breadcrumb (Home > Category > Service Name)
- Title + Tags (Health / Marriage / Business) + Location + Rating (★★★★★ 05 Reviews) + Share button
- Image gallery (main image + thumbnail strip below, carousel arrows)
- Right sidebar: Price (₹899 with ₹2000 strikethrough, -55% badge), Date picker, "Select Date & Book Now" CTA
- Tab section below gallery:
  - **Key Features** tab — list of included items
  - **Puja Details** tab — description paragraphs
  - **Package Details** tab — content about puja specifics
  - **Reviews** tab — review cards with avatar, name, date, rating, text, "See All" link
  - **FAQ's** tab — accordion-style Q&A
- "Yajman Support" section — avatar, name, "Need help? Talk to an expert." + phone number
- WhatsApp notice: "Your Puja booking updates... will be sent on WhatsApp number."

**Astrologer Variation (`/astrology/[slug]`):**
- Instead of image gallery: single profile image with larger bio
- "About Astrologer" section replaces "About this Puja"
- "Select Date & Book Call Now" replaces regular booking CTA
- Time slot selection via calendar

### 2.4 Login / OTP Pages

**Login (`/login`):**
- Two-column layout: Left art/decoration (h1_deco-left.png, 50% width), Right form
- Heading "Login to Book Your Puja"
- Subtext "Please login with the same number that you used for registration."
- Phone input with +91 prefix
- "Send OTP" button (brand saffron)
- Footer text: "By continuing, you agree to our Terms of Service and Privacy Policy"
- "Back" link, copyright line

**OTP Verification (`/verify-otp`):**
- Same two-column layout
- 4/6 digit OTP input boxes
- "Didn't receive code? Resend OTP" link
- Auto-verify on completion

---

## Phase 3 — Checkout & Payments (Days 9–11)

### 3.1 Checkout Page (`/checkout`)

**Route:** `/checkout?serviceId=xxx`

**Two-column layout:** Left form (993px), Right order summary sidebar (563px).

**Left Column — Three collapsible sections:**

1. **Contact Details** (expanded by default)
   - "Your WhatsApp Number" heading
   - Info text about puja updates sent via WhatsApp
   - Phone field with WhatsApp icon (pre-filled if logged in)
   - "Send OTP" → inline OTP input → verify
   - "I have a different number for calling" checkbox → shows calling number field

2. **Name of Members Participating in Puja**
   - Info text: "Panditji will take these names along with gotra during the puja."
   - Member name fields with "Add new member" button
   - Gotra field with "I do not know gotra" checkbox

3. **Fill Participant's Gotra**
   - Gotra input with autocomplete (Bharadwaja, etc.)

**Right Column — Order Summary:**
- Service image + title + location + date
- Coupon input: "Discount Code" label, text field, "Apply" button
- Applied coupon display (e.g., "BUY10" tag with remove)
- Subtotal, Discount (10%), Total breakdown
- "Pay ₹799.00" button (full width, brand saffron)

### 3.2 Payment Result Pages

**Payment Success (`/payment/success`):**
- Centered card with green checkmark icon
- "Payment Success!" heading
- "Your Payment has been successfully processed" subtext
- Details: Reference Number, Date, Time, Payment Method, Amount (₹799.00)
- "Get PDF Receipt" button with download icon
- Auto-redirect timer: "You will be redirected to home in 00:53 sec"

**Payment Failed (`/payment/failed`):**
- Same layout but red X icon
- "Payment Failed!" heading
- "Your Payment could not be processed" subtext
- Details: Reference Number, Date, Time, Amount
- "Retry payment" button

---

## Phase 4 — User Dashboard (Days 12–14)

### 4.1 Profile Page (`/profile`)

**Layout:** Breadcrumb → "Manage Profile" heading → sidebar + content two-column layout.

**Sidebar** (shared across all dashboard pages):
- User avatar, name
- Navigation links: My Profile, My Bookings, Write a review, Download Invoice, Cancel Booking

**Profile Form:**
- Fields: Name, Email, WhatsApp Number, Calling Number, Gender (dropdown), Date of Birth (date picker), Time of Birth, Place of Birth
- "Save" button

### 4.2 My Bookings Page (`/bookings`)

**Tabs:** Upcoming, Completed, Cancelled

**Booking Card Layout:**
- Left: Service image thumbnail
- Center: Service title, description snippet, pandit assignment status, date/time display (large day number + month/year + time)
- Right: Action buttons (Cancel Booking / Download Invoice for upcoming; Write a Review / Download Invoice for completed; Book Again for cancelled)

### 4.3 Booking Detail Page (`/bookings/[id]`)

- Back breadcrumb
- Service title + price
- Booking ID, Date, Time, Address
- Pandit info (name, experience) — shown only when assigned
- "About this puja" section with included items
- Price breakdown (Puja Fee, Discount, Total)
- Action buttons: Rate & Review, Download Invoice, Cancel Booking
- Rate & Review modal: star rating + text area + photo upload + submit

### 4.4 Completed Booking Detail

Same as booking detail but:
- Pandit details shown with name and experience
- "Write a Review" and "Download Invoice" as primary CTAs
- No cancel option

---

## Phase 5 — Content Pages (Days 15–17)

### 5.1 Articles Page (`/articles`)

- Hero banner with heading "Articles" and search bar
- Tab filters: Katha, Aarti, Important Muhurat, Bhajan
- Grid of article cards (image, title, excerpt, "View Details" link)
- Pagination
- Right sidebar: "Puja Services" widget with mini service cards
- Bottom: "Planning a Devotional Event?" CTA banner (60px heading) + "Learn More" button
- "Premium Puja" carousel section

### 5.2 Blogs Page (`/blogs`)

- Heading "Blogs" (64px)
- Category tabs: All, Category 1, Category 2, Category 3
- Featured blog hero card (large image, title "Grand Sundarkand Mahotsav", category badge, description, date, Read More)
- Grid of blog cards below
- Pagination
- Right sidebar: "Other Top Rated Services" widget
- Bottom CTA banner + Premium Puja carousel

### 5.3 Blog Detail Page (`/blogs/[slug]`)

- Breadcrumb: Blogs > Category > Article Title
- Title, share button
- Published by, date
- Subtitle/excerpt (18px)
- Main content heading (32px Inter SemiBold)
- Rich text body content
- "Related Articles" section with article card grid
- Right sidebar: service widget, related articles

---

## Phase 6 — Backend API Contract (Days 18–20)

Design the API to serve both website and mobile app. Key endpoints:

### Auth
- `POST /api/auth/send-otp` — body: `{ phone, countryCode }`
- `POST /api/auth/verify-otp` — body: `{ phone, otp }` → returns JWT
- `GET /api/auth/me` — returns current user profile

### Services
- `GET /api/services` — query: `category, type, sort, page, limit, search, minPrice, maxPrice`
- `GET /api/services/[slug]` — full detail with reviews, FAQ, gallery
- `GET /api/services/categories` — all categories with counts
- `GET /api/services/bestsellers` — featured/bestseller items

### Bookings
- `POST /api/bookings` — create booking (serviceId, date, time, members, gotra, address)
- `GET /api/bookings` — query: `status=upcoming|completed|cancelled, page`
- `GET /api/bookings/[id]` — single booking detail
- `PATCH /api/bookings/[id]/cancel` — cancel a booking
- `POST /api/bookings/[id]/review` — submit review (rating, text, photos)

### Checkout / Payment
- `POST /api/checkout/verify-coupon` — body: `{ code, serviceId }`
- `POST /api/checkout/create-order` — creates payment order (Razorpay/Cashfree)
- `POST /api/checkout/verify-payment` — verifies payment callback

### Content
- `GET /api/articles` — query: `category=katha|aarti|muhurat|bhajan, page`
- `GET /api/articles/[slug]`
- `GET /api/blogs` — query: `category, page`
- `GET /api/blogs/[slug]`

### User
- `PATCH /api/users/profile` — update profile fields
- `POST /api/users/upload-avatar` — multipart avatar upload

### Astrology
- `GET /api/astrologers` — list
- `GET /api/astrologers/[slug]` — detail
- `GET /api/astrologers/[slug]/slots` — available time slots
- `POST /api/astrologers/[slug]/book` — book consultation

---

## Phase 7 — Polish & App-Readiness (Days 21–24)

### 7.1 Responsive Design

All pages must be responsive. Breakpoints (Tailwind defaults):
- Mobile: < 768px (single column, stacked layouts, hamburger nav)
- Tablet: 768px – 1024px (2-column where applicable)
- Desktop: > 1024px (full layout as per Figma 1920px designs)

### 7.2 SEO & Performance

- Server-side render all public pages (services, articles, blogs, home)
- Dynamic `<title>` and `<meta>` tags per page
- Structured data (JSON-LD) for services (Product schema) and articles (Article schema)
- Image optimization via `next/image`
- Lazy load below-fold sections

### 7.3 App Compatibility Notes

The mobile app (49 screens in Figma) shares these flows with the website:
- Auth: Splash → Onboarding → Role Selection → WhatsApp Login → OTP → Profile Setup → Location Permission
- Browse: Home → Search/Filter/Sort → Category → Listing → Service Detail
- Book: Date & Time → Checkout → Coupon → Success/Failure
- Manage: My Bookings (tabs) → Booking Detail → Rate & Review → Cancel
- Profile: Settings → Edit Profile → Help & Support → About Yajman

All API endpoints above are designed to serve both. The app adds:
- Push notifications (not on website)
- Bottom tab navigation (Home, My Bookings, Profile)
- Bottom sheets for filters/sort/coupons (modals on website)
- Native date picker (HTML date input on website)

---

## Milestone Summary

| Phase | Deliverables | Days |
|-------|-------------|------|
| 1. Foundation | Scaffold, fetch utility, layout components, theme | 1–3 |
| 2. Core Pages | Home, Listing, Detail pages, Auth pages | 4–8 |
| 3. Checkout | Checkout form, payment success/failed | 9–11 |
| 4. Dashboard | Profile, My Bookings, Booking Detail | 12–14 |
| 5. Content | Articles, Blogs, Blog Detail | 15–17 |
| 6. Backend | API contract, endpoint stubs | 18–20 |
| 7. Polish | Responsive, SEO, app compatibility review | 21–24 |
