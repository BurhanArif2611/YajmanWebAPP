# Yajman Website — Claude Code Instructions

> **Read this file FIRST.** It tells you what every file in the project is, what to build, and the design rules to follow.

---

## Project Files (what you have)

| File | Purpose |
|------|---------|
| `theme.ts` | Tailwind theme — colors, fonts, spacing, animations. Import into `tailwind.config.ts`. |
| `yajman-website-pages.md` | Exact page-by-page specifications. Every section, every text string, every font size, every layout dimension. Build each page from this. |
| `yajman-implementation-plan.md` | Folder structure, component tree, API contract, build phases. Follow this for architecture. |
| Page screenshots (shared separately) | Visual reference for pixel-perfect layout. Match spacing, proportions, and visual hierarchy from these. |

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS with custom theme
- **Language:** TypeScript (strict)
- **Fonts:** Only TWO — Inter (everything) + Dancing Script (eyebrow decorations only)
- **Data fetching:** Custom `lib/fetch.ts` wrapper that works in both server components and client components
- **Icons:** Lucide React (for UI icons) + custom SVG for brand icons

---

## Fonts — Critical Rule

The entire website uses exactly two fonts. No exceptions.

**Inter** (weights: 400, 500, 600, 700, 800) — Used for:
- All body text
- All headings (use SemiBold 600 or Bold 700 for headings)
- All navigation links
- All button labels
- All input fields and labels
- All footer text (including footer headings)
- All pricing text
- All card content
- Everything that is not a decorative eyebrow

**Dancing Script** (weight: 700 Bold) — Used ONLY for:
- Section eyebrow labels that appear above main headings
- Examples: "Discover", "why choose us", "Our Testimonial", "Sacred Services", "Book In Minutes", "Recent News & Blogs", "our support team"
- These are always rendered in brand-saffron-400 color (#fb6000)
- These are always followed by a larger Inter heading below them

Load via `next/font/google` in `app/layout.tsx`:
```tsx
import { Inter, Dancing_Script } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dancing",
});
```

---

## Responsive Design Rules

Design is 1920px in Figma. Content area is 1500–1560px centered.

### Breakpoints
- **Mobile:** < 768px — single column, stacked, hamburger nav
- **Tablet:** 768px–1024px — 2-column where applicable
- **Desktop:** > 1024px — full Figma layout

### Mobile-Specific Requirements
- Header collapses to: Logo (left) + Hamburger icon (right)
- Navigation becomes a **drawer** sliding from the left (see animation section)
- All grids collapse to single column or 2-column
- Sidebar filters on listing page become a slide-up bottom sheet or collapsible panel
- Service detail: image gallery stacks above booking widget
- Checkout: order summary moves below the form
- Footer columns stack vertically
- All touch targets minimum 44×44px

---

## Mobile Drawer Navigation

The mobile menu MUST be a drawer that slides in from the left with smooth animation.

### Behavior:
1. User taps hamburger → backdrop fades in (animate-overlay-in) + drawer slides in from left (animate-drawer-open)
2. Drawer contains: Logo, Search bar, all nav links, language selector, login/register, social links
3. Close on: X button tap, backdrop tap, or swipe left
4. Close animation: drawer slides out left (animate-drawer-close) + backdrop fades out (animate-overlay-out)
5. Body scroll is locked when drawer is open

### Implementation:
```tsx
// Use these Tailwind animation classes from theme.ts:
// animate-drawer-open, animate-drawer-close
// animate-overlay-in, animate-overlay-out
// Drawer width: 320px (w-80)
// Backdrop: bg-black/50 with backdrop-blur-sm
```

---

## Scroll-Reveal Animations (site-wide)

Every component should animate in when it enters the viewport. Keep it SUBTLE.

### Rules:
1. Create a reusable `useScrollReveal` hook or `<RevealOnScroll>` wrapper component
2. Uses IntersectionObserver with `threshold: 0.1` and `rootMargin: "0px 0px -50px 0px"`
3. Elements start invisible (opacity-0, translate-y-4) and animate to visible
4. Animation duration: 0.4–0.5s with ease-out
5. Trigger ONCE — don't re-animate when scrolling back up
6. Respect `prefers-reduced-motion` — skip animation if user prefers reduced motion

### What animates:
- **Sections:** Each major section (hero, testimonials, why choose us, etc.) fades in as a unit → `animate-fade-in-up`
- **Card grids:** Cards stagger in with 100ms delay between each → `animate-stagger-in` with `animationDelay`
- **Stats/numbers:** Fade + subtle scale → `animate-scale-in`
- **Images:** Fade in → `animate-fade-in`
- **DO NOT animate:** Header, footer, breadcrumbs, or anything above the fold

### RevealOnScroll component pattern:
```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  animation = "animate-fade-in-up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? animation : "opacity-0 translate-y-4"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

---

## Section Eyebrow Pattern (repeated across site)

Many sections use this pattern. Build it as a reusable component:

```tsx
<SectionHeader
  eyebrow="Discover"          // Dancing Script Bold, brand-saffron-400
  heading="Best Sellers"       // Inter SemiBold 36px, text-primary
  subtitle="Optional text"    // Inter Regular 16px, text-muted (optional)
/>
```

The eyebrow is ALWAYS `font-decorative text-brand-saffron-400` and the heading below it is ALWAYS `font-sans font-semibold`.

---

## Service Card Component (used everywhere)

This card appears on: Home (Best Sellers), Listing page, Articles sidebar, Blogs sidebar. Build ONCE, reuse everywhere.

```
┌─────────────────────────┐
│  [Image, full width]    │
│  ┌──────┐    ┌────────┐ │
│  │Featrd│    │Debt Rlf│ │  ← badges overlay on image
│  └──────┘    └────────┘ │
├─────────────────────────┤
│  Service Title (20px)   │
│  Location (14px, muted) │
│  ₹899  ₹2000  -55%     │  ← price + strikethrough + discount
│  [  Book Now  ]         │  ← saffron button
└─────────────────────────┘
```

---

## Custom Fetch Utility

Build `lib/fetch.ts` that works on both server and client:

```typescript
// Key requirements:
// 1. Base URL from NEXT_PUBLIC_API_URL env var
// 2. Auto-attach Authorization header when auth=true
//    - Server: read token from cookies
//    - Client: read token from localStorage
// 3. Query params helper
// 4. Typed responses: APIResponse<T>
// 5. Error class with status code
// 6. Works in server components (no window) and client components
```

---

## Build Order

Follow this exact sequence:

### Step 1: Scaffold
- Initialize Next.js 15 with App Router + TypeScript
- Install Tailwind CSS, configure with theme.ts
- Set up fonts in layout.tsx (Inter + Dancing Script)
- Create folder structure from implementation plan
- Build `lib/fetch.ts`, `lib/utils.ts` (cn helper, formatPrice, formatDate)

### Step 2: Layout Shell
- TopBar component (saffron strip with phone, email, offer)
- Header component (logo, nav, language, login — desktop)
- Mobile drawer navigation (with animations)
- Footer component (4-column dark footer)
- Breadcrumb component
- `RevealOnScroll` wrapper component

### Step 3: Home Page
- Build all 9 sections top to bottom
- Each section wrapped in RevealOnScroll
- Service cards in Best Sellers with stagger animation
- Testimonial carousel (can use simple CSS/state, no heavy library)

### Step 4: Listing + Detail Pages
- Service listing with sidebar filters
- Service detail template (shared by Pandit at Home, E-Puja, Premium Puja, Katha)
- Astrologer detail variant
- Image gallery component
- Tab section component
- Booking widget sidebar

### Step 5: Auth Pages
- Login page (two-column: art left, form right)
- OTP verification page
- OTP input component (6 boxes)

### Step 6: Checkout + Payment
- Checkout page (two-column: form left, summary right)
- Astrologer checkout variant (extra birth date/time fields)
- E-Puja checkout variant (streaming info)
- Payment success page
- Payment failed page

### Step 7: Dashboard Pages
- Profile page with sidebar
- My Bookings page with tabs (upcoming, completed, cancelled)
- Booking detail page
- Rate & Review modal

### Step 8: Content Pages
- Articles listing with tabs and sidebar
- Blogs listing with featured card
- Blog detail page
- Related articles section

---

## Key Patterns to Follow

### Colors
- Primary buttons/CTAs: `bg-brand-saffron-400 text-white hover:bg-brand-saffron-500`
- Secondary/outlined buttons: `border border-brand-saffron-400 text-brand-saffron-400`
- Dark sections (footer): `bg-brand-navy text-white`
- Alternating warm sections: `bg-surface-warm`
- Error/discount text: `text-error` (#d30b0b)
- Muted text: `text-text-muted`

### Spacing
- Section vertical padding: `py-16 md:py-20 lg:py-24`
- Content container: `max-w-site mx-auto px-4 md:px-8 lg:px-16`
- Card gap in grids: `gap-6`

### Hover States
- Cards: `hover:shadow-card-hover transition-shadow duration-300`
- Buttons: `transition-colors duration-200`
- Links: `hover:text-brand-saffron-400 transition-colors`

### Strikethrough Price Pattern
```tsx
<span className="text-lg font-semibold">₹899</span>
<span className="text-xs line-through text-text-light ml-2">₹2000</span>
<span className="text-xs text-error ml-1">-55%</span>
```

---

## Images

For now, use placeholder images. Structure image paths as:
- `/images/hero-bg.jpg` — hero background
- `/images/services/[slug].jpg` — service images
- `/images/gallery/[name].jpg` — gallery images
- `/images/blog/[slug].jpg` — blog images
- `/images/logo.svg` — Yajman logo
- `/images/payment-methods.png` — payment icons strip

Use `next/image` for all images with proper width/height and lazy loading.

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=918109181057
```

---

## Summary: Files to Read Before Each Page

When building any page:
1. Read `yajman-website-pages.md` → find that page's section → follow specs exactly
2. Reference page screenshot (if provided) → match layout and spacing
3. Use components from `yajman-implementation-plan.md` component tree
4. Apply theme values from `theme.ts`
5. Wrap sections in `RevealOnScroll` for entrance animations
6. Test at mobile (375px), tablet (768px), desktop (1280px+)
