# Yajman Website — Detailed Page Specifications

This document describes every page of the Yajman website as extracted from the Figma design (`website design` tab). Use this as the source of truth when building each page. All text, sections, and layout details come directly from the design file.

**Design width:** 1920px (content area ~1500–1560px centered)
**Tech:** Next.js 15 App Router, Tailwind CSS, TypeScript
**Theme file:** `theme.ts` (provided separately — import colors, fonts, spacing from there)

---

## Shared Components (appear on every page)

### TopBar

A thin strip at the very top of every page. Background brand-saffron-400. White text.

Content (left to right):
- Left: "Call Us: +1834 123 456 789" · "Support@example.com"
- Center/Right: "Save Extra 10% on all Prepaid Offers"
- Font: Inter Medium 14px

### Header

Sits below TopBar. White background, subtle bottom border. Two rows on desktop.

**Row 1 (main nav):**
- Left: Yajman logo image (143×48px frame)
- Center: Navigation links (Inter Medium 16px): Home, E-puja, PanditJi At Home, Premium Puja, Astrology, Articles, Aayojan
- Right group:
  - Language dropdown "English" (Inter Medium 14px)
  - "Login / Register" text link (Inter Medium 14px)
  - Cart/user icon (25×25px)

**Row 2 (secondary, visible on home):**
- Currency/location selector: flag icon + "INR" + dropdown arrow (96×20px area)

**Mobile:** Collapse nav into hamburger. Offcanvas sidebar with same links + search bar + recent destinations thumbnails + social links.

### Footer

Dark background (#1a1a2e). Three visual sections:

**Section 1 — Top area (dark):**
- Horizontal rule
- Four columns:
  1. Logo (113×38px) + 4 social icons (Facebook, Twitter, YouTube, Instagram) inline
  2. "Our Services" (Inter SemiBold 16px) heading + links: Pandit Ji At Home, E-Puja, Premium Puja, Astrology (Inter Medium 14px)
  3. "Quick Links" heading + links: Services, Blogs, Contact
  4. "Terms" heading + links: Terms & Condition, Privacy Policy, Cookies Policy, Disclaimer, Return Policy
  5. Contact column: heading + address "212 Satguru Parinay, AB Road, Vijay Nagar, Indore 452010" + phone/email icons + map widget

**Section 2 — Bottom bar:**
- Left: Copyright "Copyright © 2026 Yajman. All rights reserved" (Inter Regular 14px)
- Right: Payment method icons row (265×38px image strip)

### Breadcrumb

Used on all inner pages. Format: "Home > Category > Page Name". Inter Medium 16px. Arrow icon (8×16px) as separator. Located below header, inside a 1560px container with 80px vertical padding.

---

## Page 1: Home (`/`)

**Figma frame:** "home" (1920×7964)

### Section 1 — Hero

Full-width background image with dark overlay. Min-height ~600px.

- **Heading:** "Connect With Divinity. Book Puja In Minutes" — Inter Bold 68px, white, max-width ~800px, centered
- **Subtext:** "Verified Pandit · Authentic Rituals · Peace Of Mind" — Inter Medium 22px, white
- **Search bar:** White rounded container (max-width ~600px). Input placeholder "Search for Puja, Festival & Rituals..." (Inter Medium 18px). Orange "Search" button on right (Inter SemiBold 16px, brand-saffron-400 bg).
- **Popular search tags** below search bar: "Popular Search:" label (Inter Medium 15px), then tag links: Panditji at Home, Brahmin Bhoj, Puja at Pilgrimage, Bhajan Sandhya (Inter Medium 16px). Second row: Tithi, Katha, Aarti, View More, Panchang, Choghadiya, Festival, Bhajan Lyrics (Inter SemiBold 20px).
- Left decorative image (h1_deco-left.png, positioned absolute).

### Section 2 — Testimonials

Background: surface-warm (#fffaf0).

- **Eyebrow:** "Our Testimonial" — Dancing Script Bold 28px, brand-saffron-400 color
- **Heading:** "What our customers talk about us." — Inter SemiBold 52px, text-primary
- **Carousel:** Three testimonial slide indicators below heading.
  - Each slide: Quote text (Inter Regular 16px) in quotes, Author name (Inter Medium 16px), Designation (Inter Regular 16px).
  - Slide labels below: "Travel-friendly modern features", "Easy customization for travel", "Perfect travel website design" (Inter SemiBold 20px) — these serve as navigation.

### Section 3 — Why Choose Us

- **Eyebrow:** "why choose us" — Dancing Script Bold 32px, brand-saffron-400
- **Heading:** "Why choose book Yajman?" — Inter SemiBold 36px

**Stats row (two big numbers):**
- "10K+" — Inter ExtraBold 48px + "Puja's Completed Worldwide" — Inter SemiBold 20px
- "250" — Inter ExtraBold 48px + "Connected Pandits" — Inter SemiBold 20px

**Feature cards (3 cards, horizontal):**
1. **Complete Package** (Inter SemiBold 20px) — "All items, flowers, and ritual materials included in a single price." (Inter Regular 16px)
2. **Live Ritual Coverage** — "Stream ceremonies in real-time for families across the globe."
3. **Flexible Booking** — "Reschedule freely with auspicious date suggestions from our priests."

Each card has an icon above the title.

### Section 4 — Best Sellers

- **Eyebrow:** "Discover" — Dancing Script Bold 32px, brand-saffron-400
- **Heading:** "Best Sellers" — Inter SemiBold 36px
- **Tab filters:** Puja At Home | E-puja | Premium Puja (Inter Medium 16px, active tab has underline in brand-saffron)

**Service Card grid** (4 columns on desktop). Each card:
- Image (full width of card, ~295px height, rounded top corners)
- "Featured" badge — top-left overlay (Inter SemiBold 12px, brand-saffron bg)
- "Debt Relief" tag — top-right (Inter SemiBold 12px)
- Title: "Shravana Special Parthiv Shivling Nirmaan and Abhishek" — Inter SemiBold 20px
- Location: "Omkareshwar Region" — Inter Regular 14px
- Price row: "₹899" (Inter SemiBold 18px) + "₹2000" strikethrough (Inter Regular 12px) + "-55%" (Inter Regular 12px, text-error)
- "Book Now" CTA button — Inter Medium 14px, brand-saffron-400 bg, white text, rounded

### Section 5 — Explore by Category

- **Eyebrow:** "Sacred Services" — Dancing Script Bold 28px
- **Heading:** "Explore by Category" — Inter SemiBold 52px
- **Subtitle:** "This service has taken my business to a whole new level. The design & functionality are both outstanding and user friendly." — Inter Regular 16px

**Category cards** (4 cards, horizontal):
1. Puja At Home (Inter SemiBold 22px) — with icon
2. E-Puja
3. PanditJi At Home
4. Astrology

Each card links to the filtered listing page.

### Section 6 — How It Works

- **Eyebrow:** "Book In Minutes" — Dancing Script Bold 28px
- **Heading:** "Instant Booking" — Inter SemiBold 52px

**Three steps (horizontal layout):**
1. Step "1" (Inter SemiBold 24px) → "Choose Puja" (Inter SemiBold 24px) → "Since our journey began, we've inspired countless travelers to explore breathtaking destinations." (Inter Regular 16px)
2. Step "2" → "Select Time & Date"
3. Step "3" → "Book & Pay"

### Section 7 — Offer Banner

Large promotional section with background image/gradient.
- "Get UP TO" (Inter SemiBold 16px)
- "50" (Inter SemiBold 100px) + "%" (Inter Bold 54px)
- "Off" (Inter SemiBold 24px)

### Section 8 — Recent Blogs

- **Eyebrow:** "Recent News & Blogs" — Dancing Script Bold 32px
- **Heading:** "News & views from Yajman" — Inter SemiBold 36px

**Blog grid** (3 columns):
- Main blog card (large, spans left column): Image + "Destinations" category badge (Inter SemiBold 12px) + date "July 23, 2024" (Inter Medium 14px) + "By admin" + title "What to pack for a 1 week summer road trip" (Inter SemiBold 20px) + excerpt + "Read More" link
- Two smaller blog cards on right: same pattern, smaller images

### Section 9 — Support Section

- **Eyebrow:** "our support team" — Dancing Script Bold 32px
- **Heading:** "We're here to help!" — Inter SemiBold 36px
- Subtext: "Connect with our expert travel consultants to plan your next trip." — Inter Regular 16px
- "Call us:" label + "+918109181057" (Inter SemiBold 20px)
- "Email us:" label + "contact@yajmanapp.in" (Inter SemiBold 20px)

---

## Page 2: Service Listing (`/services`)

**Figma frame:** "Listing page" (1920×2808)

### Layout

- Breadcrumb
- Page heading: "Our Services" — Inter SemiBold 64px
- Search bar (same as home hero)
- Two-column layout: sidebar (280px) + content grid

### Left Sidebar

**Filter by Price** (Inter SemiBold 16px heading):
- Range slider
- Display: "Price: ₹98 - ₹181" (Inter Regular/SemiBold 14px)

**Reviews** (Inter SemiBold 16px heading):
- Star rating checkbox filters

**Category** (Inter SemiBold 16px heading):
- Checkboxes (Inter Regular 14px): Astrology, PanditJi At Home, Premium Puja, E-Puja, Puja At Home, Aarti & Katha

**Types** (Inter SemiBold 16px heading):
- Checkboxes: Health, Marriage, Business, Navgrah, Festival

**Top Rated News** widget:
- Small card: image thumbnail + title "New York in 5 Days Guided Sightseeing" (Inter SemiBold 14px) + "Read More" link (Inter SemiBold 12px)

### Right Content

**Sort bar:** "Sort by" dropdown (Inter Regular 14px) with "Title" option.

**Service cards grid** (3 columns). Same ServiceCard component as home Best Sellers section.

**Pagination:** Number buttons (1, 2, ...) + next arrow.

---

## Page 3: Service Detail (Pandit Ji at Home) (`/services/[slug]`)

**Figma frame:** "Pandit ji at home" (1920×4386)

### Breadcrumb + Title Area

- Breadcrumb: Home > Pandit Ji at Your Place > Book Satyanarayan Puja
- Title: "Pandit Ji at Your Place" — Inter Medium 16px (breadcrumb style)
- Service name: "Book Satyanarayan Puja" — Inter Regular 16px
- Tags inline: Health / Marriage / Business (Inter Regular 16px, separated by "/")
- Location: "Indore" (Inter Regular 16px)
- Rating: "( 05 Reviews )" (Inter Regular 16px) with star icons
- Share button: "Share" (Inter Regular 16px)

### Image Gallery (left column, ~870px wide)

- Main large image (819×444px) with left/right arrow buttons (50×50px circles)
- Thumbnail strip below: 4 thumbnails (170×136px each) labeled g-thumb.jpg, g-thumb-2.jpg, g-thumb-3.jpg + "View All" text link

### Right Column — Booking Widget (~692px wide)

- **Heading:** service title (Inter SemiBold 40px area)
- **Price area:** "₹899" (Inter SemiBold 28px) + "₹2000" strikethrough (Inter Regular 12px) + "-55%" badge
- **Date:** "Monday. Jun 9, 2026" (Inter Regular 16px)
- **CTA:** "Select Date & Book Now" button (Inter Medium 20px, brand-saffron bg, full width)
- **Support box:** Avatar image (60×60px) + "Yajman Support" (Inter SemiBold 40px) + "Need help? Talk to an expert." (Inter Regular 16px) + phone number "+ 0255 456 235" (Inter SemiBold 24px) + WhatsApp icon link

### Tab Section (full width, below gallery)

**Tabs:** Key Features | Puja Details | Package Details | Reviews | FAQ's (Inter Medium 18px, active tab underlined)

**Key Features tab content (default):**
- "About this Puja" heading (Inter SemiBold 32px)
- Long description paragraphs (Inter Regular 16px)
- Price/cost breakdown info

**Puja Details tab:**
- Detailed description of the puja ritual

**Reviews tab:**
- Heading (Inter SemiBold) + review cards
- Each review: avatar (60×60px) + name (heading) + date + star rating + text
- "See All" link

**FAQ tab:**
- Accordion items with question title + expand/collapse icon + answer text

### Video Section

- "Videos of home pujas is shooted by Yajman." (Inter SemiBold 21px)
- WhatsApp notice: "Your Puja booking updates like Puja Photos, Videos and other details will be sent on WhatsApp number." (Inter Regular 16px)

### "Or" Divider + Support Card

- "Or" divider text (Inter Regular 16px)
- Support contact card with avatar, heading, phone, WhatsApp link

---

## Page 4: E-Puja Detail (`/services/[slug]`)

**Figma frame:** "E-puja" (1920×4386)

Same layout as Pandit Ji at Home with these differences:
- Breadcrumb shows E-Puja category
- Additional info badges: Duration clock icon with time estimate
- Tags include region-specific labels (e.g., "Omkareshwar Region")
- Tab content includes E-Puja-specific details about live streaming, virtual participation
- Video section emphasizes live stream capabilities

---

## Page 5: Katha / Aarti / Mahurat / Bhajan (`/services/[slug]`)

**Figma frame:** "Katha / Aarti / Mahurat / Bhajan" (1920×2958)

Same detail template. Key differences:
- Full-width hero image (1509×475px, larger than other categories)
- Additional content tabs for the specific content type
- Description focuses on devotional content, lyrics, significance
- Simplified right sidebar (no complex date picker, just CTA)

---

## Page 6: Astrologer Detail (`/astrology/[slug]`)

**Figma frame:** "Astrologer" (1920×1396)

### Key Differences from Service Detail:

- **Title area:** "Astrology" category label + Astrologer name "Chetan Sharma" + location "Indore"
- **No image gallery** — uses service detail images directly
- **"About Astrologer" section** replaces "About this Puja": "Each of us face the ups and downs that life has to provide differently..." (detailed bio text)
- **Date & Time selection:** Calendar date picker with "Monday. Jun 9, 2026" display + time slots
- **CTA:** "Select Date & Book Call Now" (instead of "Book Now")
- **Booking widget:** Same price display (₹899 / ₹2000 / -55%) but with time slot selection
- **Simpler tab section** — mainly Key Features + Reviews

---

## Page 7: Checkout (`/checkout`)

**Figma frame:** "Checkout Page" (1920×2058)

### Two-Column Layout

Left column (993px) — form sections. Right column (563px) — order summary.

### Left Column

**Page heading:** "Checkout" — Inter SemiBold 48px

**Section 1 — Contact Details** (collapsible, icon + "Contact Details" Inter SemiBold 18px):
- "Your WhatsApp Number" (Inter SemiBold 20px)
- Info: "Your Puja booking updates like Puja Photos, Videos and other details will be sent on WhatsApp on below number." (Inter Regular 16px)
- Phone input with WhatsApp icon (28×26px) + "+91" prefix + number field
- "Send OTP" button (Inter Medium 16px)
- OTP input row: 6 boxes (48×48px each)
- "Didn't receive code? Resend OTP" (Inter SemiBold 12px)
- Checkbox: "I have a different number for calling" (Inter Medium 16px)
- Conditional: "Enter your Calling Number" field

**Section 2 — Members** (collapsible):
- "Name of members participating in Puja" (Inter SemiBold 18px)
- "Panditji will take these names along with gotra during the puja." (Inter Regular 16px)
- "Members" label + name fields + "Add new member" link (Inter Bold 16px)

**Section 3 — Gotra** (collapsible):
- "Fill participant's gotra" (Inter SemiBold 18px)
- "Gotra will be recited during the puja." (Inter Regular 16px)
- "Enter Gotra" field with "Bharadwaja" placeholder
- Checkbox: "I do not know gotra" (Inter Medium 16px)

### Right Column — Order Summary

- **Card** with service image (99×90px) + title "Shravan Special Maha Mrityunjay Jaap and Abhishek" (Inter Bold 16px) + location "Omkareshwar Region" (Inter Regular 14px) + date "Monday. Jun 9, 2026" (Inter Regular 14px) + quantity/remove controls
- **Coupon section:** "Discount Code" label + input + "Apply" button (Inter Bold 16px). Applied coupon shows as tag "BUY10" (Inter SemiBold 17px) with info text
- **Price breakdown:**
  - Subtotal: ₹899.00
  - Discount (10%): - ₹100.00
  - Total: ₹799.00 (Inter Bold 16px)
- **CTA:** "Pay ₹799.00" — Inter Medium 20px, brand-saffron bg, full width, rounded

---

## Page 8: Astrologer Checkout (`/checkout?type=astrology`)

**Figma frame:** "Astrologer Checkout Page" (1920×1856)

Same as regular checkout with additions:
- Extra fields: Two date/time pickers side by side (450×94px each) for birth date and birth time (with clock icon)
- Two name/location fields side by side for place of birth details
- Rest of the form (WhatsApp, OTP, coupon, order summary) identical

---

## Page 9: Payment Success (`/payment/success`)

**Figma frame:** "payment succes" (1920×912)

Centered receipt card (585×650px) with subtle shadow.

**Card structure:**
- Green circle checkmark icon (112×112px) at top center — uses vuesax/bold/tick-circle (32×32 inner icon)
- "Payment Success!" — Inter SemiBold 30px
- "Your Payment has been successfully processed" — Inter Regular 13px

**Details rows** (493px wide, each row is label left + value right):
- "References Number" (Inter Regular 13px) → "000085752257" (Inter Medium 13px)
- "Date" → "Mar 22, 2023"
- "Time" → "07:80 AM"
- "Payment Method" → "Credit Card"

**Amount row** (larger):
- "Amount" (Inter Regular 13px) → "₹799.00" (Inter Medium 16px)

**CTA:** "Get PDF Receipt" button with download icon (vuesax/linear/import) — Inter Medium 14px, brand-saffron bg, full width of card

**Timer text:** "You will be redirected to home in 00:53 sec" — Inter Regular 13px, text-muted

---

## Page 10: Payment Failed (`/payment/failed`)

**Figma frame:** "payment failed" (1920×912)

Same layout as success but:
- Red circle X icon (64×64px) replaces checkmark — uses vuesax/bold/tick-circle with red color
- "Payment Failed!" — Inter SemiBold 30px
- "Your Payment could not be processed" — Inter Regular 13px
- No "Payment Method" row
- CTA: "Retry payment" — Inter Medium 14px, brand-saffron bg
- Same redirect timer

---

## Page 11: Profile / Manage Profile (`/profile`)

**Figma frame:** "profile page" (1920×1420)

### Layout

Breadcrumb: Home > Profile
Page heading: "Manage Profile" (Inter SemiBold 40px) + subtitle "Manage User Profile" (Inter Regular 18px)

Two-column: Sidebar (396px) + Content area (1110px)

### Sidebar

Dashboard navigation panel (348px inner width):
- Profile summary card at top
- Navigation links list (styled as vertical menu)
- Active page highlighted

### Profile Form

Two-column form grid (fields are 480×60px each):

Row 1: **Name** (Inter Bold 16px label) + text input "Enter your name" | **Email** + "Enter your email"
Row 2: **WhatsApp Number** + "+91 7984561235" pre-filled | **Calling Number**
Row 3: **Gender** dropdown "Male" | **Date of Birth** date picker "Monday. Jun 9, 2026"
Row 4: **Time of Birth** "12:00 pm" | **Place of Birth** "Enter your place of birth"

**Save button:** Inter Medium 18px, brand-saffron bg

---

## Page 12: Upcoming Bookings (`/bookings`)

**Figma frame:** "upcomming booking" (1920×1362)

### Layout

Same sidebar + content layout as profile.

Page heading: "Manage Profile" (same wrapper) + "Manage User Profile"

### Booking Card

Each booking displayed as a wide card (1050×180px):

**Left section:** Service image (184×132px)

**Center section:**
- Title: "Shravana Special Parthiv" (Inter SemiBold 20px)
- Description excerpt (Inter Regular 15px, truncated)
- Status: "Pandit: Assigned" (Inter Regular 12px)
- Date display: Large day "19" (Inter SemiBold 32px) + "July 2026" (Inter Medium 18px) + "7:00 PM" (Inter Regular 14px)

**Right section:**
- "Cancel Booking" button (Inter Medium 16px, outlined)
- "Download Invoice" button (Inter Medium 16px, outlined)

### Booking Detail (expanded or on click → `/bookings/[id]`)

Shows full detail:
- Booking ID: "#YAJ2026071901" (Inter Medium 13px)
- Date: "Sun, 19 Jul 2026"
- Time: "7:00 AM"
- Address: "212 Satguru Parinay, AB Road, Vijay Nagar, Indore"
- "About this puja" section: items included (1 Pandit, 1.5 hour duration / All puja samagri)
- Price breakdown: Puja Fees ₹899.00, Discount (10%) -₹100.00, Total Price ₹799.00

---

## Page 13: Completed Bookings (`/bookings?tab=completed`)

**Figma frame:** "completed booking" (1920×1686)

Same layout as upcoming bookings. Differences:

- Pandit info shown: "Sandeep Sharma" (Inter SemiBold 20px) + "Experience: 11+Years" (Inter Regular 16px)
- Different CTAs: "Write a review" + "Download Invoice"
- Rate & Review modal available: star rating (5 stars, 40×40px each) + text area + photo upload + submit

---

## Page 14: Articles (`/articles`)

**Figma frame:** "articles" (1920×4237)

### Hero

- Dark background banner
- "Articles" heading (Inter SemiBold 64px, white)
- Search bar below

### Content

**Tab filters:** Katha | Aarti | Important Muhurat | Bhajan (Inter Medium 20px)

**Article cards grid** (3–4 columns):
- Image (295×height)
- Title: "Om Jai Jagdish Hare Aarti" (Inter SemiBold 20px)
- Excerpt: "Sing Om Jai Jagdish Hare with devotion to praise Lord Vishnu..." (truncated)
- "View Details" link (Inter Medium 14px)

**Right sidebar:**
- "Puja Services" heading (Inter SemiBold 16px)
- Mini service cards with thumbnail + title + price + "Book Now"

**Bottom CTA Banner:**
- "Planning a Devotional Event?" (Inter SemiBold 60px)
- "Let us help you organize a memorable spiritual gathering with experienced pandits, devotional artists, and complete event management." (Inter Regular 16px)
- "Learn More" button (Inter Bold 14px)

**Premium Puja carousel:**
- Eyebrow "Discover" + Heading "Premium Puja" + service cards carousel

**Pagination:** Same style as listing page

---

## Page 15: Blogs (`/blogs`)

**Figma frame:** "Blogs" (1920×4237)

### Layout

- "Blogs" heading (Inter SemiBold 64px)
- Category tabs: All | Category 1 | Category 2 | Category 3 (Inter Medium 20px)

### Featured Blog Card (hero-style, large)

- Large image
- Title: "Grand Sundarkand Mahotsav" (Inter SemiBold 30px)
- Full description paragraph (Inter Regular 16px)
- Category badge: "Category: Darshan" (Inter Medium 16px)
- "Read More" link (Inter Bold 14px)
- Date: "24, Sep 2026" (Inter Regular 14px)

### Blog Grid

Standard blog card grid below the featured card. Each card matches the home page blog cards.

### Sidebar

"Other Top Rated Services" widget with mini service cards.

### Bottom

Same CTA banner + Premium Puja carousel as articles page.

---

## Page 16: Blog Detail (`/blogs/[slug]`)

**Figma frame:** "Blog details" (1920×3754)

### Content Area

- Breadcrumb: Blogs > Category-1 > Grand Sundarkand Mahotsav
- Title: "Grand Sundarkand Mahotsav" (Inter Regular 16px — displayed as breadcrumb item)
- Share button
- Published info: "Published by Yajman · July 7, 2026" (Inter Regular 20px)
- Subtitle/excerpt: "Sing Om Jai Jagdish Hare with devotion to praise Lord Vishnu. Bring peace, positivity, and blessings into your home." (Inter Regular 18px)

### Main Content

- Section heading: "Om Jai Jagdish Hare Aarti Lyrics" (Inter SemiBold 32px)
- Body text: full article/lyrics content (Inter Regular 18–20px), can include Hindi/Sanskrit text
- Sub-section: "Puja Details" (Inter SemiBold 32px) with additional content

### Sidebar

- "Other Top Rated Services" widget
- Service cards with "Read More" links

### Related Articles Section

- "Related Articles" (Inter SemiBold 35px) + "View More" link
- Article cards grid (same as articles page cards)

---

## Page 17: Aayojan / Event Planning (`/aayojan`)

**Figma frame:** "Ayongan" (1920×4386)

Same structure as the E-Puja/Pandit detail page template but focused on event planning and devotional event organization. Uses the same image gallery, tab sections, booking widget, and support sections. Content is customized for event coordination (Sundarkand, Bhajan Sandhya, etc.).

---

## Page 18: E-Puja Checkout (`/checkout?type=e-puja`)

**Figma frame:** "E-puja Checkout Page" (1920×2058)

Same as regular checkout with one addition in the order summary:
- E-Puja specific item display with duration and streaming info tags
- "Region" label shown below service name
- Rest identical to standard checkout

---

## Navigation Map (for routing reference)

```
/                           → Home
/services                   → Service Listing (with filters)
/services/[slug]            → Service Detail (Pandit at Home, E-Puja, Premium Puja, Katha/Aarti)
/astrology/[slug]           → Astrologer Detail
/checkout                   → Checkout (query: serviceId, type)
/payment/success            → Payment Success
/payment/failed             → Payment Failed
/login                      → Login (WhatsApp number)
/verify-otp                 → OTP Verification
/profile                    → Profile / Edit Profile
/bookings                   → My Bookings (tabs: upcoming, completed, cancelled)
/bookings/[id]              → Booking Detail
/articles                   → Articles Listing (Katha, Aarti, Muhurat, Bhajan)
/blogs                      → Blog Listing
/blogs/[slug]               → Blog Detail
/aayojan                    → Event Planning (Aayojan)
```

---

## App Design Reference (for backend compatibility)

The mobile app (390px width, 49 screens) follows these flows that the backend must support:

**Onboarding:** Splash → Onboarding (image + text carousel) → Role Selection (Devotee vs Pandit, two cards) → Login (WhatsApp Number) → OTP Verification → Profile Setup (name, phone, photo fields) → Location Permission Prompt

**Home:** Category grid (Puja at Home, E-Puja, Premium Puja, Pandit at Home) + Bestsellers + Testimonials + Featured banner

**Browse:** Search (with recent/popular suggestions) → Filter Bottom Sheet (price, category, types, star rating) → Sort Bottom Sheet (price low/high, rating, newest) → View All Categories grid → Service Listing cards

**Service Detail:** Image carousel + title + price + rating + "What's Included" list + "How It Works" 3 steps + Reviews section + "Book Now" sticky bottom bar

**Booking Flow:** Select Date & Time (calendar + time slots) → Checkout (name, WhatsApp, members, gotra, coupon, order summary) → Coupon Bottom Sheet → Booking Success / Payment Failed

**My Bookings:** Tab navigation (Upcoming, Completed, Cancelled) → Booking Detail card → Rate & Review (stars + text + photos) → Cancel Booking Confirmation → Cancel Success

**Profile:** Settings list (Edit Profile, Language, Help & Support, About Yajman, Rate App, Logout) → Edit Profile form → About Yajman (mission, stats, how it works)

**Error States:** No Internet Connection, Something Went Wrong, Search No Results, Listing Empty After Filter
