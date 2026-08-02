/** `category` marks nav items that should resolve to a live category id via useNavLinks. */
export const NAV_LINKS: { label: string; href: string; category?: string }[] = [
  { label: "Home", href: "/" },
  { label: "E-Puja", href: "/services?category=e-puja", category: "E-Puja" },
  {
    label: "PanditJi At Home",
    href: "/services?category=panditji-at-home",
    category: "PanditJi At Home",
  },
  { label: "Premium Puja", href: "/services?category=premium-puja", category: "Premium Puja" },
  { label: "Astrology", href: "/services?category=astrology", category: "Astrology" },
  { label: "Aayojan", href: "/aayojan" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
];

export const CATEGORIES = [
  {
    slug: "puja-at-home",
    name: "Puja At home",
    image: "/images/categories/category-puja-at-home.png",
  },
  {
    slug: "e-puja",
    name: "E-Puja",
    image: "/images/categories/category-e-puja.png",
  },
  {
    slug: "premium-puja",
    name: "Premium Puja",
    image: "/images/categories/category-premium-puja.png",
  },
  {
    slug: "pandit-ji-at-home",
    name: "PanditJi At Home",
    image: "/images/categories/category-pandit-ji-at-home.png",
  },
  {
    slug: "astrology",
    name: "Astrology",
    image: "/images/categories/category-astrology.png",
  },
];

export type MockService = {
  /** Only set for live API services — used as `service_id` for coupon validation. */
  id?: string;
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  location: string;
  /** Only set for live API services. */
  shortDescription?: string;
  image: string;
  gallery: string[];
  price: number;
  originalPrice: number;
  discountPercent: number;
  featured: boolean;
  tags: string[];
  detailTags: string[];
  rating: number;
  reviewCount: number;
};

const DETAIL_GALLERY = [
  "/images/services/service-shivling.png",
  "/images/blog/blog-sidebar-1.png",
  "/images/blog/blog-sidebar-4.png",
];

export const SERVICES: MockService[] = Array.from({ length: 21 }).map(
  (_, i) => ({
    slug: `shravana-special-parthiv-shivling-nirmaan-and-abhishek-${i + 1}`,
    category: CATEGORIES[i % CATEGORIES.length].slug,
    categoryLabel: CATEGORIES[i % CATEGORIES.length].name,
    title: "Shravana Special Parthiv Shivling Nirmaan and Abhishek",
    location: "Omkareshwar Region",
    image:
      i % 4 === 1
        ? "/images/services/service-shivling.png"
        : "/images/services/service-shivling-pour.png",
    gallery: DETAIL_GALLERY,
    price: 899,
    originalPrice: 2000,
    discountPercent: 55,
    featured: true,
    tags: ["Debt Relief", "Debt Relief"],
    detailTags: ["Health", "Marriage", "Business"],
    rating: 5,
    reviewCount: 5,
  })
);

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

export const FOOTER_LINKS = {
  services: [
    { label: "E-Puja", href: "/services?category=e-puja" },
    { label: "Premium Puja", href: "/services?category=premium-puja" },
    { label: "Pandit Ji At Home", href: "/services?category=panditji-at-home" },
    { label: "Astrology", href: "/services?category=astrology" },
  ],
  quickLinks: [
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ],
  terms: [
    { label: "Terms & condition", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookies Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Return Policy", href: "/return-policy" },
  ],
};

// Placeholder number shown before a real phone is verified via /login.
export const DEMO_PHONE = "+91 7984561235";

export const BLOG_PROMO_CARDS = [
  {
    title: "Shravana Special Parthiv Shivling Nirmaan and Abhishek",
    image: "/images/ayongan/image-3.png",
  },
  {
    title: "Shravana Special Parthiv Shivling Nirmaan and Abhishek",
    image: "/images/services/service-shivling-pour.png",
  },
];

// ─── Profile / Dashboard ────────────────────────────────────────

export const PROFILE_USER = {
  name: "Emmily Morgan",
  role: "Customer Operations",
  avatar: "/images/testimonials/avatar-3.png",
  email: "emmily.morgan@example.com",
  whatsapp: "+91 7984561235",
  callingNumber: "+91 7984561235",
  gender: "Male",
  dateOfBirth: "Monday. Jun 9,2026",
  timeOfBirth: "12:00 pm",
  placeOfBirth: "",
};

export const NOTIFICATIONS = [
  {
    id: "n1",
    title: "Your puja has been confirmed",
    message:
      "Shravana Special Parthiv Shivling Nirmaan and Abhishek is scheduled for Sun, 19 Jul 2026 at 7:00 AM.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Pandit assigned to your booking",
    message: "Sandeep Sharma has been assigned as your pandit ji.",
    time: "1 day ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Payment successful",
    message: "Your payment of ₹799.00 was received successfully.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: "n4",
    title: "Puja completed",
    message: "Your puja was completed. Share your experience with us!",
    time: "1 week ago",
    unread: false,
  },
];
