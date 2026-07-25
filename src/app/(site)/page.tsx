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

export default function Home() {
  return (
    <>
      <HeroSection />

      <RevealOnScroll>
        <CategorySection />
      </RevealOnScroll>

      <RevealOnScroll>
        <BestSellers />
      </RevealOnScroll>

      <RevealOnScroll>
        <WhyChooseUs />
      </RevealOnScroll>

      <RevealOnScroll>
        <TestimonialSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <InstantBookingSection />
      </RevealOnScroll>

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
