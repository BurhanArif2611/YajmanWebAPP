export type ApiSuccess<T> = {
  success: true;
  message?: string;
  data: T;
  pagination?: Pagination;
  /** Some list endpoints (e.g. /services) use `meta` instead of `pagination`. */
  meta?: Pagination;
};

export type ApiFailure = {
  success: false;
  error: {
    message: string;
    status: number;
    code: string;
    details?: { field: string; message: string }[];
  };
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

export type User = {
  id: string;
  phone: string;
  country_code?: string;
  role: "customer" | "pandit" | string;
  name: string | null;
  email?: string | null;
  whatsapp_number?: string | null;
  calling_number?: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  time_of_birth?: string | null;
  place_of_birth?: string | null;
  avatar_url?: string | null;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type VerifyOtpResponse = AuthTokens & {
  user: User;
  is_new_user: boolean;
};

/** Analytics/session label on login — not the push platform. */
export type DeviceSource = "web" | "app" | "portal";

/** Delivery channel sent by clients. */
export type DeliveryPlatform = "app" | "web";

export type DeviceType = "android" | "ios" | "browser";

/** Stored FCM routing value returned by the API. */
export type PushPlatform = "web" | "android" | "ios";

export type DeviceToken = {
  id: string;
  token: string;
  platform: PushPlatform;
  device_info?: Record<string, unknown>;
  created_at: string;
};

export type AppNotification = {
  id: string;
  user_id?: string;
  title: string;
  body: string;
  is_read: boolean;
  read_at: string | null;
  clicked_at: string | null;
  created_at: string;
  type?: string;
  deep_link?: string;
  image_url?: string | null;
  action_type?: string | null;
  action_value?: string | null;
  reference_type?: string | null;
  reference_id?: string | null;
  campaign_id?: string | null;
  delivery_status?: string;
  failure_reason?: string | null;
  delivered_at?: string | null;
  deleted_at?: string | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url?: string | null;
  is_active: boolean;
  /** Website sort position — GET /categories already returns them sorted by this, then name. */
  display_order?: number;
  types?: CategoryType[];
  type_count?: number;
  /** Whether services in this category require online payment (false = e.g. free/pay-later categories). */
  requires_payment?: boolean;
  requires_pandit?: boolean;
};

/** The small shape nested inside `Category.types[]`. */
export type CategoryType = {
  id: string;
  name: string;
  slug: string;
};

/** The full standalone entity from `GET /types`. */
export type Type = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  icon_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PopularSearch = {
  id: string;
  label: string;
  slug: string | null;
  link_url: string;
  display_order: number;
  /** Which row this pill belongs to on the home hero — row 1 is the "Popular Search" tag list. */
  row_number: number;
  is_active: boolean;
  created_at: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type BannerPosition =
  | "hero_slider"
  | "middle_ad"
  | "offer_banner"
  | "category_banner";

export type Banner = {
  id: string;
  image_url: string;
  mobile_image_url?: string | null;
  link_url?: string | null;
  position: BannerPosition;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// ─── Services ────────────────────────────────────────────────────

export type ServiceSortOption =
  | "price_asc"
  | "price_desc"
  | "rating"
  | "newest"
  | "title";

export type ServiceListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  /** Comma-separated slugs/uuids. */
  type?: string;
  tag?: string;
  min_price?: number;
  max_price?: number;
  rating?: number;
  sort?: ServiceSortOption;
  is_featured?: boolean;
  is_bestseller?: boolean;
  requires_payment?: boolean;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  type_id: string;
  price: number;
  original_price: number;
  discount_percent: number;
  short_description?: string | null;
  about_puja?: string | null;
  description?: string | null;
  custom_content?: string | null;
  address?: string | null;
  city?: string | null;
  pincode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  feature_image_url: string;
  video_url?: string | null;
  duration_minutes?: number | null;
  advance_booking_days?: number | null;
  is_active: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  rating_avg: number;
  total_reviews: number;
  total_bookings: number;
  view_count: number;
  display_order: number;
  status: "published" | "draft" | string;
  is_addon_available: boolean;
  benefits?: string[];
  key_features?: string[];
  availability_start_date?: string | null;
  availability_end_date?: string | null;
  booking_availability_type?: string;
  available_dates?: string[];
  category_name: string;
  category_slug: string;
  created_at: string;
  updated_at: string;
};

export type ServiceImage = {
  id: string;
  url: string;
  alt_text?: string | null;
  display_order: number;
};

export type ServiceType = {
  id: string;
  name: string;
  slug: string;
};

export type ServiceTag = {
  id: string;
  name: string;
  color?: string | null;
  bg_color?: string | null;
};

export type Temple = {
  id: string;
  name: string;
  slug: string;
  city?: string | null;
  image_url?: string | null;
};

export type ServicePackageItem = {
  name: string;
  quantity: string;
  unit: string;
};

export type ServicePackage = {
  id: string;
  title: string;
  description?: string | null;
  items: ServicePackageItem[];
  price: number;
};

export type ServiceFaq = {
  id: string;
  question: string;
  answer: string;
};

export type PujaProcessStep = {
  id: string;
  title: string;
  description?: string | null;
  display_order: number;
};

export type PujaProcess = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  display_order: number;
  steps: PujaProcessStep[];
};

export type ServiceReview = {
  id: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
  customer_name?: string | null;
  avatar_url?: string | null;
  created_at: string;
};

export type ServiceAddon = {
  id: string;
  name: string;
  image_url?: string | null;
  price: number;
};

// ─── Coupons ─────────────────────────────────────────────────────

export type Coupon = {
  id: string;
  code: string;
  title: string;
  description?: string | null;
  discount_type: "fixed" | "percent" | string;
  discount_value: string;
  max_discount_amount?: string | null;
  min_order_amount?: string | null;
  usage_limit?: number | null;
  usage_count?: number;
  per_user_limit?: number | null;
  valid_from: string;
  valid_until: string;
  applicable_categories: string[];
  applicable_services: string[];
};

export type CouponValidation =
  | {
    valid: true;
    discount_amount: number;
    final_amount: number;
    coupon: { id: string; code: string; title: string };
  }
  | {
    valid: false;
    message: string;
  };

// ─── Bookings ────────────────────────────────────────────────────

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "pandit_assigned"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "refunded"
  | "payment_failed"
  | "refund_failed"
  | "disputed";

/** The only buckets the `status` query param on GET /bookings understands. */
export type BookingStatusFilter = "upcoming" | "completed" | "cancelled";

export type BookingListFilters = {
  page?: number;
  limit?: number;
  status?: BookingStatusFilter;
};

export type Booking = {
  id: string;
  order_number: string;
  user_id: string;
  service_id: string;
  aayojan_event_id?: string | null;
  customer_name: string;
  customer_phone: string;
  customer_whatsapp?: string | null;
  customer_calling_number?: string | null;
  customer_email?: string | null;
  gotra?: string | null;
  gotra_unknown: boolean;
  booking_date: string;
  booking_time: string;
  booking_datetime: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  /** Decimal fields — pg returns these as strings. Number() before math/display. */
  base_price: string;
  discount_amount: string;
  convenience_fee: string;
  total_amount: string;
  coupon_id?: string | null;
  coupon_code?: string | null;
  birth_date?: string | null;
  birth_time?: string | null;
  birth_place?: string | null;
  status: BookingStatus;
  cancelled_at?: string | null;
  cancellation_reason?: string | null;
  cancelled_by?: string | null;
  completed_at?: string | null;
  special_instructions?: string | null;
  admin_notes?: string | null;
  device_source?: string | null;
  created_at: string;
  updated_at: string;
  service_title: string;
  service_slug: string;
  service_image?: string | null;
};

export type BookingAddonLine = {
  name: string;
  price: string;
};

export type BookingPandit = {
  id: string;
  status: string;
  display_name: string;
  phone: string;
  photo_url?: string | null;
};

export type BookingPayment = {
  id: string;
  status: string;
  method: string;
  paid_at: string | null;
};

export type BookingReview = {
  id: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
};

export type BookingDetail = Booking & {
  members: string[];
  addons: BookingAddonLine[];
  pandit: BookingPandit | null;
  payment: BookingPayment | null;
  review: BookingReview | null;
  service_duration_minutes?: number | null;
};

export type BookingInvoice = {
  invoice_number: string;
  pdf_url: string;
};

export type ReviewSubmission = {
  id: string;
  service_id: string;
  user_id: string;
  booking_id: string;
  pandit_id: string | null;
  rating: number;
  title?: string | null;
  comment?: string | null;
  is_verified: boolean;
  is_approved: boolean;
  admin_reply?: string | null;
  created_at: string;
  updated_at: string;
};

// ─── Pandit Assignments ──────────────────────────────────────────

export type PanditAssignmentStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "expired"
  | "completed";

export type PanditAssignmentListFilters = {
  status?: PanditAssignmentStatus;
  page?: number;
  limit?: number;
};

export type PanditAssignment = {
  id: string;
  booking_id: string;
  order_number: string;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  address?: string | null;
  city?: string | null;
  service_title: string;
  service_slug: string;
  status: PanditAssignmentStatus;
  respond_by?: string | null;
  notes?: string | null;
  reason?: string | null;
  created_at: string;
  updated_at: string;
};

export type PanditAssignmentDetail = PanditAssignment & {
  customer_phone: string;
  pincode?: string | null;
  total_amount: string;
};

// ─── Checkout / Payment ──────────────────────────────────────────

export type CreateOrderPayload = {
  service_id: string;
  booking_date: string;
  booking_time?: string;
  customer_name: string;
  customer_phone: string;
  customer_whatsapp?: string;
  customer_calling_number?: string;
  customer_email?: string;
  members: string[];
  addon_ids?: string[];
  gotra?: string;
  gotra_unknown?: boolean;
  coupon_code?: string;
  address?: string;
  city?: string;
  pincode?: string;
  special_instructions?: string;
  birth_date?: string;
  birth_time?: string;
  birth_place?: string;
};

export type RazorpayOrderInfo = {
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
};

export type CreateOrderResponse = {
  order: {
    id: string;
    order_number: string;
    total_amount: number;
    status?: string;
  };
  payment_required: boolean;
  razorpay?: RazorpayOrderInfo;
};

export type VerifyPaymentPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type ServiceDetail = Service & {
  requires_pandit: boolean;
  requires_payment: boolean;
  requires_booking_time?: boolean;
  puja_process_id?: string | null;
  puja_process?: PujaProcess | null;
  images: ServiceImage[];
  types: ServiceType[];
  tags: ServiceTag[];
  temples: Temple[];
  packages: ServicePackage[];
  faqs: ServiceFaq[];
  addons: ServiceAddon[];
  /** Present when API nests reviews on detail; otherwise fetched separately. */
  reviews?: ServiceReview[];
};

// ─── Aayojan ─────────────────────────────────────────────────────

export type AayojanContentBlock = {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  display_order: number;
  is_active: boolean;
};

export type AayojanEvent = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  short_description?: string | null;
  feature_image_url?: string | null;
  location?: string | null;
  city?: string | null;
  event_date: string | null;
  event_time?: string | null;
  /** Decimal fields — pg returns these as strings. Number() before math/display. */
  price: string;
  original_price?: string | null;
  max_capacity?: number | null;
  rating_avg: string;
  total_reviews: number;
  is_active: boolean;
  status: string;
  created_at: string;
  updated_at: string;
};

export type AayojanEventImage = {
  id: string;
  url: string;
};

export type AayojanEventDetail = AayojanEvent & {
  images: AayojanEventImage[];
};

export type AayojanBanner = {
  id: string;
  title: string | null;
  image_url: string;
  link_url?: string | null;
  display_order: number;
  is_active: boolean;
};

export type AayojanGallery = {
  id: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

// ─── Home gallery ────────────────────────────────────────────────

export type GalleryImage = {
  id: string;
  image_url: string;
  title: string | null;
  display_order: number;
};

export type AayojanTestimonial = {
  id: string;
  name: string;
  message: string;
  rating: number;
};

export type AayojanPageData = {
  content: AayojanContentBlock[];
  events: AayojanEvent[];
  banners: AayojanBanner[];
  gallery: AayojanGallery[];
  testimonials: AayojanTestimonial[];
};

export type AayojanContactPayload = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  event_name?: string;
  number_of_people?: number;
  preferred_date?: string;
};

export type ContactEntry = {
  id: string;
  form_type: string;
  name: string;
  email: string | null;
  phone: string;
  city: string | null;
  message: string | null;
  event_name: string | null;
  number_of_people: number | null;
  preferred_date: string | null;
  service_id: string | null;
  service_name: string | null;
  category_id?: string | null;
  category_name?: string | null;
  birth_date?: string | null;
  birth_time?: string | null;
  birth_place?: string | null;
  is_read: boolean;
  admin_notes?: string | null;
  assigned_to?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

// ─── Service inquiry ─────────────────────────────────────────────

export type ServiceInquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  birth_date?: string;
  birth_time?: string;
  birth_place?: string;
};

// ─── Legal pages (Terms, Privacy, Cookies, Disclaimer, Return Policy) ────

/** One row from `GET /legal` — the list used for the footer / sitemap. */
export type LegalPageListItem = {
  slug: string;
  title: string;
  meta_title?: string | null;
  meta_description?: string | null;
  updated_at: string;
};

/** Full page from `GET /legal/:slug`. */
export type LegalPage = {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_title?: string | null;
  meta_description?: string | null;
  is_active?: boolean;
  updated_by?: string | null;
  created_at?: string;
  updated_at: string;
};

// ─── General contact form ─────────────────────────────────────────

export type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  message?: string;
};

// ─── Blogs ───────────────────────────────────────────────────────

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

export type BlogListFilters = {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  author_id: string;
  excerpt?: string | null;
  content: string;
  feature_image_url?: string | null;
  is_featured: boolean;
  status: string;
  published_at: string | null;
  created_at: string;
  meta_title?: string | null;
  meta_description?: string | null;
  category_name: string;
  category_slug: string;
  author_name: string;
};

export type BlogImage = {
  id: string;
  url: string;
  alt_text?: string | null;
};

export type RelatedBlog = {
  id: string;
  title: string;
  slug: string;
  feature_image_url?: string | null;
};

export type BlogSidebarService = {
  id: string;
  title: string;
  slug: string;
  /** Decimal fields — pg returns these as strings. Number() before math/display. */
  price: string;
  feature_image_url?: string | null;
  rating_avg: string;
};

export type BlogDetail = Blog & {
  author_bio?: string | null;
  author_avatar_url?: string | null;
  images: BlogImage[];
  related_blogs: RelatedBlog[];
  sidebar_services: BlogSidebarService[];
};

// ─── Service placements ─────────────────────────────────────────

export type ServicePlacementPage = "home" | "blogs" | "articles" | "aayojan";
export type ServicePlacementSection = "sidebar" | "inline_ad" | "recommended" | "related";

export type ServicePlacementService = {
  id: string;
  title: string;
  slug: string;
  /** Decimal fields — pg returns these as strings. Number() before math/display. */
  price: number | string;
  original_price?: number | string | null;
  feature_image_url?: string | null;
  short_description?: string | null;
  rating_avg?: number | string;
  category_slug: string;
};

export type ServicePlacement = {
  id: string;
  page: ServicePlacementPage;
  section: ServicePlacementSection;
  display_order: number;
  label?: string | null;
  cta_text?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  service: ServicePlacementService;
};

// ─── Testimonials ────────────────────────────────────────────────

export type TestimonialPage = "home" | "aayojan";

export type Testimonial = {
  id: string;
  author_name: string;
  author_designation?: string | null;
  author_avatar_url?: string | null;
  quote: string;
  rating: number;
  page: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
};
// TODO
