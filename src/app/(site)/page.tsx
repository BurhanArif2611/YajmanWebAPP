import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { BestSellers } from "@/components/home/BestSellers";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { InstantBookingSection } from "@/components/home/InstantBookingSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { SupportSection } from "@/components/home/SupportSection";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CmsBannerStrip } from "@/components/cms/CmsBannerStrip";
import { PlacementInlineAd } from "@/components/placements/PlacementInlineAd";
import { PlacementServiceGrid } from "@/components/placements/PlacementServiceGrid";

export default function Home() {
  return (
    <>
      <HeroSection />

      <RevealOnScroll>
        <CategorySection />
      </RevealOnScroll>

      <CmsBannerStrip position="category_banner" variant="category" />

      <RevealOnScroll>
        <BestSellers compact />
      </RevealOnScroll>

      <RevealOnScroll>
        <PlacementServiceGrid
          page="home"
          section="recommended"
          eyebrow="Handpicked"
          heading="Recommended for You"
          compact
        />
      </RevealOnScroll>

      <CmsBannerStrip position="middle_ad" variant="middle" />

      <RevealOnScroll>
        <WhyChooseUs />
      </RevealOnScroll>

      <RevealOnScroll>
        <PlacementInlineAd
          page="home"
          eyebrow="Featured"
          heading="Services Chosen for You"
          subtitle="Thoughtfully selected pujas for peace, prosperity, and every sacred occasion."
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <TestimonialSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <InstantBookingSection />
      </RevealOnScroll>

      <CmsBannerStrip position="offer_banner" variant="offer" />

      <RevealOnScroll>
        <BlogPreview />
      </RevealOnScroll>

      <RevealOnScroll>
        <SupportSection />
      </RevealOnScroll>

      <GalleryStrip />
    </>
  );
}
