import { AayojanHero } from "@/components/aayojan/AayojanHero";
import { AboutSection } from "@/components/aayojan/AboutSection";
import { EventServicesSection } from "@/components/aayojan/EventServicesSection";
import { CtaBanner } from "@/components/aayojan/CtaBanner";
import { ProcessSection } from "@/components/aayojan/ProcessSection";
import { WhyChooseSection } from "@/components/aayojan/WhyChooseSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { AayojanGalleryStrip } from "@/components/aayojan/AayojanGalleryStrip";
import { ContactFormSection } from "@/components/aayojan/ContactFormSection";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata = {
  title: "Aayojan | Devotional Event Planning by Yajman",
  description:
    "Plan and manage devotional events with Yajman — Bhajan Sandhya, Sundarkand Mahotsav, Satsang and more, organized with authenticity and care.",
};

export default function AayojanPage() {
  return (
    <>
      <AayojanHero />

      <RevealOnScroll>
        <AboutSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <EventServicesSection />
      </RevealOnScroll>

      <CtaBanner />

      <RevealOnScroll>
        <ProcessSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <WhyChooseSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <TestimonialSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <AayojanGalleryStrip />
      </RevealOnScroll>

      <RevealOnScroll>
        <ContactFormSection />
      </RevealOnScroll>
    </>
  );
}
