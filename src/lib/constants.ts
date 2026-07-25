export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "E-Puja", href: "/services?category=e-puja" },
  { label: "PanditJi At Home", href: "/services?category=pandit-ji-at-home" },
  { label: "Premium Puja", href: "/services?category=premium-puja" },
  { label: "Astrology", href: "/services?category=astrology" },
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
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  location: string;
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

export const TESTIMONIALS = [
  {
    quote:
      "This service has taken my business to a whole new level. The design and functionality are both outstanding and user friendly. The team consistently delivered timely support and exceeded my expectations.",
    name: "Michael Lewis",
    designation: "Product Designer",
    avatar: "/images/testimonials/avatar-1.png",
    label: "Travel-friendly modern features",
  },
  {
    quote:
      "This service has taken my business to a whole new level. The design and functionality are both outstanding and user friendly. The team consistently delivered timely support and exceeded my expectations.",
    name: "Michael Lewis",
    designation: "Product Designer",
    avatar: "/images/testimonials/avatar-2.png",
    label: "Easy customization for travel",
  },
  {
    quote:
      "This service has taken my business to a whole new level. The design and functionality are both outstanding and user friendly. The team consistently delivered timely support and exceeded my expectations.",
    name: "Michael Lewis",
    designation: "Product Designer",
    avatar: "/images/testimonials/avatar-3.png",
    label: "Perfect travel website design",
  },
];

export const FOOTER_LINKS = {
  services: [
    { label: "E-Puja", href: "/services?category=e-puja" },
    { label: "Premium Puja", href: "/services?category=premium-puja" },
    { label: "Pandit Ji At Home", href: "/services?category=pandit-ji-at-home" },
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

// Mock signed-in user — swap for real session/auth data when available.
// When null, checkout shows the WhatsApp number + OTP verification flow.
export const MOCK_USER: { phone: string } | null = null;

export const DEMO_PHONE = "+91 7984561235";

export const CHECKOUT_ITEM = {
  title: "Shravan Special Maha Mrityunjay Jaap and Abhishek",
  location: "Omkareshwar Region",
  date: "Monday. Jun 9,2026",
  image: "/images/blog/blog-sidebar-3.png",
  price: 899,
};

export type Coupon = {
  code: string;
  description: string;
  discountPercent: number;
  discountLabel: string;
};

export const COUPONS: Coupon[] = [
  {
    code: "BUY10",
    description:
      "Your Puja booking updates like Puja Photos, Videos and other",
    discountPercent: 10,
    discountLabel: "10% OFF",
  },
  {
    code: "BUY10",
    description:
      "Your Puja booking updates like Puja Photos, Videos and other",
    discountPercent: 10,
    discountLabel: "10% OFF",
  },
  {
    code: "BUY10",
    description:
      "Your Puja booking updates like Puja Photos, Videos and other",
    discountPercent: 10,
    discountLabel: "10% OFF",
  },
];
