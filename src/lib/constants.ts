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
  title: string;
  location: string;
  image: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  featured: boolean;
  tags: string[];
};

export const SERVICES: MockService[] = Array.from({ length: 21 }).map(
  (_, i) => ({
    slug: `shravana-special-parthiv-shivling-nirmaan-and-abhishek-${i + 1}`,
    title: "Shravana Special Parthiv Shivling Nirmaan and Abhishek",
    location: "Omkareshwar Region",
    image:
      i % 4 === 1
        ? "/images/services/service-shivling.png"
        : "/images/services/service-shivling-pour.png",
    price: 899,
    originalPrice: 2000,
    discountPercent: 55,
    featured: true,
    tags: ["Debt Relief", "Debt Relief"],
  })
);

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

export const BLOG_POSTS = [
  {
    slug: "what-to-pack-for-a-1-week-summer-road-trip",
    title: "What to pack for a 1 week summer road trip",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    category: "Destinations",
    date: "July 23, 2024",
    author: "admin",
    image: "/images/blog/blog-1.png",
  },
  {
    slug: "10-safest-destinations-for-solo-female-travelers",
    title: "10 Safest Destinations for Solo Female Travelers",
    excerpt:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Destinations",
    date: "July 20, 2024",
    author: "admin",
    image: "/images/blog/blog-2.png",
  },
  {
    slug: "the-ultimate-southwest-usa-road-trip-itinerary",
    title: "The ultimate southwest USA road trip itinerary",
    excerpt:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Destinations",
    date: "July 18, 2024",
    author: "admin",
    image: "/images/blog/blog-3.png",
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
  ],
};
