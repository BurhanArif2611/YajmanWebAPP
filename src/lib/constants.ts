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
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

/** Card shape used by ServiceCard / BookingWidget / checkout after API mapping. */
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
