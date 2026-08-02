import { AayojanHero } from "@/components/aayojan/AayojanHero";
import { AboutSection } from "@/components/aayojan/AboutSection";
import { EventServicesSection } from "@/components/aayojan/EventServicesSection";
import { CtaBanner } from "@/components/aayojan/CtaBanner";
import { ProcessSection } from "@/components/aayojan/ProcessSection";
import { WhyChooseSection } from "@/components/aayojan/WhyChooseSection";
import { AayojanTestimonials } from "@/components/aayojan/AayojanTestimonials";
import { AayojanGalleryStrip } from "@/components/aayojan/AayojanGalleryStrip";
import { ContactFormSection } from "@/components/aayojan/ContactFormSection";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getAayojanPage } from "@/lib/api/aayojan";
import type { AayojanPageData } from "@/types/api";

export const metadata = {
  title: "Aayojan | Devotional Event Planning by Yajman",
  description:
    "Plan and manage devotional events with Yajman — Bhajan Sandhya, Sundarkand Mahotsav, Satsang and more, organized with authenticity and care.",
};

async function fetchAayojanPage(): Promise<AayojanPageData> {
  try {
    return await getAayojanPage();
  } catch {
    return { content: [], events: [], banners: [], testimonials: [], gallery: [] };
  }
}

export default async function AayojanPage() {
  const data = await fetchAayojanPage();

  return (
    <>
      <AayojanHero />

      <RevealOnScroll>
        <AboutSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <EventServicesSection events={data.events} />
      </RevealOnScroll>

      <CtaBanner />

      <RevealOnScroll>
        <ProcessSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <WhyChooseSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <AayojanTestimonials testimonials={data.testimonials} />
      </RevealOnScroll>

      <RevealOnScroll>
        <AayojanGalleryStrip images={data.gallery} />
      </RevealOnScroll>

      <RevealOnScroll>
        <ContactFormSection events={data.events} />
      </RevealOnScroll>
    </>
  );
}
