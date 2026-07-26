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

// Placeholder number shown before a real phone is verified via /login.
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

const BLOG_DESCRIPTION =
  "A beautifully organized devotional gathering featuring live bhajans, experienced pandits, traditional rituals, floral decoration, and seamless event management. A beautifully organized devotional gathering featuring live bhajans, experienced pandits, traditional rituals, floral decoration, and seamless event management.A beautifully organized devotional gathering featuring live bhajans, experienced pandits, traditional rituals, floral decoration, and seamless event management.";

export const BLOG_POSTS = Array.from({ length: 4 }).map((_, i) => ({
  slug: `grand-sundarkand-mahotsav-${i + 1}`,
  title: "Grand Sundarkand Mahotsav",
  description: BLOG_DESCRIPTION,
  date: "24, Sep 2026",
  category: "Darshan",
  image: "/images/misc/promo-items.png",
}));

export const TOP_RATED_SERVICES = Array.from({ length: 4 }).map((_, i) => ({
  slug: `top-rated-${i}`,
  title: "New York in 5 Days Guided Sightseeing",
  image:
    i % 2 === 0
      ? "/images/blog/blog-sidebar-1.png"
      : "/images/blog/blog-sidebar-4.png",
}));

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

// Mock of what a CMS / rich-text editor would return for a blog body —
// rendered as raw HTML via the `prose` typography classes.
const PUJA_DETAILS_HTML = `
  <p>Om Jai Jagdish Hare, Swami Jai Jagdish Hare. Bhakt janon ke sankat, Daas janon ke sankat, Kshan mein door kare.</p>
  <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
  <p>Jo dhyave phal paave, Dukh binse man ka, Swami dukh binse man ka. Sukh sampati ghar aave, sukh sampati ghar aave, Kasht mite tan ka.</p>
  <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
  <p>Maat pita tum mere, Sharan gahu kiski, Swami sharan gahu main kiski. Tum bin aur na dooja, tum bin aur na dooja, Aas karu main jiski.</p>
  <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
  <p>Tum poorn parmatma, Tum antaryami. Swami tum antaryami. Parbrahm parmeshwar, parbrahm parmeshwar, Tum sab ke swami.</p>
  <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
  <p>Tum karuna ke saagar, Tum palanharta. Swami tum palanharta. Main moorkh phalkami, main sevak tum swami, Kripa karo bharta.</p>
  <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
  <p>Tum ho ek agochar, Sabke pranpati. Swami sabke pranpati. Kis vidhi milu dayamay, kis vidhi milu dayamay, Tumko main kumati.</p>
  <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
  <p>Deen-bandhu dukh-harta, Thakur tum mere. Swami rakshak tum mere. Apne haath uthao, apne sharan lagao, Dwaar pada tere.</p>
  <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
  <p>Vishay-vikaar mitao, Paap haro deva. Swami paap (kasht) haro deva. Shraddha bhakti badhao, shraddha bhakti badhao, Santan ki seva.</p>
  <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
  <p>Om Jai Jagdish Hare, Swami Jai Jagdish Hare. Bhakt janon ke sankat, Daas janon ke sankat, Kshan mein door kare.</p>
  <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
`;

export const BLOG_DETAIL = {
  slug: "om-jai-jagdish-hare-aarti",
  title: "Grand Sundarkand Mahotsav",
  breadcrumbCategory: "Category-1",
  publishedBy: "Yajman",
  publishedDate: "July 7, 2026",
  excerpt:
    "Sing Om Jai Jagdish Hare with devotion to praise Lord Vishnu. Bring peace, positivity, and blessings into your home. Start this divine aarti today!",
  images: [
    "/images/misc/promo-items.png",
    "/images/blog/blog-sidebar-1.png",
    "/images/blog/blog-sidebar-4.png",
  ],
  contentHtml: `
    <h2>Om Jai Jagdish Hare Aarti Lyrics</h2>
    <p>Om Jai Jagdish Hare is a prayer to Lord Vishnu. It tells about his kindness and power. People sing this aarti to show love and respect to God. It brings peace, happiness, and removes problems. Many people sing it in the morning and evening during prayers. This aarti makes the mind calm and fills the heart with devotion. It also makes the home peaceful and full of positive energy. When we sing with love, God blesses us. This aarti helps us feel close to God and thank him for everything. It is a simple and beautiful way to pray.</p>
    <h2>Puja Details</h2>
    ${PUJA_DETAILS_HTML}
    <h2>Puja Details</h2>
    <p>Om Jai Jagdish Hare, Swami Jai Jagdish Hare. Bhakt janon ke sankat, Daas janon ke sankat, Kshan mein door kare.</p>
    <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
    <p>Jo dhyave phal paave, Dukh binse man ka, Swami dukh binse man ka. Sukh sampati ghar aave, sukh sampati ghar aave, Kasht mite tan ka.</p>
    <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
    <p>Maat pita tum mere, Sharan gahu kiski, Swami sharan gahu main kiski. Tum bin aur na dooja, tum bin aur na dooja, Aas karu main jiski.</p>
    <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
    <p>Tum poorn parmatma,Tum antaryami. Swami tum antaryami. Parbrahm parmeshwar, parbrahm parmeshwar, Tum sab ke swami.</p>
    <p style="margin-left:2rem">Om Jai Jagdish Hare..</p>
    <p>Tum karuna ke</p>
  `,
};

export const RELATED_ARTICLES = Array.from({ length: 4 }).map((_, i) => ({
  slug: `om-jai-jagdish-hare-aarti-related-${i}`,
  title: "Om Jai Jagdish Hare Aarti",
  excerpt:
    "Sing Om Jai Jagdish Hare with devotion to praise Lord Vishnu. Bring peace, positivity, and blessings",
  image: "/images/blog/blog-sidebar-2.png",
}));

export const ARTICLE_DETAIL = {
  slug: "om-jai-jagdish-hare-aarti",
  title: "Om Jai Jagdish Hare Aarti",
  breadcrumbCategory: "Aarti",
  publishedBy: "Yajman",
  publishedDate: "July 7, 2026",
  rating: 5,
  reviewCount: 5,
  excerpt:
    "Sing Om Jai Jagdish Hare with devotion to praise Lord Vishnu. Bring peace, positivity, and blessings into your home. Start this divine aarti today!",
  images: [
    "/images/misc/promo-items.png",
    "/images/blog/blog-sidebar-1.png",
    "/images/blog/blog-sidebar-4.png",
  ],
  // Rendered from raw HTML delivered by the articles API (rich-text editor
  // output) — no duplication here, unlike the blog-post mock content.
  contentHtml: `
    <h2>Om Jai Jagdish Hare Aarti Lyrics</h2>
    <p>Om Jai Jagdish Hare is a prayer to Lord Vishnu. It tells about his kindness and power. People sing this aarti to show love and respect to God. It brings peace, happiness, and removes problems. Many people sing it in the morning and evening during prayers. This aarti makes the mind calm and fills the heart with devotion. It also makes the home peaceful and full of positive energy. When we sing with love, God blesses us. This aarti helps us feel close to God and thank him for everything. It is a simple and beautiful way to pray.</p>
    <h2>Om Jai Jagdish Hare Aarti in English</h2>
    ${PUJA_DETAILS_HTML}
  `,
};

export const ARTICLE_TABS = ["Katha", "Aarti", "Important muhurat", "Bhajan"];

export const ARTICLES = Array.from({ length: 9 }).map((_, i) => ({
  slug: `om-jai-jagdish-hare-aarti-${i}`,
  title: "Om Jai Jagdish Hare Aarti",
  excerpt:
    "Sing Om Jai Jagdish Hare with devotion to praise Lord Vishnu. Bring peace, positivity, and blessings",
  image: "/images/blog/blog-sidebar-2.png",
}));

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

export type BookingStatus = "Completed" | "Upcoming" | "Pending" | "Cancelled";

export type Booking = {
  id: string;
  bookingId: string;
  title: string;
  excerpt: string;
  image: string;
  status: BookingStatus;
  date: string;
  isoDate: string;
  time: string;
  panditAssigned: boolean;
  pandit?: { name: string; experience: string; avatar: string };
  address: string;
  price: number;
  discountPercent: number;
};

const BOOKING_DESCRIPTION =
  "Om Jai Jagdish Hare is a prayer to Lord Vishnu. It tells about his kindness and power. People sing this aarti to show love an";

export const BOOKINGS: Booking[] = [
  {
    id: "173826",
    bookingId: "#YAJ2026071901",
    title: "Shravana Special Parthiv",
    excerpt: BOOKING_DESCRIPTION,
    image: "/images/services/service-shivling-pour.png",
    status: "Completed",
    date: "17 July 2026",
    isoDate: "Sun, 17 Jul 2026",
    time: "7:00 AM",
    panditAssigned: true,
    pandit: {
      name: "Sandeep Sharma",
      experience: "Experience: 11+Years",
      avatar: "/images/testimonials/avatar-2.png",
    },
    address: "212 Satguru Parinay, AB Road, Vijay Nagar, Indore",
    price: 899,
    discountPercent: 10,
  },
  {
    id: "173826",
    bookingId: "#YAJ2026071902",
    title: "Shravana Special Parthiv",
    excerpt: BOOKING_DESCRIPTION,
    image: "/images/services/service-shivling-pour.png",
    status: "Upcoming",
    date: "19 July 2026",
    isoDate: "Sun, 19 Jul 2026",
    time: "7:00 AM",
    panditAssigned: true,
    address: "212 Satguru Parinay, AB Road, Vijay Nagar, Indore",
    price: 899,
    discountPercent: 10,
  },
  {
    id: "859675",
    bookingId: "#YAJ2026071903",
    title: "Shravana Special Parthiv",
    excerpt: BOOKING_DESCRIPTION,
    image: "/images/services/service-shivling-pour.png",
    status: "Pending",
    date: "19 July 2026",
    isoDate: "Sun, 19 Jul 2026",
    time: "7:00 AM",
    panditAssigned: false,
    address: "212 Satguru Parinay, AB Road, Vijay Nagar, Indore",
    price: 899,
    discountPercent: 10,
  },
];

// No cancelled bookings in the demo account — renders the empty state.
export const CANCELLED_BOOKINGS: Booking[] = [];

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
