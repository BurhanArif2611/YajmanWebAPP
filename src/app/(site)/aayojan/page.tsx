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
import { PlacementServiceGrid } from "@/components/placements/PlacementServiceGrid";
import { PlacementInlineAd } from "@/components/placements/PlacementInlineAd";
import { PujaServicesSidebar } from "@/components/articles/PujaServicesSidebar";
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
      <AayojanHero banners={data.banners} />

      <RevealOnScroll>
        <AboutSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <EventServicesSection events={data.events} />
      </RevealOnScroll>

      <RevealOnScroll>
        <PlacementServiceGrid
          page="aayojan"
          section="recommended"
          eyebrow="For Your Event"
          heading="Recommended Services"
        />
      </RevealOnScroll>

      <CtaBanner />

      <RevealOnScroll>
        <ProcessSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <PlacementInlineAd
          page="aayojan"
          eyebrow="Plan With Us"
          heading="Featured Event Services"
          subtitle="A featured puja or package to pair with your event planning."
        />
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
        <div className="mx-auto max-w-site px-4 pb-8 md:px-8 lg:px-16">
          <div className="lg:ml-auto lg:max-w-[340px]">
            <PujaServicesSidebar page="aayojan" />
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <ContactFormSection events={data.events} />
      </RevealOnScroll>
    </>
  );
}
